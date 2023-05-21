import React from 'react';
import { Flex, Box, Image } from '@chakra-ui/react';

import { diagram, people } from '../../constants/icon-link';
import { SignUpForm } from './components/SingUpForm';

export const SignUp = () => (
  <Flex
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    marginRight="7rem"
    marginLeft="7rem"
  >
    <Box display="flex" w="100%" marginTop="10rem">
      <Box justifySelf="flex-start" alignSelf="flex-start">
        <Image height="22.5rem" alt="diagram" src={diagram} />
      </Box>
      <Box display="flex" justifyContent="center" w="75%">
        <SignUpForm />
      </Box>
    </Box>
    <Box>
      <Image h="25.1rem" alt="people" src={people} />
    </Box>
  </Flex>
);
