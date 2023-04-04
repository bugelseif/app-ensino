import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { get_info } from '/src/services/api.js'

export default function App() { 
  let infos = get_info()
  console.log(infos)

  return(
    <View style={styles.container}>
      <Text>Hello</Text>
      <Text>world</Text>
      <Text>{infos}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
