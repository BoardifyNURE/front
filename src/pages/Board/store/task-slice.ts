import { RootState } from '@store/root-slice';
import { httpService } from '@api/HttpService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveChanges } from '@board/store/board-slice';
import { ITaskState, IChecklist } from './types';
import { setNum, findNeedIndex } from './helpers';

const initialState: ITaskState = {
  taskId: null,

  checklistId: null,

  isOpenCheckList: false,

  description: '',

  checklist: [],

  todoIdInChecklist: {},

  todo: {},
};

export const addDescription = createAsyncThunk<void, void, { state: RootState }>(
  'addDescription',
  async (_, { getState, dispatch }) => {
    const { taskId, description } = getState().task;

    const newTask = await httpService.patch({
      path: `/tasks/${taskId}`,
      postData: {
        description,
      },
    });

    dispatch(saveChanges({ taskId, newTask }));
  }
);

export const changePalette = createAsyncThunk<void, string, { state: RootState }>(
  'changePalette',
  async (color, { getState, dispatch }) => {
    const { taskId } = getState().task;

    const newTask = await httpService.patch({
      path: `/tasks/${taskId}`,
      postData: {
        palette: color,
      },
    });

    dispatch(saveChanges({ taskId, newTask }));
  }
);

export const getCurrentCheckList = createAsyncThunk<any, void, { state: RootState }>(
  'getCurrentCheckList',
  async (_, { getState }) => {
    const { taskId } = getState().task;

    const getChecklist = await httpService.get({ path: `checklist?taskId=${taskId}` });

    const todoIdInChecklist = Object.values(getChecklist).reduce((acc: any, list: any) => {
      console.log('acc', acc);
      console.log('list', list);
      return { ...acc, [list.id]: list.todo };
    }, []);

    const allTodo = await httpService.get({ path: `/todo` });

    const todo = Object.values(allTodo).reduce(
      (acc: any, list: any) => ({ ...acc, [list.id]: list }),
      []
    );

    return { getChecklist, todoIdInChecklist, todo };
  }
);

export const addNewCheckList = createAsyncThunk<IChecklist, string, { state: RootState }>(
  'addNewCheckList',
  async (checklistName, { getState }) => {
    const { taskId } = getState().task;

    if (taskId) {
      const newCheckList = await httpService.post({
        path: '/checklist',
        postData: {
          checklistName,
          bg: '#F1C9A4',
          todo: [],
          taskId: +taskId,
        },
      });

      return newCheckList;
    }
  }
);

export const addNewTodo = createAsyncThunk<
  any,
  { todoName: string; checklistId: number },
  { state: RootState }
>('addNewTodo', async ({ todoName, checklistId }, { getState }) => {
  const { taskId, todo } = getState().task;

  if (taskId) {
    const newTodo = await httpService.post({
      path: '/todo',
      postData: {
        todoName,
        checklistId,
        taskId: +taskId,
        done: false,
      },
    });

    const arrayOfTodos = { ...todo, [newTodo.id]: newTodo };

    const currentTodos = Object.fromEntries(
      Object.entries(arrayOfTodos).filter((obj: any) => obj[1].checklistId === checklistId)
    );

    const getNum = setNum(currentTodos);

    await httpService.patch({
      path: `/checklist/${checklistId}`,
      postData: {
        todo: [...getNum],
      },
    });

    return { arrayOfTodos, checklistId, newTodo };
  }
});

export const removeTodo = createAsyncThunk<
  any,
  { id: number; checklistId: number },
  { state: RootState }
>('removeTodo', async ({ id, checklistId }, { getState }) => {
  const { checklist, todo } = getState().task;

  await httpService.delete({ path: `/todo/${id}` });

  const newTodos = Object.fromEntries(
    Object.entries(todo).filter((obj) => obj[0] !== id.toString())
  );

  const patchChecklist = Object.fromEntries(
    Object.entries(newTodos).filter((obj: any) => obj[1].checklistId === checklistId)
  );

  const getNum = setNum(patchChecklist);

  await httpService.patch({
    path: `/checklist/${checklistId}`,
    postData: {
      todo: [...getNum],
    },
  });

  const needIndex = findNeedIndex(checklist, checklistId);
  const data = checklist[needIndex].todo.filter((el: any) => el !== id);

  const newCheckList = checklist.map((item: any) =>
    item.id === checklistId ? { ...item, todo: data } : item
  );

  return { newTodos, newCheckList };
});

export const completeTodo = createAsyncThunk<
  { id: number; isChecked: boolean },
  number,
  { state: RootState }
>('completeTodo', async (id, { getState }) => {
  const { todo } = getState().task;

  const isChecked = !todo[id].done;

  await httpService.patch({
    path: `/todo/${id}`,
    postData: {
      done: isChecked,
    },
  });

  return { id, isChecked };
});

export const taskSlice = createSlice({
  name: 'task',

  initialState,

  reducers: {
    setTaskId: (state, { payload }) => {
      state.taskId = payload;
    },

    setChecklistId: (state, { payload }) => {
      state.checklistId = payload;
    },

    toggleCheckList: (state) => {
      state.isOpenCheckList = !state.isOpenCheckList;
    },

    setDescription: (state, { payload }) => {
      state.description = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentCheckList.fulfilled, (state, { payload }) => {
      const { getChecklist, todoIdInChecklist, todo } = payload;

      state.checklist = getChecklist;
      state.todoIdInChecklist = todoIdInChecklist;
      state.todo = todo;
    });

    builder.addCase(removeTodo.fulfilled, (state, { payload }) => {
      const { newTodos, newCheckList } = payload;

      state.todo = newTodos;
      state.checklist = newCheckList;
    });

    builder.addCase(completeTodo.fulfilled, (state, { payload }) => {
      const { id, isChecked } = payload;

      state.todo[id].done = isChecked;
    });

    builder.addCase(addNewCheckList.fulfilled, (state, { payload }) => {
      state.checklist = [...state.checklist, payload];

      state.todoIdInChecklist = {
        ...state.todoIdInChecklist,
        [payload.id]: [],
      };
    });

    builder.addCase(addNewTodo.fulfilled, (state, { payload }) => {
      const { arrayOfTodos, checklistId, newTodo } = payload;

      state.todo = arrayOfTodos;

      state.todoIdInChecklist = {
        ...state.todoIdInChecklist,
        [checklistId]: [...state.todoIdInChecklist[checklistId], newTodo.id],
      };

      const needIndex = findNeedIndex(state.checklist, checklistId);

      state.checklist[needIndex].todo = [...state.checklist[needIndex].todo, newTodo.id];
    });
  },
});

export const { setTaskId, setChecklistId, toggleCheckList, setDescription } = taskSlice.actions;
