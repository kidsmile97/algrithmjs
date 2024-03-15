// 选择排序，不稳定，O(n^2)

// 不稳定的过程出现在交换，当前位置与待排序数列中最小值互换后，当前位置的值由于被扔到了后面，就无法保证数据稳定性了

const {swap} = require('../utils/array.js')

module.exports = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    swap(arr, i, minIndex);
  }
  return arr;
}
