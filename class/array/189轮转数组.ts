/**
189. 轮转数组

给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

示例 1:

输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右轮转 1 步: [7,1,2,3,4,5,6]
向右轮转 2 步: [6,7,1,2,3,4,5]
向右轮转 3 步: [5,6,7,1,2,3,4]

### 双指针单次同时替换

利用自带函数

 */

/**
 Do not return anything, modify nums in-place instead.
 */

// 操作开销大，对于系统来说每次都要整体右移数组
function _rotate(nums: number[], k: number): void {
	const realK = k % nums.length;
	for (let i = 0; i < realK; i++) {
		const last = nums.pop()!;
		nums.unshift(last);
	}
}

// 环状替换
const gcd = (x: number, y: number): number => (y ? gcd(y, x % y) : x);
function rotate(nums: number[], k: number) {
	const n = nums.length;
	k = k % n;
	let count = gcd(k, n);
	for (let start = 0; start < count; ++start) {
		let current = start;
		let prev = nums[start];
		do {
			const next = (current + k) % n;
			const temp = nums[next];
			nums[next] = prev;
			prev = temp;
			current = next;
		} while (start !== current);
	}
}

export default rotate;
