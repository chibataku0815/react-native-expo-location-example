import * as Permissions from 'expo-permissions';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function App() {

  const [locationPermission, setLocationPermission] = useState(false)

  useEffect(() => {
    const getLocationPermissions = async () => {
      let { status } = await Permissions.askAsync( Permissions.LOCATION )
      if ( 'granted' === status ) {
        setLocationPermission( true );
      }
    }
    getLocationPermissions()
  }, [])

  return (
    <View style={styles.container}>
      {
        locationPermission ? '位置情報へのアクセス許可されました' : '位置情報へのアクセス許可が拒否されました'
      }
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
