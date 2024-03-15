/**

M x N 的方形格子图，从左上角 -》右下角，每次只能向下或者向右移动一步，求有多少种走法

输入：m = 3, n = 2
输出：3
解释：
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右
3. 向下 -> 向右 -> 向下

动态规划 ----------------------------------
分析：
每次只能向下或着向右，所以去到目标位置的走法最多只有两种，要么是向下，要么是向右到达
f(mn) = f(m-1, n) + f(m, n-1)
符合动态规划子结构的条件，并且拥有重叠子问题的性质，所以可以使用动态规划
初始条件：
f(1,2) = 1
f(2,1) = 1
f(2,2) = f(2,1) + f(1,2) = 2
f(2,3) = f(2,2) + f(1,3) = 3

排列组合 ----------------------------------
知道 mn 目标的前提下，向下固定需要走 m - 1 步，向右固定需要走 n - 1 步，每次走的选择有 2 种（右、下）
即相当于有一个袋子，装了 m - 1 个 A 球和 n - 1 个 B 球，每次取一个球，求取出所有球后可能的排列方式
=》等效替换为
在 m+n-2 个不同的位置种选择 n-1 个用于放置 B 球，是组合数，Cm+n-2/n-1
 */

// 问题关键在与如何设计循环
// 可解，但是m、n过大时递归会超出时间，而且递归深度过大
const uniquePaths = (m, n) => {
  let fmn = 1;
  if (m > 1 && n > 1) {
    fmn = uniquePaths(m - 1, n) + uniquePaths(m, n - 1);
  }
  return fmn;
}

const getRoute = (m, n) => {
  let Amn = m + n - 2;
  let fm = 1;
  while(Amn > n - 1) {
    fm *= total;
    Amn--;
  }
  let Ann = n - 1;
  let fn = 1;
  while(Ann > 0) {
    fn *= Ann;
    Ann--;
  }
  return fm / fn;
}

module.exports = uniquePaths;