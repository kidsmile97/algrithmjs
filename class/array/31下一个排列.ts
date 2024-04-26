/**
31. 下一个排列

整数数组的一个 排列  就是将其所有成员以序列或线性顺序排列。

例如，arr = [1,2,3] ，以下这些都可以视作 arr 的排列：[1,2,3]、[1,3,2]、[3,1,2]、[2,3,1] 。
整数数组的 下一个排列 是指其整数的下一个字典序更大的排列。
更正式地，如果数组的所有排列根据其字典顺序从小到大排列在一个容器中，那么数组的 下一个排列 就是在这个有序容器中排在它后面的那个排列。
如果不存在下一个更大的排列，那么这个数组必须重排为字典序最小的排列（即，其元素按升序排列）。

例如，arr = [1,2,3] 的下一个排列是 [1,3,2] 。
类似地，arr = [2,3,1] 的下一个排列是 [3,1,2] 。
而 arr = [3,2,1] 的下一个排列是 [1,2,3] ，因为 [3,2,1] 不存在一个字典序更大的排列。
给你一个整数数组 nums ，找出 nums 的下一个排列。

必须 原地 修改，只允许使用额外常数空间。

## 分析

指针 + 选择排序

下一个字典序更大的排列，即比原数列字典序更大，但是要求大最小值，原字典序已经最大，则 reverse

如何让字典序变大，但要求变大量最小？

示例：3224321

1. 因为字典序是逐位比较，所以需要按位把大的数字提前，字典序变大
2. 需要让变大量尽可能小，则提前的数字应该尽可能靠后，寻找最小的比之大的数
3. 提前后需要使剩余部分字典序最小，才符合`下一个排列`的要求

 */

import { swap } from '@/utils/array';

/**
 Do not return anything, modify nums in-place instead.
 */

/** 这里忽略了原数据内在的顺序逻辑，花费了大量时间进行排序 */
function _nextPermutation(nums: number[]): void {
	let i = nums.length - 1;
	while (i > 0) {
		if (nums[i] > nums[i - 1]) {
			break;
		} else {
			i--;
		}
	}
	if (i == 0) {
		// 直接使用自带逆函数，没有时可以用双指针的头尾交换方法
		nums.reverse();
	} else {
		const swapTarget = i - 1;
		let maxMin = i;
		for (let k = i; k < nums.length; k++) {
			if (nums[k] > nums[swapTarget] && nums[k] < nums[maxMin]) {
				maxMin = k;
			}
		}
		const temp = nums[swapTarget];
		nums[swapTarget] = nums[maxMin];
		nums[maxMin] = temp;
		// 后面部分从小到大重排序，要原地排序，空间复杂度 O(1)，用选择排序
		while (i < nums.length - 1) {
			let min = i;
			for (let j = i + 1; j < nums.length; j++) {
				if (nums[j] < nums[min]) {
					min = j;
				}
			}
			const swapTemp = nums[i];
			nums[i] = nums[min];
			nums[min] = swapTemp;
			i++;
		}
	}
}

// [1, 3, 2]
function nextPermutation(nums: number[]): void {
	let i = nums.length - 1;
	while (i > 0 && nums[i] <= nums[i - 1]) {
		i--;
	}
	if (i > 0) {
		let j = nums.length - 1;
		let swapIndex = i - 1;
		while (nums[j] <= nums[swapIndex]) {
			j--;
		}
		swap(nums, swapIndex, j);
		// [nums[swapIndex], nums[j]] = [nums[j], nums[swapIndex]]; 利用解构赋值进行交换
	}
	let left = i;
	let right = nums.length - 1;
	while (left < right) {
		swap(nums, left++, right--);
	}
}

export default nextPermutation;
