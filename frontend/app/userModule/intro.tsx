import React from "react";
import { useRouter } from "expo-router";
import { Progress, Theme, YStack, Paragraph, XStack, Button,H3 } from "tamagui";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ArrowLeft } from "@tamagui/lucide-icons";

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
      <XStack
      marginTop="$4"
        alignItems="center"
        space="$3"
      >
        <Button
          icon={ArrowLeft}
          onPress={router.back}
        />
        <H3
        marginBottom="$1">{user.currentCategory.categoryTitle}</H3>
      </XStack>
    <YStack marginBottom="$10" marginLeft="$5">
      
      {user.currentCategory.categoryDetail.split('nnn').map((paragraph, index) => (
    <Paragraph fontSize="$4" 
    textAlign="justify"
    alignSelf="flex-end" 
    width="110%"
    overflow="visible"
    
 key={index}>
      {paragraph}
    </Paragraph>
  ))}
  </YStack>
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