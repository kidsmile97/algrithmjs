const partition = require("./2.荷兰国旗问题_快排核心思想");

test('荷兰国旗问题', () => {
  expect(partition([9,2,3,5,7,23,5,1,234,2,5], 5)).toStrictEqual([2,3,2,1,5,5,5,234,23,7,9]);
});