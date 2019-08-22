import React, { Component } from 'react';
import { secret } from '../secrets.js';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';

const apiKey = secret.apiKey;
let initialScene = require('../js/ARPortals/MainScene.js');

let sharedProps = {
  apiKey,
};

export default class HomeScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <Text style={localStyles.titleText}>A Maze Thing</Text>

          <TouchableHighlight
            style={localStyles.buttons}
            onPress={() => navigate('Viro', { initialScene, ...sharedProps })}
            underlayColor={'#68a0ff'}
          >
            <Text style={localStyles.buttonText}>Load Random Maze</Text>
          </TouchableHighlight>

          {/* <TouchableHighlight
            style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(VR_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'}
          > */}
          {/* <Text style={localStyles.buttonText}>Create a Maze</Text>
          </TouchableHighlight> */}
        </View>
      </View>
    );
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

// _getARNavigator() {
//   return (
//     <ViroARSceneNavigator
//       {...this.state.sharedProps}
//       initialScene={{ scene: InitialARScene }}
//     />
//   );
// }
