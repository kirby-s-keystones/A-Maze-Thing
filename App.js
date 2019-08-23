/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
   AppRegistry,
   Text,
   View,
   StyleSheet,
   PixelRatio,
   TouchableHighlight,
   Image,
} from 'react-native';

import { secret } from './secrets.js';
import axios from 'axios';

import { ViroARSceneNavigator } from 'react-viro';

const apiKey = secret.apiKey;

let sharedProps = {
   apiKey,
};

let InitialARScene = require('./js/MainScene.js');

let UNSET = 'UNSET';
let AR_NAVIGATOR_TYPE = 'AR';
let defaultNavigatorType = UNSET;

export default class App extends Component {
   constructor() {
      super();

      this.state = {
         navigatorType: defaultNavigatorType,
         sharedProps: sharedProps,
         coinsCollected: 0,
         totalCoins: 0,
         won: false,
         maze: [],
      };
   }

   componentDidUpdate() {
      if (!this.state.maze.length) {
         this.getMaze();
      }
   }

   render() {
      if (this.state.navigatorType == UNSET) {
         return this.getHomeScreen();
      } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
         return this.renderAR();
      }
   }
   getTotalCoins = arr => {
      let totalCoins = 0;
      for (let i = arr.length - 1; i >= 0; i--) {
         for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] === 3) {
               totalCoins++;
            }
         }
      }
      return totalCoins;
   };

   getHomeScreen = () => {
      return (
         <View style={localStyles.outer}>
            <View style={localStyles.inner}>
               <Text style={localStyles.titleText}>A Maze Thing</Text>

               <TouchableHighlight
                  style={localStyles.buttons}
                  onPress={this.selectScreen(AR_NAVIGATOR_TYPE)}
                  underlayColor={'#68a0ff'}
               >
                  <Text style={localStyles.buttonText}>Load Random Maze</Text>
               </TouchableHighlight>

               <TouchableHighlight
                  style={localStyles.buttons}
                  onPress={() => {}}
                  underlayColor={'#68a0ff'}
               >
                  <Text style={localStyles.buttonText}>Create a Maze</Text>
               </TouchableHighlight>
            </View>
         </View>
      );
   };

   renderAR = () => {
      return (
         <View style={localStyles.container}>
            <ViroARSceneNavigator
               style={localStyles.arView}
               {...this.state.sharedProps}
               initialScene={{ scene: InitialARScene }}
               viroAppProps={{
                  exit: this.exitViro,
                  incrementCoins: this.incrementCoins,
                  setTotalCoins: this.setTotalCoins,
                  coinsCollected: this.state.coinsCollected,
                  won: this.state.won,
                  win: this.win,
                  reset: this.reset,
                  maze: this.state.maze,
                  totalCoins: this.state.totalCoins,
               }}
            />
            <View
               style={{
                  flex: 0.2,
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  zIndex: 2,
                  padding: 10,
               }}
            >
               <TouchableHighlight onPress={this.exitViro}>
                  <Image
                     source={require('./assets/home.png')}
                     style={{ height: 40, width: 40, opacity: 0.5 }}
                  />
               </TouchableHighlight>
               <Text>{`${this.state.coinsCollected}/${
                  this.state.totalCoins
               }`}</Text>
            </View>
         </View>
      );
   };
   win = () => {
      this.setState({ won: true });
   };
   getMaze = async () => {
      try {
         const { data } = await axios.get(
            'https://powerful-headland-69931.herokuapp.com/api/maze',
         );

         const randMaze = Math.floor(Math.random() * data.length);

         const totalCoins = this.getTotalCoins(data[randMaze].maze);

         this.setState({
            maze: data[randMaze].maze,
            totalCoins,
         });
      } catch (err) {
         console.error(err);
      }
   };

   incrementCoins = () => {
      this.setState(previousState => {
         return {
            coinsCollected: previousState.coinsCollected + 1,
         };
      });
   };

   setTotalCoins = num => {
      this.setState({ totalCoins: num });
   };

   selectScreen = navigatorType => {
      return () => {
         this.setState({
            navigatorType: navigatorType,
         });
      };
   };

   exitViro = () => {
      this.setState({
         navigatorType: UNSET,
         totalCoins: 0,
         coinsCollected: 0,
         maze: [],
         won: false,
      });
   };
}

let localStyles = StyleSheet.create({
   container: {
      flex: 1,
   },
   arView: {
      flex: 1,
   },
   viroContainer: {
      flex: 1,
      backgroundColor: 'black',
   },
   outer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'black',
   },
   inner: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'black',
   },
   titleText: {
      paddingTop: 30,
      paddingBottom: 20,
      color: '#fff',
      textAlign: 'center',
      fontSize: 25,
   },
   buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 20,
   },
   buttons: {
      height: 80,
      width: 150,
      paddingTop: 20,
      paddingBottom: 20,
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: '#68a0cf',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff',
   },
   exitButton: {
      height: 50,
      width: 100,
      paddingTop: 10,
      paddingBottom: 10,
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: '#68a0cf',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff',
   },
});

module.exports = App;

// import HomeScreen from './Views/HomeScreen';
// import { ViroARSceneNavigator } from 'react-viro';
// import { createStackNavigator, createAppContainer } from 'react-navigation';

// const MainNavigator = createStackNavigator({
//   Home: { screen: HomeScreen },
//   Viro: { screen: ViroARSceneNavigator },
// });

// const App = createAppContainer(MainNavigator);

// export default App;

// module.exports = App;
