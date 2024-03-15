/**
931. 下降路径最小和

m * n 格子矩阵，要求从上往下，每次往下只能选择同列或相邻列，从任意位置开始，到任意位置结束，求最小路径和

2 1 3
6 5 4
7 8 9

1 -> 4 -> 8 = 13
1 -> 5 -> 7 = 13

结果是 13

分析：
要求是向下计算最小和，即计算所有向下路径找最小的。有两种计算出发点

每次向下只能从 左下、下、右下 三个种选择，对于目标位置，上级路径明显具有最优子结构的性质，即去到某个位置的路径和存在一个最小路径，存在最小上级路径

转移方程：
dp[i][j] = min( dp[i-1][j-1], dp[i-1][j], dp[i-1][j+1] ) + grid[i][j];
 */

// 确定出发位置的向下
const minFallingPathSum = (matrix) => {
  const m = matrix.length;
  const n = matrix[0].length;

  for (let i = 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (j == 0) {
        matrix[i][j] = Math.min(matrix[i-1][j], matrix[i-1][j+1]) + matrix[i][j];
      } else if (j == n - 1) {
        matrix[i][j] = Math.min(matrix[i-1][j], matrix[i-1][j-1]) + matrix[i][j];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1], matrix[i-1][j], matrix[i-1][j+1]) + matrix[i][j];
      }
    }
  }

  return Math.min(...matrix[m-1]);
}

module.exports = minFallingPathSum;
