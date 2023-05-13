import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Router } from 'react-router-dom';

import '@fontsource/red-hat-display';

import { history } from './constants/history';
import { theme } from './utils/fonts';
import { Routers } from './store/Routers';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router history={history}>
      <Routers />
    </Router>
  </ChakraProvider>
);
