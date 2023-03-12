import { history } from '@constants/history';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../../data/date-base';
import { IUserState, ISingUpProps, ILoginProps } from './types';

const initialState: IUserState = {
  token: null,

  isLogin: false,

  ownerId: null,

  isLoading: false,
};

export const signupUser = createAsyncThunk<void, ISingUpProps, { rejectValue: string }>(
  'singup',
  async ({ passwordConfirm, setFieldError, ...userData }, { rejectWithValue }) => {
    try {
      const { user } = await supabase.auth.signUp(userData);

      if (user) {
        await supabase
          .from('User')
          .insert([{ id: user.id, email: userData.email, full_name: userData.fullName }]);

        localStorage.setItem('id', user.id);

        history.push('/login');
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        setFieldError('password', error.response.data);

        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const loginUser = createAsyncThunk<any, ILoginProps, { rejectValue: string }>(
  'login',
  async ({ setFieldError, ...userData }, { rejectWithValue }) => {
    try {
      const { user, session } = await supabase.auth.signIn(userData);

      if (user) {
        localStorage.setItem('id', user.id);

        history.push('/workspace');

        return { user, session };
      }
    } catch (e: any) {
      if (e.response.status === 400) {
        setFieldError('password', e.response.data);
        return rejectWithValue(e.response.data);
      }
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      state.isLogin = false;
      state.ownerId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(signupUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      const { user, session } = payload;
      state.token = session.access_token;
      state.ownerId = user.id;
      state.isLogin = true;
      state.isLoading = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { logoutUser } = userSlice.actions;
