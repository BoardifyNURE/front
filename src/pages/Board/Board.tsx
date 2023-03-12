import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Box, useDisclosure } from '@chakra-ui/react';
import { BoardHeader } from '@board/components/Board/BoardHeader';
import { boardBG } from '@constants/icon-link';
import { BoardMenu } from '@board_component/Board/BoardMenu';
import { BoardContent } from '@board_component/Board/BoardContent';
import { ModalCreating } from '@components/Modals/ModalCreating';
import { CREATECOLUMN_VALUES } from '@utils/validation';
import { DragDropContext } from 'react-beautiful-dnd';
import { setBoardId, getCurrentItems, addNewColumn, onDragEnd } from '@board/store/board-slice';
import { toggleModal } from '@main/store/workspace-slice';
import { isOpenModalSelector } from '@store/selectors';
import '@fontsource/red-hat-display';
import { useDispatch, useSelector } from 'react-redux';

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
