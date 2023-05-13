import React from 'react';
import { ChakraProvider, Avatar } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { avatar } from '../../constants/icon-link';

interface IProps {
  link: string;
  size?: string;
  margin?: string;
}

const defaultProps = {
  size: '2rem',
  margin: '0',
};

export const BtnProfile = ({ link, size, margin }: IProps) => (
  <ChakraProvider>
    <Link to={link}>
      <Avatar name="name surname" h={size} w={size} src={avatar} margin={margin} />
    </Link>
  </ChakraProvider>
);

BtnProfile.defaultProps = defaultProps;
