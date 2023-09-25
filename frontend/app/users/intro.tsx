import React from "react";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import {
  Button,
  H2,
  H3,
  Image,
  Input,
  Paragraph,
  Progress,
  Theme,
  XStack,
  YStack
} from "tamagui";

import { MyButton } from "../../components/MyButton";
import { MyStack } from "../../components/MyStack";

export default function Cadastro() {
  const router = useRouter();

  return (
    <MyStack
      //backgroundColor="gray"
      theme="light"
      justifyContent="space-between"
      space="$3"
    >
      <XStack
        alignItems="center"
        space="$3"
      >
        <Button
          icon={ArrowLeft}
          onPress={router.back}
        />
        <H3>Introdução a Programação</H3>
      </XStack>
      <Paragraph textAlign="center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at tempor
        libero. Integer ac tellus mauris. Aenean congue nisl sodales,
        pellentesque lacus nec, porta est. Fusce pulvinar mollis nisi nec
        elementum. Integer tristique turpis et neque blandit bibendum. Donec
        tristique dapibus mi auctor auctor. In quis justo id neque eleifend
        faucibus sit amet vitae enim. Etiam et pretium enim. Sed velit mi,
        cursus sollicitudin quam ut, porttitor commodo augue. Nunc eu velit ex.
        Mauris pulvinar, risus nec hendrerit rhoncus, est ex posuere tellus, non
        viverra urna sem id mi. Aliquam quis massa aliquet, fringilla felis
        vitae, maximus dui. Vivamus dignissim, enim in lobortis pharetra, mauris
        est iaculis ex, eu volutpat felis ex a ipsum. Curabitur non ante tempor,
        semper neque sit amet, iaculis lorem. Cras et luctus erat. Nulla vel
        vulputate felis. Cras eget venenatis nibh.
      </Paragraph>

      <Theme name="dark_green_alt1">
        <MyButton onPress={() => router.push("users/questao")}>
          Continuar
        </MyButton>
      </Theme>
      <Progress value={60}>
        <Progress.Indicator animation="bouncy" />
      </Progress>
    </MyStack>
  );
}
