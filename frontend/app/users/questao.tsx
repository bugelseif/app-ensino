import { useState } from "react";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import {
  Button,
  ButtonText,
  H3,
  Paragraph,
  Progress,
  Text,
  Theme,
  XStack
} from "tamagui";

import { MyStack } from "../../components/MyStack";

export default function Questao() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(10);

  const questions = [
    {
      question: "Pergunta número 1",
      options: ["Um", "Dois", "Três"],
      correctAnswer: "Um"
    },
    {
      question: "Pergunta número 2",
      options: ["aaaaa", "bbbbbbbb", "ccccccccccc"],
      correctAnswer: "bbbbbbbb"
    },
    {
      question: "Pergunta número 3",
      options: ["x", "y", "z"],
      correctAnswer: "z"
    }
  ];

  const handleAnswer = (answer) => {
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        //router.push("users/");
      }
    } else {
      setScore(score - 1);
    }
  };
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
      <Paragraph textAlign="left">
        {questions[currentQuestion].question}
      </Paragraph>
      <Text>Score {score}</Text>

      <Theme name="dark_green_alt1">
        {questions[currentQuestion].options.map((option, index) => (
          <Button
            key={index}
            onPress={() => handleAnswer(option)}
          >
            <ButtonText>{option}</ButtonText>
          </Button>
        ))}
      </Theme>
      <Progress value={76}>
        <Progress.Indicator animation="bouncy" />
      </Progress>
    </MyStack>
  );
}
