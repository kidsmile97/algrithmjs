
// merge sort better version

const merge = (arr, left, mid, right) => {
  let p1 = left;
  let p2 = mid + 1;
  let i = 0;
  const help = [];
  while (p1 <= mid && p2 <= right) {
    help[i++] = arr[p2] < arr[p1] ? arr[p2++] : arr[p1++];
  }
  while(p1 <= mid) {
    help[i++] = arr[p1++]
  }
  while(p2 <= right) {
    help[i++] = arr[p2++]
  }
  for (let j = 0; j < help.length; j++) {
    arr[j + left] = help[j]
  }
}

const process = (arr, left, right) => {
  if (left == right) return;

  const mid = left + ((right - left) >> 1);

  process(arr, left, mid);
  process(arr, mid + 1, right);

  merge(arr, left, mid, right);
}

module.exports = (arr) => {
  if (arr.length < 2) return arr;
  process(arr, 0, arr.length - 1);
  return arr;
}
