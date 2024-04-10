/**
215. 数组中的第K个最大元素

给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。

tips: 基于快速排序的`快速选择`算法，可以通过一次遍历，确定某一个元素在排序以后的位置

分析：

设计 O(n) 的算法

 */

const swap = (i: number, j: number, arr: any[]) => {
	const temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
};

const quickSelect = (left: number, right: number, arr: any[], target: number): number => {
	if (left == right) return arr[target];
	let i = left - 1;
	let j = right + 1;
	const partition = arr[left];
	while (i < j) {
		do {
			i++;
		} while (arr[i] < partition);
		do {
			j--;
		} while (arr[j] > partition);
		if (i < j) {
			swap(i, j, arr);
		}
	}
	if (target <= j) return quickSelect(left, j, arr, target);
	return quickSelect(j + 1, right, arr, target);
};

function findKthLargest(nums: number[], k: number): number {
	return quickSelect(0, nums.length - 1, nums, nums.length - k);
}

export default findKthLargest;
