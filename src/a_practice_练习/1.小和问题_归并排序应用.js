/**

关于归并排序思想的应用
归并排序 =》 O(N log N) 级别算法
核心思想是在归并（递归合并）的过程中保留子问题的结果值用于父亲问题的计算

小和问题：数组第 x 位元素，前面所有比自身小的元素的和是小和，所有元素小和的和称之为小和问题

 */

const merge = (arr, left, mid, right) => {
  
  let p1 = left;
  let p2 = mid + 1;
  let i = 0;

  const help = new Array(right - left + 1);

  let sum = 0;

  while(p1 <= mid && p2 <= right) {
    if (arr[p1] < arr[p2]) {
      sum += (arr[p1] * (right - p2 + 1))
      help[i++] = arr[p1++];
    } else {
      help[i++] = arr[p2++];
    }
  }

  while(p1 <= mid) {
    help[i++] = arr[p1++]
  }

  while(p2 <= right) {
    help[i++] = arr[p2++]
  }

  for (let j = 0; j < help.length; j++) {
    arr[left + j] = help[j];
  }

  return sum;
}

const process = (arr, left, right) => {
  if (left == right) return 0;

  const mid = left + ((right-left)>>1);

  let leftSum = process(arr, left, mid);
  let rightSum = process(arr, mid + 1, right);

  return merge(arr, left, mid, right) + leftSum + rightSum;
}

const minSum = (arr) => {
  if (arr.length < 2) return 0;
  return process(arr, 0, arr.length - 1);
}

module.exports = minSum;

