import React from 'react';
import { Grid, Box, Text, Link, Input, Button, useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';

import { BoardColumn } from './BoardColumn';
import { ModalCreating } from '../../../../components/Modals/ModalCreating';
import { selectCurrentBoard, selectBoardColumns } from '../../../../store/selectors';
import { CREATETASK_VALUES } from '../../../../utils/validation';
import { addNewTask, getCurrentColumn } from '../../store/board-slice';

interface IProps {
  createColumn: () => void;
}

export const BoardContent = ({ createColumn }: IProps) => {
  const dispatch = useDispatch();

  const cancelRef = React.useRef();

  const currentBoard = useSelector(selectCurrentBoard);

  const boardColumns = useSelector(selectBoardColumns);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const formSubmit = ({ taskName }: any) => {
    dispatch(addNewTask(taskName));
    onClose();
  };

  const getColumnId = (id: number) => {
    dispatch(getCurrentColumn(id));
    onOpen();
  };

  return (
    <>
      <Droppable droppableId="board" direction="horizontal" type="COLUMN">
        {(provided) => (
          <Grid
            gridGap="15px"
            gridTemplateColumns="repeat(5, 1fr)"
            margin="2rem 0  0 2rem"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {/* {boardColumns &&
              currentBoard.columns.map(
                (id, index) =>
                  boardColumns[id] && (
                    <BoardColumn
                      key={id}
                      {...boardColumns[id]}
                      index={index}
                      id={id}
                      onClick={getColumnId}
                    />
                  )
              )} */}
            {provided.placeholder}
            <Box bg="rgba(221, 221, 221, 0.22)" w="16rem" p="1rem" alignSelf="start">
              <Link onClick={createColumn}>
                <Text color="#555555" textAlign="center">
                  + ADD NEW COLUMN
                </Text>
              </Link>
              <Box display="none" bg="white" p="0.5rem">
                <Input placeholder="Enter name of column" />
                <Button size="xs">fd</Button>
              </Box>
            </Box>
          </Grid>
        )}
      </Droppable>
      <ModalCreating
        isOpen={isOpen}
        onClose={onClose}
        modalHeader="Create new task"
        initialValues={CREATETASK_VALUES}
        formSubmit={formSubmit}
        cancelRef={cancelRef}
        placeholder="Enter task name"
        inputName="taskName"
      />
    </>
  );
};
