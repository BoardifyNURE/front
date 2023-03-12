import React from 'react';
import { Button } from '@chakra-ui/react';

interface IProp {
  text: string;
}

export const BtnSubmit = ({ text }: IProp) => (
  <Button
    type="submit"
    bg="none"
    marginTop="2rem"
    fontFamily="Red Hat Display"
    fontStyle="normal"
    fontWeight="normal"
    fontSize="18px"
    lineHeight="24px"
    textDecoration="none"
    color="#6486ff"
  >
    {text}
  </Button>
);
