import { useContext, useState } from "react";
import { Alert } from "react-native"; 
import { useRouter } from "expo-router";
import { H2, Image, Input, Theme, YStack } from "tamagui";

import { MyButton } from "../components/MyButton";
import { MyStack } from "../components/MyStack";

import { UserContext } from "./contexts/UserContext";
export default function Login() {
  const router = useRouter();
  const userContext = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const verificarUsuario = async() => {
    const dados = {
      email: email,
      password: senha,
    };
    //router.push("/cadastro")
    fetch('https://ifscomp.onrender.com/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You can add other headers as needed
      },
      body: JSON.stringify(dados), // Convert the data to JSON string
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        // Handle the response data
        Alert.alert("Login com sucesso", responseData.name.toString())
        router.push("/users/home")
        console.log(responseData);
      })
      .catch((error) => {
        Alert.alert("error", error.toString())
        console.error(error);
      });
  }


  return (
    <MyStack
      theme="light"
    >
      <H2 textAlign="center">Login</H2>
      <Image
        flex={1}
        alignSelf="center"
        source={require("../assets/logoifsc.png")}
        style={{ width: 100, height: 150 }}
        resizeMode="contain"
      />
      <YStack space="$3">
        <Input
          size="$4"
          borderWidth={2}
          placeholder="Email"
          onChangeText={(value: string) => setEmail(value)}
        />
        <Input
          size="$4"
          borderWidth={2}
          placeholder="Senha"
          onChangeText={(value: string) => setSenha(value)} 
        />

        <Theme name="dark_green_alt1">
          <MyButton onPress={verificarUsuario}>Login</MyButton>
        </Theme>
      </YStack>
    </MyStack>
  );
}
