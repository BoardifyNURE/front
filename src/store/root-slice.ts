import { taskSlice } from '@board/store/task-slice';
import { boardSlice } from '@board/store/board-slice';
import { workspaceSlice } from '@main/store/workspace-slice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { userSlice } from '@auth/store/user-slice';

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
