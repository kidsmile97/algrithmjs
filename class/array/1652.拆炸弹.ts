/**
1652. 拆炸弹

你有一个炸弹需要拆除，时间紧迫！你的情报员会给你一个长度为 n 的 循环 数组 code 以及一个密钥 k 。

为了获得正确的密码，你需要替换掉每一个数字。所有数字会 同时 被替换。

如果 k > 0 ，将第 i 个数字用 接下来 k 个数字之和替换。
如果 k < 0 ，将第 i 个数字用 之前 k 个数字之和替换。
如果 k == 0 ，将第 i 个数字用 0 替换。
由于 code 是循环的， code[n-1] 下一个元素是 code[0] ，且 code[0] 前一个元素是 code[n-1] 。

给你 循环 数组 code 和整数密钥 k ，请你返回解密后的结果来拆除炸弹！

示例 1：

输入：code = [5,7,1,4], k = 3
输出：[12,10,16,13]
解释：每个数字都被接下来 3 个数字之和替换。解密后的密码为 [7+1+4, 1+4+5, 4+5+7, 5+7+1]。注意到数组是循环连接的。


输入限定提示：

n == code.length
1 <= n <= 100
1 <= code[i] <= 100
-(n - 1) <= k <= n - 1

 */

// 直接题目模拟
function _decrypt(code: number[], k: number): number[] {
	const len = code.length;
	const res = new Array(len).fill(0);
	if (k > 0) {
		for (let i = 0; i < len; i++) {
			let j = k;
			while (j > 0) {
				let index = i + j;
				index = index >= len ? index - len : index;
				res[i] += code[index];
				j--;
			}
		}
	} else if (k < 0) {
		for (let i = 0; i < len; i++) {
			let j = k;
			while (j < 0) {
				let index = i + j;
				index = index < 0 ? index + len : index;
				res[i] += code[index];
				j++;
			}
		}
	}
	return res;
}

// 滑动窗口
const getIndex = (i: number, len: number) => {
	if (i >= len) {
		return i - len;
	}
	if (i < 0) {
		return i + len;
	}
	return i;
};
function decrypt(code: number[], k: number): number[] {
	const len = code.length;
	const res = new Array(len).fill(0);
	if (k == 0) return res;
	let left = 0;
	let right = k - 1;
	if (k < 0) {
		left = k - 1;
		right = -2;
	}
	let sumk = 0;
	for (let i = left; i <= right; i++) {
		sumk += code[getIndex(i, len)];
	}
	for (let i = 0; i < len; i++) {
		sumk -= code[getIndex(left++, len)];
		sumk += code[getIndex(++right, len)];
		res[i] = sumk;
	}
	return res;
}

export default decrypt;
