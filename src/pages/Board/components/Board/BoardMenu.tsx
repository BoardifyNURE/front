import React from 'react';
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody } from '@chakra-ui/modal';
import { Flex } from '@chakra-ui/react';
import { MenuLinks } from './MenuLinks';

interface IProps {
  onClose: () => void;
  isOpen: boolean;
}

export const BoardMenu = ({ onClose, isOpen }: IProps) => (
  <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay />
    <DrawerContent fontFamily="Saab">
      <DrawerHeader borderBottomWidth="1px" marginTop="1rem" textAlign="center">
        MENU
      </DrawerHeader>
      <DrawerBody bg="rgba(217, 217, 217, 0.27)">
        <Flex flexDirection="column">
          <MenuLinks linkText="ADD BOARD DESCRIPTION" />
          <MenuLinks linkText="CHANGE BACKGROUND" />
          <MenuLinks linkText="SETTINGS" />
          <MenuLinks linkText="DD MORE USERS" />
        </Flex>
      </DrawerBody>
    </DrawerContent>
  </Drawer>
);
