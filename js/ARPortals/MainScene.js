'use strict';

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
  ViroText,
} from 'react-viro';

const locations = {
  wallLocation: [],
};

const mazeGenerator = arr => {
  const render = [];
  let initialX = -1;
  let initialZ = -1;
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
        locations.exitPortal = position;
      }
    }
    initialX = -1;
    initialZ++;
    console.log(initialX, initialZ);
  }
  return render;
};

export default class MainScene extends Component {
  constructor() {
    super();
    this.state = {
      cameraPos: [],
    };
  }

  //   _onCameraARHitTest = results => {
  //     const camArr = results.cameraOrientation.position;
  //     const cameraPos = [
  //       Number(camArr[0].toFixed(2)),
  //       0,
  //       Number(camArr[2].toFixed(2)),
  //     ];
  //     this.setState({
  //       cameraPos,
  //     });
  //     //  this._collisionTest(cameraPos);
  //   };
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
  //   _collisionTest = cameraPos => {
  //     // wall collision
  //     const wallPos = locations.wallLocation;
  //     for (let i = 0; i < wallPos.length; i++) {
  //       let distance = this._getDistance(wallPos[i], cameraPos);
  //       if (distance < ) {
  //         // something bad happens
  //       }
  //     }
  //     // exit portal
  //   };

  //   _getDistance = (object, camera) => {
  //      // need to account for size of wall
  //      Math.sqrt(Math.pow(object[0] - camera[0], 2) + Math.pow(object[1] - camera[1], 2) + Math.pow(object[2] - camera[2], 2))
  //   };

  wallCollide = () => {
    // when user object collides with wall
  };

  render() {
    return (
      <ViroARScene onCameraTransformUpdate={this._onCameraTransformUpdate}>
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
        <ViroText text={`${this.state.cameraPos}`} position={[0, 0, -1]} />
        <ViroPortalScene
          passable={true}
          dragType="FixedDistance"
          onDrag={() => {}}
        >
          <ViroPortal position={[4, 0, -1]} scale={[0.8, 0.8, 0.8]}>
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
          {mazeGenerator([
            [1, 1, 2, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 0, 1, 1, 1],
          ])}
        </ViroPortalScene>
      </ViroARScene>
    );
  }
}

module.exports = MainScene;
