import React, { useState } from 'react';

export let get_info = () => {
    const [infos, setInfos] = useState(null)

    const endpoint = "http://127.0.0.1:8000/users/" // verificar local da API

    fetch(endpoint)
    .then(response => response.json())
    .then(json =>{
        if(!response.ok){
            throw new Error('falhou')
        }
        console.log(json)
        let nome = " "
        for (let i = 0; i<json.length; i++) {
            console.log("for")
            nome += json[i].name + " "
        }
        console.log("nomes:"+ nome)
        setInfos(nome)
    })
    .catch(() =>
    Alert.alert('Erro' )
  )
  return infos
}