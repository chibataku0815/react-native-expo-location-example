import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function App() {

  const [locationPermission, setLocationPermission] = useState(false)
  const [isCoords, setCoords] = useState()

  useEffect(() => {
    const getLocationPermissions = async () => {
      let { status } = await Permissions.askAsync( Permissions.LOCATION )
      if ( 'granted' === status ) {
        await setLocationPermission( true );
        let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({})
        setCoords({ latitude, longitude })
      }
    }
    getLocationPermissions()
  }, [])

  return (
    <View style={styles.container}>
      <p>
        {
          locationPermission ? '位置情報へのアクセス許可されました' : '位置情報へのアクセス許可が拒否されました'
        }
      </p>
      <p>
        座標 {JSON.stringify(isCoords)}
      </p>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
