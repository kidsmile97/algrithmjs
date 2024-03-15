/**
120. 三角形最小路径和

   2
  3 4
 6 5 7
4 1 8 3

2 -> 3 -> 5 -> 1 = 11

从上到下最小路径和，每次只能向下移动到相邻子结点，即 (m,n) 只能移动到 (m+1,n) 或者 (m+1,n+1) 结点上，求到达最后一层的最小路径和

分析：
某个位置 B 的最小和，只能从 B 的左上角 A1 或 右上角A2 下来

minium(B) = Math.min(minium(A1), minium(A2))

状态转移和子结构的性质都有了，由于是从上到下，没有确定目标位置，所以不能直接得到答案，需要最后比较最后一层所有位置的最小值才可

 */

function minimumTotal(triangle) {
    const level = triangle.length;
    for (let i = 0; i < level; i++) {
      for (let j = 0; j <= i; j++) {
        if (i == 0) {
          triangle[i][j] = triangle[i][j];
        } else if (j == 0) {
          triangle[i][j] = triangle[i-1][j] + triangle[i][j];
        } else if (j == i) {
          triangle[i][j] = triangle[i-1][j-1] + triangle[i][j];
        } else {
          triangle[i][j] = Math.min(triangle[i-1][j-1], triangle[i-1][j]) + triangle[i][j];
        }
      }
    }
    return Math.min(...triangle[level - 1]);
};


