import { useContext } from "react";
import { useRouter } from "expo-router";
import { Button, Card, H2, H3, Paragraph, XStack } from "tamagui";

import { MyStack } from "../../components/MyStack";
import { UserContext } from "../contexts/UserContext";

export default function User() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  return (
    <MyStack
      // backgroundColor={"gray"}
      theme="light"
      padding="$8"
    >
      <H2 textAlign="center">
        Olá, aluno {user.name}! Escolha uma trilha abaixo. Sua pontuação atual é: {user.points}
      </H2>

      <XStack
        flex={1}
        justifyContent="center"
      >
        <Card
          theme="blue"
          elevate
          animation="bouncy"
          size="$2"
          width={200}
          height={300}
          scale={0.9}
          pressStyle={{ scale: 0.925 }}
          bordered
        >
          <Card.Header padded>
            <H3>A lógica e os algoritmos</H3>
            <Paragraph>
              Introdução a algoritmos - teoria.{" "}
            </Paragraph>
          </Card.Header>
          <Card.Footer
            padded
            theme="alt2"
          >
            <XStack flex={1} />
            <Button
              borderRadius="$10"
              onPress={() => router.push("users/intro")}
            >
              Começar
            </Button>
          </Card.Footer>
          <Card.Background />
        </Card>

        <Card
          theme="green"
          elevate
          animation="bouncy"
          size="$2"
          width={200}
          height={300}
          scale={0.9}
          pressStyle={{ scale: 0.925 }}
          bordered
        >
          <Card.Header padded>
            <H3>Introdução a Programação</H3>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </Paragraph>
          </Card.Header>
          <Card.Footer
            padded
            theme="alt2"
          >
            <XStack flex={1} />
            <Button
              borderRadius="$10"
              onPress={() => router.push("users/intro")}
            >
              Começar
            </Button>
          </Card.Footer>
          <Card.Background />
        </Card>
      </XStack>
      <XStack
        flex={1}
        justifyContent="center"
      >
        <Card
          theme="red"
          elevate
          animation="bouncy"
          size="$2"
          width={200}
          height={300}
          scale={0.9}
          pressStyle={{ scale: 0.925 }}
          bordered
        >
          <Card.Header padded>
            <H3>Introdução a Programação</H3>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </Paragraph>
          </Card.Header>
          <Card.Footer
            padded
            theme="alt2"
          >
            <XStack flex={1} />
            <Button
              borderRadius="$10"
              onPress={() => router.push("users/intro")}
            >
              Começar
            </Button>
          </Card.Footer>
          <Card.Background />
        </Card>

        <Card
          theme="purple"
          elevate
          animation="bouncy"
          size="$2"
          width={200}
          height={300}
          scale={0.9}
          pressStyle={{ scale: 0.925 }}
          bordered
        >
          <Card.Header padded>
            <H3>Introdução a Programação</H3>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </Paragraph>
          </Card.Header>
          <Card.Footer
            padded
            theme="alt2"
          >
            <XStack flex={1} />
            <Button
              borderRadius="$10"
              onPress={() => router.push("users/intro")}
            >
              Começar
            </Button>
          </Card.Footer>
          <Card.Background />
        </Card>
      </XStack>
    </MyStack>
  );
}
