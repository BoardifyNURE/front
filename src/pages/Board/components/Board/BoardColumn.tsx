import React from 'react';
import { Box, Text, Link } from '@chakra-ui/react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { TaskPreview } from '@page/Board/components/Task/TaskPreview';
import { selectColumnTasks } from '@store/selectors';
import { useSelector } from 'react-redux';

interface IProps {
  columnName: string;

  onClick: (arg0: number) => void;

  index: number;

  id: number;

  tasks: number[];
}

export const BoardColumn = ({ columnName, onClick, index, id, tasks }: IProps) => {
  const columnTasks = useSelector(selectColumnTasks);

  return (
    <Draggable draggableId={`item-${id}`} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Droppable droppableId={`task-${id}`} type="TASK">
            {(providedTasks) => (
              <div {...providedTasks.droppableProps} ref={providedTasks.innerRef}>
                <Box bg="#DDDDDD" w="16rem" p="1rem" alignSelf="start">
                  <Box
                    textAlign="center"
                    fontFamily="Red Hat Display"
                    fontWeight="bold"
                    fontSize="xl"
                    marginBottom="1rem"
                  >
                    {columnName}
                  </Box>

                  {tasks.map(
                    (taskId, taskIndex) =>
                      columnTasks[taskId] && (
                        <TaskPreview
                          key={taskId}
                          {...columnTasks[taskId]}
                          index={taskIndex}
                          id={taskId}
                          columnId={id}
                        />
                      )
                  )}
                  {providedTasks.placeholder}
                  <Box bg="#EEEEEE" textAlign="center" p="0.62rem" fontSize="xs" color="#C4C4C4">
                    <Link onClick={() => onClick(id)}>
                      <Text>+ ADD NEW Task</Text>
                    </Link>
                  </Box>
                </Box>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

// export const dragTasks = (taskId: number, columnTasks: number[]) => (
//   <Droppable droppableId="droppable-tasks">
//     {(provided) => (
//       <div ref={provided.innerRef} {...provided.droppableProps}>
//         <TaskPreview key={taskId} {...columnTasks[taskId]} />
//         {provided.placeholder}
//       </div>
//     )}
//   </Droppable>
// );
