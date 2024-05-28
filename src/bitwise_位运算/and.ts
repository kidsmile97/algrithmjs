/**
& 与运算

同位为 1 则为 1，否则为 0
 */

/**
判断是否为奇数。对于所有数值的二进制，奇数一定有末位为 1 的特点
& 1 运算后
res = 1 即末位为 1，奇数（奇数 & 1 = 1）
res = 0 即末位为 0，偶数（偶数 & 1 = 0）
 * @param num 
 * @returns 
 */
export function isOdd(num: number) {
	return !!(num & 1);
}

/**
判断数组内是否存在偶数
（奇数 & 1 = 1）
（偶数 & 1 = 0）
（any & 0 = 0）
即只要数组中出现偶数，& 结果就只能是 0 
 * @param nums 
 * @returns 
 */
export function isExitEven(nums: number[]) {
	let res = 1;
	nums.forEach((num) => {
		res &= num;
	});
	return !res;
}
