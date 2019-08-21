'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';
import NavBar from '../../Views/NavBar.js';

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
} from 'react-viro';

import randomMaze from './mazes';
const locations = {
  wallLocation: [],
};

let totalCoins = 0;
let loseScreen = require('../youlose.js');
let winScreen = require('../youWin.js');

const maze = randomMaze();

export default class MainScene extends Component {
  constructor(props) {
    super(props);
    this.state = { time: 550, cameraPos: [], won: false };
    this.interval = null;
  }
  componentWillUnmount() {
    this.stopTimer();
  }
  componentDidMount() {
    const props = this.props.arSceneNavigator.viroAppProps;
    if (totalCoins && totalCoins === props.coinsCollected) {
      this.win();
    }

    if (!totalCoins) {
      this.getTotalCoins(maze);
    }
    if (!this.interval && this.state.time > 0) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }
  componentDidUpdate() {
    const props = this.props.arSceneNavigator.viroAppProps;
    if (totalCoins && totalCoins === props.coinsCollected && !this.state.won) {
      this.win();
    }
  }

  win = () => {
    this.setState({ won: true });
  };

  startTimer = () => {
    if (!this.interval && this.state.time > 0) {
      this.interval = setInterval(() => {
        this.setState({ time: this.state.time - 1 });
        if (!this.state.time || this.state.won) {
          this.stopTimer();
          this._pushNextScene();
        }
      }, 1000);
    } else {
      this.stopTimer();
    }
  };
  stopTimer = () => {
    clearInterval(this.interval);
    this.interval = null;
  };
  _onCameraTransformUpdate = results => {
    const camArr = results.cameraTransform.position;
    const cameraPos = [
      Number(camArr[0].toFixed(2)),
      0,
      Number(camArr[2].toFixed(2)),
    ];
    this.setState({
      cameraPos,
    });
  };
  _pushNextScene() {
    if (!this.state.won) {
      this.props.sceneNavigator.push({ scene: loseScreen });
    } else {
      this.props.sceneNavigator.push({ scene: winScreen });
    }
    setTimeout(() => {
      this.setState({ won: false });
      this.props.arSceneNavigator.viroAppProps.exit();
    }, 5000);
  }
  wallCollide = () => {
    // when user object collides with wall
  };
  getTotalCoins = arr => {
    for (let i = arr.length - 1; i >= 0; i--) {
      for (let j = 0; j < arr[0].length; j++) {
        if (arr[i][j] === 3) {
          totalCoins++;
        }
      }
    }
    this.props.arSceneNavigator.viroAppProps.setTotalCoins(totalCoins);
  };
  mazeGenerator = arr => {
    const render = [];
    let initialX = -5;
    let initialZ = -2;
    const props = this.props.arSceneNavigator.viroAppProps;
    for (let i = arr.length - 1; i >= 0; i--) {
      for (let j = 0; j < arr[0].length; j++) {
        initialX += 1;
        let position = [initialX, 0, initialZ];
        if (arr[i][j] === 1) {
          render.push(
            <Viro3DObject
              source={require('../../object_cube/object_cube.vrx')}
              resources={[
                require('../../object_cube/cube_diffuse.png'),
                require('../../object_cube/cube_specular.png'),
              ]}
              scale={[1.0, 1.0, 1.0]}
              position={position}
              type="VRX"
              key={String.fromCharCode(i) + String.fromCharCode(j)}
            />
          );
          locations.wallLocation.push(position);
        } else if (arr[i][j] === 2) {
          render.push(
            <ViroPortalScene
              passable={true}
              dragType="FixedDistance"
              onDrag={() => {}}
              key={String.fromCharCode(i) + String.fromCharCode(j)}
            >
              <ViroPortal position={position} scale={[0.8, 0.8, 0.8]}>
                <Viro3DObject
                  source={require('./portal_res/portal_archway/portal_archway.vrx')}
                  resources={[
                    require('./portal_res/portal_archway/portal_archway_diffuse.png'),
                    require('./portal_res/portal_archway/portal_archway_normal.png'),
                    require('./portal_res/portal_archway/portal_archway_specular.png'),
                  ]}
                  type="VRX"
                />
              </ViroPortal>
              <Viro360Image source={require('./portal_res/360_tiles.jpg')} />
            </ViroPortalScene>
          );
        } else if (arr[i][j] === 3) {
          render.push(
            <Viro3DObject
              source={require('../../coin/coin.vrx')}
              resources={[
                require('../../coin/coin-texture.jpg'),
                require('../../coin/img1.png'),
                require('../../coin/img2.png'),
                require('../../coin/img3.png'),
                require('../../coin/gold.jpg'),
              ]}
              scale={[0.18, 0.18, 0.18]}
              position={position}
              type="VRX"
              key={String.fromCharCode(i) + String.fromCharCode(j)}
              animation={{ name: 'animateCoin', run: true, loop: true }}
              onClick={() => {
                props.incrementCoins();
                arr[i][j] = 0;
              }}
              onPress={() => {
                props.incrementCoins();
                arr[i][j] = 0;
              }}
            />
          );
        }
      }
      initialX = -5;
      initialZ--;
    }
    return render;
  };

  render() {
    return (
      <ViroARScene>
        <Viro3DObject
          source={require('../../object_cube/object_cube.vrx')}
          resources={[
            require('../../object_cube/cube_diffuse.png'),
            require('../../object_cube/cube_specular.png'),
          ]}
          scale={[0.5, 0.5, 0.5]}
          position={this.state.cameraPos}
          type="VRX"
          //  physicsBody={{
          //    type: 'Kinematic',
          //  }}
          onCollision={this.wallCollide}
        />
        <ViroAmbientLight color="#ffffff" intensity={200} />
        <ViroPortalScene
          passable={true}
          dragType="FixedDistance"
          onDrag={() => {}}
        >
          <ViroPortal position={[0, 0, -2]} scale={[0.8, 0.8, 0.8]}>
            <Viro3DObject
              source={require('./portal_res/portal_archway/portal_archway.vrx')}
              resources={[
                require('./portal_res/portal_archway/portal_archway_diffuse.png'),
                require('./portal_res/portal_archway/portal_archway_normal.png'),
                require('./portal_res/portal_archway/portal_archway_specular.png'),
              ]}
              type="VRX"
            />
          </ViroPortal>
          <Viro360Image source={require('./portal_res/360_tiles.jpg')} />
          <ViroText
            fontSize={100}
            style={styles.boldFont}
            position={[0, 1.5, -4]}
            width={200}
            height={5}
            extrusionDepth={8}
            materials={['frontMaterial', 'backMaterial', 'sideMaterial']}
            text={String(this.state.time)}
            onTap={this.handleTap}
          />
          {this.mazeGenerator(maze)}
        </ViroPortalScene>
        <NavBar />
      </ViroARScene>
    );
  }
}

// Outside render function

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
ViroAnimations.registerAnimations({
  animateCoin: {
    properties: { rotateX: '+=360' },
    easing: 'Linear',
    duration: 2000,
  },
});

module.exports = MainScene;
