import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  IBoardState,
  IColumn,
  ITask,
  TColumn,
  TTask,
  IAddColumn,
  IRemoveTask,
  IResult,
} from './types';
import { patchBoard, patchColumns, replaceUrl, reorderQuoteMap } from './helpers';
import { httpService } from '../../../api/HttpService';
import { supabase } from '../../../data/date-base';
import { RootState } from '../../../store/root-slice';
import { reorder } from '../../../utils/storeFunc';

const initialState: IBoardState = {
  boardId: null,

  currentBoard: { columns: [] },

  boardColumns: {},

  currentColumn: null,

  columnTasks: {},

  currentTaskId: null,
};

export const getColumns = createAsyncThunk<any, number>('getColumns', async (boardId) => {
  // const currentColumns: IColumn[] = await httpService.get({ path: `/columns?&boardId=${boardId}` });
  // const elem = currentColumns.reduce(
  //   (acc: TColumn, column: IColumn) => ({ ...acc, [column.id]: column }),
  //   {}
  // );
  // return elem;

  const { data } = await supabase.from('Column').select('*').match({ board_id: boardId });
  // const { data } = await supabase.from('Column').select(`name, board_id(name)`);
  console.log(data);

  return data;
});

export const getTasks = createAsyncThunk<ITask[], number>('getTasks', async (boardId) => {
  const currentTasks = await httpService.get({ path: `/tasks?&boardId=${boardId}` });
  return currentTasks.reduce((acc: TTask, task: ITask) => ({ ...acc, [task.id]: task }), {});
});

export const getCurrentColumn = createAsyncThunk<IColumn, number>(
  'getCurrentColumn',
  async (currentColumnId) => {
    const arrayOfColumns = await httpService.get({ path: `/columns?&id=${currentColumnId}` });

    const column = arrayOfColumns.reduce((acc: any, item: IColumn) => item, {});

    return column;
  }
);

export const getCurrentItems = createAsyncThunk<any, void, { state: RootState }>(
  'getCurrentItems',
  async (_, { getState, dispatch }) => {
    const { id } = getState().user;
    const { boardId } = getState().board;

    try {
      // const currentBoard = await httpService.get({
      //   path: `/boards?id=${id}&id=${boardId}`,
      // });
      const { data } = await supabase.from('Board').select('*').match({ user_id: id });

      await dispatch(getColumns(Number(boardId)));
      await dispatch(getTasks(Number(boardId)));
      console.log(data);
      return data;
    } catch {
      replaceUrl('/workspace');
    }
  }
);

export const addNewColumn = createAsyncThunk<IAddColumn | void, string, { state: RootState }>(
  'addNewColumn',
  async (columnName, { getState }) => {
    const { boardId, currentBoard } = getState().board;

    try {
      const newColumn: IColumn = await httpService.post({
        path: '/columns',
        postData: {
          columnName,
          boardId: Number(boardId),
          tasks: [],
        },
      });

      const setColumnArray = [...currentBoard.columns, newColumn.id];

      await patchBoard(boardId, setColumnArray);

      return {
        newColumn,
        setColumnArray,
      };
    } catch {
      replaceUrl('/workspace');
    }
  }
);

export const addNewTask = createAsyncThunk<ITask, string, { state: RootState }>(
  'addNewTask',
  async (taskName, { getState }) => {
    try {
      const { boardId, currentColumn } = getState().board;
      if (currentColumn) {
        const { tasks, id } = currentColumn;
        const newTask = await httpService.post({
          path: '/tasks',
          postData: {
            taskName,
            description: '',
            boardId: Number(boardId),
            palette: '#F1C9A4',
            columnId: id,
          },
        });

        await patchColumns(id, [...tasks, newTask.id]);

        return newTask;
      }
    } catch {
      replaceUrl('/workspace');
    }
  }
);

export const removeTask = createAsyncThunk<
  { [k: string]: ITask },
  IRemoveTask,
  { state: RootState }
>('removeTask', async ({ taskId, columnId }, { getState }) => {
  const { columnTasks } = getState().board;

  await httpService.delete({ path: `/tasks/${taskId}` });

  const newColumnTasks = Object.fromEntries(
    Object.entries(columnTasks).filter((obj: any) => obj[1].id !== taskId)
  );
  const newColumn: any = Object.values(newColumnTasks).filter(
    (columnsItem: any) => columnsItem.id === columnId
  );

  const arrayOfTasks = newColumn[0].tasks.filter((task: number) => task !== taskId);

  await patchColumns(columnId, arrayOfTasks);

  return newColumnTasks;
});

export const onDragEnd = createAsyncThunk<any, IResult, { state: RootState }>(
  'onDragEnd',
  async (result, { getState }) => {
    const {
      boardId,
      currentBoard: { columns },
      boardColumns,
      currentTaskId,
    } = getState().board;

    const { source, destination, type } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const previousOrderId = source.index;
      const newOrderId = destination.index;

      if (type === 'COLUMN') {
        const newColumns = reorder(columns, previousOrderId, newOrderId).map(Number);

        await patchBoard(boardId, newColumns);

        return { type, newColumns };
      }
      if (type === 'TASK') {
        const currentColumnId = Number(source.droppableId.substring(5));

        const newTask = reorder(
          boardColumns[currentColumnId].tasks,
          previousOrderId,
          newOrderId
        ).map(Number);

        await patchColumns(Number(currentColumnId), newTask);

        return { newTask, currentColumnId, type };
      }
    } else {
      const quoteMap = Object.values(boardColumns).reduce(
        (acc: { [key: string]: number[] }, item: IColumn) => ({ ...acc, [item.id]: item.tasks }),
        {}
      );
      const reordered = reorderQuoteMap(quoteMap, source, destination);

      const prevColumnId = Number(source.droppableId.substring(5));
      const nextColumnId = Number(destination.droppableId.substring(5));

      await patchColumns(prevColumnId, reordered[prevColumnId]);
      await patchColumns(nextColumnId, reordered[nextColumnId]);

      await httpService.patch({
        path: `/tasks/${currentTaskId}`,
        postData: {
          columnId: +nextColumnId,
        },
      });

      return { nextColumnId, prevColumnId, reordered, source };
    }
  }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoardId: (state, { payload }) => {
      state.boardId = payload;
    },
    setCurrentTaskId: (state, { payload }) => {
      state.currentTaskId = payload;
    },
    saveChanges: (state, { payload }) => {
      state.columnTasks = { ...state.columnTasks, [payload.taskId]: payload.newTask };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentItems.fulfilled, (state, { payload }) => {
      [state.currentBoard] = payload;
    });
    builder.addCase(getColumns.fulfilled, (state, { payload }) => {
      state.boardColumns = payload;
    });
    builder.addCase(getTasks.fulfilled, (state, { payload }) => {
      state.columnTasks = payload;
    });
    builder.addCase(getCurrentColumn.fulfilled, (state, { payload }) => {
      state.currentColumn = payload;
    });
    builder.addCase(addNewColumn.fulfilled, (state, { payload }) => {
      if (payload) {
        state.boardColumns = { ...state.boardColumns, [payload.newColumn.id]: payload.newColumn };
        state.currentBoard = { ...state.boardColumns, columns: payload.setColumnArray };
      }
    });
    builder.addCase(addNewTask.fulfilled, (state, { payload }) => {
      state.columnTasks = { ...state.columnTasks, [payload.id]: payload };
      if (state.boardColumns && state.currentColumn) {
        state.boardColumns = {
          ...state.boardColumns,
          [state.currentColumn.id]: {
            ...state.currentColumn,
            tasks: [...state.currentColumn.tasks, payload.id],
          },
        };
      }
    });
    builder.addCase(removeTask.fulfilled, (state, { payload }) => {
      state.columnTasks = payload;
    });

    builder.addCase(onDragEnd.fulfilled, (state, { payload }) => {
      if (payload.type === 'COLUMN') {
        state.currentBoard = { ...state.currentBoard, columns: payload.newColumns };
        return;
      }
      if (payload.type === 'TASK') {
        const { currentColumnId, newTask } = payload;
        state.boardColumns = {
          ...state.boardColumns,
          [currentColumnId]: {
            ...state.boardColumns[currentColumnId],
            tasks: newTask,
          },
        };
      } else {
        const { nextColumnId, prevColumnId, reordered } = payload;
        state.boardColumns = {
          ...state.boardColumns,
          [nextColumnId]: {
            ...state.boardColumns[nextColumnId],
            tasks: Object.values(reordered[nextColumnId]),
          },
          [prevColumnId]: {
            ...state.boardColumns[prevColumnId],
            tasks: Object.values(reordered[prevColumnId]),
          },
        };
      }
    });
  },
});

export const { setBoardId, setCurrentTaskId, saveChanges } = boardSlice.actions;
