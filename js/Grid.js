import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class Grid extends Component {
   generateGrid = arr => {
      const rtrnArr = [];
      for (let i = 0; i < arr.length; i++) {
         for (let j = 0; j < arr[0].length; j++) {
            let color;
            switch (arr[i][j]) {
               case 0:
                  color = 'lightgrey';
                  break;
               case 1:
                  color = 'black';
                  break;
               case 2:
                  color = 'red';
                  break;
               default:
                  color = 'lightgrey';
                  break;
            }
            rtrnArr.push(
               <View
                  style={{
                     flex: 0.1,
                     backgroundColor: { color },
                     borderWidth: 0.5,
                     borderColor: 'black',
                  }}
               />,
            );
         }
      }
      return rtrnArr;
   };
   render() {
      const arr = new Array(10);
      for (let i = 0; arr.length; i++) {
         arr[i] = [];
      }
      for (let i = 0; arr.length; i++) {
         for (let j = 0; j < arr[0].length; j++) {
            arr[i][j] = 0;
         }
      }

      return (
         <View style={{ flex: 1, flexDirection: 'row' }}>
            {this.generateGrid(arr)}
         </View>
      );
   }
}
