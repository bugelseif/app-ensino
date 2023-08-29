//import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "expo-router";
import { H2, Image, Input, Theme, YStack } from "tamagui";

import { MyButton } from "../components/MyButton";
import { MyStack } from "../components/MyStack";

import { setName } from "./context/actions";
export default function Login() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(0);
  //const { name } = useSelector((state:) => state.userReducer);
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
          onChangeText={(value) => setUsuario(value)}
          //onChangeText={(value) => dispatch(setName(value))}
        />
        <Input
          size="$4"
          borderWidth={2}
          placeholder="Senha"
        />

        <Theme name="dark_green_alt1">
          <MyButton
            onPress={() =>
              router.push({
                pathname: "/users/testeuser",
                params: { usuario: usuario }
              })
            }
          >
            Login
          </MyButton>
        </Theme>
      </YStack>
    </MyStack>
  );
}
