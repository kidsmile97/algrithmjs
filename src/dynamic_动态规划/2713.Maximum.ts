/**
2713. Maximum Strictly Increasing Cells in a Matrix

Given a 1-indexed m x n integer matrix mat, you can select any cell in the matrix as your starting cell.

From the starting cell, you can move to any other cell in the same row or column, 
but only if the value of the destination cell is strictly greater than the value of the current cell. 
You can repeat this process as many times as possible, moving from cell to cell until you can no longer make any moves.

Your task is to find the maximum number of cells that you can visit in the matrix by starting from some cell.

Return an integer denoting the maximum number of cells that can be visited.
 */

function maxIncreasingCells(mat: number[][]): number {
	let maxRes = 0;
  const res = new Array(mat.length).fill(0).map(() => new Array(mat[0].length).fill(0))
  for (let i = 0)
	return maxRes;
}

export default maxIncreasingCells;
