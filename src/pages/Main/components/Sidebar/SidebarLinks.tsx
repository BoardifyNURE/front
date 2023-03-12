/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Image, Text } from '@chakra-ui/react';

interface IProps {
  image: string;
  linkPath: string;
  linkText: string;
  logoutUser?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const defaultProps = {
  logoutUser: () => {},
};

export const SidebarLinks = ({ linkPath, image, linkText, logoutUser }: IProps) => (
  <Link to={linkPath} onClick={logoutUser}>
    <Box display="flex" flexDirection="row" margin="1.7rem" alignItems="center">
      <Image src={image} h="1.5rem" marginRight="1rem" />
      <Text w="100%" borderBottom="1px solid black">
        {linkText}
      </Text>
    </Box>
  </Link>
);

SidebarLinks.defaultProps = defaultProps;
