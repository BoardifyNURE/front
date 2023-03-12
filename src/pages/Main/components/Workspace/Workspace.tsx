import React, { useEffect, useRef } from 'react';
import { Grid } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { ModalCreating } from '@reuse_modal/ModalCreating';
import { CREATEBOARD_VALUES } from '@utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { getPersonalBoards, toggleModal, addNewBoard } from '@main/store/workspace-slice';
import { selectPersonalBoards, isOpenModalSelector } from '@store/selectors';
import { WorkspaceItem } from './WorkspaceItem';

export const Workspace = () => {
  const { workspace }: any = useParams();

  const dispatch = useDispatch();

  const cancelRef = useRef();

  const personalBoards = useSelector(selectPersonalBoards);
  const isOpenModal = useSelector(isOpenModalSelector);

  useEffect(() => {
    dispatch(getPersonalBoards());
  }, []);

  const formSubmit = ({ boardName }: any) => {
    dispatch(addNewBoard(boardName));
    dispatch(toggleModal());
  };

  return (
    <Grid bg="rgba(230, 232, 238, 0.38)" w="70%" padding="2rem">
      {['workspace', 'personal'].includes(workspace) && (
        <WorkspaceItem
          array={personalBoards}
          boardTitle="YOUR WORKSPACE"
          plus="+"
          linkText="CREATE NEW"
          toggleModal={() => dispatch(toggleModal())}
        />
      )}
      {['workspace', 'team'].includes(workspace) && (
        <WorkspaceItem
          boardTitle="TEAM WORKSPACE"
          plus="+"
          linkText="CREATE NEW"
          toggleModal={() => dispatch(toggleModal())}
        />
      )}
      {['workspace'].includes(workspace) && (
        <WorkspaceItem boardTitle="GUEST WORKSPACE" linkText="YOU NOT INVITED IN" />
      )}
      <ModalCreating
        isOpen={isOpenModal}
        cancelRef={cancelRef}
        onClose={() => dispatch(toggleModal())}
        modalHeader="Create new board"
        initialValues={CREATEBOARD_VALUES}
        formSubmit={formSubmit}
        placeholder="Enter board name"
        inputName="boardName"
      />
    </Grid>
  );
};
