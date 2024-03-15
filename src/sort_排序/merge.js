// 归并排序，稳定

/**
  递归实现的归并排序符合 master 公式
  a = 2
  b = 2
  d = 1 => O(N)
=>
  O(N * log N)

  空间复杂度 O(N)
 */

const merge = (mergeLeft, mergeRight) => {
  const result = [];
  let i = 0;
  let j = 0;
  while(i < mergeLeft.length && j < mergeRight.length) {
    if (mergeLeft[i] > mergeRight[j]) {
      result.push(mergeRight[j])
      j++;
    } else {
      result.push(mergeLeft[i]);
      i++;
    }
    if (i >= mergeLeft.length) {
      for (; j < mergeRight.length; j++) {
        result.push(mergeRight[j])
      }
      break;
    }
    if (j >= mergeRight.length) {
      for (; i < mergeLeft.length; i++) {
        result.push(mergeLeft[i])
      }
      break;
    }
  }
  return result;
}

const mergeSort = (arr) => {
  if (arr.length < 2) {
    return arr;
  }

  const mid = arr.length >> 1;

  const mergeLeft = mergeSort(arr.slice(0, mid));
  const mergeRight = mergeSort(arr.slice(mid));

  return merge(mergeLeft, mergeRight);
}

module.exports = mergeSort;