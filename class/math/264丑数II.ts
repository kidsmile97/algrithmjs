/**
264. 丑数 II

给你一个整数 n ，请你找出并返回第 n 个 丑数 。

丑数 就是质因子只包含 2、3 和 5 的正整数。

数学证明以及定义：

基础丑数 [1, 2, 3, 5]

对于任意丑数 x，都有 2x, 3x, 5x 是丑数，而且除此之外均不是丑数

即所有的丑数，都是基于 1 生成的

分析：

丑数生成的特点

1. 所有丑数都是基于前面的丑数生成的（动态规划基础）
2. 一个丑数 x 可以生成 3 个丑数


 */

function nthUglyNumber(n: number): number {
	const res: number[] = [1];
	const size = n - 1;
	let i2 = -1,
		i3 = -1,
		i5 = -1;
	let next2 = 1;
	let next3 = 1;
	let next5 = 1;

	for (let i = 0; i < size; i++) {
		const pre = res[i];
		if (next2 == pre) next2 = res[++i2] * 2;
		if (next3 == pre) next3 = res[++i3] * 3;
		if (next5 == pre) next5 = res[++i5] * 5;
		let minNum = Math.min(next2, next3, next5);
		res.push(minNum);
	}

	return res[size];
}

export default nthUglyNumber;
