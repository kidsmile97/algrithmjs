
/**
 * 基数排序


当数据可以”分部分“进行排序，而且每个部分具有优先级的关系时，可以选择基数排序
假设 N 个数据，数据可以分 K 部分进行排序
复杂度 O(N) * K =》 O(N)

假设学生成绩排序，先按成绩排，然后按年龄，最后按性别（仅举例，无关性别歧视，注释狗头保命！！）

数字排序也一样，从最高位数字大小一直排到最低位，按位排序

 */

const { clone } = require("../utils/array");

// 获取最长数字的位数
const getMaxRadix = (arr) => {
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    const len = String(arr[i]).length;
    max = max < len ? len : max;
  }
  return max;
}

// 获取某个数位上的数字
const getIndexNum = (num, index, length) => {
  let numStr = String(num);
  while(length > numStr.length) {
    numStr = `0${numStr}`;
  }
  return Number(numStr[index]);
}

module.exports = (arr) => {
  const length = getMaxRadix(arr);
  const bucket = new Array(arr.length);

  for (let i = length - 1; i >= 0; i--) {
    const count = new Array(10).fill(0);
    for (let j = 0; j < arr.length; j++) {
      count[getIndexNum(arr[j], i, length)]++;
    }
    for (let k = 1; k < count.length; k++) {
      count[k] += count[k-1];
    }
    for (let m = arr.length - 1; m >= 0; m--) {
      const bucketIndex = (--count[getIndexNum(arr[m], i, length)]);
      bucket[bucketIndex] = arr[m];
    }
    for(let n = 0; n < bucket.length; n++) {
      arr[n] = bucket[n];
    }
  }
  return arr;
}
