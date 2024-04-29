/**
1329. 将矩阵按对角线排序

矩阵对角线 是一条从矩阵最上面行或者最左侧列中的某个元素开始的对角线，沿右下方向一直到矩阵末尾的元素。
例如，矩阵 mat 有 6 行 3 列，从 mat[2][0] 开始的 矩阵对角线 将会经过 mat[2][0]、mat[3][1] 和 mat[4][2] 。

给你一个 m * n 的整数矩阵 mat ，请你将同一条 矩阵对角线 上的元素按升序排序后，返回排好序的矩阵。

## 先定位，同一对角线元素之间的关系

1. 对角线的开始元素都在第一行、第一列上
2. 举例子找规律，显然 [i, j] & [i+1,j+1] 在对角线上

## 使用冒泡、选择、插入排序，逻辑简单

简单解法

## 有没有存在优化的解法？（btw 太菜了想不到）

原地快排 or 按对角线存入新数组快排再回填矩阵

主要都是优化排序复杂度，原地快排处理的下标太多了，容易出错

 */

const swapMat = (mat: number[][], i: number, j: number, m: number, n: number) => {
	const temp = mat[i][j];
	mat[i][j] = mat[m][n];
	mat[m][n] = temp;
};

function diagonalSort(mat: number[][]): number[][] {
	const m = mat.length;
	const n = mat[0].length;
	// 第一列对角线排序
	for (let k = 0; k < m; k++) {
		for (let i = k, j = 0; i < m && j < n; i++, j++) {
			for (let h = i + 1, l = j + 1; h < m && l < n; h++, l++) {
				if (mat[i][j] > mat[h][l]) {
					swapMat(mat, i, j, h, l);
				}
			}
		}
	}
	console.dir(mat);
	// 第一行对角线排序
	for (let k = 1; k < n; k++) {
		for (let i = 0, j = k; i < m && j < n; i++, j++) {
			for (let h = i + 1, l = j + 1; h < m && l < n; h++, l++) {
				if (mat[i][j] > mat[h][l]) {
					swapMat(mat, i, j, h, l);
				}
			}
		}
	}
	return mat;
}

export default diagonalSort;
