import { createSlice } from '@reduxjs/toolkit';

import { IUserState } from './types';
import { UserSanitizedResponse } from '../../../api/types';

const initialState: IUserState = {
  id: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  username: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, { payload }: { payload: UserSanitizedResponse }) => {
      state.id = payload.id;
      state.firstName = payload.first_name;
      state.lastName = payload.last_name;
      state.email = payload.email;
      state.username = payload.username;
    },
    updateUser: (state, { payload }: { payload: Partial<UserSanitizedResponse> }) => {
      if (payload.id) {
        state.id = payload.id;
      }
      if (payload.first_name) {
        state.firstName = payload.first_name;
      }
      if (payload.last_name) {
        state.lastName = payload.last_name;
      }
      if (payload.email) {
        state.email = payload.email;
      }
      if (payload.username) {
        state.username = payload.username;
      }
    },
    logout: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { login, updateUser, logout } = userSlice.actions;
