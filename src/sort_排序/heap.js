/**

堆：一种特殊的二叉树结构数据
（1）是一颗顺序存储的完全二叉树
（2）根节点都大于（或都小于）子节点，称之为大堆（小堆）

堆排序，最大堆、最小堆性质进行排序的算法

堆的几个重要属性、方法

1. size 通过 size 维护堆结构的数据边界（而不是实际存储数组的内容）
2. heapInsert 插入
3. heapify 堆化

 */

const { swap } = require("../utils/array");

// 最大堆

// 向上堆化
const heapInsert = (arr, index) => {
  let child = index;
  let fatherIndex = (index - 1) < 0 ? 0 : (index - 1) >> 1;
  while(fatherIndex >= 0 && arr[fatherIndex] < arr[child]) {
    swap(arr, fatherIndex, child);
    child = fatherIndex;
    fatherIndex = (fatherIndex - 1) >> 1;
  }
}

// 向下堆化
const heapify = (arr, index, size) => {
  let fatherIndex = index;
  let left = index * 2 + 1;
  while(left < size) {
    const right = left + 1;
    let largestIndex = right < size && arr[right] > arr[left] ? right : left;
    if (arr[largestIndex] <= arr[fatherIndex]) {
      break;
    }
    swap(arr, largestIndex, fatherIndex);
    fatherIndex = largestIndex;
    left = largestIndex * 2 + 1;
  }
}

const heapSort = function(arr) {
  let size = arr.length;
  // 数组按位逐一堆化的过程（使用 heapInsert，复杂度 O(N*logN) ），已测试通过
  // for (let i = 0; i < size; i++) {
  //   heapInsert(arr, i);
  // }
  // 数组整体一起堆化的过程（使用 heapify，复杂度 O(N) ）
  for(let i = arr.length-1; i >= 0; i--) {
    heapify(arr, i, arr.length);
  }
  // 模拟出堆过程进行排序
  while(size > 1) {
    swap(arr, 0, --size);
    heapify(arr, 0, size);
  }
  return arr;
}

module.exports = heapSort;


