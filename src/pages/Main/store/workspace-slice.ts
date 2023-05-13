import { RootState } from '@store/root-slice';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { IWorkspaceState } from './types';
import { supabase } from '../../../data/date-base';

const initialState: IWorkspaceState = {
  isOpenModal: false,
  personalBoards: [],
};

export const getPersonalBoards = createAsyncThunk<any, void, { state: RootState }>(
  'personalBoards',
  async (_, { getState }) => {
    const { ownerId } = getState().user;

    if (ownerId) {
      const { data: Board } = await supabase
        .from('Board')
        .select('*')
        .match({ user_id: ownerId, type: 'personal' });

      return Board;
    }
  }
);

export const addNewBoard = createAsyncThunk<any, string, { state: RootState }>(
  'addNewBoard',
  async (boardName, { getState }) => {
    const { ownerId } = getState().user;

    const { data, error } = await supabase
      .from('Board')
      .insert([{ name: boardName, type: 'personal', user_id: ownerId }]);

    const newBoard = data?.reduce((acc: any, item: any) => item, {});

    return newBoard;
  }
);

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpenModal = !state.isOpenModal;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPersonalBoards.fulfilled, (state, { payload }) => {
      state.personalBoards = payload;
    });
    builder.addCase(addNewBoard.fulfilled, (state, { payload }) => {
      state.personalBoards = [...state.personalBoards, payload];
    });
  },
});
export const { toggleModal } = workspaceSlice.actions;
