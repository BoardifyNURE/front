type BoardTypes = 'personal' | 'team';

export interface IBoard {
  name?: string;
  type?: BoardTypes;
  columns: number[];
  ownerId?: number;
  id?: string;
}

export interface IWorkspaceState {
  isOpenModal: boolean;
  personalBoards: IBoard[];
}
