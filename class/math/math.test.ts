import maxSatisfied from './1052爱生气的书店老板';
import nthUglyNumber from './264丑数II';

test('264. 丑数 II', () => {
	expect(nthUglyNumber(10)).toBe(12);
});

test('1052. 爱生气的书店老板', () => {
	expect(maxSatisfied([1, 0, 1, 2, 1, 1, 7, 5], [0, 1, 0, 1, 0, 1, 0, 1], 3)).toBe(16);
});
