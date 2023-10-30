import {Button, GetProps,  styled } from "tamagui";

export const MyButton = styled(Button, {
  name: "MyButton",
  size: "$5",
  alignSelf: "center",
  width: "$18",
});

export type MyButtonProps = GetProps<typeof MyButton>