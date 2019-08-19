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
   ViroAnimations,
} from 'react-viro';

import randomMaze from './mazes';

const mazeGenerator = arr => {
   const render = [];
   let initialX = -5;
   let initialZ = -2;
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
               />,
            );
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
                  <Viro360Image
                     source={require('./portal_res/360_tiles.jpg')}
                  />
               </ViroPortalScene>,
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
               />,
            );
         }
      }
      initialX = -5;
      initialZ--;
   }
   return render;
};

var createReactClass = require('create-react-class');
var MainScene = createReactClass({
   render: function() {
      return (
         <ViroARScene>
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
               {mazeGenerator(randomMaze())}
            </ViroPortalScene>
         </ViroARScene>
      );
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
