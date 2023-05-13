import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

interface IProps {
  image: string;
  text: string;
  bg?: string;
  paddingLeft?: string;
  height: string;
}

export const ContentItem = ({ image, text, bg, paddingLeft, height }: IProps) => (
  <Box display="flex" flexDirection="row" margin="1.7rem" alignItems="center">
    <Image src={image} h={height} marginRight="1rem" />
    <Text w="10rem" bg={bg} paddingLeft={paddingLeft} marginBottom="-0.3rem">
      {text}
    </Text>
  </Box>
);
