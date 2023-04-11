import React, { useState } from 'react';

export let get_info = () => {
    const [infos, setInfos] = useState(null)

    const endpoint = "https://testeapiensino.onrender.com/users/" // verificar local da API

    fetch(endpoint)
    .then(response => response.json())
    .then(json =>{
        let nome = " "
        for (let i = 0; i<json.length; i++) {
            console.log("for")
            nome += json[i].name + " "
        }
        console.log("nomes:"+ nome)
        setInfos(nome)
    })
    .catch((err) => console.error(err))
  return infos
}