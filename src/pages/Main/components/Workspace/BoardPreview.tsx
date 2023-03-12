import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface IProps {
  name?: string;
  id?: string;
}

const defaultProps = {
  name: '',
  id: null,
};

export const BoardPreview = ({ name, id }: IProps) => {
  const link = `/board/${id}`;
  return (
    <Box bg="#92C4C5" d="flex" alignItems="center" justifyContent="center">
      <Box d="flex" textAlign="center" flexDirection="column" width="7rem">
        <Link to={link}>
          <Text color="white" fontSize="xl" fontFamily="'Red Hat Display'">
            {name}
          </Text>
        </Link>
      </Box>
    </Box>
  );
};

BoardPreview.defaultProps = defaultProps;
