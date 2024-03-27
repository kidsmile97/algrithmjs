import { pills, strength, tasks, workers } from './2071.example';
import maxTaskAssign from './2071你可以安排的最多任务数目';

test('2071 最多任务', () => {
	expect(maxTaskAssign([3, 2, 1], [0, 3, 3], 1, 1)).toEqual(3);
	expect(maxTaskAssign(tasks, workers, pills, strength));
});
