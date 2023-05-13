import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import { userSlice } from '../pages/Auth/store/user-slice';
import { boardSlice } from '../pages/Board/store/board-slice';
import { taskSlice } from '../pages/Board/store/task-slice';
import { workspaceSlice } from '../pages/Main/store/workspace-slice';

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  workspace: workspaceSlice.reducer,
  board: boardSlice.reducer,
  task: taskSlice.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
