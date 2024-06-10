/**
419. 甲板上的战舰

给你一个大小为 m x n 的矩阵 board 表示甲板，其中，每个单元格可以是一艘战舰 'X' 或者是一个空位 '.' ，返回在甲板 board 上放置的 战舰 的数量。

战舰 只能水平或者垂直放置在 board 上。换句话说，战舰只能按 1 x k（1 行，k 列）或 k x 1（k 行，1 列）的形状建造，其中 k 可以是任意大小。

两艘战舰之间至少有一个水平或垂直的空位分隔 （即没有相邻的战舰）。

提示：

m == board.length
n == board[i].length
1 <= m, n <= 200
board[i][j] 是 '.' 或 'X'
 

进阶：你可以实现一次扫描算法，并只使用 O(1) 额外空间，并且不修改 board 的值来解决这个问题吗？

 */

/**
  暴力扫描算法，记录 'X' 位置，前后左右存在 'X' 的不重复计算
  时间复杂度 O(n^2) , 空间复杂度 O(n^2)
 * @param board 
 * @returns 
 */
function _countBattleships(board: string[][]): number {
	let count = 0;
	const recordSet = new Set<string>();
	board.forEach((line, row) => {
		line.forEach((pos, col) => {
			if (pos === 'X') {
				recordSet.add(`${row},${col}`);
				if (
					!recordSet.has(`${row},${col - 1}`) &&
					!recordSet.has(`${row},${col + 1}`) &&
					!recordSet.has(`${row - 1},${col}`) &&
					!recordSet.has(`${row + 1},${col}`)
				) {
					count++;
				}
			}
		});
	});
	return count;
}

// 枚举左顶点，战舰左顶点，正上方、正左侧肯定没有 'X'
function countBattleships(board: string[][]): number {
	let count = 0;
	board.forEach((line, row) => {
		line.forEach((pos, col) => {
			// prettier-ignore
			if (
				pos === 'X' &&
				// 左侧
				(col - 1 < 0 || board[row][col - 1] !== 'X') &&
				// 上侧
				(row - 1 < 0 || board[row - 1][col] !== 'X')
			) {
				count++;
			}
		});
	});
	return count;
}

export default countBattleships;
