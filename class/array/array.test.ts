import SnapshotArray from './1146快照数组';
import rotate from './189轮转数组';

test('218. 天际线问题', () => {
	const snapshotArr = new SnapshotArray(3);
	snapshotArr.set(0, 5);
	expect(snapshotArr.snap()).toBe(0);
	snapshotArr.set(0, 6);
	expect(snapshotArr.get(0, 0)).toBe(5);
});

test('218. 天际线问题 2', () => {
	const snapshotArr = new SnapshotArray(4);
	expect(snapshotArr.snap()).toBe(0);
	expect(snapshotArr.snap()).toBe(1);
	expect(snapshotArr.get(3, 1)).toBe(0);
	snapshotArr.set(2, 4);
	expect(snapshotArr.snap()).toBe(2);
	snapshotArr.set(1, 4);
});

test('189. 轮转数组', () => {
	expect(rotate([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([5, 6, 7, 1, 2, 3, 4]);
	expect(rotate([1, 2, 3, 4], 2)).toEqual([3, 4, 1, 2]);
});
