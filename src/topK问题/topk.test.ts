import findKthLargest from './215数组中的第K个最大元素';
import kSmallestPairs, { _kSmallestPairs } from './373查找和最小的K对数字';
import { _smallestDistancePair, d_smallestDistancePair } from './719找出第K小的数对距离';

test('215 数组中的第K个最大元素', () => {
	expect(findKthLargest([3, 2, 1, 5, 6, 4], 2)).toBe(5);
});

test('373. 查找和最小的 K 对数字', () => {
	expect(kSmallestPairs([1, 7, 11], [2, 4, 6], 3)).toEqual([
		[1, 2],
		[1, 4],
		[1, 6],
	]);

	expect(kSmallestPairs([1, 1, 2], [1, 2, 3], 2)).toEqual([
		[1, 1],
		[1, 1],
	]);

	expect(kSmallestPairs(new Array(10000).fill(1), new Array(10000).fill(1), 10000)).toEqual(
		new Array(10000).fill(0).map(() => [1, 1]),
	);
});

test('719. 找出第 K 小的数对距离', () => {
	expect(_smallestDistancePair([1, 3, 1], 1)).toBe(0);
	expect(_smallestDistancePair([1, 1, 1], 2)).toBe(0);
	expect(_smallestDistancePair([1, 6, 1], 3)).toBe(5);

	expect(d_smallestDistancePair([1, 3, 1], 1)).toBe(0);
	expect(d_smallestDistancePair([1, 1, 1], 2)).toBe(0);
	expect(d_smallestDistancePair([1, 6, 1], 3)).toBe(5);
});
