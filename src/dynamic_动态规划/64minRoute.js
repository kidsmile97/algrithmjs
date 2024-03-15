/**
64. 最小路径和

m * n 网格中的每个单元格都有一个整数值。每次向下或向右，左上角 -》右下角最小路径和

分析：
去往目标位置 T 的方式只有两种，从 T 上边 A 或者左边 B，即目标 T 的上或左位置是必经之路，所以只能选择 A B 中最小值

由此可推，去往 A 的上或左也只能选最小值，存在最优子结构

思路：动态规划
dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]

 */

const minPathSum = (grid) => {
  const m = grid.length;
  const n = grid[0].length;
  let dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
  for(let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i == 0 && j == 0) {
        dp[i][j] = grid[i][j];
      } else if (i == 0) {
        dp[i][j] = dp[i][j - 1] + grid[i][j];
      } else if (j == 0) {
        dp[i][j] = dp[i - 1][j] + grid[i][j];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
      }
    }
  }
  return dp[m - 1][n - 1];
}