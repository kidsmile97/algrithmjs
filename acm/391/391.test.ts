import minimumDistance from './3102最小化曼哈顿距离';

test('3102. 最小化曼哈顿距离', () => {
	expect(
		minimumDistance([
			[3, 10],
			[5, 15],
			[10, 2],
			[4, 4],
		]),
	).toBe(12);
});
