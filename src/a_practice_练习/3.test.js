const boyerMoore = require("./3.boyer-moore投票算法");

test('荷兰国旗问题', () => {
  expect(boyerMoore([1,3,2,3,3,3,4,3,5,3])).toBe(3);
  expect(boyerMoore([1,2,3,2,1,2,3,1,1,1,3])).toBe(1);
});