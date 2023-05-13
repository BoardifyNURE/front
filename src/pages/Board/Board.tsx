import React, { useEffect } from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { ModalCreating } from '../../components/Modals/ModalCreating';
import { boardBG } from '../../constants/icon-link';
import { isOpenModalSelector } from '../../store/selectors';
import { CREATECOLUMN_VALUES } from '../../utils/validation';
import { toggleModal } from '../Main/store/workspace-slice';
import { BoardContent } from './components/Board/BoardContent';
import { BoardHeader } from './components/Board/BoardHeader';
import { BoardMenu } from './components/Board/BoardMenu';
import { setBoardId, getCurrentItems, addNewColumn, onDragEnd } from './store/board-slice';

export const Board = () => {
  const dispatch = useDispatch();

  const isOpenModal = useSelector(isOpenModalSelector);

  const cancelRef = React.useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id }: any = useParams();

  useEffect(() => {
    dispatch(setBoardId(id));
  }, []);

  useEffect(() => {
    dispatch(getCurrentItems());
  }, [id]);

  const formSubmit = ({ columnName }: any) => {
    dispatch(addNewColumn(columnName));
    dispatch(toggleModal());
  };

  return (
    <Box height="100vh" bgSize="cover" bgImage={boardBG}>
      <BoardHeader onOpen={onOpen} />
      <BoardMenu onClose={onClose} isOpen={isOpen} />
      <DragDropContext onDragEnd={(result: any) => dispatch(onDragEnd(result))}>
        <BoardContent createColumn={() => dispatch(toggleModal())} />
      </DragDropContext>
      <ModalCreating
        isOpen={isOpenModal}
        onClose={() => dispatch(toggleModal())}
        modalHeader=" Create new column"
        initialValues={CREATECOLUMN_VALUES}
        formSubmit={formSubmit}
        cancelRef={cancelRef}
        placeholder="Enter column name"
        inputName="columnName"
      />
    </Box>
  );
};
