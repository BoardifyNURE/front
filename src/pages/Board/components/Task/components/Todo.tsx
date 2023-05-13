import React from 'react';
import PropTypes from 'prop-types';
import { Button, Box, Checkbox, Image, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { deleteIcon } from '../../../../../constants/icon-link';
import { removeTodo, completeTodo } from '../../../store/task-slice';

interface IProps {
  todoName: string;
  done: boolean;
  id: number;
  checklistId: number;
}

export const Todo = ({ todoName, done, id, checklistId }: IProps) => {
  const dispatch = useDispatch();

  const deleteTodo = () => {
    dispatch(removeTodo({ id, checklistId }));
  };
  return (
    <Box m="0 0 1rem 4rem" d="flex" flexDirection="row" justifyContent="space-between">
      <Checkbox
        marginRight="1rem"
        isChecked={done}
        onChange={() => {
          dispatch(completeTodo(id));
        }}
        name="checked"
      />
      <Box>
        <Text marginLeft="-11rem" textAlign="left">
          {todoName}
        </Text>
      </Box>
      <Button h="1.5rem" marginRight="1rem" bg="none" onClick={deleteTodo}>
        <Image src={deleteIcon} h="1.5rem" />
      </Button>
    </Box>
  );
};
