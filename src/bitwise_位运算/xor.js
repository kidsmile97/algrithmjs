/**
 *
异或运算符，也称之为不进位加法

（1）交换律  a ^ b = b ^ a
（2）结合律  a ^ b ^ c = a ^ (b ^ c)

- x ^ 0 = x
- x ^ x = 0

## 异或运算的特性
1. a ^ a = 0；任何数与其自身异或，得到的结果为0
2. a ^ 0 = a; 任何数与 0 异或，得到的结果为自身
3. a ^ b = b ^ a；异或运算满足交换率
4. a ^ (b ^ c) = (a ^ b) ^ c；异或运算满足结合率

 *
 */

// 应用 1：数值交换
const exchange = ({ a, b }) => {
	a = a ^ b;
	b = a ^ b;
	a = a ^ b;
	return { a, b };
};

// 加法实现器
const plus = (a, b) => {
	if (a == 0) {
		return b;
	}
	if (b == 0) {
		return a;
	}
	return plus(a ^ b, (a & b) << 1);
};

/**
寻找数组中唯一出现奇数次的数

出现偶数次的数因相同 异或 后会变成 0 
同时因满足结合律所以不用考虑先后顺序的问题
直接把数组内所有数异或一遍，结果即为唯一出现奇数次的数
 */
export function oddTimes(nums) {
	let num = 0;
	nums.forEach((element) => {
		num ^= element;
	});
	return num;
}

module.exports = {
	exchange,
	plus,
};
