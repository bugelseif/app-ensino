import React from "react";
import { useState } from 'react'

import { ArrowLeft } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { Button, H3, Paragraph, XStack ,Dialog} from "tamagui";

import { MyStack } from "./MyStack";

// eslint-disable-next-line react/prop-types
export default function Header({ categoryTitle, categoryInfo }) {
  const router = useRouter();
  const [open, setOpen] = useState(false)
  const openModal = () => {
    setOpen(true)
  }
  return (
    <MyStack
      //backgroundColor="gray"
      marginTop="$4"
      theme="light"
      position="absolute"
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

      {categoryInfo.split('nnn').map((paragraph, index) => (
    <Paragraph key={index}>
      {paragraph}
    </Paragraph>
  ))}
    </MyStack>
  );
}