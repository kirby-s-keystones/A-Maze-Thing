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
   Linking,
   TextInput,
   ImageBackground,
   Dimensions,
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
let FIND_MAZE = 'FIND_MAZE';
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
         searchQuery: '',
         mazes: [],
         filteredMazes: [],
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
      } else if (this.state.navigatorType == FIND_MAZE) {
         return this.renderFind();
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
            <Image
               source={require('./assets/bg-750x1334.png')}
               resizeMode="contain"
               style={{
                  flex: 1,
                  width: viewportWidth,
                  height: viewportHeight,
                  position: 'absolute',
               }}
            />
            <View style={localStyles.blackbg} />

            <View style={localStyles.inner}>
               <Image
                  source={require('./assets/logo_sm.png')}
                  style={localStyles.logo}
               />
               <TouchableHighlight
                  style={localStyles.buttons}
                  onPress={() => this.selectScreen(AR_NAVIGATOR_TYPE)}
                  underlayColor={'#3b38ff'}
               >
                  <Text style={localStyles.buttonText}>Random Maze</Text>
               </TouchableHighlight>

               <TouchableHighlight
                  style={localStyles.buttons}
                  onPress={() =>
                     Linking.openURL('https://a-maze-thing.herokuapp.com/')
                  }
                  underlayColor={'#3b38ff'}
               >
                  <Text style={localStyles.buttonText}>Create Maze</Text>
               </TouchableHighlight>
               <TouchableHighlight
                  style={localStyles.buttons}
                  onPress={() => this.selectScreen(FIND_MAZE)}
                  underlayColor={'#3b38ff'}
               >
                  <Text style={localStyles.buttonText}>Find Maze</Text>
               </TouchableHighlight>
            </View>
         </View>
      );
   };

   renderFind = () => {
      return (
         <View
            style={{
               flex: 1,
               backgroundColor: 'black',
               padding: 10,
            }}
         >
            <TouchableHighlight onPress={this.exitViro}>
               <Image
                  source={require('./assets/home.png')}
                  style={{ height: 40, width: 40, opacity: 0.5 }}
               />
            </TouchableHighlight>
            <View style={localStyles.inner}>
               <Text style={localStyles.subTitle}>Maze Finder</Text>
               <TextInput
                  style={localStyles.inputBox}
                  onChangeText={searchQuery => this.setState({ searchQuery })}
                  value={this.state.searchQuery}
               />
               <TouchableHighlight
                  style={localStyles.buttons}
                  onPress={() => this.getMatchingMazes(this.state.searchQuery)}
                  underlayColor={'#68a0ff'}
               >
                  <Text style={localStyles.buttonText}>Find</Text>
               </TouchableHighlight>
               {this.state.filteredMazes.map(maze => {
                  return (
                     <View
                        key={maze.name}
                        style={{ flex: 1, flexDirection: 'column' }}
                     >
                        <View>
                           <Text style={localStyles.buttonText}>
                              {maze.name}
                           </Text>
                        </View>
                        <View>
                           <TouchableHighlight
                              style={localStyles.buttons}
                              onPress={() => {
                                 this.setMaze(maze);
                                 this.selectScreen(AR_NAVIGATOR_TYPE);
                              }}
                              underlayColor={'#68a0ff'}
                           >
                              <Text style={localStyles.buttonText}>Select</Text>
                           </TouchableHighlight>
                        </View>
                     </View>
                  );
               })}
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
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  zIndex: 2,
                  padding: 10,
                  width: '100%',
               }}
            >
               <TouchableHighlight onPress={this.exitViro}>
                  <Image
                     source={require('./assets/home.png')}
                     style={{ height: 40, width: 40, opacity: 0.5 }}
                  />
               </TouchableHighlight>
               <Text style={localStyles.overlayText}>{`${
                  this.state.coinsCollected
               }/${this.state.totalCoins}`}</Text>
            </View>
         </View>
      );
   };
   setMaze = ({ maze }) => {
      const totalCoins = this.getTotalCoins(maze);
      this.setState({ maze, totalCoins });
   };
   getMatchingMazes = query => {
      const filteredMazes = this.state.mazes.filter(({ name }) =>
         name.match(new RegExp(query, 'i')),
      );
      this.setState({ filteredMazes });
   };
   win = () => {
      this.setState(state => ({
         ...state,
         won: true,
      }));
   };
   getMaze = async () => {
      try {
         const { data } = await axios.get(
            'https://a-maze-thing.herokuapp.com/api/maze',
         );

         const randMaze = Math.floor(Math.random() * data.length);

         const totalCoins = this.getTotalCoins(data[randMaze].maze);

         this.setState({
            maze: data[randMaze].maze,
            totalCoins,
            mazes: data,
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
      this.setState({
         navigatorType: navigatorType,
      });
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

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
   'window',
);

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
   blackbg: {
      position: 'absolute',
      backgroundColor: 'black',
      opacity: 0.5,
      height: viewportHeight,
      width: viewportWidth,
   },
   inner: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'transparent',
   },
   titleText: {
      paddingTop: 30,
      paddingBottom: 20,
      color: '#fff',
      textAlign: 'center',
      fontSize: 25,
   },
   subTitle: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 18,
      textAlignVertical: 'center',
      letterSpacing: 3,
      textTransform: 'uppercase',
      marginBottom: 20,
      marginTop: 30,
   },
   buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      textAlignVertical: 'center',
      letterSpacing: 3,
      textTransform: 'uppercase',
   },
   buttons: {
      height: 80,
      width: 220,
      paddingTop: 30,
      marginTop: 30,
      marginBottom: 20,
      backgroundColor: '#3734eb',
      borderRadius: 10,
   },
   overlayText: {
      alignSelf: 'flex-end',
      color: '#fff',
      fontWeight: '700',
      textAlign: 'right',
      fontSize: 16,
      marginBottom: 15,
      width: '88%',
   },
   inputBox: {
      height: 60,
      borderColor: 'gray',
      borderWidth: 1,
      color: 'white',
      width: 220,
      borderRadius: 10,
      fontSize: 16,
      padding: 10,
   },
});

module.exports = App;
