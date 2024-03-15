// 字符串数组中，元素最长公共前缀

var getCommonPrefix = function(str1, str2) {
  var index = 0;
  var prefix = '';
  while(index < Math.min(str1.length, str2.length)) {
    if (str1[index] === str2[index]) {
      prefix += str1[index];
      index++;
    } else {
      break;
    }
  }
  return prefix;
}

var longestCommonPrefix = function(strs) {
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    prefix = getCommonPrefix(prefix, strs[i]);
    if (prefix === '') {
      break;
    }
  }
  return prefix;
}

module.exports = longestCommonPrefix;
