const uniquePaths = require('./62route');


test('62 路径问题', () => {
  expect(uniquePaths(3, 7)).toBe(28);
  expect(uniquePaths(3, 2)).toBe(3);
  expect(uniquePaths(7, 7)).toBe(924);
});

