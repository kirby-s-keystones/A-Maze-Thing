import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
  ViroSceneNavigator,
  ViroScene,
  ViroARScene,
  ViroAmbientLight,
  Viro360Video,
  Viro360Image,
  ViroUtils,
  ViroPortal,
  ViroPortalScene,
  Viro3DObject,
  ViroAnimations,
  ViroText,
  ViroMaterials,
  ViroButton,
} from 'react-viro';

export default class YouLose extends Component {
  render() {
    return (
      <ViroARScene>
        <Viro360Image source={require('../360_space.jpg')} />
        <ViroText
          fontSize={100}
          style={styles.boldFont}
          position={[0, 1, -4]}
          width={200}
          height={5}
          extrusionDepth={8}
          materials={['frontMaterial', 'backMaterial', 'sideMaterial']}
          text={'You Lose!'}
          onTap={this.handleTap}
        />
      </ViroARScene>
    );
  }
}
var styles = StyleSheet.create({
  boldFont: {
    color: '#FFFFFF',
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

ViroMaterials.createMaterials({
  frontMaterial: {
    diffuseColor: '#FFFFFF',
  },
  backMaterial: {
    diffuseColor: '#FF0000',
  },
  sideMaterial: {
    diffuseColor: '#0000FF',
  },
});

module.exports = YouLose;
