/**
 * 
现场编程题题目内容：
请设计并实现一个函数，入参1：一个未排序的整数数组，其中可能存在重复数值。要求在数组中查找重复出现次数最多的数值，如果存在多个数值的重复出现次数一样多，则返回数值最大的那个。
举例1：入参 [1,2,3,2,3] ,返回值：3；
举例2：入参 [1,2,1,3,2,1,3] ,返回值：1；
要求：
（1）有完整的函数定义，包括函数名、输入参数、返回值。
（2）函数内部不要写具体测试用例，可以使用main函数或单元测试框架对函数进行测试。
（3）性能约束：要求时间复杂度不超过O(N).
（4）可以假设数组中总是存在数值的，且数值不超过32位有符号整数范围。
（5）请独立完成题目，不在答题期间查阅外部资料；答题时间请控制在30分钟以内。

 */

const maxRepeact = (arr: number[]) => {
	const map = new Map<number, number>();
	arr.forEach((item) => {
		if (map.has(item)) {
			map.set(item, (map.get(item) as number) + 1);
		} else {
			map.set(item, 1);
		}
	});
	let max = arr[0];
	let maxTime = map.get(max) as number;
	for (let key of map.keys()) {
		const times = map.get(key) as number;
		if (times > maxTime || (key > max && times == maxTime)) {
			max = key;
			maxTime = times;
		}
	}
	return max;
};

test('test', () => {
	expect(maxRepeact([1, 2, 1, 3, 2, 1, 3])).toBe(1);
	expect(maxRepeact([1, 2, 1, 3, 2, 1, 3, -1, -1, -1])).toBe(1);
	expect(maxRepeact([1, 2, 1, 3, 2, 1, 3, -1, -1, -1, -1])).toBe(-1);
	expect(maxRepeact([1, 2, 3, 2, 3])).toBe(3);
});
