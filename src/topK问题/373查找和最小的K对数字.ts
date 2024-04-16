/**
373. 查找和最小的 K 对数字

给定两个以 非递减顺序排列 的整数数组 nums1 和 nums2 , 以及一个整数 k 。

定义一对值 (u,v)，其中第一个元素来自 nums1，第二个元素来自 nums2 。

请找到和最小的 k 个数对 (u1,v1),  (u2,v2)  ...  (uk,vk) 。

输入: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
输出: [1,2],[1,4],[1,6]
解释: 返回序列中的前 3 对数：
     [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]

## 暴力解法

直接组对数，按照和入堆（小顶堆），然后推出前 k 个即可

这里其实已经是获取所有数对，比较取数

！！！有个小问题，js 的堆需要自己实现，原库并没有这个内容，代码量相对就有点大了

## topK 解题

 */

import Heap from '@structure/heap/Heap';

/** 优先队列 */
export function _kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
	type PairNum = [number, number];
	const heap = new Heap<PairNum>();
	// 优化一下，减少一下内存使用，改用大顶堆
	heap.comparing((a: PairNum, b: PairNum) => b[0] + b[1] - (a[0] + a[1]));
	for (const num1 of nums1) {
		for (const num2 of nums2) {
			const pair: PairNum = [num1, num2];
			if (heap.size < k) {
				heap.push(pair);
			} else if (heap.compare(heap.top() as PairNum, pair) < 0) {
				heap.pop();
				heap.push(pair);
			}
		}
	}
	// return heap.data; // 这里直接访问堆内元素更快更便捷，但是是无序的
	return heap.clear().reverse();
}

function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
	const nums1Len = nums1.length;
	const nums2Len = nums2.length;
	let [right, left] = [nums1[nums1Len - 1] + nums2[nums2Len - 1], nums1[0] + nums2[0]];
	while (left <= right) {
		const mid = (left + right) >> 1;
		let cnt = 0;
		// 统计小于等于 mid 的数对的数量
		for (let i = 0, j = nums2Len - 1; i < nums1Len; i++) {
			while (nums1[i] + nums2[j] > mid) {
				j--;
			}
			cnt += j + 1;
		}
		if (cnt < k) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	const res = [];
	for (let i = 0, j = nums2Len - 1; i < nums1Len; i++) {
		while (nums1[i] + nums2[j] >= left) {
			j--;
		}
		if (j < 0) {
			break;
		}
		for (let n = 0; n <= j; n++) {
			if (res.length < k) {
				res.push([nums1[i], nums2[n]]);
			}
		}
	}
	for (let i = 0, j = nums2Len - 1; i < nums1Len; i++) {
		while (nums1[i] + nums2[j] > left) {
			j--;
		}
		for (let n = 0; n <= j; n++) {
			if (nums1[i] + nums2[n] == left && res.length < k) {
				res.push([nums1[i], nums2[n]]);
			}
		}
		if (res.length == k) {
			break;
		}
	}

	return res;
}

export default kSmallestPairs;
