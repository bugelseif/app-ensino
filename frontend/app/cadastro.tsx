import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { Button, H2, Image, Input, Theme, YStack } from "tamagui";
import { useState } from "react";
import { MyButton } from "../components/MyButton";
import { MyStack } from "../components/MyStack";

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  //const cadastrarUsuario = () => {
  //  Alert.alert("log", "teste porra viado q inferno")
  //}

    const cadastrarUsuario = async() => {
      const dados = {
        name: nome,
        email: email,
        point: 0,
        password: senha,
      };
      //router.push("/cadastro")
      fetch('https://ifscomp.onrender.com/users', {
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
          Alert.alert("responseData", responseData.toString())
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
      <H2 textAlign="center">Cadastro</H2>
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
          onChangeText={setNome}
          placeholder="Nome Do Usuário"
        />
        <Input
          size="$4"
          borderWidth={2}
          onChangeText={setEmail}
          placeholder="Email"
        />
        <Input
          size="$4"
          borderWidth={2}
          onChangeText={setSenha}
          placeholder="Senha"
        />
        <Theme name="dark_green_alt1">
          <Button
            size="$5"
            alignSelf="center"
            width="$18"
            onPress={() => cadastrarUsuario()}>
            Criar Usuário
          </Button>
        </Theme>
      </YStack>
    </MyStack >
  );
}
