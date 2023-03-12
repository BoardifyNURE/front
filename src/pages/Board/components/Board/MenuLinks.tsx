import React from 'react';
import { Link } from '@chakra-ui/react';

interface IProps {
  linkText: string;
}

export const MenuLinks = ({ linkText }: IProps) => (
  <Link margin="1rem" borderBottom="1px solid black">
    {linkText}
  </Link>
);
