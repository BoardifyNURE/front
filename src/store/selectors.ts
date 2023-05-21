import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './root-slice';

export const authSelector = (state: RootState) => state.user.id;
export const ownerIdSelector = (state: RootState) => state.user.id;

export const isOpenModalSelector = (state: RootState) => state.workspace.isOpenModal;
export const isOpenChecklistSelector = (state: RootState) => state.task.isOpenCheckList;
export const checklistIdSelector = (state: RootState) => state.task.checklistId;

const personalBoardsSelector = (state: RootState) => state.workspace.personalBoards;
const currentBoardSelector = (state: RootState) => state.board.currentBoard;
const boardColumnsSelector = (state: RootState) => state.board.boardColumns;
const columnTasksSelector = (state: RootState) => state.board.columnTasks;
const checklistSelector = (state: RootState) => state.task.checklist;
const todoSelector = (state: RootState) => state.task.todo;

export const selectPersonalBoards = createSelector(personalBoardsSelector, (boards) => boards);
export const selectCurrentBoard = createSelector(currentBoardSelector, (board) => board);
export const selectBoardColumns = createSelector(boardColumnsSelector, (columns) => columns);
export const selectColumnTasks = createSelector(columnTasksSelector, (tasks) => tasks);
export const selectChecklist = createSelector(checklistSelector, (checklist) => checklist);
export const selectTodo = createSelector(todoSelector, (todo) => todo);
