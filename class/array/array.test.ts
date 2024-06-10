import SnapshotArray from './1146快照数组';
import decrypt from './1652.拆炸弹';
import rotate from './189轮转数组';
import countBattleships from './419.甲板上的战舰';

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

test('1652. 拆炸弹', () => {
	expect(decrypt([2, 4, 9, 3], -2)).toEqual([12, 5, 6, 13]);
});

test('419. 甲板上的战舰', () => {
	expect(
		countBattleships([
			['X', '.', '.', 'X'],
			['.', '.', '.', 'X'],
			['.', '.', '.', 'X'],
		]),
	).toBe(2);
});
