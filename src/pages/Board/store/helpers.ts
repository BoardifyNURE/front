import { httpService } from '../../../api/HttpService';
import { history } from '../../../constants/history';

export const reorderQuoteMap = (quoteMap: any, source: any, destination: any) => {
  const prevColumnId = source.droppableId.substring(5);
  const nextColumnId = destination.droppableId.substring(5);

  const current = [...quoteMap[prevColumnId]];
  const next = [...quoteMap[nextColumnId]];
  const target = current[source.index];

  current.splice(source.index, 1);
  next.splice(destination.index, 0, target);

  return {
    ...quoteMap,
    [prevColumnId]: current,
    [nextColumnId]: next,
  };
};

export const patchBoard = async (boardId: number | null, newColumn: number[]) => {
  await httpService.patch({
    path: `/boards/${boardId}`,
    postData: {
      columns: newColumn,
    },
  });
};

export const patchColumns = async (columnId: number | null, newTask: number[]) => {
  await httpService.patch({
    path: `/columns/${columnId}`,
    postData: {
      tasks: newTask,
    },
  });
};

export const replaceUrl = (path: string) => {
  history.replace(path, false);
};

export const setNum = (array: any) => Object.keys(array).map(Number);

export const findNeedIndex = (obj: any, param: number) =>
  obj.findIndex(({ id: index }: any) => index === param);
