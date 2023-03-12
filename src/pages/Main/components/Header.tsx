import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Center, Image, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { homeIcon } from '@constants/icon-link';
import { CreateNewBoardButton } from '@components/Buttons/CreateNewBoardButton';
import { BtnProfile } from '@reuse_button/BtnProfile';
import { ownerIdSelector } from '@store/selectors';
import { toggleModal } from '@main/store/workspace-slice';

export const Header = () => {
  const dispatch = useDispatch();

  const ownerId = useSelector(ownerIdSelector);
  const link = `/user/${ownerId}`;

  return (
    <Box bg="#D9DFF6" w="100%" _active={{ border: 'none' }} color="#6486FF" padding="0">
      <Grid templateColumns="repeat(3, 4fr)" gap={3}>
        <Box display="flex" alignItems="center" h="3.3rem">
          <Box
            h="1.7rem"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-evenly"
            marginLeft="1.3rem"
            width="100%"
          >
            <Link to="/workspace">
              <Image h="1.7rem" alt="home-icon" src={homeIcon} />
            </Link>
          </Box>
        </Box>
        <Center>
          <Text color="black" fontFamily="'Rokkitt', serif" fontWeight=" 600" fontSize="28px">
            TRELLO
          </Text>
        </Center>
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <CreateNewBoardButton onClick={() => dispatch(toggleModal())} />
          <Wrap marginRight="2rem">
            <WrapItem w="10rem" display="flex" justifyContent="space-evenly">
              <BtnProfile link={link} size="2rem" />
            </WrapItem>
          </Wrap>
        </Box>
      </Grid>
    </Box>
  );
};
