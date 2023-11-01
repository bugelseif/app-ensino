import { useContext } from "react";
import { useRouter } from "expo-router";
import { Button, Card, H2, H3, Paragraph, XStack, YStack } from "tamagui";
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
      <H2 textAlign="center" marginTop="$4">
        Olá, {user.name}! Escolha um dos cards abaixo. 
      </H2>
      <H3 textAlign="center">Sua pontuação atual é: {user.points}</H3>
      <ScrollView horizontal={true}>

      <XStack
        flex={1}
        justifyContent="center"
      >
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
        <Card.Header padded marginTop="$2">
          <H3>{card.categoryTitle}</H3>
          <Paragraph fontSize={15}  >{card.categoryInfo}</Paragraph>
        </Card.Header>
        <Card.Footer 
        padded 
        theme="alt2">
          <YStack>
    <Button
      borderRadius="$10"
      marginLeft="$6"
      marginTop="$4"
      onPress={() => escolherCategoria(card)}
    >
      Começar
    </Button>
    <Paragraph color="blue" 
    marginTop={10}
    marginLeft="$6"
>Trilha completa</Paragraph>
</YStack>
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
        <Card.Header padded marginTop="$2">
          <H3>{card.categoryTitle}</H3>
          <Paragraph>{card.categoryInfo}</Paragraph>
        </Card.Header>
        <Card.Footer 
        padded 
        theme="alt2">
    <Button
      borderRadius="$10"
      marginLeft="$6"
      marginTop="$4"
      marginBottom="$6"
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

      </XStack>
      </ScrollView>
      <Card
      theme="red"
      elevate
      animation="bouncy"
      size="$2"
      width="90%"
      height={250}
      margin="$3"
      scale={0.9}
      pressStyle={{ scale: 0.925 }}
      bordered>
        <Card.Header padded marginTop="$2">
          <H3 textAlign="center">Bibliografia</H3>
          <Paragraph fontSize={12}>PIVA JÚNIOR, D. Algoritmos e programação de computadores. Rio de Janeiro: Elsevier, 2012. 504 p</Paragraph>
          <Paragraph fontSize={12}>BORATTI, Isaias C.; OLIVEIRA, Álvaro B. de. Introdução à programação: algoritmos. 3. ed. Florianópolis: Visual Books, 2013. 182 p.</Paragraph>
          <Paragraph fontSize={12}>LOPES, A. Introdução à programação: 500 algoritmos resolvidos. Rio de Janeiro: Elsevier, 2002. 469 p.</Paragraph>
        </Card.Header>
        <Card.Footer 
        padded 
        theme="alt2">

    
        </Card.Footer>
        <Card.Background />
      </Card>
    </MyStack>
  );
}