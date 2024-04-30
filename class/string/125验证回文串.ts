/**
125. 验证回文串

如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。则可以认为该短语是一个 回文串 。

字母和数字都属于字母数字字符。

给你一个字符串 s，如果它是 回文串 ，返回 true ；否则，返回 false 。

\w 字母、数字、下划线 = [a-zA-Z0-9_]
\W 非字母、数字、下划线 = [^A-Za-z0-9_]

 */

function isPalindrome(s: string): boolean {
	const str = s.toLocaleLowerCase().replace(/[\W_]/g, '');
	let i = 0;
	let j = str.length - 1;
	while (i < j) {
		if (str[i++] !== str[j--]) {
			return false;
		}
	}
	return true;
}

export default isPalindrome;
