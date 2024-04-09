/**
936. 戳印序列

你想要用小写字母组成一个目标字符串 target。 

开始的时候，序列由 target.length 个 '?' 记号组成。而你有一个小写字母印章 stamp。

在每个回合，你可以将印章放在序列上，并将序列中的每个字母替换为印章上的相应字母。你最多可以进行 10 * target.length  个回合。

举个例子，如果初始序列为 "?????"，而你的印章 stamp 是 "abc"，那么在第一回合，你可以得到 "abc??"、"?abc?"、"??abc"。（请注意，印章必须完全包含在序列的边界内才能盖下去。）

如果可以印出序列，那么返回一个数组，该数组由每个回合中被印下的最左边字母的索引组成。如果不能印出序列，就返回一个空数组。

例如，如果序列是 "ababc"，印章是 "abc"，那么我们就可以返回与操作 "?????" -> "abc??" -> "ababc" 相对应的答案 [0, 2]；

另外，如果可以印出序列，那么需要保证可以在 10 * target.length 个回合内完成。任何超过此数字的答案将不被接受。


分析：

问题精简
1. 长序列目标字符串，短序列字符串，使用短串拓印出长串
2. 短串不能超出长串边界
3. 要求拓印次数最少，而且不能超过 10 * target.length 个回合

边界分析：
1. 长串 target 和短串 stamp 的首尾字母必须一致，target 不能包含 stamp 之外的字符（这个应该在拓印的过程中验证，而不是直接扫描验证），否则不可能拓印成功
2. 根据 stamp 刻印流程，最后一次拓印必然是一个完整的 stamp 刻印
3. 10 * target.length 是否存在什么逻辑说法？

刻印分析：
1. 有两次刻印是可以确定存在的，[0, target.length - stamp.length]，分别对应目标字符串两端的首尾字符
2. 最后一次刻印必然是会在目标串上留下一个完整的 stamp 串，因为最后一次刻印必然处于最上层
3. 假设末尾空间无限长，stamp 足够短，stamp 在某个固定位置能刻印出的不同子串最多有 stamp.length 种。比如 `abc` 在 [0, 3) 只能刻印出 `abc` | `aab` | `aba`
如果 stamp 存在重复子串，能刻印的不同子串只会更少


解法1

逆推：由最后一次刻印一定是完整的 stamp，可以逐步往回删除刻印

由于刻印是可以多层覆盖的，但是因为底下的已经被覆盖，所以其实被覆盖的位置原来是什么都不重要，即可以假定为任意字符

解法的核心是如何设计循环代码？

循环结束的标记是什么？

是本解题思路的重难点

 */

function movesToStamp(stamp: string, target: string): number[] {
	const res: number[] = [];
	// 作为最简单的判断方法，优化整体代码执行
	if (target[0] !== stamp[0] || target[target.length - 1] !== stamp[stamp.length - 1]) return res;

	// 标记相应位置是否已刻印'?'
	const targetRes = new Array(target.length).fill(false);
	// 记录每个子串剩余未刻印内容
	const indexStack: Array<Set<number> | null> = new Array(target.length - stamp.length + 1)
		.fill(0)
		.map(() => new Set<number>());

	for (let i = 0; i <= target.length - stamp.length; i++) {
		for (let j = 0; j < stamp.length; j++) {
			if (target[i + j] !== stamp[j]) {
				(indexStack[i] as Set<number>).add(i + j);
			}
		}
	}

	let k = 0;
	while (k < indexStack.length) {
		if (indexStack[k] !== null) {
			for (const t of indexStack[k]!.values()) {
				if (targetRes[t]) {
					indexStack[k]!.delete(t);
				}
			}
			if (indexStack[k]!.size == 0) {
				res.unshift(k);
				for (let i = 0; i < stamp.length; i++) {
					targetRes[i + k] = true;
				}
				indexStack[k] = null;
				k = 0;
			} else {
				k++;
			}
		} else {
			k++;
		}
	}

	return targetRes.includes(false) ? [] : res;
}

export default movesToStamp;
