import React from 'react';
import { Flex } from '@chakra-ui/react';

import '@fontsource/red-hat-display';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Workspace } from './components/Workspace/Workspace';

export const Main = () => (
  <>
    <Header />
    <Flex justifyContent="space-around" marginTop="3rem">
      <Sidebar />
      <Workspace />
    </Flex>
  </>
);
