
/**
 * 
计数排序

当可以确定数据状况在一定可知的范围内，统计词频直接排序，排序算法可以达到 O(N) 级别

这个 “可知的范围” 是一个可接受的范围，实则就是利用空间换时间的一种做法

 * 
 */

module.exports = (arr) => {
  const countArr = [];
  for (let i = 0; i< arr.length; i++) {
    countArr[arr[i]] = (countArr[arr[i]] || 0) + 1
  }
  let k = 0;
  for (let j = 0; j < countArr.length; j++) {
    if (countArr[j]) {
      let size = countArr[j];
      while(size > 0) {
        arr[k++] = j;
        size--;
      }
    }
  }
  return arr;
}
