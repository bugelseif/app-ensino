import React from "react";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { Button, H3, Paragraph, XStack } from "tamagui";

import { MyStack } from "./MyStack";

// eslint-disable-next-line react/prop-types
export default function Header({ categoryTitle, categoryInfo }) {
  const router = useRouter();

  return (
    <MyStack
      //backgroundColor="gray"
      theme="light"
      position="absolute"
      top="0"
    >
      <XStack
        alignItems="center"
        space="$3"
      >
        <Button
          icon={ArrowLeft}
          onPress={router.back}
        />
        <H3>{categoryTitle}</H3>
      </XStack>
      <Paragraph textAlign="center">{categoryInfo}</Paragraph>
    </MyStack>
  );
}
