'use strict';

import React, { Component } from 'react';
import Timer from '../Timer';

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
                  onDrag={() => { }}
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
const maze = randomMaze();

export default class MainScene extends Component {
   constructor(props) {
      super(props);
      this.state = { time: 35 };
      this.interval = null;
   }
   componentWillUnmount() {
      this.stopTimer();
   }
   componentDidMount() {
      if (!this.interval && this.state.time > 0) {
         this.startTimer();
      } else {
         this.stopTimer();
      }
   }
   startTimer = () => {
      if (!this.interval && this.state.time > 0) {
         this.interval = setInterval(
            () => this.setState({ time: this.state.time - 1 }),
            1000,
         );
      } else {
         this.stopTimer();
      }
   };
   stopTimer = () => {
      clearInterval(this.interval);
      this.interval = null;
   };
   _onButtonTap = () => {
      this.props.returnHome();
   }

   render() {
      if (this.state.time <= 0) {
         this.stopTimer();
         return (
            <ViroARScene>
               <Viro360Image source={require('../../360_space.jpg')} />
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

               <ViroButton
                  source={require("../../buttons/btn_black.png")}
                  tapSource={require("../../buttons/btn_white.png")}
                  position={[1, 3, -5]}
                  height={2}
                  width={3}
                  onTap={this._onButtonTap} />

            </ViroARScene>
         );
      }
      return (
         <ViroARScene>
            <ViroAmbientLight color="#ffffff" intensity={200} />
            <ViroPortalScene
               passable={true}
               dragType="FixedDistance"
               onDrag={() => { }}
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
               {mazeGenerator(maze)}
            </ViroPortalScene>
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
