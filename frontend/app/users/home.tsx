import { useContext } from "react";
import { useRouter } from "expo-router";
import { Button, Card, H2, H3, Paragraph, XStack } from "tamagui";
import { ScrollView} from 'react-native';
import { Text } from "tamagui";
import { MyStack } from "../../components/MyStack";
import { UserContext } from "../contexts/UserContext";
import categories from '../../data/categories.json'
import { red } from "@tamagui/themes";
export default function User() {
  const router = useRouter();
  const { user, setCategory } = useContext(UserContext);
  const handleCategory = (card) => {
    setCategory(card.categoryId)



  };
  return (
    <MyStack
      // backgroundColor={"gray"}
      theme="light"
      padding="$4"
    >
      <Paragraph>username = {user.name}, pontos = {user.points}, id = {user.id}, 
      current category = {user.currentCategory}, completed = {user.completedCategories}</Paragraph>
      <H2 textAlign="center">
        Olá, aluno {user.name}! Escolha uma trilha abaixo. Sua pontuação atual é: {user.points}
      </H2>
      <XStack
        flex={1}
        justifyContent="center"
      >
              <ScrollView horizontal={true}>

      {categories.map((card, index) => (
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
            <Paragraph>{card.categoryInfo}</Paragraph>
          </Card.Header>
          <Card.Footer 
          padded 
          theme="alt2">
            <XStack flex={1} />
                         {user.completedCategories.includes(card.categoryId) && (
 <Paragraph color="$red10Dark" marginBottom="10">Já realizado</Paragraph>
  )}
      <Button
        borderRadius="$10"
        onPress={() => router.push("users/intro")}
      >
        Começar
      </Button>
      
          </Card.Footer>
          <Card.Background />
        </Card>
      ))}
      </ScrollView>
      </XStack>
    </MyStack>
  );
}
