import wordBreak from './139单词拆分';
import minSkips from './1883准时抵达会议现场的最小跳过休息次数';

test('139 单词拆分', () => {
	expect(wordBreak('leetcode', ['leet', 'code'])).toBe(true);
});

test('1883 准时抵达会议现场的最小跳过休息次数', () => {
	expect(minSkips([1, 3, 2], 4, 2)).toBe(1);
	expect(minSkips([7, 3, 5, 5], 2, 10)).toBe(2);
});
