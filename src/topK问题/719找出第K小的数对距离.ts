/**
719. 找出第 K 小的数对距离

数对 (a,b) 由整数 a 和 b 组成，其数对距离定义为 a 和 b 的绝对差值。

给你一个整数数组 nums 和一个整数 k ，数对由 nums[i] 和 nums[j] 组成且满足 0 <= i < j < nums.length 。返回 所有数对距离中 第 k 小的数对距离。

## 暴力解法

优先队列解题 O(n*logk + n^2)

## topK 解题

如何转换为 topk 问题？

1. 题目中要求的是组合对数，是否需要把所有的距离都先计算出来再使用 topk 解题？
2. 如果不需要获得所有的组合对数，怎么确定第 k 小的距离一定在具有某种特性的对数内？

根据topk问题二分查找的特点，最重要的是要计算在 x 距离内的对数数量

如何确定在 x 距离内的数对数量？

 */

import Heap from '@structure/heap/Heap';

/** 优先队列仍无法通过时间限制测试 */
export function _smallestDistancePair(nums: number[], k: number): number {
	const heap = new Heap();
	heap.comparing((a, b) => b - a);
	for (let i = 0; i < nums.length - 1; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			const curDis = Math.abs(nums[i] - nums[j]);
			if (heap.size < k) {
				heap.push(curDis);
			} else if (curDis < (heap.top() as number)) {
				heap.pop();
				heap.push(curDis);
			}
		}
	}
	return heap.top() as number;
}

/** 不能使用暴力解法，无法通过时间和空间复杂度要求 */
function __smallestDistancePair(nums: number[], k: number): number {
	const res: number[] = [];
	for (let i = 0; i < nums.length - 1; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			res.push(Math.abs(nums[i] - nums[j]));
		}
	}
	res.sort((a, b) => a - b);
	return res[k - 1];
}
/** 不能使用暴力解法，无法通过时间和空间复杂度要求测试 */

/** 二分查找定位 */
function smallestDistancePair(nums: number[], k: number): number {
	nums.sort((a, b) => a - b);

	let left = 0;
	let right = nums[nums.length - 1] - nums[0];

	while (left <= right) {
		const mid = (right + left) >> 1;
		// 计算距离小于 mid 的数对个数
		let cnt = 0;
		/** 下面的这种以左端点为标的计数不够优雅，需要每次循环的时候维护右端点 */
		// let i = 0,
		// 	j = 1;
		// for (i; i < nums.length - 1; i++) {
		// 	while (nums[j] - nums[i] <= mid) {
		// 		j++;
		// 	}
		// 	cnt += j - i;
		// 	j = i + 2;
		// }
		/** 下面的这种以右端点为标的计数更优雅，因为在顺序列表中，n[j] - n[i] > mid, 则 n[j+1] - n[i] > mid, i自然增长，无需维护 */
		for (let i = 0, j = 1; j < nums.length; j++) {
			// 这里统计是包含 <= mid 的个数，所以 k 在左边时应包含 mid，在右边时应除开 mid
			while (nums[j] - nums[i] > mid) {
				i++;
			}
			cnt += j - i;
		}
		if (cnt < k) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	return left;
}

export default smallestDistancePair;
