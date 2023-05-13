import React from 'react';
import { Box, Text, Link, useDisclosure } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';

import { TaskInfo } from './TaskInfo';
import { setCurrentTaskId } from '../../store/board-slice';
import { setTaskId, getCurrentCheckList } from '../../store/task-slice';

interface IProps {
  taskName: string;
  id: number;
  palette: string;
  index: number;
  description: string;
  columnId: number;
}

export const TaskPreview = ({ taskName, id, palette, index, description, columnId }: IProps) => {
  const dispatch = useDispatch();

  const cancelRef = React.useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getTaskId = () => {
    dispatch(setCurrentTaskId(id));
    dispatch(setTaskId(id));
  };
  const onClick = () => {
    dispatch(getCurrentCheckList());
    onOpen();
  };

  return (
    <>
      <Draggable draggableId={`task-${id}`} index={index}>
        {(provided) => (
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            <Link onMouseDown={getTaskId} onClick={onClick}>
              <Box bg="#EEEEEE" textAlign="center" marginBottom="1rem" fontFamily="Red Hat Display">
                <Box bg={palette} h="2rem" />
                <Text p="1rem">{taskName}</Text>
              </Box>
            </Link>
          </div>
        )}
      </Draggable>
      <TaskInfo
        isOpenTaskInfo={isOpen}
        onCloseTaskInfo={onClose}
        taskName={taskName}
        cancelRef={cancelRef}
        taskId={id}
        columnId={columnId}
        description={description}
        palette={palette}
      />
    </>
  );
};
