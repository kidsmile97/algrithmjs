const longestCommonPrefix = require('./最长公共前缀');

test('最长公共前缀', () => {
  let arr = [ 'flower', 'flow', 'flight' ];
  expect(longestCommonPrefix(arr)).toStrictEqual('fl');
  let arr2 = [ 'dog', 'racecar', 'car' ];
  expect(longestCommonPrefix(arr2)).toStrictEqual('');
});
