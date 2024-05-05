/**
 * 
题目：写一个函数，输入n，返回数列第n项的值。数列样例：0,1,1,2,3,5,8,13…

 */

// 面试时答案
const _returnN = (n: number) => {
	let p1 = 0;
	let p2 = 1;
	let res = 0;
	if (n == 1) return p1;
	if (n == 2) return p2;
	for (let i = 2; i < n; i++) {
		res = p1 + p2;
		p1 = p2;
		p2 = res;
	}
	return res;
};

// 无压时解答
const returnN = (n: number) => {
	let pre = 0;
	if (n == 0) return pre;
	let res = 1;
	for (let i = 2; i <= n; i++) {
		const temp = res;
		res += pre;
		pre = temp;
	}
	return res;
};

test('测试', () => {
	for (let i = 0; i <= 10; i++) {
		console.log(returnN(i));
	}
});
