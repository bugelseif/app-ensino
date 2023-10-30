import React from "react";
import { useRouter } from "expo-router";
import { Progress, Theme, YStack } from "tamagui";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import Header from "../../components/Header";
import { MyButton } from "../../components/MyButton";
import { MyStack } from "../../components/MyStack";

export default function Intro() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  return (
    <MyStack
      //backgroundColor="gray"
      theme="light"
      justifyContent="space-between"
      space="$2"
      position="relative"
    >
      <Header
        categoryTitle={user.currentCategory.categoryTitle}
        categoryInfo ={user.currentCategory.categoryDetail} 
                />
      <YStack>
        <Theme name="dark_green_alt1">
          <MyButton
            alignSelf="flex-end"
            onPress={() => router.push("userModule/questao")}
          >
            Continuar
          </MyButton>
        </Theme>

      </YStack>
    </MyStack>
  );
}