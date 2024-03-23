import removeDuplicateLetters from './316去除重复字母';

test('316 去除重复字母', () => {
	expect(removeDuplicateLetters('bcabc')).toEqual('abc');
	expect(removeDuplicateLetters('cbacdcbc')).toEqual('acdb');
	expect(removeDuplicateLetters('bbcaac')).toEqual('bac');
});
