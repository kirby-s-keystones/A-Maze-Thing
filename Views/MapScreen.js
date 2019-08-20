import React, { Component } from 'react';
import { View } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import { mapBox } from '../secrets';

MapboxGL.setAccessToken(mapBox);

const columbusCircleCoordinates = [-73.98197650909422, 40.768793007758816];

export default class MapScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapboxGL.MapView
          ref={c => (this._map = c)}
          style={{ flex: 1 }}
          zoomLevel={15}
          centerCoordinate={columbusCircleCoordinates}
        />
        />
      </View>
    );
  }
}
