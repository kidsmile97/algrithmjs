/**
2981. 找出出现至少三次的最长特殊子字符串 I

给你一个仅由小写英文字母组成的字符串 s 。

如果一个字符串仅由单一字符组成，那么它被称为 特殊 字符串。例如，字符串 "abc" 不是特殊字符串，而字符串 "ddd"、"zz" 和 "f" 是特殊字符串。

返回在 s 中出现 至少三次 的 最长特殊子字符串 的长度，如果不存在出现至少三次的特殊子字符串，则返回 -1 。

子字符串 是字符串中的一个连续 非空 字符序列。

3 <= s.length <= 50
s 仅由小写英文字母组成。

## 暴力解法

统计所有 特殊字符子串 词频，返回三次以上最长者

优化：可以从最长开始统计，首次出现的词频大于三次者则为结果

## 优化解法1

再分析，是从暴力解法优化还是思考新的算法

观察特殊字符串特性
1. 仅有一个字符组成
2. 长度 n 的特殊字符串，就是目标（n-2）子串出现了 3 次，(n-1) 子串出现了 2 次，n 子串出现 1 次，

如 'aaaa' => 包含 3 个 'aa' 子串，包含 2 个 'aaa' 子串，包含 1 个 'aaaa'

根据以上特性符合题目目标子串出现情形：

所以可以直接按顺序遍历，统计 特殊字符串 出现次数，然后从中寻找最长的即可

 */

// 暴力解法，O(n^2)，不可取
function _maximumLength(s: string): number {
	const map = new Map<string, number>();
	for (let len = s.length - 2; len > 0; len--) {
		const maxI = s.length - len;
		for (let i = 0; i <= maxI; i++) {
			// 判断是否为特殊字符串
			const target = s.slice(i, i + len);
			if (target == target[0].repeat(len)) {
				if (map.has(target)) {
					const t = map.get(target)!;
					if (t > 1) return target.length;
					map.set(target, t + 1);
				} else {
					map.set(target, 1);
				}
			}
		}
	}
	return -1;
}

// 优化解法1
function maximumLength(s: string): number {
	const map = new Map<string, number>();
	let preChar = s[0];
}

export default maximumLength;
