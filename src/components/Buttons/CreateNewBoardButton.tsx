import React from 'react';
import { Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';

interface IProps {
  onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}

export const CreateNewBoardButton = ({ onClick }: IProps) => (
  <Button onClick={onClick} bg="rgba(100, 134, 255, 0.17)" borderRadius="15px" height="2rem">
    Create
  </Button>
);

CreateNewBoardButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
