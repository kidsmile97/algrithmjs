/**
139. 单词拆分

给你一个字符串 s 和一个字符串列表 wordDict 作为字典。如果可以利用字典中出现的一个或多个单词拼接出 s 则返回 true。

注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。

输入: s = "leetcode", wordDict = ["leet", "code"]
输出: true

输入: s = "codecode", wordDict = ["leet", "code"]
输出: true

分析：

1. 由单词拼接的字符串有什么特点？
- 单词在字符串中出现，一定是按单词一串串出现的，即切割后会形成一个个单词，单词内的字符是存在顺序的，这个顺序由这个单词唯一确定

暴力解法一：

根据这个特点可以得到一种解决方法

按顺序切割字符串的方式：

s = 'abcdefg', dict = ['abc', 'abcd', 'efg']

1. 切割 s 为 [a, bcdefg]，遍历 dict 寻找 a；不存在则继续往前切割
2. 切割 s 为 [ab, cdefg]，遍历 dict 寻找 ab；不存在则继续往前切割
3. 切割 s 为 [abc, defg]，遍历 dict 寻找 abc；存在，则递归把剩余 defg 当成新的 s 继续切割 
4. 第3步不成立，继续切割 s 为 [abcd, efg]，存在 abcd ，递归判断 efg 可以拼接，true
5. 如此假设一直切割到 abcdefg 都不行，则 false


分析暴力解法问题：
1. 递归，递归能不用尽量不用，因为在不知道可能的递归量级前提下，递归是很容易造成栈溢出的
2. 时间复杂度 (O(s.len * dict.len) + O((s.len - 1) * dict.len) + .... + O(dict.len)) * s.len => O(m^3 * n)

例如：leetcode提交给出的超时案例

s =
"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"

dict = ["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"]

这里在第一个 a 切割产生了难以想象的递归层数，并且观察即可知最后结果是 false，基本可以说是最差的情况了（更差可以继续往 dict 加上等同于 s.len - 1 的 a）。

根据暴力解法一有没有什么优化方案，或者需要换个思路吗？

没有，递归法核心是逐个单词判断能否最终组成字符串，则剩余递归判断是不可少的，需要转换思路思考问题。

解法二：动态规划法解析

这道题如何能想到要用动态规划呢？

首先一定要记住，动态规划的核心
1. 是利用前置结果算出后置，即状态转移方程
2. 如果前置是最优，保证了后置也是最优，那最终结果也是最优

注意，1 和 2 是有顺序的，即 1 的优先级是要高的。因为假设题目并不要求结果最优，那 2 其实是没有必要的，只要有 1 就可以用动态规划，比如本题。

那么怎么知道本题有 1 的特性呢？

根据 分析1 可知，字符串是由一个个串组合起来的，那么假设目标 s 可以拼出，则肯定存在 1 + 2 + 3 = 123 的关系（这里数字代表子串），即形成状态转移方程

s(0, i) + s(i, s.len) = s(0, s.len)，其中 0-s.len 可以分出 i、j、k...

如何设计转移方程？

假设目标 s 可以拼接出来，根据规则，有子串 s[0, i] + dict[x] = s，而且子串也可以按照同样规则拆分

所以有状态转移方程

dp(i) = dp(x) && dict.includes(s[x, s.len])，其中 dp(x) 代表 dp(0) - dp(i-1) 中，能够被 dict 拼接出来的各个子串，不能拼接的子串应该忽略

采用左闭右开的默认设置
s.slice(0, 0) = ''  =>  dp(0) = true
s.slice(0, 1) = s[0]  => dp(1) = dict.includes(s[0])

 */

/** 暴力解法一 */
function _wordBreak(s: string, wordDict: string[]): boolean {
	for (let i = 1; i <= s.length; i++) {
		const left = s.slice(i);
		if (wordDict.includes(s.slice(0, i)) && (left === '' || wordBreak(left, wordDict))) {
			return true;
		}
	}
	return false;
}
/** 暴力解法一 */

/** 动态规划法 */
function wordBreak(s: string, wordDict: string[]): boolean {
	const dpres: boolean[] = [true];
	// 优化 dict.includes 判断过程
	const dictSet: Set<string> = new Set();
	let maxWord = 0;
	for (const word of wordDict) {
		dictSet.add(word);
		if (word.length > maxWord) {
			maxWord = word.length;
		}
	}
	for (let i = 1; i <= s.length; i++) {
		dpres.push(false);
		for (let j = i - 1; i - j <= maxWord && j >= 0; j--) {
			if (dpres[j] && dictSet.has(s.slice(j, i))) {
				dpres[i] = true;
				break;
			}
		}
	}
	return dpres.pop() as boolean;
}
/** 动态规划法 */

export default wordBreak;
