/**
221. 最大正方形

在二维 0，1 矩阵中，找到只包含 1 的最大正方形矩阵，返回其面积

 1  0  1  0  0 
 1  0  1  1  1 
 1  1  1  1  1 
 1  0  0  1  0 

(3,2) - (4,3) 最大面积 4
(4,2) - (5,3) 最大面积 4

分析：

第一反应解法：暴力解法，以每个位置为目标正方形的左上角，计算此时正方形矩阵的面积。
计算方法：
1. 验证当前左上角是否为 1 ，否则面积为 0
2. 依次验证边长逐步递增（1、2、3...）时，出现不符合则能得到当前位置为左上角的正方形 1 矩阵面积
全部位置计算完后找最大值即可。

优化分析：
以当前位置为目标正方形的右下角的边长，当前位置的目标正方形边长则有如下特性

if
grid[i][j] = 0 
=> 
dp[i][j] = 0
else
dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + dp[i][j]

1. 当前位置为 0 ，则包含该位置的 1正方形 边长为0
2. 当前位置为 1，则包含该位置的 1正方形 边长最少为 1
3. 左、上、左上位置代表对应位置的 1正方形 边长，代表那几个位置已经验证过了的最大的边长范围内都是 1，而这三个位置刚好可以覆盖当前位置的边长延展能力
 */

const maximalSquare = (matrix) => {
  const m = matrix.length;
  const n = matrix[0].length;
  let max = 0;
  let result = new Array(m).fill(0).map(() => new Array(n).fill(0))
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i == 0 || j == 0) {
        result[i][j] = Number(matrix[i][j])
      } else if (matrix[i][j] == '0') {
        result[i][j] = 0
      } else {
        result[i][j] = Math.min(result[i-1][j], result[i-1][j-1], result[i][j-1]) + 1
      }
      if (result[i][j] > max) {
        max = result[i][j]
      }
    }
  }
  return max * max;
}

module.exports = maximalSquare;
