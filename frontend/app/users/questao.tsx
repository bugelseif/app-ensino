import { useContext, useState } from "react";
import { Alert, Pressable } from "react-native";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import {
  Button,
  ButtonText,
  H1,
  H3,
  Paragraph,
  Progress,
  ScrollView,
  Text,
  Theme,
  XStack,
  YStack
} from "tamagui";

import { MyStack } from "../../components/MyStack";
import { UserContext } from "../contexts/UserContext";

export default function Questao() {
  const userContext = useContext(UserContext);
  const { user, setPoints } = userContext;
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    {
      context:
        "Variáveis são blocos de construção fundamentais em programação, essenciais para o armazenamento e manipulação de dados. Elas recebem nomes significativos que representam valores, permitindo que programadores compreendam e gerenciem melhor o fluxo de informações em seus códigos. No entanto, existem algumas normas importantes para nomear variáveis. Geralmente, os nomes de variáveis devem começar com uma letra ou sublinhado (_), seguidos por letras, números ou sublinhados subsequentes. É essencial evitar espaços, caracteres especiais ou palavras reservadas da linguagem de programação, pois esses tipos de nome de variáveis são considerados incorretos e podem resultar em erros de sintaxe. Além disso, nomes de variáveis devem ser descritivos o suficiente para indicar seu propósito, tornando o código mais legível e compreensível. O uso de convenções de nomenclatura, como o estilo CamelCase ou snake_case, também é comum para tornar os nomes de variáveis mais claros e consistentes em todo o código.",
      question:
        "Qual das seguintes afirmações é verdadeira sobre as práticas comuns para nomear variáveis em programação?",
      options: [
        "É recomendado usar espaços nos nomes das variáveis para tornar o código mais legível.",
        "Nomes de variáveis podem começar com qualquer caractere, incluindo números e caracteres especiais.",
        "É aconselhável evitar espaços, caracteres especiais e palavras reservadas, enquanto se utiliza uma convenção de nomenclatura clara."
      ],
      correctAnswer:
        "É aconselhável evitar espaços, caracteres especiais e palavras reservadas, enquanto se utiliza uma convenção de nomenclatura clara."
    },
    {
      context:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nisi velit, pulvinar id diam iaculis, sagittis sollicitudin metus. Nam porttitor purus a lorem semper efficitur. Pellentesque vehicula, felis sed aliquam pulvinar, libero velit malesuada mauris, a volutpat ante eros a ipsum. In hac habitasse platea dictumst. Integer lacinia in nulla sit amet rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vitae ligula efficitur, ornare massa et, aliquet ipsum. Donec sit amet nunc sem. Pellentesque placerat imperdiet purus id auctor. Quisque imperdiet bibendum libero hendrerit faucibus. Aliquam fermentum libero ac nulla interdum interdum nec eu erat. Cras quis nisl tellus. Mauris pretium congue sodales. Praesent lacus ipsum, interdum et felis sed, convallis porttitor ligula. Curabitur quis auctor ante.",
      question: "Pergunta número 2",
      options: ["aaaaa", "bbbbbbbb", "ccccccccccc"],
      correctAnswer: "bbbbbbbb"
    },
    {
      context:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nisi velit, pulvinar id diam iaculis, sagittis sollicitudin metus. Nam porttitor purus a lorem semper efficitur. Pellentesque vehicula, felis sed aliquam pulvinar, libero velit malesuada mauris, a volutpat ante eros a ipsum. In hac habitasse platea dictumst. Integer lacinia in nulla sit amet rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec vitae ligula efficitur, ornare massa et, aliquet ipsum. Donec sit amet nunc sem. Pellentesque placerat imperdiet purus id auctor. Quisque imperdiet bibendum libero hendrerit faucibus. Aliquam fermentum libero ac nulla interdum interdum nec eu erat. Cras quis nisl tellus. Mauris pretium congue sodales. Praesent lacus ipsum, interdum et felis sed, convallis porttitor ligula. Curabitur quis auctor ante.",
      question: "Pergunta número 3",
      options: ["x", "y", "z"],
      correctAnswer: "z"
    }
  ];

  const handleAnswer = (answer) => {
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      const nextQuestion = currentQuestion + 1;
      setScore(score + 1);
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setPoints(user.points + score);
        Alert.alert(
          "Quiz finalizado",
          `${
            user.name
          }, sua pontuação final foi ${score} e será adicionada aos seus pontos, para um total de ${
            user.points + score
          }`
        );
        router.push("users/home");
      }
    }
  };
  return (
    <ScrollView
      flexGrow={1}
      theme="light"
      minHeight="100%"
    >
      <MyStack
        //backgroundColor="gray"
        theme="light"
        justifyContent="space-between"
        space="$3"
        flexGrow={1}
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
        <Text>Pontuação Atual {score}</Text>
        <Paragraph>{questions[currentQuestion].context}</Paragraph>
        <H3 textAlign="left">{questions[currentQuestion].question}</H3>

        <Theme name="dark_green_alt1">
          <Pressable>
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onPress={() => handleAnswer(option)}
                height="$8"
              >
                <ButtonText>{option}</ButtonText>
              </Button>
            ))}
          </Pressable>
        </Theme>
        <Progress value={76}>
          <Progress.Indicator animation="bouncy" />
        </Progress>
      </MyStack>
    </ScrollView>
  );
}
