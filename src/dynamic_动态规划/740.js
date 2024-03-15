/**
给你一个整数数组 nums ，你可以对它进行一些操作。

每次操作中，选择任意一个 nums[i] ，删除它并获得 nums[i] 的点数。之后，你必须删除 所有 等于 nums[i] - 1 和 nums[i] + 1 的元素。

开始你拥有 0 个点数。返回你能通过这些操作获得的最大点数。

示例 1：

输入：nums = [3,4,2]
输出：6
解释：
删除 4 获得 4 个点数，因此 3 也被删除。
之后，删除 2 获得 2 个点数。总共获得 6 个点数。
示例 2：

输入：nums = [2,2,3,3,3,4]
输出：9
解释：
删除 3 获得 3 个点数，接着要删除两个 2 和 4 。
之后，再次删除 3 获得 3 个点数，再次删除 3 获得 3 个点数。
总共获得 9 个点数。

动态规划分析：

前置处理：因为选了 nums[i] 后，相同数值一定是必选的，所以先把相同数值的元素整合到一起，再按照顺序排列

1. 是否含有最优子结构，next 结果与 pre 结果相关（确认有关）

2. 确定状态转移方程：
- f(i) = max( f(i-1), f(i-2) + nums[i] )  
- 第 i 个数内最大和为 Max(前 i-1 个数的和，前 i-2 个数的和 + 第 i 个数)

3. 确定初始状态：
f(0) = 0
f(1) = nums[0]
f(2) = nums[1]
 */

const fn  = (nums) => {
  let max = nums[0];
  let min = nums[0];
  const map = new Map();
  nums.forEach(item => {
    if (item > max) max = item;
    if (item < min) min = item;
    if (map.has(item)) {
      map.set(item, map.get(item) + item);
    } else {
      map.set(item, item);
    }
  });
  let fpre = 0;
  let fi = map.get(min);
  for (let i = min + 1; i <= max; i++) {
    const numsi = map.get(i) || 0;
    const temp = fi;
    fi = Math.max(temp, fpre + numsi);
    fpre = temp;
  }
  return fi;
};

module.exports = fn;
