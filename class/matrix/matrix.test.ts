import diagonalSort from './1329将矩阵按对角线排序';

test('', () => {
	expect(
		diagonalSort([
			[3, 3, 1, 1],
			[2, 2, 1, 2],
			[1, 1, 1, 2],
		]),
	).toEqual([
		[1, 1, 1, 1],
		[1, 2, 2, 2],
		[1, 2, 3, 3],
	]);
});
