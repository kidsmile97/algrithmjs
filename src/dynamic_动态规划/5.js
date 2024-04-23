/**
5. 最长回文子串

给定一个字符串，找出其中的最长回文子串

回文字符串：顺序倒序完全一样的字符串，称之为回文字符串

babad
=>
bab || aba

分析：
1. 单个字符为回文字符串
2. 目标是寻找回文字符串，从确定的步骤 => 回文字符串判断入手，根据判断过程的实现来思考具体算法设计
回文字符串有几个判断方法
- 直接反转字符串，与原字符串比较
- 确定开始 0 和结束 len-1 两个指针，开始指针++，结束指针-- 逐位置判断字符串是否相等，不等直接判断不为回文字符串
- for 循环单指针法，结束指针可以直接根据开始指针计算得出，本质同方法二
3. 根据特性和判断方法思考如何在一个长串中寻找回文字符串



- 暴力解法( 时间：O(n!)，空间：O(1) )
假设每一个字符子串都是回文字符串加以验证，从头到尾开始，所需循环次数 (n+1)n/2 次，每次验证需要再遍历，即 O(n！)
  + 优化方案：寻找最大，每次可以从当前已经得到的最大长度下标开始，减少循环次数



- 动态规划( 时间：O(n^2)，空间 O(n^2) )
回文串特点：回文字符串（len > 2）去掉首尾两个字符后，剩下的中间子串肯定也是一个回文字符串
这里就拥有了动态规划的基本条件，存在子结构的特性

1. 思考：如何让子结构的结果运用到运算过程中，简化运算过程，即确定状态转移方程
dp(i, j) i 到 j 位置的字符子串是否为回文串
dp(i, j) = dp(i-1, j-1) && str[i] == str[j]

2. 核心难点思考，如何适当循环能使用到状态转移方程，又怎么去让循环能覆盖所有的子字符串
观察状态转移方程，转移是从长的字符串向短的转移，所以用子串长度来遍历最为合适，按照子串长度从短到长遍历

3. 边界、初始状态确定
- 长度 1 都为回文串 dp(i,i) = true
- 长度 2 s[i]==s[j] 为回文串 dp(i, i+1) = (s[i] == s[i+1])



- 中心扩散法( 时间：O(n^2)，空间 O(1) )
相当于动态规划的同步方法，长度 1、2 的字符串是动态规划的边界情况，循环遍历的时候以这两种为回文中心直接向外拓展，而不是一步步按照回文串长度向外验证，寻找最长回文串即可
存在问题
1. 如何恰当得设计向外扩展，设计的方法是兼容 1、2 的情况还是不同情况分开设计
2. 如何把向外扩展验证的结果恰当的返回并保存下来，怎么计算最合适
3. 下面实现的方法抄袭了答案的实现，个人建议先分开设计更容易掌控边界情况，代码多了点不过逻辑会清晰一点，然后再考虑优化代码


- Manacher 算法，一个复杂的 O(n) 算法，很难也很🐮
 */

/** 动态规划 */
function longestPalindrome(s) {
	// 使用一个 n * n 矩阵保存每次验证结果
	const n = s.length;
	const res = new Array(n).fill(0).map(() => new Array(n).fill(false));
	let target = s[0];
	// 所有单字符都是回文串
	for (let i = 0; i < n - 1; i++) {
		res[i][i] = true;
		res[i][i + 1] = s[i] === s[i + 1];
		if (res[i][i + 1]) {
			target = s.substring(i, i + 2);
		}
	}
	res[n - 1][n - 1] = true;
	// 从长度 3 的子串开始
	for (let len = 3; len <= n; len++) {
		for (let j = 0; j <= n - len; j++) {
			const lastIndex = j + len - 1;
			res[j][lastIndex] = res[j + 1][lastIndex - 1] && s[j] === s[lastIndex];
			if (res[j][lastIndex] && len > target.length) {
				target = s.substring(j, lastIndex + 1);
			}
		}
	}
	return target;
}

/** 中心扩散法 */
const expandAroundCenter = (s, left, right) => {
	while (left >= 0 && right < s.length && s[left] === s[right]) {
		left--;
		right++;
	}
	return right - left - 1;
};
function longestPalindrome2(s) {
	let startIndex = 0;
	let endIndex = 0;
	for (let i = 0; i < s.length; i++) {
		// 单字母中心 aba 扩展
		const len1 = expandAroundCenter(s, i, i);
		// 双字母中心 abba 扩展
		const len2 = expandAroundCenter(s, i, i + 1);
		const maxLen = Math.max(len1, len2);
		if (maxLen > endIndex - startIndex) {
			startIndex = i - ((maxLen - 1) >> 1);
			endIndex = i + (maxLen >> 1);
		}
	}
	return s.substring(startIndex, endIndex + 1);
}

/** Manacher 算法 */

module.exports = longestPalindrome;
