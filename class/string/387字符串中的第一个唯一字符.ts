/**
387. 字符串中的第一个唯一字符

给定一个字符串 s ，找到 它的第一个不重复的字符，并返回它的索引 。如果不存在，则返回 -1 。

分析：
最直观解法
用 map 先统计每个字符出现的次数
再从头遍历找到第一个唯一字符的下标即可

空间复杂度 O(n)，时间复杂度 O(2n)

优化思考：时间和空间都几乎没有可优化的地方了，但是有些巧妙的做法

利用队列


 * 
 */

function firstUniqChar(s: string): number {
	const map = new Map<string, number>();
	for (const char of s) {
		if (map.has(char)) {
			map.set(char, (map.get(char) as number) + 1);
		} else {
			map.set(char, 1);
		}
	}
	for (let i = 0; i < s.length; i++) {
		if (map.get(s[i]) === 1) {
			return i;
		}
	}
	return -1;
}
