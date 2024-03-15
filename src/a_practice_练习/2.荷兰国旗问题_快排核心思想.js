/**

给定一个数组，一个定值 num

使数组左侧数值小于 num，右侧数值大于 num，中间数值等于 num

arr = [9,2,3,5,7,23,5,1,234,2,5]; num = 5

arr = [2,3,2,1,5,5,5,234,23,7,9];
 */

const {swap} = require('../utils/array');

module.exports = (arr, num) => {
  let greaterIndex = arr.length;
  let lessIndex = -1;
  let currentIndex = 0;

  while(currentIndex < greaterIndex){
    if (arr[currentIndex] < num) {
      swap(arr, ++lessIndex, currentIndex++);
    } else if (arr[currentIndex] > num){
      swap(arr, --greaterIndex, currentIndex);
    } else {
      currentIndex++;
    }
  }
  return arr;
}
