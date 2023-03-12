import { reorder } from './storeFunc';

it('reorder', () => {
  expect(reorder([0, 1, 2, 3], 3, 1)).toEqual([0, 3, 1, 2]);
  expect(reorder([0, 1, 2, 3], 1, 3)).toEqual([0, 2, 3, 1]);
});
