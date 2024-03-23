/**
402. 移掉 K 位数字

给你一个以字符串表示的非负整数 num 和一个整数 k ，移除这个数中的 k 位数字，使得剩下的数字最小。请你以字符串形式返回这个最小的数字。

num = "123456789", k = 3
res: "123456"

num = "1432219", k = 3
res: "1219"

num = "214932219", k = 3
res: "132219"

分析：
数字移除后大小会与什么有关？
1. 长度为 n 的数字 num 移除 k 个数字后，一定是一个 (n-k) 位数
2. 使其最小，由于剩余数是一个固定位数的数字，而数字大小有个显著的特点，与位置相关，是一种带权重的数位。
由此可以知道，前一位大 1 也比后一位大 9 的影响要大得多（参考数字的桶排序），因此，只要尽量让前面的数字是最小的，剩余数绝对是最小的

总结：核心就是尽量让小的往前靠

解法1：
暴力解法，直接获取所有移除 k 个数的可能结果，排序后输出
- 可能的结果有`(组合公式)C(n, k)`种，再排序

 */

/** 压栈法 */
function removeKdigits(num, k) {
	const stack = [];
	for (const digit of num) {
		while (stack.length > 0 && digit < stack[stack.length - 1] && k > 0) {
			stack.pop();
			k--;
		}
		stack.push(digit);
	}
	while (k > 0) {
		stack.pop();
		k--;
	}
	while (stack[0] === '0') {
		stack.shift();
	}
	return stack.join('') || '0';
}
