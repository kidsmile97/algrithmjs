
const getRandArr = (len, max) => {
  let _len = typeof len === 'number' ? len : Math.round(Math.random() * 1000);
  let _max = max || 100000000;
  let arr = new Array(_len);
  for (let i = 0; i < _len; i++) {
    arr[i] = Math.round(Math.random() * _max)
  }
  return arr;
}

const clone = (arr) => {
  return arr.map((item) => item);
}

const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// 当 i，j 不相等时可用，相等时会导致交换位置的两者都变为 0
const swap_diff = (arr, i, j) => {
  arr[i] = arr[i] ^ arr[j];
  arr[j] = arr[i] ^ arr[j];
  arr[i] = arr[i] ^ arr[j];
}

const getMNArr = (m, n) => {
  const arr = new Array(m);
  for (let i = 0; i < m; i++) {
    arr.push(getRandArr(n))
  }
  return arr;
}

const sortFn = (a, b) => a - b;

const arrayify = (linkedList) => {
  let res = [];
  let temp = linkedList;
  while(temp.next) {
    temp = temp.next;
    res.push(temp.value);
  }
  return res;
}

module.exports = {
  getRandArr,
  swap,
  swap_diff,
  clone,
  getMNArr,
  sortFn,
  arrayify,
}
