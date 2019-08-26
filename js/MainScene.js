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
   ViroText,
   ViroMaterials,
} from 'react-viro';

let loseScreen = require('./youLose.js');
let winScreen = require('./youWin.js');

export default class MainScene extends Component {
   constructor(props) {
      super(props);
      this.state = { time: 25 };
      this.interval = null;
   }
   componentWillUnmount() {
      this.stopTimer();
   }
   componentWillUpdate() {
      const props = this.props.arSceneNavigator.viroAppProps;
      if (
         props.totalCoins &&
         props.totalCoins === props.coinsCollected &&
         !props.won
      ) {
         props.win();
      }
   }
   componentDidMount() {
      const props = this.props.arSceneNavigator.viroAppProps;
      if (!this.interval && this.state.time > 0 && !props.won) {
         this.startTimer();
      } else {
         this.stopTimer();
      }
   }

   startTimer = () => {
      if (!this.interval && this.state.time > 0) {
         this.interval = setInterval(() => {
            this.setState(previousState => ({
               time: previousState.time - 1,
            }));
            if (
               !this.state.time ||
               this.props.arSceneNavigator.viroAppProps.won
            ) {
               this.stopTimer();
               this.pushNextScene();
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
   pushNextScene = () => {
      if (!this.props.arSceneNavigator.viroAppProps.won) {
         this.props.sceneNavigator.push({ scene: loseScreen });
      } else {
         this.props.sceneNavigator.push({ scene: winScreen });
      }
   };

   mazeGenerator = () => {
      const render = [];
      let initialX = -5;
      let initialZ = -2;
      const props = this.props.arSceneNavigator.viroAppProps;
      const arr = this.props.arSceneNavigator.viroAppProps.maze;
      for (let i = arr.length - 1; i >= 0; i--) {
         for (let j = 0; j < arr[0].length; j++) {
            initialX += 1;
            let position = [initialX, 0, initialZ];
            if (arr[i][j] === 1 || arr[i][j] === 2) {
               render.push(
                  <Viro3DObject
                     source={require('./res/object_cube/object_cube.vrx')}
                     resources={[
                        require('./res/object_cube/cube_diffuse.png'),
                        require('./res/object_cube/cube_specular.png'),
                     ]}
                     scale={[1.0, 1.0, 1.0]}
                     position={position}
                     type="VRX"
                     key={String.fromCharCode(i) + String.fromCharCode(j)}
                  />,
               );
            } else if (arr[i][j] === 3) {
               render.push(
                  <Viro3DObject
                     source={require('./res/coin/coin.vrx')}
                     resources={[
                        require('./res/coin/coin-texture.jpg'),
                        require('./res/coin/img1.png'),
                        require('./res/coin/img2.png'),
                        require('./res/coin/img3.png'),
                        require('./res/coin/gold.jpg'),
                     ]}
                     scale={[0.18, 0.18, 0.18]}
                     position={position}
                     type="VRX"
                     key={String.fromCharCode(i) + String.fromCharCode(j)}
                     animation={{ name: 'animateCoin', run: true, loop: true }}
                     onClickState={() => {
                        props.incrementCoins(i, j);
                        arr[i][j] = 0;
                     }}
                     onDrag={() => {
                        props.incrementCoins(i, j);
                        arr[i][j] = 0;
                     }}
                  />,
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
            <ViroAmbientLight color="#ffffff" intensity={200} />

            <ViroPortalScene passable={true}>
               <ViroPortal position={[0, 0, -2]} scale={[0.8, 0.8, 0.8]}>
                  <Viro3DObject
                     source={require('./ARPortals/portal_res/portal_archway/portal_archway.vrx')}
                     resources={[
                        require('./ARPortals/portal_res/portal_archway/portal_archway_diffuse.png'),
                        require('./ARPortals/portal_res/portal_archway/portal_archway_normal.png'),
                        require('./ARPortals/portal_res/portal_archway/portal_archway_specular.png'),
                     ]}
                     type="VRX"
                  />
               </ViroPortal>
               <Viro360Image
                  source={require('./ARPortals/portal_res/park.jpg')}
               />
               <ViroText
                  fontSize={100}
                  style={styles.boldFont}
                  position={[0, 1.5, -4]}
                  width={200}
                  height={5}
                  extrusionDepth={8}
                  materials={['frontMaterial', 'backMaterial', 'sideMaterial']}
                  text={String(this.state.time)}
               />
               {this.mazeGenerator()}
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
      diffuseColor: '#3734eb',
   },
   backMaterial: {
      diffuseColor: '#3734eb',
   },
   sideMaterial: {
      diffuseColor: '#2927b3',
   },
});
ViroAnimations.registerAnimations({
   animateCoin: {
      properties: { rotateX: '+=360' },
      easing: 'Linear',
      duration: 6000,
   },
});

module.exports = MainScene;
