/**
 * 
 * 给定一个长度 3 以上的数组，求任意三个数最大乘积的大小
 * 
 * 最大乘积 =》 最大三个数乘积 || 最小两个数＋最大数乘积
 * 
 */

var maximumProduct = function(nums) {
  if (nums.length === 3) return nums[0] * nums[1] * nums[2];
  let max1 = Number.MIN_SAFE_INTEGER;
  let max2 = Number.MIN_SAFE_INTEGER;
  let max3 = Number.MIN_SAFE_INTEGER;
  let min1 = Number.MAX_SAFE_INTEGER;
  let min2 = Number.MAX_SAFE_INTEGER;
  for (var num of nums) {
      if (num > max1) {
          max3 = max2;
          max2 = max1;
          max1 = num;
      } else if (num > max2) {
          max3 = max2
          max2 = num;
      } else if (num > max3) {
          max3 = num;
      }
      if (num < min1) {
          min2 = min1;
          min1 = num;
      } else if (num < min2) {
          min2 = num;
      }
  }
  return Math.max(max1 * max2 * max3, max1 * min1 * min2);
};

module.exports = maximumProduct;
