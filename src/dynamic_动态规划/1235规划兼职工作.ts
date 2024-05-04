/**
1235. 规划兼职工作

你打算利用空闲时间来做兼职工作赚些零花钱。

这里有 n 份兼职工作，每份工作预计从 startTime[i] 开始到 endTime[i] 结束，报酬为 profit[i]。

给你一份兼职工作表，包含开始时间 startTime，结束时间 endTime 和预计报酬 profit 三个数组，请你计算并返回可以获得的最大报酬。

注意，时间上出现重叠的 2 份工作不能同时进行。

如果你选择的工作在时间 X 结束，那么你可以立刻进行在时间 X 开始的下一份工作。

## 动态规划

dp[i] 前 i 份工作的最大报酬

dp[i] = max(dp[i-1], dp[k] + profit[i])

 */

function jobScheduling(startTime: number[], endTime: number[], profit: number[]): number {
	const n = startTime.length;
	const jobs = new Array(n).fill(0).map((_, i) => [startTime[i], endTime[i], profit[i]]);
	jobs.sort((a, b) => a[1] - b[1]);
	const dp = [jobs[0][2]];
	for (let i = 1; i < n; i++) {
		let left = 0;
		let right = i - 1;
		const target = jobs[i][0];
		// 二分查找最大 endTime <= target 的工作
		while (left <= right) {
			const mid = (left + right) >> 1;
			if (jobs[mid][1] > target) {
				right = mid - 1;
			} else {
				left = mid + 1;
			}
		}
		if (right >= 0) {
			dp[i] = Math.max(dp[i - 1], dp[right] + jobs[i][2]);
		} else {
			dp[i] = Math.max(dp[i - 1], jobs[i][2]);
		}
	}
	return dp[n - 1];
}

export default jobScheduling;
