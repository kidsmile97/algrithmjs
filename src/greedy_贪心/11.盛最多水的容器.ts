/**
11. 盛最多水的容器

给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

分析：
目标数据 arr，有 i , j 两个数

即求 arr 内的最大面积，S(i, j) = Math.min( h[i], h[j] ) * (j - i)

思路：
1. 暴力求解所有组合面积，取最大值，时间复杂度 O(n^2)，空间复杂度 O(n^2)

2. 贪心算法
能否把计算过程营造成贪心算法的可行局面？
- 当前局部存在最优解

采用向内靠的方式循环计算

i = 0; j = arr.length-1

这样每次选短板往内靠即可

 */

function maxArea(height: number[]): number {
	let i = 0;
	let j = height.length - 1;
	let area: number = 0;
	while (i < j) {
		const tempArea = Math.min(height[i], height[j]) * (j - i);
		if (tempArea > area) {
			area = tempArea;
		}
		if (height[i] < height[j]) {
			i++;
		} else {
			j--;
		}
	}
	return area;
}
