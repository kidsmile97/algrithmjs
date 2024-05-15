import orangesRotting from './994.腐烂的橘子';

test('', () => {
	// [[2,1,1],[1,1,0],[0,1,1]]
	expect(
		orangesRotting([
			[2, 1, 1],
			[1, 1, 0],
			[0, 1, 1],
		]),
	).toBe(4);
});
