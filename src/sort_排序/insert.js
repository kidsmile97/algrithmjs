const {swap_diff} = require('../utils/array');

module.exports = (arr) => {
  for(let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j-1]) {
        swap_diff(arr, j, j-1)
      }
    }
  }
  return arr;
}
