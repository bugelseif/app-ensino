import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { Button, H2, Image, Input, Theme, YStack } from "tamagui";
import { useState } from "react";
import { MyButton } from "../../components/MyButton";
import { MyStack } from "../../components/MyStack";

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isValid, setIsValid] = useState(false);

  const cadastrar = () => {
    if (nome === '' || senha === '') {
      Alert.alert("Campos vazios", "Preencha todos os campos e tente novamente.")
    }else {
      validarEmail()
    }
  }

  const validarEmail = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (emailPattern.test(email)) {
      setIsValid(true)
      cadastrarUsuario()
    } else {
      setIsValid(false)
      Alert.alert("Email Inválido", "Utilize um email válido.")
    }
  };
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
          console.log(response.ok)
          console.log(response.status)
          if(response.status==400){
            console.log('entrou aqui')
            throw new Error('Email já está cadastrado')
          }
          if (!response.ok) {
            throw new Error('Erro de conexão, tente novamente');
          }
          return response.json();
        })
        .then((responseData) => {
          // Handle the response data
          Alert.alert("Cadastrado com sucesso", responseData.name.toString())
          router.push("/loginModule/login")
          //console.log(responseData);
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
      <H2 textAlign="center" marginTop="$4">Cadastro</H2>
      <Image
        flex={1}
        alignSelf="center"
        source={require("../../assets/logoifsc.png")}
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
          secureTextEntry={true}
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
            onPress={() => cadastrar()}>
            Criar Usuário
          </Button>
        </Theme>
      </YStack>
    </MyStack >
  );
}