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
} from 'react-native';
import { secret } from './secrets.js';

import { ViroARSceneNavigator } from 'react-viro';

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
    };
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
      this
    );
    this._exitViro = this._exitViro.bind(this);
  }

  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    }
  }

  _getExperienceSelector() {
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <Text style={localStyles.titleText}>A Maze Thing</Text>

          <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
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

  _getARNavigator() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialARScene }}
        viroAppProps={{ exit: this._exitViro }}
      />
    );
  }

  _getExperienceButtonOnPress(navigatorType) {
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
