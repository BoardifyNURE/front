import React from 'react';
import { Image, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface IProps {
  path: string;
  onClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
  altImage: string;
  image: string;
}

const defaultProps = {
  onClick: () => null,
};

export const BoardHeaderIcons = ({ path, onClick, altImage, image }: IProps) => (
  <Link to={path}>
    <Button onClick={onClick} bg="none" outline="none" _hover={{ bg: 'none' }}>
      <Image h="1.7rem" alt={altImage} src={image} />
    </Button>
  </Link>
);

BoardHeaderIcons.defaultProps = defaultProps;
