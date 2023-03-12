import React from 'react';
import { LoginForm } from '@auth/components/LoginForm';
import { Flex, Box, Image } from '@chakra-ui/react';

export const Login = () => (
  <Flex flexDirection="column" marginRight="7rem" marginLeft="7rem">
    <Box alignSelf="flex-end" width="22rem" height="12rem">
      <Image
        width="22rem"
        height="22rem"
        alt="spider"
        src="https://blush.design/api/download?shareUri=_Bf2FGB6ei&w=800&h=800&fm=png"
      />
    </Box>
    <Box alignSelf="center">
      <LoginForm />
    </Box>
    <Box alignSelf="flex-start">
      <Image
        h="25.1rem"
        alt="people"
        src="https://blush.design/api/download?shareUri=P8KglgCq8yF0xvKe&c=Hair_0%7Ead3409-0.7%7Ead3409-0.8%7E372310_Skin_0%7Ef2e4c6-0.7%7Ef2e4c6-0.8%7Ec3986a&w=800&h=800&fm=png"
      />
    </Box>
  </Flex>
);
