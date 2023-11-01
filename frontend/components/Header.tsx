import React from "react";
import { useState } from 'react'

import { ArrowLeft } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { Button, H3, Paragraph, XStack ,Dialog} from "tamagui";

import { MyStack } from "./MyStack";
import { black } from "../utils/colors";

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
      borderWidth="$1"
    >
      <XStack
        alignItems="center"
        space="$3"
      >
        <Button
          icon={ArrowLeft}
          onPress={router.back}
        />
        <H3
        marginBottom="$1">{categoryTitle}</H3>
      </XStack>

      {categoryInfo.split('nnn').map((paragraph, index) => (
    <Paragraph fontSize="$4" 
    marginStart="$4" 
    textAlign="justify"
    alignSelf="flex-end" 
    borderColor="black"
    borderWidth="$1"

 key={index}>
      {paragraph}
    </Paragraph>
  ))}
    </MyStack>
  );
}