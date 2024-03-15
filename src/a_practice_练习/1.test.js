const minSum = require("./1.小和问题_归并排序应用");
const { clone, getRandArr, sortFn } = require('../utils/array.js');

test('小和问题', () => {
  for (let i = 0; i < 1000; i++) {
    let _arr = getRandArr(10,100);
    let _arr_copy = clone(_arr);
    minSum(_arr);
    expect(_arr).toStrictEqual(_arr_copy.sort(sortFn));
  }
  expect(minSum([1,3,2,4,5])).toBe(18);
  expect(minSum([1,3,4,2,5])).toBe(16);
});