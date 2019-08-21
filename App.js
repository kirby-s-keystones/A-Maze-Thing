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

import FontAwesome, {
  RegularIcons,
  BrandIcons,
} from 'react-native-fontawesome';

// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { secret } from './secrets.js';

import { ViroARSceneNavigator, ViroText } from 'react-viro';

const apiKey = secret.apiKey;

let sharedProps = {
  apiKey,
};

let InitialARScene = require('./js/ARPortals/MainScene.js');

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
    };
    this.getHomeScreen = this.getHomeScreen.bind(this);
    this.getMaze = this.getMaze.bind(this);
    this.selectScreen = this.selectScreen.bind(this);
    this._exitViro = this._exitViro.bind(this);
  }

  render() {
    if (this.state.navigatorType == UNSET) {
      return this.getHomeScreen();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this.getMaze();
    }
  }

  getHomeScreen() {
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
  }

  getMaze() {
    return (
      <View style={localStyles.container}>
        <ViroARSceneNavigator
          style={localStyles.arView}
          {...this.state.sharedProps}
          initialScene={{ scene: InitialARScene }}
          viroAppProps={{
            exit: this._exitViro,
            incrementCoins: this.incrementCoins,
            setTotalCoins: this.setTotalCoins,
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
          <TouchableHighlight onPress={this._exitViro}>
            <Image
              source={require('./assets/home.png')}
              style={{ height: 40, width: 40, opacity: 0.5 }}
            />
          </TouchableHighlight>
          <Text>{`${this.state.coinsCollected}/${this.state.totalCoins}`}</Text>
        </View>
      </View>
    );
  }

  incrementCoins = () => {
    this.setState(previousState => {
      return { coinsCollected: previousState.coinsCollected + 1 };
    });
  };

  setTotalCoins = num => {
    this.setState({ totalCoins: num });
  };

  selectScreen(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType,
      });
    };
  }

  _exitViro() {
    this.setState({
      navigatorType: UNSET,
    });
  }
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
