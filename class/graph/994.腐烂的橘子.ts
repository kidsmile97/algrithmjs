/**
994. 腐烂的橘子

在给定的 m x n 网格 grid 中，每个单元格可以有以下三个值之一：

值 0 代表空单元格；
值 1 代表新鲜橘子；
值 2 代表腐烂的橘子。
每分钟，腐烂的橘子 周围 4 个方向上相邻 的新鲜橘子都会腐烂。

返回 直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1 。

## 暴力解法

循环遍历直到没有 2 单元格或者无法被污染的 1 单元格

## bfs 

 */

function _orangesRotting(grid: number[][]): number {
	const m = grid.length;
	const n = grid[0].length;
	let time = 0;
	let cnt = 0;
	let hasVis = new Array(m).fill(0).map(() => new Array(n).fill(false));
	const queue: [number, number][] = [];
	// 单次遍历，获取起始点，统计未污染个数
	grid.forEach((line, lineIndex) => [
		line.forEach((item, index) => {
			if (item == 1) {
				cnt++;
			} else if (item == 2) {
				queue.push([lineIndex, index]);
				hasVis[lineIndex][index] = true;
			}
		}),
	]);
	// BFS
	while (queue.length > 0) {
		if (cnt == 0) break;
		let curLen = queue.length;
		while (curLen > 0) {
			const [i, j] = queue.shift()!;
			// 感染周围格子
			if (i - 1 >= 0 && !hasVis[i - 1][j] && grid[i - 1][j] == 1) {
				queue.push([i - 1, j]);
				hasVis[i - 1][j] = true;
				cnt--;
			}
			if (i + 1 < m && !hasVis[i + 1][j] && grid[i + 1][j] == 1) {
				queue.push([i + 1, j]);
				hasVis[i + 1][j] = true;
				cnt--;
			}
			if (j - 1 >= 0 && !hasVis[i][j - 1] && grid[i][j - 1] == 1) {
				queue.push([i, j - 1]);
				hasVis[i][j - 1] = true;
				cnt--;
			}
			if (j + 1 < n && !hasVis[i][j + 1] && grid[i][j + 1] == 1) {
				queue.push([i, j + 1]);
				hasVis[i][j + 1] = true;
				cnt--;
			}
			curLen--;
		}
		time++;
	}
	return cnt > 0 ? -1 : time;
}

/**

m * n 矩阵遍历的一些性质与特点

grid = [
	[2, 1, 1],
	[1, 1, 0],
	[0, 1, 1],
]
m = 3
n = 3

grid.flat() = [2, 1, 1, 1, 1, 0, 0, 1, 1]

index 位置的数有如下

上: index - n
下: index + n
左: index % n === 0 ? (无左) null : (有左) index - 1
右: index % n === n - 1 ? (无右) null : (有右) index + 1


 * @param grid 
 * @returns 
 */
function orangesRotting(grid: number[][]): number {
	const n = grid[0].length;
	let time = 0;
	const freshSet = new Set<number>();
	let rotSet = new Set<number>();
	grid.flat().forEach((item, index) => {
		if (item === 1) {
			freshSet.add(index);
		} else if (item === 2) {
			rotSet.add(index);
		}
	});
	while (rotSet.size > 0) {
		const nextRotSet = new Set<number>();
		rotSet.forEach((i) => {
			const top = i - n;
			const bottom = i + n;
			if (freshSet.delete(top)) nextRotSet.add(top);
			if (freshSet.delete(bottom)) nextRotSet.add(bottom);
			if (i % n !== 0 && freshSet.delete(i - 1)) nextRotSet.add(i - 1);
			if (i % n !== n - 1 && freshSet.delete(i + 1)) nextRotSet.add(i + 1);
		});
		if (nextRotSet.size > 0) {
			time++;
		}
		rotSet = nextRotSet;
	}
	return freshSet.size > 0 ? -1 : time;
}

export default orangesRotting;
