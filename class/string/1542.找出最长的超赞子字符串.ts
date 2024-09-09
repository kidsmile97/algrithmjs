/**
1542. 找出最长的超赞子字符串

给你一个字符串 s 。请返回 s 中最长的 超赞子字符串 的长度。

「超赞子字符串」需满足满足下述两个条件：

该字符串是 s 的一个非空子字符串
进行任意次数的字符交换后，该字符串可以变成一个回文字符串

测试用例提示：
1 <= s.length <= 10^5
s 仅由数字组成

## 「超赞子字符串」判断特点

1. 当字符串长度为偶数时，所有字符都成对出现（出现次数为偶数）
2. 当字符串长度为奇数时，有且仅有一个字符出现次数为奇数

## 子字符串

字符串中的一段

## 暴力解法

1. 从长到短遍历子串，判断「超赞子字符串」，是则直接返回
2. 字符串 s 中最短「超赞子字符串」一定是长度 1

 */

/**
暴力解法
时间复杂度太高 O(n^3)，无法通过时间限制
*/
const isAwesome = (str: string) => {
	let charMap = new Map<string, number>();
	for (const c of str) {
		if (charMap.has(c)) {
			charMap.set(c, charMap.get(c)! + 1);
		} else {
			charMap.set(c, 1);
		}
	}
	let oddNum = 0;
	for (const num of charMap.values()) {
		if (num % 2 === 1) {
			oddNum += 1;
			if (oddNum > 1) return false;
		}
	}
	return true;
};
function _longestAwesome(s: string): number {
	for (let n = s.length; n > 0; n--) {
		for (let i = 0; i + n <= s.length; i++) {
			if (isAwesome(s.slice(i, i + n))) {
				return n;
			}
		}
	}
	return 1;
}

/**
 * 前缀异或和 -》状态压缩 + 哈希表
1. 状态压缩 =》「超赞字符串」即压缩为
 * @param s
 * @returns
 */
function longestAwesome(s: string): number {
	return 1;
}

export default longestAwesome;
