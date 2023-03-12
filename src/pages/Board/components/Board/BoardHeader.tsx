import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { homeIcon, favoriteIcon, menuIcon } from '@constants/icon-link';
import { BtnProfile } from '@reuse_button/BtnProfile';
import { selectCurrentBoard } from '@store/selectors';
import { useSelector } from 'react-redux';
import { BoardHeaderIcons } from './BoardHeaderIcons';

interface IProps {
  onOpen: () => void;
}

export const BoardHeader = ({ onOpen }: IProps) => {
  const currentBoard = useSelector(selectCurrentBoard);

  return (
    <Box bg="rgb(91, 115, 198, 17%)" w="100%" _active={{ border: 'none' }} padding="1rem" d="flex">
      <Box w="88%">
        <Text fontFamily="Saab" fontSize="22px" marginLeft="8rem" color="#B2B2B2">
          {currentBoard && currentBoard.name}
        </Text>
      </Box>
      <Box w="12%" d="flex" justifyContent="space-around">
        <BoardHeaderIcons path="/workspace" altImage="home-icon" image={homeIcon} />
        <BoardHeaderIcons path="#" altImage="favorite-icon" image={favoriteIcon} />
        <BtnProfile link="/" size="2rem" margin="0.3rem 0 0 0" />
        <BoardHeaderIcons path="#" onClick={onOpen} altImage="menu" image={menuIcon} />
      </Box>
    </Box>
  );
};
