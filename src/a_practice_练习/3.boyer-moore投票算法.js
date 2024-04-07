/**

boyer-moore 多数投票算法

所谓多数，即投票的多数人是一致的，多数指起码超过一半的

严格的数学证明非专业不建议，大概的原理如下示例

[1, 3, 2, 3, 4, 3, 5, 3, 3] => 3 代表多数

一个计数器 count = 0

一个代表多数的 mode

遍历数组元素

当 count = 0 时，自动认为当前元素为众数 mode，并且 count ++

若当前元素 != mode，count --

大致原理是假设 mode 从最初就是正确的那个众数，那么遍历一遍后，计数器 count 经过相等时 ++ 和不等的 -- 的操作后仍会大于 0 （基于多数的定义）

类似于相抵消的感觉，那么在 count = 0 的时候，代表前面所有的数都已经抵消了

至于 mode 不确定，怎么确认前面的数是由真正的 mode 所抵消的，其实不需要证明，因为 mode 有一半以上

最差的情况就是前面所有的不同于 mode 的数都是由 mode 抵消的，即便这样最终 count 仍能保持 > 0

不是由 mode 抵消的，那就更不用担心了，不同的数之间的抵消，只会让 count 变大，仍不会改变 mode 的最终值

 * 
 */

module.exports = (arr) => {
	let count = 0;
	let mode = 0;

	arr.forEach((item) => {
		if (count == 0) {
			mode = item;
		}
		if (mode == item) {
			count++;
		} else {
			count--;
		}
	});

	return mode;
};
