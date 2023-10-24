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
  const { user, setName } = userContext;
  const [password, setPassword] = useState("");
  const validUser = "teste";
  const validPassword = "teste";

  const handleLogin = () => {
    router.push({ pathname: "/users/home" });

    if (user.name === validUser && password === validPassword) {
      router.push({ pathname: "/users/home" });
    } else {
      Alert.alert("Falha no login", "Usuário ou senha inválidos.");
    }
  };

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
          placeholder="Usuário"
          onChangeText={(value: string) => setName(value)}
        />
        <Input
          size="$4"
          borderWidth={2}
          placeholder="Senha"
          onChangeText={(value: string) => setPassword(value)} 
        />

        <Theme name="dark_green_alt1">
          <MyButton onPress={handleLogin}>Login</MyButton>
        </Theme>
      </YStack>
    </MyStack>
  );
}
