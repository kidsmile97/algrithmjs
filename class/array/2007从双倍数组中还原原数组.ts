/**
2007. 从双倍数组中还原原数组

一个整数数组 original 可以转变成一个 双倍 数组 changed ，转变方式为将 original 中每个元素 值乘以 2 加入数组中，然后将所有元素 随机打乱 。

给你一个数组 changed ，如果 change 是 双倍 数组，那么请你返回 original数组，否则请返回空数组。original 的元素可以以 任意 顺序返回。

输入：changed = [1,3,4,2,6,8]
输出：[1,3,4]

## 分析

1. 双倍数组的特性

- 数组长度必然是偶数
- 对于任意元素 x，必然存在对应元素 2x 或 x/2
- 元素可重复，即 x <=> 2x 的组合可能存在多组

2. 问题转换

根据双倍数组的特性，即为数组匹配数对

## 解决答案

频数统计 + 排序 + 配对

 */

/** ====================== 错误答案，无法解决 x 2x 4x 8x 之间正确配对的问题（1、2、4、8，当（2、4）配对后，（1、8）无法配对返回错误答案） ======================  */
const swap = (i: number, j: number, arr: any[]) => {
	const temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
};
function _findOriginalArray(changed: number[]): number[] {
	if (changed.length % 2 !== 0) {
		return [];
	}
	changed.sort((a, b) => a - b);
	const queue: number[] = [];
	const queueSize = changed.length >> 1;
	let i = 0;
	for (const item of changed) {
		let j = i;
		let isPair = false;
		while (j < queue.length) {
			const doubleItem = item << 1;
			const isDouble = item % 2 === 0;
			const halfItem = item >> 1;
			if (queue[j] === doubleItem) {
				queue[j] = item;
				swap(i++, j, queue);
				isPair = true;
				break;
			} else if (isDouble && queue[j] === halfItem) {
				swap(i++, j, queue);
				isPair = true;
				break;
			} else {
				j++;
			}
		}
		if (!isPair) {
			queue.push(item);
			if (queue.length > queueSize) {
				return [];
			}
		}
	}
	return queue;
}
/** ====================== 错误答案 ======================  */

function findOriginalArray(changed: number[]): number[] {
	if (changed.length % 2 !== 0) return [];
	const frequencyMap = new Map<number, number>();
	for (const item of changed) {
		if (frequencyMap.has(item)) {
			frequencyMap.set(item, (frequencyMap.get(item) as number) + 1);
		} else {
			frequencyMap.set(item, 1);
		}
	}
	changed.sort((a, b) => a - b);
	const res: number[] = [];
	for (const item of changed) {
		const itemTime = frequencyMap.get(item) as number;
		if (itemTime > 0) {
			frequencyMap.set(item, itemTime - 1);
			const doubleItem = item << 1;
			const doubleItemTime = frequencyMap.get(doubleItem) as number;
			if (!frequencyMap.has(doubleItem) || doubleItemTime == 0) return [];
			frequencyMap.set(doubleItem, doubleItemTime - 1);
			res.push(item);
		}
	}
	return res;
}

export default findOriginalArray;
