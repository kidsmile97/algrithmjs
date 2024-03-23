/**
316. 去除重复字母
给你一个字符串 s ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 返回结果的字典序最小（要求不能打乱其他字符的相对位置）。

输入：s = "bcabc"
输出："abc"

输入：s = "cbacdcbc"
输出："acdb"

分析：

两个核心：

1. 什么是字典序？

	(1) 字典序：又称`字母序`，指英文单词在字典中的先后顺序，计算机领域扩展为两个字符串的大小关系

	(2) 两字符串大小关系比较，是按顺序逐个字符比较，小的在前，相同时比较下一个字符，字符大小（a-zA-Z）是按照 ASCII 表：A-Z(65-90) a-z(97-122)

	(3) 由此可见：要想字典序小，核心原则就是让小的字符尽量靠前。

2. 一个字符串移除哪一个字符，达成字典序最小？

	(1) 逐步思考，先让一个字符串移除一个字符，然后和原字符串比较，要小于原串

按照逐位比较的字典序比较方法，那移除的字符串应该有一个特点，就是移除位要比下一位字符要大（ abc <=> ac ），因为 s[i] 移除后，原串就是 s[i] 和 s[i+1] 比较

所以只要移除的 s[i] 比 s[i+1] 大，那移除后新串就一定小于原串

	(2) 移除一个字符后新串如何达到最小？

b d a d c

该字符串中，存在 d>a d>c 两个组合，由( 2.(1) )思考可知，只有去掉 第二个 d 或者 第一个 d 才能让字符串变小，所以肯定是在这里面选择一个

选择哪一个？答案是最靠前的那一个。即下标最小的那一个。

因为干掉越靠前的，小的 s[i+1] 才能更靠前，整体字符串才能更小（理论来自于 1 ）

题外：如果不存在 s[i] > s[i+1]，则去掉最后一个即可，因为去掉中间的任意一个都会使得大的字符靠前，字符串字典序变大

分析总结：
一个字符串去掉一个字符，剩下字典序最小
=>
在一个字符串中，找到所有 s[i] > s[i+1] 的组合，去掉 i 最小的字符

3. 回到题目

根据以上理论，有一个直观的实现思路

（！！！！！！证实已错误，错误问题出现在步骤(4)，因为步骤(4)最后才去除重复字符，会改变最优结果状态，无法达到题目的最优结果）

(1) 找到所有 s[i] > s[i+1]，然后从 i 最小开始，判断 s[i] 是否存在重复，重复去掉 s[i]

(2) 去掉 s[i] 后，剩余字符串，重复 1 过程

(3) 不存在 s[i] > s[i+1] 或者没有重复字符之后停止循环

(4) 遍历字符串，重复字符去掉后面的，得到最后结果

题外：javascript 支持字母的直接比较，即 a > b = false

 */

/**
 * 正确解法
 * @param s
 */
function removeDuplicateLetters(s: string): string {
	const repeat = new Map<string, number>();
	// 记录重复字符个数，即超过一个的都是需要扔掉的
	for (const char of s) {
		if (repeat.has(char)) {
			repeat.set(char, (repeat.get(char) as number) + 1);
		} else {
			repeat.set(char, 1);
		}
	}
	// 记录该字符是否已经算进结果里面
	const stackFlag = new Set<string>();
	// 子串结果集
	const res: string[] = [];
	for (const char of s) {
		if (!stackFlag.has(char)) {
			/**
			 * 如果当前字符不在结果集内
			 * 1. 结果集不为空
			 * 2. 结果集最后字符比当前字符大
			 * 3. 结果集最后字符是可以抛弃的字符
			 * 则扔掉结果集最后一个字符，再重复当前过程，直到不能同时符合三种情况，把当前字符塞到结果集最后
			 */
			let top = res[res.length - 1];
			while (top && top > char && (repeat.get(top) as number) > 1) {
				res.pop();
				stackFlag.delete(top);
				repeat.set(top, (repeat.get(top) as number) - 1);
				top = res[res.length - 1];
			}
			res.push(char);
			stackFlag.add(char);
		} else {
			// 结果集内已经有当前字符，直接抛弃
			repeat.set(char, (repeat.get(char) as number) - 1);
		}
	}
	return res.join('');
}

export default removeDuplicateLetters;
