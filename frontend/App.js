import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

export default function App() { 
  const [infos, setInfos] = useState(null)
  
  const get_info = () => {
    const endpoint = "http://127.0.0.1:8000/" // verificar local da API

    fetch(endpoint)
    .then(resposta => resposta.json())
    .then(json =>{
      console.log(json)
      const nome = json.message
      setInfos(nome)
  })
  .catch(() =>
    Alert.alert('Erro')
  )}

  get_info()
  
  console.log(infos)
  return(
    <View style={styles.container}>
      <Text>Hello</Text>
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


