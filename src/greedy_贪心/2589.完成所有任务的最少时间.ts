/**
2589. 完成所有任务的最少时间

你有一台电脑，它可以 同时 运行无数个任务。给你一个二维整数数组 tasks ，
其中 tasks[i] = [starti, endi, durationi] 表示第 i 个任务需要在 闭区间 时间段 [starti, endi] 内运行 durationi 个整数时间点（但不需要连续）。

当电脑需要运行任务时，你可以打开电脑，如果空闲时，你可以将电脑关闭。

请你返回完成所有任务的情况下，电脑最少需要运行多少秒。

输入：tasks = [[2,3,1],[4,5,1],[1,5,2]]
输出：2
解释：
- 第一个任务在闭区间 [2, 2] 运行。
- 第二个任务在闭区间 [5, 5] 运行。
- 第三个任务在闭区间 [2, 2] 和 [5, 5] 运行。
电脑总共运行 2 个整数时间点。

## 根据示例分析

任务执行有两个限制条件：
1. 存在开始结束时间段，任务必须在规定的时间段内执行
2. 任务存在执行时长，这个时长是加和，可以断续执行

问题最优描述：
在所有任务中，存在时间重合的任务一定要都执行，同时执行的任务越多，运行时间越短

## 暴力解法

每次遍历记录可以执行最多任务的时间点，在该时间点执行所有能执行的任务

刷新任务点数和时间，再遍历

直到所有的任务点数都执行完毕

 */

/** 
每次寻找可以执行最多任务的时间点，并在该时间点执行任务
思想核心是贪心算法，本质是一种暴力的贪心解法
这个算法有问题，问题是什么呢？
如何保证这样分配任务执行的最优性？
！！！❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌
 */
export function _findMinimumTime(tasks: number[][]): number {
	// 记录使用过的时间点
	let time = new Set<number>();
	tasks.sort((a, b) => a[1] - b[1]);
	while (true) {
		// 统计各个时间点可以执行的任务数
		const taskMap = new Map<number, number>();
		tasks.forEach((t) => {
			if (t[2] > 0) {
				for (let i = t[0]; i <= t[1]; i++) {
					if (!time.has(i)) {
						taskMap.set(i, (taskMap.get(i) || 0) + 1);
					}
				}
			}
		});
		if (taskMap.size == 0) {
			break;
		}
		// 查找某个最多任务的时间点
		let maxTime = 0;
		let maxTask = 0;
		taskMap.forEach((val, t) => {
			if (val > maxTask) {
				maxTime = t;
				maxTask = val;
			}
		});
		// 找到时间点后，刷新任务点数
		tasks.forEach((t) => {
			if (maxTime >= t[0] && maxTime <= t[1] && t[2] > 0) {
				t[2] -= 1;
			}
		});
		time.add(maxTime);
	}
	return time.size;
}

/**
✅✅✅✅✅✅✅✅✅✅✅✅✅
还是要使用贪心算法
核心是：尽量让任务在最后的时间完成，这样是为了后面的任务就有最大的可能利用到前面任务执行的时间，拖延症ddl(deadline)思维
1. 按任务最晚执行时间从小到大排序
2. 一个个任务执行：
（1）先减去先前执行的时间点可执行的点数
（2）剩余点数从 ddl 往前执行
时间复杂度 O(nM)，M 是任务最晚可以执行的时间点
✅✅✅✅✅✅✅✅✅✅✅✅✅
 */
function findMinimumTime1(tasks: number[][]): number {
	tasks.sort((a, b) => a[1] - b[1]);
	const runTime = new Array(tasks[tasks.length - 1][1]).fill(0);
	tasks.forEach((t) => {
		const starti = t[0];
		const endi = t[1];
		let durationi = t[2];
		durationi -= runTime.slice(starti, endi + 1).reduce((pre, cur) => cur + pre, 0);
		if (durationi > 0) {
			for (let i = endi; i >= starti && durationi > 0; i--) {
				if (runTime[i] !== 1) {
					runTime[i] = 1;
					durationi--;
				}
			}
		}
	});
	return runTime.reduce((pre, cur) => cur + pre, 0);
}

/**
findMinimumTime1 优化
核心还是让任务尽量在 ddl 完成，优化的是统计当前任务时间内，有多少时间是前面已经用来执行过任务的
 */
function findMinimumTime(tasks: number[][]): number {
	return 0;
}

export default findMinimumTime;
