/**
1052. 爱生气的书店老板

有一个书店老板，他的书店开了 n 分钟。每分钟都有一些顾客进入这家商店。

给定一个长度为 n 的整数数组 customers ，其中 customers[i] 是在第 i 分钟开始时进入商店的顾客数量，所有这些顾客在第 i 分钟结束后离开。

在某些时候，书店老板会生气。 如果书店老板在第 i 分钟生气，那么 grumpy[i] = 1，否则 grumpy[i] = 0。

当书店老板生气时，那一分钟的顾客就会不满意，若老板不生气则顾客是满意的。

书店老板知道一个秘密技巧，能抑制自己的情绪，可以让自己连续 minutes 分钟不生气，但却只能使用一次。

请你返回 这一天营业下来，最多有多少客户能够感到满意 。

示例：

输入：customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], minutes = 3
输出：16
解释：书店老板在最后 3 分钟保持冷静。
感到满意的最大客户数量 = 1 + 1 + 1 + 1 + 7 + 5 = 16.

## 分析

问题核心是 minutes 老板控制自身不生气时间的使用，这个时间是只能连续使用的

## 暴力解法

用滑动窗口的方式，计算所有结果然后取最大值

1. 先计算无控制满意人数
2. 每次增加 长度为 minutes 窗口内不满意的人数

 * 
 */

function maxSatisfied(customers: number[], grumpy: number[], minutes: number): number {
	const normalSatisfied = customers.reduce((total, c, index) => total + (grumpy[index] == 0 ? c : 0), 0);
	const increase: number[] = [0];
	for (let i = 0; i < minutes; i++) {
		if (grumpy[i] == 1) {
			increase[0] += customers[i];
		}
	}
	let max = increase[0];
	const slideTime = customers.length - minutes;
	for (let i = 1; i <= slideTime; i++) {
		const delIndex = i - 1;
		const plusIndex = i + minutes - 1;
		let num = increase[delIndex];
		if (grumpy[plusIndex] == 1) {
			num += customers[plusIndex];
		}
		if (grumpy[delIndex] == 1) {
			num -= customers[delIndex];
		}
		increase[i] = num;
		if (num > max) {
			max = num;
		}
	}
	return normalSatisfied + max;
}

export default maxSatisfied;
