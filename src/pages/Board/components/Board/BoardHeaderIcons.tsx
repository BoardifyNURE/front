/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Button } from '@chakra-ui/react';

interface IProps {
  path: string;

  onClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;

  altImage: string;

  image: string;
}

const defaultProps = {
  onClick: () => {},
};

export const BoardHeaderIcons = ({ path, onClick, altImage, image }: IProps) => (
  <Link to={path}>
    <Button onClick={onClick} bg="none" outline="none" _hover={{ bg: 'none' }}>
      <Image h="1.7rem" alt={altImage} src={image} />
    </Button>
  </Link>
);

BoardHeaderIcons.defaultProps = defaultProps;
