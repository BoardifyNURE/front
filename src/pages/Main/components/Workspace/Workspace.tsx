import React, { useEffect, useRef } from 'react';
import { Grid } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { WorkspaceItem } from './WorkspaceItem';
import { selectPersonalBoards, isOpenModalSelector } from '../../../../store/selectors';
import { CREATEBOARD_VALUES } from '../../../../utils/validation';
import { getPersonalBoards, addNewBoard, toggleModal } from '../../store/workspace-slice';
import { ModalCreating } from '../../../../components/Modals/ModalCreating';

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
