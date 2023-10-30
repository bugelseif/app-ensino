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
import { white } from "../../utils/colors";

export default function Questao() {
  const { user, setPoints, setCompletedCategories} = useContext(UserContext);
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const progressPercentage = (currentQuestion / questions.length) * 100;


  // ajustar user.id e user.points do login para funcionar
  const handleAnswer = async (answer) => {
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    else{
        Alert.alert("Resposta incorreta", `${questions[currentQuestion].explanation}`);
    }
  
    if (currentQuestion + 1 === questions.length) {
      // Quiz is finished
      const updatedScore = score;
      const updatedPoints = user.points + updatedScore;
  
      // Update the points locally first
      setPoints(updatedPoints);
      /*
      try {
        // Attempt to update points on the server
        await enviarPontos(updatedPoints);

      } catch (error) {
        // Handle server update errors
        Alert.alert("Server error", error.toString());
        console.error(error);
      }
      */
    }
    setCurrentQuestion(currentQuestion + 1); 
  };
  
  const enviarPontos = async (updatedPoints) => {
    const dados = {
      name: "",
      email: "",
      point: updatedPoints,
      password: "",
    }
      fetch(`https://ifscomp.onrender.com/users/${user.id}/point`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // You can add other headers as needed
        },
        body: JSON.stringify(dados),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro de conexão, tente novamente');
        }
        return response.json();
    })
    .then((responseData) => {
      console.log(responseData)
      Alert.alert("Pontos atualizados com sucesso")
      enviarQuizRealizado()


    })
    .catch((error)=>{
      Alert.alert("error", error.toString())
      console.error(error);
    });
    } 
    
    const enviarQuizRealizado = async () => {
      console.log(user.completedCategories)
      {
        if(user.completedCategories.includes(user.currentCategory.categoryId)){
          console.log("Já inclui")
        }
        else{
        const dados = {
          id_user: user.id,
          id_category: user.currentCategory.categoryId
        };
        fetch('https://ifscomp.onrender.com/user_category', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // You can add other headers as needed
          },
          body: JSON.stringify(dados), // Convert the data to JSON string
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Erro de conexão, tente novamente');
            }
            return response.json();
          })
          .then((responseData) => {
            // Handle the response data
            console.log(responseData);
            console.log("cadastrado")
            const newArray = user.completedCategories 
            newArray.push(user.currentCategory.categoryId)
            console.log("New Array" + newArray)
            setCompletedCategories(newArray)
            console.log(user.completedCategories)
            //setCompletedCategories(user.CompletedCategories.push(4))

          })
          .catch((error) => {
           Alert.alert("error", error.toString())
            console.error(error);
          });
      }}
    }

  return (
    <ScrollView
      theme="light"
      minHeight="100%"
      backgroundColor="white"
    >
      <MyStack
        //backgroundColor="gray"
        theme="light"
        justifyContent="space-between"
        space="$3"
        marginTop="$4"
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

       {currentQuestion < questions.length && (
  <>
    <Paragraph fontSize="$5">Pontuação Atual {score}</Paragraph>
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
  </>
)}
{currentQuestion >= questions.length && (
<MyStack>
  <H3>Quiz Finalizado</H3>
  <Paragraph fontSize="$5" marginTop="$3">Sua pontuação final foi de {score}</Paragraph>
  <Theme name="dark_green_alt1">
      <Pressable>
      <Button
            onPress={() => enviarPontos(user.points)}
            height="$10"
            borderWidth={2}
            borderColor="transparent"
            margin="$1"
            marginVertical="$5"
          >
            <Text>Enviar pontuação</Text>
          </Button>
          <Button
            onPress={() => router.push(`/userModule/home`)}
            height="$10"
            borderWidth={2}
            borderColor="transparent"
            margin="$1"
          >
            <Text>Retornar à seleção de quiz</Text>
          </Button>
      </Pressable>
    </Theme>
  </MyStack>
)}
        <Progress marginTop='auto' value={progressPercentage}>
          <Progress.Indicator animation="bouncy" />
        </Progress>
      </MyStack>
    </ScrollView>
  );
}