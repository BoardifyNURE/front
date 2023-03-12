import React from 'react';
import { Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { history } from '@constants/history';
import { theme } from '@utils/fonts';
import { Routers } from '@store/Routers';
import '@fontsource/red-hat-display';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router history={history}>
      <Routers />
    </Router>
  </ChakraProvider>
);
