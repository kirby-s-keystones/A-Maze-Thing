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
} from 'react-viro';

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
               <ViroPortal position={[0, 0, -1]} scale={[0.3, 0.3, 0.3]}>
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
               <Viro3DObject
                  source={require('../../object_cube/object_cube.vrx')}
                  resources={[
                     require('../../object_cube/cube_diffuse.png'),
                     require('../../object_cube/cube_specular.png'),
                  ]}
                  scale={[1.0, 1.0, 1.0]}
                  position={[-1.15, 0, -1]}
                  type="VRX"
               />
               <Viro3DObject
                  source={require('../../object_cube/object_cube.vrx')}
                  resources={[
                     require('../../object_cube/cube_diffuse.png'),
                     require('../../object_cube/cube_specular.png'),
                  ]}
                  scale={[1.0, 1.0, 1.0]}
                  position={[-2.15, 0, -1]}
                  type="VRX"
               />
               <Viro3DObject
                  source={require('../../object_cube/object_cube.vrx')}
                  resources={[
                     require('../../object_cube/cube_diffuse.png'),
                     require('../../object_cube/cube_specular.png'),
                  ]}
                  scale={[1.0, 1.0, 1.0]}
                  position={[-2.15, 0, -2]}
                  type="VRX"
               />
               <Viro3DObject
                  source={require('../../object_cube/object_cube.vrx')}
                  resources={[
                     require('../../object_cube/cube_diffuse.png'),
                     require('../../object_cube/cube_specular.png'),
                  ]}
                  scale={[1.0, 1.0, 1.0]}
                  position={[-2.15, 0, -3]}
                  type="VRX"
               />
               <Viro3DObject
                  source={require('../../object_cube/object_cube.vrx')}
                  resources={[
                     require('../../object_cube/cube_diffuse.png'),
                     require('../../object_cube/cube_specular.png'),
                  ]}
                  scale={[1.0, 1.0, 1.0]}
                  position={[-2.15, 0, -4]}
                  type="VRX"
               />
               <Viro3DObject
                  source={require('../../object_cube/object_cube.vrx')}
                  resources={[
                     require('../../object_cube/cube_diffuse.png'),
                     require('../../object_cube/cube_specular.png'),
                  ]}
                  scale={[1.0, 1.0, 1.0]}
                  position={[-2.15, 0, -5]}
                  type="VRX"
               />
               <Viro3DObject
                  source={require('../../object_cube/object_cube.vrx')}
                  resources={[
                     require('../../object_cube/cube_diffuse.png'),
                     require('../../object_cube/cube_specular.png'),
                  ]}
                  scale={[1.0, 1.0, 1.0]}
                  position={[-2.15, 0, -6]}
                  type="VRX"
               />
               <Viro3DObject
                  source={require('../../object_cube/object_cube.vrx')}
                  resources={[
                     require('../../object_cube/cube_diffuse.png'),
                     require('../../object_cube/cube_specular.png'),
                  ]}
                  scale={[1.0, 1.0, 1.0]}
                  position={[-1.15, 0, -6]}
                  type="VRX"
               />

               <Viro3DObject
                  source={require('../../object_cube/object_cube.vrx')}
                  resources={[
                     require('../../object_cube/cube_diffuse.png'),
                     require('../../object_cube/cube_specular.png'),
                  ]}
                  scale={[1.0, 1.0, 1.0]}
                  position={[-0.15, 0, -6]}
                  type="VRX"
               />
               <Viro3DObject
                  source={require('../../object_cube/object_cube.vrx')}
                  resources={[
                     require('../../object_cube/cube_diffuse.png'),
                     require('../../object_cube/cube_specular.png'),
                  ]}
                  scale={[1.0, 1.0, 1.0]}
                  position={[1.15, 0, -6]}
                  type="VRX"
               />
               <Viro3DObject
                  source={require('../../object_cube/object_cube.vrx')}
                  resources={[
                     require('../../object_cube/cube_diffuse.png'),
                     require('../../object_cube/cube_specular.png'),
                  ]}
                  scale={[1.0, 1.0, 1.0]}
                  position={[2.15, 0, -6]}
                  type="VRX"
               />
               <Viro3DObject
                  source={require('../../object_cube/object_cube.vrx')}
                  resources={[
                     require('../../object_cube/cube_diffuse.png'),
                     require('../../object_cube/cube_specular.png'),
                  ]}
                  scale={[1.0, 1.0, 1.0]}
                  position={[2.15, 0, -5]}
                  type="VRX"
               />
               <Viro3DObject
                  source={require('../../object_cube/object_cube.vrx')}
                  resources={[
                     require('../../object_cube/cube_diffuse.png'),
                     require('../../object_cube/cube_specular.png'),
                  ]}
                  scale={[1.0, 1.0, 1.0]}
                  position={[2.15, 0, -4]}
                  type="VRX"
               />
               <Viro3DObject
                  source={require('../../object_cube/object_cube.vrx')}
                  resources={[
                     require('../../object_cube/cube_diffuse.png'),
                     require('../../object_cube/cube_specular.png'),
                  ]}
                  scale={[1.0, 1.0, 1.0]}
                  position={[2.15, 0, -3]}
                  type="VRX"
               />
               <Viro3DObject
                  source={require('../../object_cube/object_cube.vrx')}
                  resources={[
                     require('../../object_cube/cube_diffuse.png'),
                     require('../../object_cube/cube_specular.png'),
                  ]}
                  scale={[1.0, 1.0, 1.0]}
                  position={[2.15, 0, -2]}
                  type="VRX"
               />
               <Viro3DObject
                  source={require('../../object_cube/object_cube.vrx')}
                  resources={[
                     require('../../object_cube/cube_diffuse.png'),
                     require('../../object_cube/cube_specular.png'),
                  ]}
                  scale={[1.0, 1.0, 1.0]}
                  position={[2.15, 0, -5]}
                  type="VRX"
               />
               <ViroPortalScene
                  passable={true}
                  dragType="FixedDistance"
                  onDrag={() => {}}
               >
                  <ViroPortal position={[0, 0, -6]} scale={[0.3, 0.3, 0.3]}>
                     <Viro3DObject
                        source={require('./portal_res/portal_archway/portal_archway.vrx')}
                        resources={[
                           require('./portal_res/portal_archway/portal_archway_diffuse.png'),
                           require('./portal_res/portal_archway/portal_archway_normal.png'),
                           require('./portal_res/portal_archway/portal_archway_specular.png'),
                        ]}
                        type="VRX"
                        scale={[0.3, 0.3, 0.3]}
                     />
                  </ViroPortal>
               </ViroPortalScene>

               <Viro3DObject
                  source={require('../../object_cube/object_cube.vrx')}
                  resources={[
                     require('../../object_cube/cube_diffuse.png'),
                     require('../../object_cube/cube_specular.png'),
                  ]}
                  scale={[1.0, 1.0, 1.0]}
                  position={[1.15, 0, -1]}
                  type="VRX"
               />
               <Viro3DObject
                  source={require('../../object_cube/object_cube.vrx')}
                  resources={[
                     require('../../object_cube/cube_diffuse.png'),
                     require('../../object_cube/cube_specular.png'),
                  ]}
                  scale={[1.0, 1.0, 1.0]}
                  position={[2.15, 0, -1]}
                  type="VRX"
               />
               <Viro3DObject
                  source={require('../../object_cube/object_cube.vrx')}
                  resources={[
                     require('../../object_cube/cube_diffuse.png'),
                     require('../../object_cube/cube_specular.png'),
                  ]}
                  scale={[1.0, 1.0, 1.0]}
                  position={[-1.15, 0, -4]}
                  type="VRX"
               />
            </ViroPortalScene>
         </ViroARScene>
      );
   },
});

module.exports = MainScene;
