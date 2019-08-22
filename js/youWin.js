import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { ViroARScene, Viro360Image, ViroText, ViroMaterials } from 'react-viro';

export default class YouWin extends Component {
  render() {
    return (
      <ViroARScene>
        <Viro360Image
          source={require('./ARPortals/portal_res/360_island.jpg')}
        />
        <ViroText
          fontSize={100}
          style={styles.boldFont}
          position={[0, 1, -4]}
          width={200}
          height={5}
          extrusionDepth={8}
          materials={['frontMaterial', 'backMaterial', 'sideMaterial']}
          text={'You Win!'}
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
    diffuseColor: '#06cc10',
  },
  backMaterial: {
    diffuseColor: '#06cc10',
  },
  sideMaterial: {
    diffuseColor: '#0000FF',
  },
});

module.exports = YouWin;
