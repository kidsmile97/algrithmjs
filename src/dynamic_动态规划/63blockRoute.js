/**
62. 带障碍物的不同路径

m * n 的格子中( 0,1 矩阵 )，从左上角至右下角，其中值为 1 的格子代表不可通行，求有多少条路径

分析：
忽略障碍物，从左上角出发，只能向右或向下走，到达右下角，等同于 62route.js 问题

只需把经过障碍物格子路径删掉，即达到该位置的路径数量为 0 ，求和即可

 */

const uniquePathsInBlock = (grid) => {
  const m = grid.length;
  const n = grid[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        grid[i][j] = 0;
        continue
      }
      // 直接在原数组中修改，不再创建新数组
      if(i == 0 && j == 0) {
        grid[i][j] = 1
      } else if (i == 0) {
        grid[i][j] = grid[i][j - 1]
      } else if (j == 0) {
        grid[i][j] = grid[i - 1][j]
      } else {
        grid[i][j] = grid[i - 1][j] + grid[i][j - 1]
      }
    }
  }
  return grid[m - 1][n - 1];
}