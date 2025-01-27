/**
377. 组合总和 Ⅳ

给你一个由 不同 整数组成的数组 nums ，和一个目标整数 target 。请你从 nums 中找出并返回总和为 target 的元素组合的个数。

题目数据保证答案符合 32 位整数范围。

1 <= nums.length <= 200
1 <= nums[i] <= 1000
nums 中的所有元素 互不相同
1 <= target <= 1000

输入：nums = [1,2,3], target = 4
输出：7
解释：
所有可能的组合为：
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
请注意，顺序不同的序列被视作不同的组合。

## 分析

总和 target ，由于所有元素可以重复出现，顺序不同视为不同序列

接下来就是找规律

1. 一个明显的特征是，会以每个元素（ <= target ）为标的组合

f(x) = Total( f(target - item) )

f(1) = set[1];

空间复杂度 O(target)

 */

function combinationSum4(nums: number[], target: number): number {
	nums.sort((a, b) => a - b);
	const res: number[] = new Array(target + 1).fill(0);
	res[0] = 1;
	for (let i = 1; i <= target; i++) {
		for (const item of nums) {
			if (item > i) {
				break;
			} else {
				res[i] += res[i - item];
			}
		}
	}
	return res[target];
}

export default combinationSum4;
