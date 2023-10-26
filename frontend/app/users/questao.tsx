import { useContext, useState, useEffect } from "react";
import { Alert, Pressable, TouchableOpacity } from "react-native";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import questions from '../../data/questions.json'
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
  const { user, setPoints } = useContext(UserContext);
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  // ajustar user.id e user.points do login para funcionar
  const handleAnswer = async (answer) => {
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
  
    if (isCorrect) {
      setScore(score + 1);
  
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Quiz is finished
        const updatedScore = score + 1;
        const updatedPoints = user.points + updatedScore;
  
        // Update the points locally first
        setPoints(updatedPoints);
  
        try {
          // Attempt to update points on the server
          await enviarPontos(updatedPoints);
          Alert.alert(
            "Quiz finalizado",
            `${
              user.name
            }, sua pontuação final foi ${updatedScore} e foi adicionada aos seus pontos, para um total de ${
              updatedPoints
            }.`
          );
          router.push("users/home");
        } catch (error) {
          // Handle server update errors
          Alert.alert("Server error", error.toString());
          console.error(error);
          router.push("users/home");
        }
      }
    } else {
      // Incorrect answer handling
      Alert.alert(
        "Resposta incorreta",
        `A resposta correta é ${questions[currentQuestion].correctAnswer}`
      );
    }
  };
  
  const enviarPontos = async (updatedPoints) => {
    const dados = {
      name: "",
      email: "",
      point: updatedPoints,
      password: "",
    };
  
    try {
      const response = await fetch(`https://ifscomp.onrender.com/users/${user.id}/point`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // You can add other headers as needed
        },
        body: JSON.stringify(dados),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      // Handle server update errors
      throw error;
    }
  };
  useEffect(() => {
    // This effect runs whenever the 'score' state is updated
    Alert.alert("acerto!", `pontuação atual: ${score}`);
  }, [score]);

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
                height="$10"
                borderWidth={2}
                borderColor="transparent"
                margin="$1"
              >
                <Text>{option}</Text>
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
