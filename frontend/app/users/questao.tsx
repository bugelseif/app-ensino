import { useContext, useState } from "react";
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
  const userContext = useContext(UserContext);
  const { user, setPoints } = userContext;
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);


  // ajustar user.id e user.points do login para funcionar
  const enviarPontos = async () => {
    const dados = {
      name: "",
      email: "",
      point: user.points + score,
      password: "",
    };
    fetch(`https://ifscomp.onrender.com/users/${user.id}/point`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // You can add other headers as needed
      },
      body: JSON.stringify(dados), // Convert the data to JSON string
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        Alert.alert(
          "Pontuação enviada com sucesso",
          responseData.name.toString()
        );
        router.push("/users/home");
        console.log(responseData);
      })
      .catch((error) => {
        Alert.alert("error", error.toString());
        console.error(error);
      });
  }

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
        // seta pontos no banco
        enviarPontos();
        router.push("users/home");
      }
    }else{
      Alert.alert(
        "Resposta incorreta",
        `A resposta correta é ${questions[currentQuestion].correctAnswer}`
      );
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
