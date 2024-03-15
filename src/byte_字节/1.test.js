const fn = require('./1.顺时针遍历二维数组.js');

const arr1 = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
]

const arr2 = [
  [1,2,3,4],
  [4,5,6,7],
  [7,8,9,10],
]

const arr3 = [
  [1,2],
  [3,4]
]

const arr4 = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [10,11,12],
]

const arr5 = [[1],[2],[3],[4],[5]]

const arr6 = [[1,2,3,4,5]]


test('顺时针遍历二维数组', () => {
  expect(fn(arr1)).toStrictEqual([1,2,3,6,9,8,7,4,5]);
  expect(fn(arr2)).toStrictEqual([1,2,3,4,7,10,9,8,7,4,5,6]);
  expect(fn(arr3)).toStrictEqual([1,2,4,3]);
  expect(fn(arr4)).toStrictEqual([1,2,3,6,9,12,11,10,7,4,5,8]);
  expect(fn(arr5)).toStrictEqual([1,2,3,4,5]);
  expect(fn(arr6)).toStrictEqual([1,2,3,4,5]);
});

