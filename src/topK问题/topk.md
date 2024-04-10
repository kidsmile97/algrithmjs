## topK问题

topK 问题是指，从序列中，找到前 k 个最大（最小）的元素

以下思路过程以最简单题为例：

求数列 nums 中的前 k 个最小值。

## 1、全排序获取

直接采用快排，时间复杂度即排序的时间复杂度：O(N\*logN)

```js
nums.sort();

return nums.slice(0, k);
```

## 2、优化全排序，局部排序

采用冒泡排序或者选择排序，每一次冒泡（选择）的过程都是确定剩余序列最小值的过程

时间复杂度 O(N\*K)

```js
for (let i = 0; i < k; i++) {
	bubbleSort(nums);
}
return nums.slice(0, k);
```

## 3、局部排序优化，堆排序

堆排序筛选前 k 个最小数，而不管前 k 个数的排序问题

1. 使用一个容量为 k 的大顶堆
2. 当容量未满，直接入堆；容量满，当前遍历元素与堆顶元素比较，小于堆顶元素时，删除堆顶再入堆
3. 当需要对前 k 个数排序时，也可以逐个出堆操作，获得有序序列，但每次出堆会增加 logk 的算法执行时间

时间复杂度，主要是堆维护的复杂度：O(N\*logK)

```js
// 数组前 k 位置堆化
for (let i = k - 1; i >= 0; i--) {
	shiftDown(nums, i);
}
for (let i = k - 1; i < nums.length; i++) {
	if (nums[0] > nums[i]) {
		swap(0, i, nums);
		shiftDown(nums, 0);
	}
}
return nums.slice(0, k);
```

## 4、不排序，二分快速选择

前面的方法都需要排序，获取前 k 个数

结合基于二分法的快速排序思想，每次二分都会把数组分为两部分，这时前 k 个数其实就是在二分的过程中，确定第 k 个数的位置

获取前 k 个数问题就转换成了第 k 个数的问题

基于二分法的快速选择，正好符合这种情况

而且由算法可知，在二分减治（只计算一侧的数据即可）的设计下时间复杂度为 O(N)

```js
function quickSelect(nums, left, right, k) {
	if (left == right) return k;
	let i = left - 1;
	let j = right + 1;
	const partition = nums[left];
	while (i < j) {
		do {
			i++;
		} while (nums[i] < partition);
		do {
			j--;
		} while (nums[j] > partition);
		if (i < j) swap(i, j, nums);
	}
	if (k <= j) {
		return quickSelect(nums, left, j, k);
	}
	return quickSelect(nums, j + 1, right, k);
}
quickSelect(nums, 0, nums.length - 1, k - 1);
return nums.slice(0, k);
```

## 参考

[参考文章](https://zhuanlan.zhihu.com/p/76734219)
