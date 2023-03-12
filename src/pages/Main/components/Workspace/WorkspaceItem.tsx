/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { Grid, GridItem, Text, Box, Link } from '@chakra-ui/react';
import { IBoard } from '@page/Main/store/types';
import { BoardPreview } from './BoardPreview';

interface IProps {
  array?: IBoard[];
  boardTitle: string;
  plus?: string;
  linkText: string;
  toggleModal?: () => void;
}

const defaultProps = {
  array: [],
  plus: '+',
  toggleModal: () => {},
};

export const WorkspaceItem = ({ array, boardTitle, plus, linkText, toggleModal }: IProps) => (
  <GridItem colSpan={2}>
    <Text m="0 2rem 2rem 2rem ">{boardTitle}</Text>
    <Grid templateColumns="repeat(4, 1fr)" gap={4} h="10rem" color="#C0C0C0">
      {array && array.map((elem: IBoard) => <BoardPreview key={elem.id} {...elem} />)}
      <Box bg="#E8E8E8" d="flex" alignItems="center" justifyContent="center">
        <Box d="flex" textAlign="center" flexDirection="column" width="7rem">
          <Link onClick={toggleModal}>
            {plus && <Text>{plus}</Text>}
            <Text>{linkText}</Text>
          </Link>
        </Box>
      </Box>
    </Grid>
  </GridItem>
);

WorkspaceItem.defaultProps = defaultProps;
