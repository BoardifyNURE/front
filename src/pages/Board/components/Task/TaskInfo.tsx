import React from 'react';
import PropTypes from 'prop-types';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  Box,
  Flex,
  Textarea,
  Progress,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { taskIcon, descriptionLink, checkIcon } from '@constants/icon-link';
import { ModalCreating } from '@components/Modals/ModalCreating';
import { CREATECHECKLIST_VALUES, CREATETODO_VALUES } from '@utils/validation';
import { getPercent } from '@utils/storeFunc';
import {
  setChecklistId,
  toggleCheckList,
  setDescription,
  addDescription,
  addNewCheckList,
  addNewTodo,
} from '@board/store/task-slice';
import { removeTask } from '@board/store/board-slice';
import {
  isOpenChecklistSelector,
  selectChecklist,
  selectTodo,
  checklistIdSelector,
} from '@store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { IChecklist } from '@page/Board/store/types';
import { ContentItem } from './components/ContentItem';
import { ButtonInTask } from './components/ButtonInTask';
import { Todo } from './components/Todo';
import { ColorPopOver } from './components/ColorPopOver';

interface IProps {
  isOpenTaskInfo: boolean;
  onCloseTaskInfo: VoidFunction;
  taskName: string;
  palette: string;
  description: string;
  taskId: number;
  columnId: number;
  cancelRef: any;
}

export const TaskInfo = ({
  isOpenTaskInfo,
  onCloseTaskInfo,
  taskName,
  palette,
  description,
  taskId,
  columnId,
  cancelRef,
}: IProps) => {
  const dispatch = useDispatch();

  const isOpenCheckList = useSelector(isOpenChecklistSelector);

  const checklist = useSelector(selectChecklist);

  const todo = useSelector(selectTodo);

  const checklistId = useSelector(checklistIdSelector);

  const { isOpen: isOpenTodo, onOpen: onOpenTodo, onClose: onCloseTodo } = useDisclosure();

  const submitFormCheckList = ({ checklistName }: any) => {
    dispatch(addNewCheckList(checklistName));
    dispatch(toggleCheckList());
  };

  const submitFormTodo = ({ todoName }: any) => {
    if (checklistId) {
      dispatch(addNewTodo({ todoName, checklistId }));
      onCloseTodo();
    }
  };

  const actionOnOpenTodoModal = (listId: number) => {
    dispatch(setChecklistId(listId));
    onOpenTodo();
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.currentTarget.value;
    dispatch(setDescription(inputValue));
  };

  const saveChanges = () => {
    dispatch(addDescription());
    onCloseTaskInfo();
  };

  const deleteTodo = (taskId: number, columnId: number) => {
    dispatch(removeTask({ taskId, columnId }));
    onCloseTaskInfo();
  };

  const checked = checklist.reduce((acc: any, checklistItem: any) => {
    const allTodos = checklistItem.todo;
    const checkedTodos = allTodos.filter((todoId: number) => todo[todoId]?.done);
    return { ...acc, [checklistItem.id]: getPercent(allTodos.length, checkedTodos.length) };
  }, {});

  return (
    <>
      <AlertDialog
        isOpen={isOpenTaskInfo}
        leastDestructiveRef={cancelRef}
        onClose={onCloseTaskInfo}
        motionPreset="slideInBottom"
        isCentered
        closeOnOverlayClick={false}
        size="3xl"
      >
        <AlertDialogOverlay />
        <AlertDialogContent fontFamily="Red Hat Display">
          <AlertDialogHeader m="0" p="0">
            <Box
              bg={palette}
              h="7rem"
              color="#868585"
              fontWeight="light"
              fontSize="14px"
              position="relative"
            >
              <ColorPopOver palette={palette} />
            </Box>
          </AlertDialogHeader>
          <AlertDialogCloseButton _focus={{ outline: 'none', border: 'none' }} />
          <AlertDialogBody>
            <Flex justifyContent="space-between">
              <Box width="70%">
                <ContentItem image={taskIcon} text={taskName} height="1.5rem" />
                <ContentItem image={descriptionLink} text="DESCRIPTION" height="1.5rem" />
                <Textarea
                  marginLeft="1.4rem"
                  h="7rem"
                  placeholder="add description..."
                  defaultValue={description}
                  onChange={handleTextareaChange}
                />
                {checklist.map((checklistItem: IChecklist) => (
                  <Box key={checklistItem.id}>
                    <ContentItem
                      image={checkIcon}
                      text={checklistItem.checklistName}
                      paddingLeft="1rem"
                      {...checklist}
                      bg="#E8E8E8"
                      height="1.5rem"
                    />
                    <Box>
                      <Progress
                        value={checked[checklistItem.id]}
                        m="0 0 1rem 4rem"
                        borderRadius="5px"
                        bg={palette}
                        colorScheme="blackAlpha"
                        h="0.5rem"
                        transition="0.2s"
                      />
                      <Text fontSize="14px" position="relative" bottom="27px" left="29px">
                        {checked[checklistItem.id]}%
                      </Text>
                    </Box>

                    {checklistItem.todo.map(
                      (listId) =>
                        todo[listId] && (
                          <Todo key={listId} {...todo[listId]} checklistId={checklistItem.id} />
                        )
                    )}
                    <ButtonInTask
                      buttonName="+ add new todo"
                      buttonBg="none"
                      onClick={() => {
                        actionOnOpenTodoModal(checklistItem.id);
                      }}
                    />
                  </Box>
                ))}
              </Box>
              <Box
                w="25%"
                p="1rem"
                d="flex"
                flexDirection="column"
                justifyContent="center"
                marginTop="7.1rem"
                textAlign="center"
              >
                <ButtonInTask
                  buttonName="Delete card"
                  buttonBg="#E8E8E8"
                  onClick={() => {
                    deleteTodo(taskId, columnId);
                  }}
                />
                <ButtonInTask
                  buttonName="Add checklist"
                  buttonBg="#E8E8E8"
                  onClick={() => dispatch(toggleCheckList())}
                />
                <ButtonInTask buttonName="Save Changes" buttonBg="#D9DFF6" onClick={saveChanges} />
              </Box>
            </Flex>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
      <ModalCreating
        isOpen={isOpenCheckList}
        cancelRef={cancelRef}
        onClose={() => dispatch(toggleCheckList())}
        modalHeader=" Create new checklist"
        initialValues={CREATECHECKLIST_VALUES}
        formSubmit={submitFormCheckList}
        placeholder="Enter checklist name"
        inputName="checklistName"
      />
      <ModalCreating
        isOpen={isOpenTodo}
        onClose={onCloseTodo}
        modalHeader=" Create new todo"
        cancelRef={cancelRef}
        initialValues={CREATETODO_VALUES}
        formSubmit={submitFormTodo}
        placeholder="Enter todo name"
        inputName="todoName"
      />
    </>
  );
};

TaskInfo.propTypes = {
  isOpenTaskInfo: PropTypes.bool.isRequired,
  onCloseTaskInfo: PropTypes.func.isRequired,
  taskName: PropTypes.string.isRequired,
  palette: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  taskId: PropTypes.number.isRequired,
  columnId: PropTypes.number.isRequired,
};
