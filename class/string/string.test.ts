import removeDuplicateLetters from './316去除重复字母';
import maxNumber from './321拼接最大数';

test('316 去除重复字母', () => {
	expect(removeDuplicateLetters('bcabc')).toEqual('abc');
	expect(removeDuplicateLetters('cbacdcbc')).toEqual('acdb');
	expect(removeDuplicateLetters('bbcaac')).toEqual('bac');
});

test('321 拼接最大数', () => {
	expect(maxNumber([7, 6, 1, 9, 3, 2, 3, 1, 1], [4, 0, 9, 9, 0, 5, 5, 4, 7], 9)).toEqual([9, 9, 9, 7, 3, 2, 3, 1, 1]);
	expect(maxNumber([6, 7], [6, 0, 4], 5)).toEqual([6, 7, 6, 0, 4]);
	expect(maxNumber([3, 4, 6, 5], [9, 1, 2, 5, 8, 3], 5)).toEqual([9, 8, 6, 5, 3]);
});
