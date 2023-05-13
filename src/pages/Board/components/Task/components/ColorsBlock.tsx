import React from 'react';
import { Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { changePalette } from '../../../store/task-slice';

interface IProps {
  bg: string;
  isActive: boolean;
}

export const ColorsBlock = ({ bg, isActive }: IProps) => {
  const dispatch = useDispatch();

  const setActiveColor = () => {
    dispatch(changePalette(bg));
  };
  return (
    <Button
      bg={bg}
      minW="1.8rem"
      p="0"
      h="1.4rem"
      margin="3px"
      _focus={{ outline: 'none', bg: { bg } }}
      _hover={{ bg: { bg } }}
      border={`1px solid ${isActive ? 'black' : 'transparent'}`}
      onClick={setActiveColor}
    />
  );
};

ColorsBlock.propTypes = {
  bg: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};
