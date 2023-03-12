import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Grid,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { ColorsBlock } from './ColorsBlock';

interface IProps {
  palette: string;
}

export const ColorPopOver = ({ palette }: IProps) => {
  const mockColors = [
    '#F1A4A4',
    '#F1DCA4',
    '#CAF1A4',
    '#A0CFB8',
    '#A4E3F1',
    '#A4B5F1',
    '#BDA4F1',
    '#EBA4F1',
  ];
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          position="absolute"
          bottom="0"
          right="0"
          marginRight="0.7rem"
          bg="none"
          fontWeight="light"
          borderRadius="none"
          h="1.3rem"
          p="5px"
          w="8rem"
          outline="none"
          _focus={{ outline: 'none', border: 'none', bg: 'none' }}
        >
          CHANGE COVER
        </Button>
      </PopoverTrigger>
      <PopoverContent w="11rem" marginRight="2rem" paddingTop="1rem">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontSize="10px">CHOOSE YOUR COLOR THEME</PopoverHeader>
        <PopoverBody>
          <Grid templateColumns="repeat(4, 1fr)" marginRight="6rem">
            {mockColors.map((color) => {
              const isActive = color === palette;
              return <ColorsBlock key={color} bg={color} isActive={isActive} />;
            })}
          </Grid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

ColorPopOver.propTypes = {
  palette: PropTypes.string.isRequired,
};
