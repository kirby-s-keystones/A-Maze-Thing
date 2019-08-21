import React, { Component } from 'react';

import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';

import { ViroFlexView, ViroText, ViroMaterials } from 'react-viro';

export default class NavBar extends Component {
  render() {
    return (
      <ViroFlexView
        style={{ flexDirection: 'row', padding: 0.1 }}
        position={[0, 0, -1]}
        width={5.0}
        height={5.0}
      >
        <ViroText
          text="Hello World"
          textAlign="left"
          color="#ff0000"
          width={2}
          height={2}
        />
      </ViroFlexView>
    );
  }
}

module.exports = NavBar;
