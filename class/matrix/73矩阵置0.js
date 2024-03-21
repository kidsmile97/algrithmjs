/**
73. 矩阵置0

给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。

问题分析：

要求变化是同时的，即元素是否为 0 与矩阵原状态相关，而不是与变化后的元素相关

要求空间复杂度 O(1)

算法分析：

根据问题，即 m(i, j) 的值，取决于 i 行，j 列所有元素中是否存在 0，存在即为 0，否则不变

因为需要使空间复杂度 O(1)，所以需要定义额外状态值来同时代表原先状态和现在状态

原状态是 0 || x
现在状态 0 || x

怎么定义新状态？

定义新状态的做法不行，形如 js 可以在一个数组内填充字符串和数字可能可以，但其他强类型语言不行，不是通用算法

使用一步步优化的思路：

解法1：时间复杂度 O(mn)，空间复杂度 O(m+n)
- 遍历记录 0 的位置
- 遍历更新矩阵

解法2：优化解法1
思考能否把标记数组占据的空间，置于矩阵中，而不是额外利用空间

使用第一行、第一列来记录，先遍历第一行第一列，使用两个变量标记它原本是否有 0 ，最后才变换第一行和第一列
 
 */




/** 
 * 自己的辣鸡实现，有点智障
 * 
 * 问题分析：
 * 1. 标记数组记录的是 0 值的`x,y`位置，其实大可不必，因为这样最坏情况会占用 O(mn) 的空间，等同于使用辅助数组
 * 2. 更新数组按`0值位置的行列`更新，也是智障，这样会大概率出现重复更新的情况，应该直接按位置更新，这样确保只更新了一次，时间稳定是 O(mn)
 */ 
function change(matrix, i, j) {
  for (let k = 0; k < matrix[0].length; k++) {
    matrix[i][k] = 0;
  }
  for (let s = 0; s < matrix.length; s++) {
    matrix[s][j] = 0;
  }
}
/**
 * @deprecated
 */
function __setZeroes(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const x = [];
  const y = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        x.push(i);
        y.push(j)
      }
    }
  }
  for(let k = 0; k < x.length; k++) {
    change(matrix, x[k], y[k])
  }
}

// 解法1 的正确实现
function setZeroes(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  // 用 m + n 的空间即可标记行列是否存在 0，并不需要记录出现 0 的具体行、列
  const row = new Array(m).fill(false);
  const col = new Array(n).fill(false);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        row[i] = col[j] = true;
      }
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 判断该行或该列是否出现 0 ，有则直接变更
      if (row[i] || col[j]) {
        matrix[i][j] = 0
      }
    }
  }
}


// 解法2
function setZeroesII(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  let row1 = false;
  let col1 = false;
  for (let i = 0; i < m; i++) {
    if (matrix[i][0] == 0) {
      col1 = true;
    }
  }
  for (let i = 0; i < n; i++) {
    if (matrix[0][i] == 0) {
      row1 = true;
    }
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = matrix[0][j] = 0;
      }
    }
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }
  if (col1) {
    for (let i = 0; i < m; i++) {
      matrix[i][0] = 0
    }
  }
  if (row1) {
    for (let i = 0; i < n; i++) {
      matrix[0][i] = 0
    }
  }
}