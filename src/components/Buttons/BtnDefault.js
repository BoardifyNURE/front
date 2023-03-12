/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/react';

export const BtnDefault = ({ label, background, onClick, type }) => (
  <Button
    fontWeight="light"
    borderRadius="none"
    m="0 1rem 1rem 1.5rem"
    h="1.3rem"
    p="5px"
    w="8rem"
    bg={background}
    onClick={onClick}
    type={type}
  >
    {label}
  </Button>
);

BtnDefault.propTypes = {
  label: PropTypes.string.isRequired,
  background: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

BtnDefault.defaultProps = {
  background: 'E8E8E8',
  type: 'button',
  onClick: () => {},
};
