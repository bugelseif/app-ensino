import { useRouter } from "expo-router";
import { H2, Image, Input, Theme, YStack } from "tamagui";

import { MyButton } from "../components/MyButton";
import { MyStack } from "../components/MyStack";

export default function Cadastro() {
  const router = useRouter();

  return (
    <MyStack
      // backgroundColor={"gray"}
      theme="light"
    >
      <H2 textAlign="center">Cadastro</H2>
      <Image
        alignSelf="center"
        source={require("../assets/logoifsc.png")}
        style={{ width: 200, height: 250 }}
      />
      <YStack space="$3">
        <Input
          size="$4"
          borderWidth={2}
          placeholder="Nome"
        />
        <Input
          size="$4"
          borderWidth={2}
          placeholder="Usuário"
        />
        <Input
          size="$4"
          borderWidth={2}
          placeholder="Senha"
        />
        <Input
          size="$4"
          borderWidth={2}
          placeholder="Email"
        />

        <Theme name="dark_green_alt1">
          <MyButton onPress={() => router.push("/cadastro")}>
            Criar Usuário
          </MyButton>
        </Theme>
      </YStack>
    </MyStack>
  );
}
