/**

快速排序，最差情况排序 O(N^2)，最好情况排序 O(N)

 */

const { swap } = require("../utils/array");

const partition = (arr, left, right) => {
  let less = left - 1;
  let more = right + 1;
  const num = arr[left + Math.floor(Math.random() * (right - left))];
  let i = left;

  while(i < more) {
    if (arr[i] < num) {
      swap(arr, ++less, i++)
    } else if (arr[i] > num) {
      swap(arr, i, --more)
    } else {
      i++;
    }
  }
  return [less, more];
}

const quickSort = (arr, left, right) => {
  if (left < right) {
    const [less, more] = partition(arr, left, right); 
    quickSort(arr, left, less);
    quickSort(arr, more, right);
  }
}

module.exports = (arr) => {
  quickSort(arr, 0, arr.length - 1);
  return arr;
};
