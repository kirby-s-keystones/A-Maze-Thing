import React, { Component } from 'react';
import {
   AppRegistry,
   Text,
   View,
   StyleSheet,
   PixelRatio,
   TouchableHighlight,
} from 'react-native';

export default class Timer extends Component {
   constructor(props) {
      super(props);
      this.state = { time: 300 };
      this.interval = null;
   }
   startTimer = () => {
      if (!this.interval) {
         this.interval = setInterval(() => this.setState(time--), 1000);
      }
   };
   stopTimer = () => {
      clearInterval(this.interval);
      this.interval = null;
   };
   componentWillUnmount() {
      clearInterval(this.interval);
      this.interval = null;
   }
   render() {
      return (
         <View style={localStyles.container}>
            <TouchableHighlight
               style={localStyles.buttons}
               onPress={this.startTimer}
               underlayColor={'#68a0ff'}
            >
               <Text style={localStyles.buttonText}>Start Timer</Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={localStyles.buttons}
               onPress={this.stopTimer}
               underlayColor={'#68a0ff'}
            >
               <Text style={localStyles.buttonText}>Stop Timer</Text>
            </TouchableHighlight>
            <View>
               <Text style={localStyles.text}>
                  {this.state.time} seconds remaining
               </Text>
            </View>
         </View>
      );
   }
}

const localStyles = StyleSheet.create({
   container: {
      ...StyleSheet.absoluteFillObject,
      alignSelf: 'flex-end',
      marginTop: -5,
      flex: 1,
      flexDirection: 'row',
      opacity: 0.8,
      alignItems: 'center',
      alignContent: 'center',
   },
   buttons: {
      backgroundColor: 'black',
      flex: 0.5,
   },
   buttonText: {
      color: 'white',
      textAlign: 'center',
   },
   text: {
      color: 'white',
      flex: 1,
   },
});
