import { history } from '../constants/history';

export const reorder = (list: number[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);

  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const getPercent = (countOfAllElem: number, countOfElem: number) => {
  if (!countOfAllElem || !countOfElem) return 0;

  return Math.round((countOfElem * 100) / countOfAllElem);
};

export const replaceUrl = (path: string) => {
  history.replace(path, false);
};

export const pushUrl = (path: string) => {
  history.push(path);
};
