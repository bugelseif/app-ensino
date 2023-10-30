import { useContext } from "react";
import { useRouter } from "expo-router";
import { Button, Card, H2, H3, Paragraph, XStack } from "tamagui";
import { ScrollView} from 'react-native';
import { Text } from "tamagui";
import { MyStack } from "../../components/MyStack";
import { UserContext } from "../contexts/UserContext";
import categories from '../../data/categories.json'
import { green, red } from "@tamagui/themes";
export default function User() {
  const router = useRouter();
  const { user, setCurrentCategory } = useContext(UserContext);

  const escolherCategoria = (card) => {
    setCurrentCategory(card)
    router.push("/userModule/intro")
  }
  return (
    <MyStack
      // backgroundColor={"gray"}
      theme="light"
      padding="$4"
    >
      <Paragraph>username = {user.name}, pontos = {user.points}, id = {user.id}, completed = {user.completedCategories.toString()}</Paragraph>
      <H2 textAlign="center">
        Olá, {user.name}! Escolha um dos cards abaixo. Sua pontuação atual é: {user.points}
      </H2>
      <XStack
        flex={1}
        justifyContent="center"
      >
              <ScrollView horizontal={true}>
              {categories.map((card, index) => {
  const isCompleted = user.completedCategories.includes(card.categoryId);
  return (
    isCompleted ? (
      <Card key={index}
      theme="green"
      elevate
      animation="bouncy"
      size="$2"
      width={200}
      height={350}
      margin="$3"
      scale={0.9}
      pressStyle={{ scale: 0.925 }}
      bordered>
        <Card.Header padded>
          <H3>{card.categoryTitle}</H3>
          <Paragraph fontSize={15}  marginTop={30}>{card.categoryInfo}</Paragraph>
          <Paragraph color="blue" marginTop={30}>Trilha completa</Paragraph>
        </Card.Header>
        <Card.Footer 
        padded 
        theme="alt2">
    <Button
      borderRadius="$10"
      onPress={() => escolherCategoria(card)}
    >
      Começar
    </Button>
    
        </Card.Footer>
        <Card.Background />
      </Card>


    ) : (


      <Card key={index}
      theme="red"
      elevate
      animation="bouncy"
      size="$2"
      width={200}
      height={350}
      margin="$3"
      scale={0.9}
      pressStyle={{ scale: 0.925 }}
      bordered>
        <Card.Header padded>
          <H3>{card.categoryTitle}</H3>
          <Paragraph>{card.categoryInfo}</Paragraph>
        </Card.Header>
        <Card.Footer 
        padded 
        theme="alt2">
    <Button
      borderRadius="$10"
      onPress={() => escolherCategoria(card)}
    >
      Começar
    </Button>
    
        </Card.Footer>
        <Card.Background />
      </Card>
    )
  );
})}

      </ScrollView>
      </XStack>
    </MyStack>
  );
}