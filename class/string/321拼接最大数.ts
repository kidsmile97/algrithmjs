/**
321. 拼接最大数

给定长度分别为 m 和 n 的两个数组，其元素由 0-9 构成，表示两个自然数各位上的数字。现在从这两个数组中选出 k (k <= m + n) 个数字拼接成一个新的数，要求从同一个数组中取出的数字保持其在原数组中的相对顺序。

求满足该条件的最大数。结果返回一个表示该最大数的长度为 k 的数组。

说明: 请尽可能地优化你算法的时间和空间复杂度。

输入:
nums1 = [3, 4, 6, 5]
nums2 = [9, 1, 2, 5, 8, 3]
k = 5
输出:
[9, 8, 6, 5, 3]

分析：
最大数特征：大的数字尽量靠前

暴力解法：
1. 每次遍历两个数组，找出其中最靠前的最大数字下标 i
2. 判断 (i + 1, arr1.len) + arr2.len 是否拥有足够的数字组合成 k 个数字的结果
3. 是则塞入 res 结果集，截断数组，继续下一次遍历。否则寻找第二大数字再判断

问题：需要遍历的次数太多，每次循环都需要额外的许多空间记录


/============= wrong answer =================/
思考：(！！！！以下思考已验证错误，因为无法解决 i, j 相等时应该选择谁的问题)
当 k = m+n 时问题解法其实很简单，即用两个下标（i, j）遍历两个数组，每次比较选择 i, j 中数字大的塞入，下标后移即可，时间和空间都能达到最小的 O(m+n)

这种简单的用法是否能套用到 k < m+n 的情况呢？

答案是有可能的。

仍然按照顺序遍历的做法选取 k 个数字，但是遍历的过程中，操作就应该包括判断和删除
- 是否比前面的数字大，大则应该前移
- 前移的过程中需要判断
(1) 删掉同数组的数字，以保证相对顺序
(2) 删掉后，剩余没遍历数字个数需要能填满 k 
(3) 来自不同数组数字可以直接前移

整个过程可以使用一个栈来维护

基于进出 res 数组的时间复杂度为 O(2(m+n))，需要一个空间 O(k) 的数组记录当前位置数字属于哪个数组，O(2) 的指针空间
/============= wrong answer =================/

正确解法：
分治-各自从两个数组中取出最大的 x, y 个数字（等同于402问题），合并成 k 个数字，获取所有的不同 x,y 的结果比较，选出最大的即可 

！！！注意合并过程
合并过程就是选大的往前放，当遇到相等时，后一位大者的更大，全都相等时，更长的应该更优先放，因为你不知道后面会出现什么
[1, 2, 3, 5]
[1, 2, 3, 4]

=> 1 2 3 5 1 2 3 4

[1, 2, 3]
[1, 2, 3, 1]

=> [1 2 3] [1 2 3] [1]

题外：java Script 的字符串比较特性和（相同位数数字数字大小的关系），有 两个数字比较 = 两个数字的字符串比较

 */

/**  ============= wrong answer ================= */
const __move = (t: number, type: 1 | 2, res: number[], record: Array<1 | 2>, leftNumber: number, k: number) => {
	const stash: number[] = [];
	const stashType = type == 1 ? 2 : 1;
	for (let i = res.length - 1; i >= 0; i--) {
		if (res[i] < t && leftNumber >= k - res.length - stash.length) {
			if (record[i] !== type) {
				stash.push(res.pop() as number);
			} else {
				res.pop();
			}
			record.pop();
		}
	}
	if (res.length < k) {
		res.push(t);
		record.push(type);
	}
	while (res.length < k && stash.length > 0) {
		res.push(stash.pop() as number);
		record.push(stashType);
	}
};

function __maxNumber(nums1: number[], nums2: number[], k: number): number[] {
	const res: number[] = [];
	const record: Array<1 | 2> = [];
	const nums1Len = nums1.length;
	const nums2Len = nums2.length;
	let i = 0;
	let j = 0;

	while (i < nums1Len && j < nums2Len) {
		if (nums1[i] > nums2[j]) {
			__move(nums1[i], 1, res, record, nums1Len - i + nums2Len - j, k);
			i++;
		} else {
			__move(nums2[j], 2, res, record, nums1Len - i + nums2Len - j, k);
			j++;
		}
	}

	while (i < nums1Len) {
		__move(nums1[i], 1, res, record, nums1Len - i + nums2Len - j, k);
		i++;
	}

	while (j < nums2Len) {
		__move(nums2[j], 2, res, record, nums1Len - i + nums2Len - j, k);
		j++;
	}

	return res;
}
/**  ============= wrong answer ================= */

/** 正确解法 */
const getMaxNums = (nums: number[], k: number): number[] => {
	const res: number[] = [];
	let delNum = nums.length - k;
	for (const item of nums) {
		while (res.length > 0 && item > res[res.length - 1] && delNum > 0) {
			res.pop();
			delNum--;
		}
		if (res.length < k) {
			res.push(item);
		} else {
			delNum--;
		}
	}
	return res;
};

/** 专门的比较算法 */
const compare = (nums1: number[], index1: number, nums2: number[], index2: number) => {
	while (index1 < nums1.length && index2 < nums2.length) {
		const diff = nums1[index1++] - nums2[index2++];
		if (diff !== 0) {
			return diff;
		}
	}
	return nums1.length - index1 - (nums2.length - index2);
};

const merge = (nums1: number[], nums2: number[]): string => {
	let i = 0;
	let j = 0;
	const res: number[] = [];
	while (i < nums1.length && j < nums2.length) {
		if (compare(nums1, i, nums2, j) > 0) {
			res.push(nums1[i]);
			i++;
		} else {
			res.push(nums2[j]);
			j++;
		}
	}
	while (i < nums1.length) {
		res.push(nums1[i]);
		i++;
	}
	while (j < nums2.length) {
		res.push(nums2[j]);
		j++;
	}
	return res.join('');
};

function maxNumber(nums1: number[], nums2: number[], k: number): number[] {
	const res: string[] = [];

	if (nums1.length > nums2.length) {
		let x = k - nums1.length > 0 ? k - nums1.length : 0;
		while (x <= nums2.length && x <= k) {
			res.push(merge(getMaxNums(nums2, x), getMaxNums(nums1, k - x)));
			x++;
		}
	} else {
		let x = k - nums2.length > 0 ? k - nums2.length : 0;
		while (x <= nums1.length && x <= k) {
			res.push(merge(getMaxNums(nums1, x), getMaxNums(nums2, k - x)));
			x++;
		}
	}

	console.log(res, '-----res');

	let target = '0';
	for (const item of res) {
		if (item >= target) {
			target = item;
		}
	}

	return target.split('').map((item) => Number(item));
}

export default maxNumber;
