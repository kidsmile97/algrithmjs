/**
20. 有效括号

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。

分析：
问题简单，规律明显，可以直接利用一个栈来判断就好了，后进先出

1. 括号有左右之分，最后出现的`左`必须和最先出现的`右`对应，否则返回 false
2. 遇到`左`就进栈，遇到`右`就出栈，对应不上，或者最后栈没有清空，都返回 false

思考：
时间复杂度 O(n) ，已经是最优，空间复杂度与代码具体实现是否存在优化空间

 */

/** 初次实现，代码细节有点辣鸡 */
function __isValid(s) {
	const stack = [];
	for (let i = 0; i < s.length; i++) {
		if (/[\[\(\{]/.test(s[i])) {
			stack.push(s[i]);
		} else {
			const target = stack.pop();
			switch (s[i]) {
				case ')':
					if (target !== '(') return false;
					break;
				case '}':
					if (target !== '{') return false;
					break;
				case ']':
					if (target !== '[') return false;
					break;
				default:
					break;
			}
		}
	}
	if (stack.length > 0) {
		return false;
	}
	return true;
}

/** 优化实现 */
function isValid(s) {
	const stack = [];
	for (let i = 0; i < s.length; i++) {
		switch (s[i]) {
			case '(':
				stack.push(')');
				break;
			case '[':
				stack.push(']');
				break;
			case '{':
				stack.push('}');
				break;
			default:
				if (s[i] !== stack.pop()) return false;
				break;
		}
	}
	if (stack.length > 0) {
		return false;
	}
	return true;
}

/**
 * 效率优化
 * 数组、字符串等，用迭代器迭代回比下标更快，因为下标迭代每次都还要检查下标是否溢出
 */

// 可中断迭代器迭代
function isValidII(s) {
	const stack = [];
	const iterator = s[Symbol.iterator]();
	let itor = iterator.next();
	while (!itor.done) {
		switch (itor.value) {
			case '(':
				stack.push(')');
				break;
			case '[':
				stack.push(']');
				break;
			case '{':
				stack.push('}');
				break;
			default:
				if (itor.value !== stack.pop()) return false;
				break;
		}
		itor = iterator.next();
	}
	if (stack.length > 0) {
		return false;
	}
	return true;
}

// 自带方法的迭代器迭代，神奇的是哪怕可能存在遍历浪费，反而更快，暂时没想懂
function isValidIII(s) {
	const stack = [];
	let flag = true;
	s.split('').forEach((char) => {
		switch (char) {
			case '(':
				stack.push(')');
				break;
			case '[':
				stack.push(']');
				break;
			case '{':
				stack.push('}');
				break;
			default:
				if (char !== stack.pop()) flag = false;
				break;
		}
	});
	if (stack.length > 0) {
		return false;
	}
	return flag;
}

function isValidIIII(s) {
	const stack = [];
	for (const char of s) {
		switch (char) {
			case '(':
				stack.push(')');
				break;
			case '[':
				stack.push(']');
				break;
			case '{':
				stack.push('}');
				break;
			default:
				if (char !== stack.pop()) return false;
				break;
		}
	}
	if (stack.length > 0) {
		return false;
	}
	return true;
}
