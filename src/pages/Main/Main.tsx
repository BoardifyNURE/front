import React from 'react';
import { Workspace } from '@main_component/Workspace/Workspace';
import { Flex } from '@chakra-ui/react';
import '@fontsource/red-hat-display';
import { Header } from '@main_component/Header';
import { Sidebar } from '@main_component/Sidebar/Sidebar';

export const Main = () => (
  <>
    <Header />
    <Flex justifyContent="space-around" marginTop="3rem">
      <Sidebar />
      <Workspace />
    </Flex>
  </>
);
