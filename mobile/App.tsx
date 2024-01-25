import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { Archivo_400Regular, Archivo_700Bold } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins';

import AppStack from './src/Routes/AppStack';


export default function App() {
  let [fontLoaded] = useFonts({
    Archivo_400Regular, Archivo_700Bold,
    Poppins_400Regular, Poppins_600SemiBold
  })
  if (!fontLoaded) {
    return <AppLoading />
  } else {

    return (
      <>
        <AppStack />
        <StatusBar style="light" />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
