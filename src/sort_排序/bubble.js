const { swap_diff } = require('../utils/array.js')

module.exports = (arr) => {
  for(let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        swap_diff(arr, j, j + 1)
      }
    }
  }
  return arr;
}
