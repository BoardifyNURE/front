import { IBoard } from '../../Main/store/types';

export interface IBoardState {
  boardId: number | null;
  currentBoard: IBoard;
  boardColumns: TColumn;
  currentColumn: IColumn | null;
  columnTasks: TTask;
  currentTaskId: number | null;
}
export interface ITaskState {
  taskId: number | null;
  checklistId: number | null;
  isOpenCheckList: boolean;
  description: string;
  checklist: any;
  todoIdInChecklist: any;
  todo: any;
}

export interface IColumn {
  columnName: string;
  boardId: number | null;
  tasks: number[];
  id: number;
}

export interface ITask {
  taskName: string;
  description: string;
  boardId: number;
  palette: string;
  columnId: number;
  id: number;
}
export interface IChecklist {
  checklistName: string;
  bg: string;
  todo: number[];
  taskId: number;
  id: number;
}

export interface IAddColumn {
  newColumn: IColumn;
  setColumnArray: number[];
}

export interface IResult {
  draggableId: string;
  type: string;
  source: {
    index: number;
    droppableId: string;
  };
  reason: string;
  mode: string;
  destination: {
    droppableId: string;
    index: number;
  };
  combine: null;
}

export interface IRemoveTask {
  taskId: number;
  columnId: number;
}

export type TColumn = {
  [key: number]: IColumn;
};

export type TTask = {
  [key: number]: ITask;
};
