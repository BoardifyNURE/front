import React from 'react';
import { Button } from '@chakra-ui/react';

interface IProps {
  buttonName: string;
  buttonBg: string;
  onClick: VoidFunction;
}

export const ButtonInTask = ({ buttonName, buttonBg, onClick }: IProps) => (
  <Button
    fontWeight="light"
    borderRadius="none"
    m="0 1rem 1rem 1.5rem"
    h="1.3rem"
    p="5px"
    w="8rem"
    bg={buttonBg}
    onClick={onClick}
  >
    {buttonName}
  </Button>
);
