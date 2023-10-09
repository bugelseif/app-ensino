import { useRouter } from "expo-router";
import { H2, Image, Theme, YStack } from "tamagui";

import { MyButton } from "../components/MyButton";
import { MyStack } from "../components/MyStack";

export default function Home() {
  const router = useRouter();

  return (
    <MyStack theme="light">
      <H2 textAlign="center">Bem-vindo ao appensino.</H2>
      <Image
        alignSelf="center"
        source={require("../assets/logoifsc.png")}
        style={{ width: 200, height: 300 }}
      />
      <YStack space="$3">
        <Theme name="green_alt1">
          <MyButton onPress={() => router.push("/login")}>Login</MyButton>
        </Theme>
        <Theme name="green">
          <MyButton onPress={() => router.push("/cadastro")}>
            Criar Usuário
          </MyButton>
        </Theme>
      </YStack>
    </MyStack>
  );
}
