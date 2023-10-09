import React from "react";
import { useRouter } from "expo-router";
import { Progress, Theme, YStack } from "tamagui";

import Header from "../../components/Header";
import { MyButton } from "../../components/MyButton";
import { MyStack } from "../../components/MyStack";

export default function Cadastro() {
  const router = useRouter();

  return (
    <MyStack
      //backgroundColor="gray"
      theme="light"
      justifyContent="space-between"
      space="$2"
      position="relative"
    >
      <Header
        categoryTitle="Introdução a Programação"
        categoryInfo="A introdução à programação é o ponto de partida para o vasto mundo da computação. Ela é o processo de aprender a linguagem universal dos computadores, permitindo que indivíduos criem, controle e automatizem tarefas com precisão. A programação envolve a escrita de instruções específicas em uma linguagem compreensível pelos computadores, permitindo que eles executem ações complexas. É uma habilidade essencial no mundo moderno, com aplicações em uma variedade de campos, desde o desenvolvimento de software e ciência de dados até a automação industrial e o desenvolvimento de aplicativos móveis. Além disso, a programação oferece a capacidade de transformar ideias em soluções práticas e é um poderoso veículo para a criatividade e a resolução de problemas.   "
      />
      <YStack>
        <Theme name="dark_green_alt1">
          <MyButton
            alignSelf="flex-end"
            onPress={() => router.push("users/questao")}
          >
            Continuar
          </MyButton>
        </Theme>
        <Progress value={10}>
          <Progress.Indicator animation="bouncy" />
        </Progress>
      </YStack>
    </MyStack>
  );
}
