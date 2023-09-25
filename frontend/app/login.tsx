import { useContext, useState } from "react";
import { Alert } from "react-native"; // Import Alert from react-native
import { useRouter } from "expo-router";
import { H2, Image, Input, Theme, YStack } from "tamagui";

import { MyButton } from "../components/MyButton";
import { MyStack } from "../components/MyStack";

import { UserContext } from "./contexts/UserContext";
export default function Login() {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const { user, setUser } = userContext; // Extract user and setUser from the context object
  const [password, setPassword] = useState(""); // Initialize with an empty string

  const validUser = "teste";
  const validPassword = "teste";

  const handleLogin = () => {
    // Check if the provided user and password match the valid ones
    if (user === validUser && password === validPassword) {
      // Navigate to the desired screen when authenticated
      router.push({ pathname: "/users/home" });
    } else {
      // Handle authentication failure (e.g., show an error message)
      Alert.alert("Falha no login", "Usuário ou senha inválidos.");
    }
  };

  return (
    <MyStack
      //backgroundColor={"gray"}
      theme="light"
    >
      <H2 textAlign="center">Login</H2>
      <Image
        alignSelf="center"
        source={require("../assets/logoifsc.png")}
        style={{ width: 200, height: 250 }}
      />
      <YStack space="$3">
        <Input
          size="$4"
          borderWidth={2}
          placeholder="Usuário"
          onChangeText={(value: string) => setUser(value)}
        />
        <Input
          size="$4"
          borderWidth={2}
          placeholder="Senha"
          onChangeText={(value: string) => setPassword(value)} // Update the password state
        />

        <Theme name="dark_green_alt1">
          <MyButton onPress={handleLogin}>Login</MyButton>
        </Theme>
      </YStack>
    </MyStack>
  );
}
