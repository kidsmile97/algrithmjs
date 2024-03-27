/**
2071. 你可以安排的最多任务数目

给你 n 个任务和 m 个工人。每个任务需要一定的力量值才能完成，需要的力量值保存在下标从 0 开始的整数数组 tasks 中，第 i 个任务需要 tasks[i] 的力量才能完成。

每个工人的力量值保存在下标从 0 开始的整数数组 workers 中，第 j 个工人的力量值为 workers[j] 。

每个工人只能完成 一个 任务，且力量值需要 大于等于 该任务的力量要求值（即 workers[j] >= tasks[i] ）。

除此以外，你还有 pills 个神奇药丸，可以给 一个工人的力量值 增加 strength 。你可以决定给哪些工人使用药丸，但每个工人 最多 只能使用 一片 药丸。

给你下标从 0 开始的整数数组tasks 和 workers 以及两个整数 pills 和 strength ，请你返回 最多 有多少个任务可以被完成。


分析：
题目逻辑描述较多，提取关键字

tasks: number[]
workers: number[]
pills 药物个数
strength 药物提升量

一个工人只能完成一个任务，即忽略任务力量值

n 个工人，m 个任务，最多完成 n > m ? m : n

没有思考方向，以下为题目提示：

提示 1

  如果我们已经知道「一定」可以完成 k 个任务，那么：

  我们可以在 tasks 中选择 k 个值最小的任务；

  我们可以在 workers 中选择 k 个值最大的工人。

提示 2

  如果我们可以完成 k 个任务，并且满足提示 1，那么一定可以完成 k−1 个任务，并且可以选择 k−1 个值最小的任务以及 k−1 个值最大的工人，同样满足提示 1。

思考提示：

提示 1 结合问题可知，问题的目标是寻找最大的 k。
仔细思考 k 的含义
1. tasks 中最小的 k 个任务
2. workers 中最大的 k 个工人
根据这两个特点，则 k 可以平替为 tasks 、worker 中的一个下标，此时只有一个要求，即 tasks 、workers 是有序的，前 k 个 task 和 worker 就是目标值

结合提示2可知，在 k 满足后，比 k 小的肯定都满足，可以忽略，则此时可以使用二分法在数组中直接寻找最大的下标 k
1. 不断二分，直到 start

如何判断当前 k 是否满足题中可以完成任务的要求？

核心的想法就是把任务按 大到小完成 即可，原则就是尽量避免浪费，选择能完成任务的最小的工人
则有当前任务 t 
1. 存在工人可以直接完成，则选择最小可以直接完成的工人
2. 没有工人可以直接完成，选择最小吃药后可以完成的工人
3. 最大工人吃药还是完成不了，即当前 k 不符合要求
！！！提示注意药的数量

首先我们知道判断完成后只会出现以下两种情况：
1. 当前 k 可以完成任务要求，则最大的 k 应该在数组右边
2. 当前 k 不可以完成，则目标 k 应该在数组左边

最后补充：

其实本问题第一反应应该有一个暴力解的想法，就是把任务从小到大逐个测试，没当任务增加一个，判断能否完成任务，直到出现不可完成的，即找到最大可完成任务数

 */

/** 算法应该正确，但是 check 过程耗时太多，存在用例超出时间限制无法通过提交 */
function __maxTaskAssign(tasks: number[], workers: number[], pills: number, strength: number): number {
	// 任务从小到大排列
	tasks.sort((a: number, b: number) => a - b);
	// 工人值从大到小排列
	workers.sort((a: number, b: number) => b - a);
	// 判断当前 k 是否满足要求（前 k 个工人是否能完成前 k 个任务）
	const check = (k: number) => {
		let curPills = pills;
		let curWorkers = workers.slice(0, k + 1);
		// 遍历耗时，但不可避免，必须保证所有任务都能完成
		for (let i = k; i >= 0; i--) {
			if (curWorkers[0] >= tasks[i]) {
				curWorkers.shift(); // 数组操作耗时
			} else if (curPills > 0) {
				let minWorkerIndex = i;
				// 遍历耗时
				for (let j = 0; j <= i; j++) {
					if (curWorkers[j] + strength < tasks[i]) {
						minWorkerIndex = j - 1;
						break;
					}
				}
				if (minWorkerIndex < 0) {
					return false;
				} else {
					curWorkers.splice(minWorkerIndex, 1); // 数组操作耗时
					curPills--;
				}
			} else {
				return false;
			}
		}
		return true;
	};

	let left = 0;
	let right = Math.min(tasks.length - 1, workers.length - 1);
	let res = -1;

	while (left <= right) {
		const mid = (left + right) >> 1;
		if (check(mid)) {
			res = mid;
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	return res + 1;
}
/** 算法应该正确，但是 check 过程耗时太多，超出时间限制无法通过提交 */

function maxTaskAssign(tasks: number[], workers: number[], pills: number, strength: number): number {
	tasks.sort((a, b) => a - b);
	workers.sort((a, b) => b - a);

	const check = (k: number): boolean => {
		const curWorkers: number[] = [];
		let curWorkersPtr = 0;
		let workerPtr = 0;
		let curPills = pills;
		for (let i = k; i >= 0; i--) {
			while (workerPtr <= k && workers[workerPtr] + strength >= tasks[i]) {
				curWorkers.push(workers[workerPtr]);
				workerPtr++;
			}
			if (curWorkers[curWorkersPtr] >= tasks[i]) {
				curWorkersPtr++;
			} else if (curPills > 0 && curWorkers.length > 0) {
				curWorkers.pop();
				curPills--;
			} else {
				return false;
			}
		}
		return true;
	};

	let res = -1;
	let left = 0;
	let right = Math.min(tasks.length - 1, workers.length - 1);
	while (left <= right) {
		let mid = (left + right) >> 1;
		if (check(mid)) {
			res = mid;
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}
	return res + 1;
}

export default maxTaskAssign;
