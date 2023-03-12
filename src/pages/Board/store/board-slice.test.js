import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { reorderQuoteMap } from './helpers';
import reducer, { setBoardId, setCurrentTaskId, getColumns, getTasks } from './board-slice';

jest.unmock('axios');

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mock = new MockAdapter(axios);
const store = mockStore();

describe('test for board store', () => {
  beforeEach(() => {
    store.clearActions();
  });
  it('should reorder for dnd task in different column', () => {
    const quoteMap = { 1: [1, 2], 2: [3, 4], 3: [5, 6] };
    const source = { index: 1, droppableId: 'task-1' };
    const destination = { droppableId: 'task-3', index: 0 };

    expect(reorderQuoteMap(quoteMap, source, destination)).toEqual({
      1: [1],
      2: [3, 4],
      3: [2, 5, 6],
    });
  });

  it('should set board id', () => {
    const previousState = {
      boardId: null,
    };

    expect(reducer(previousState, setBoardId(1))).toEqual({ boardId: 1 });
  });
  it('should set current task id', () => {
    const previousState = {
      currentTaskId: null,
    };

    expect(reducer(previousState, setCurrentTaskId(1))).toEqual({ currentTaskId: 1 });
  });
  it('should get columns', () => {
    mock.onGet('/columns?&boardId=1').reply(200, {
      response: [{ boardName: 'wewe', type: 'personal', columns: [2, 1], ownerId: 1, id: 1 }],
    });

    store.dispatch(getColumns(1)).then(() => {
      const expectedActions = {
        payload: {
          columnName: 'text',
          boardId: 1,
          tasks: [3],
          id: 2,
        },
      };
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should get tasks', () => {
    mock.onGet('/tasks?&boardId=1').reply(200, {
      response: [
        {
          taskName: 'f',
          description: 'fgf',
          boardId: 1,
          palette: '#A4B5F1',
          columnId: 1,
          id: 2,
        },
      ],
    });

    store.dispatch(getTasks(2)).then(() => {
      const expectedActions = {
        payload: {
          taskName: 'f',
          description: 'fgf',
          boardId: 1,
          palette: '#A4B5F1',
          columnId: 1,
          id: 2,
        },
      };
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should get current column', () => {
    mock.onGet('/columns?&id=2').reply(200, {
      response: [
        {
          taskName: 'f',
          description: 'fgf',
          boardId: 1,
          palette: '#A4B5F1',
          columnId: 1,
          id: 2,
        },
      ],
    });

    store.dispatch(getTasks(2)).then(() => {
      const expectedActions = {
        payload: {
          taskName: 'f',
          description: 'fgf',
          boardId: 1,
          palette: '#A4B5F1',
          columnId: 1,
          id: 2,
        },
      };
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
