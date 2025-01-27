/**
933. 最近的请求次数


写一个 RecentCounter 类来计算特定时间范围内最近的请求。

请你实现 RecentCounter 类：

RecentCounter() 初始化计数器，请求数为 0 。
int ping(int t) 在时间 t 添加一个新请求，其中 t 表示以毫秒为单位的某个时间，并返回过去 3000 毫秒内发生的所有请求数（包括新请求）。

确切地说，返回在 [t-3000, t] 内发生的请求数。

保证 每次对 ping 的调用都使用比之前更大的 t 值。

 */

class _RecentCounter {
	private happen: number[] = [];

	constructor() {}

	ping(t: number): number {
		this.happen.push(t);
		const target = t - 3000;
		let resIndex = -1;
		let left = 0;
		let right = this.happen.length - 1;
		while (left <= right) {
			const mid = (left + right) >> 1;
			if (this.happen[mid] >= target) {
				resIndex = mid;
				right = mid - 1;
			} else {
				left = mid + 1;
			}
		}
		const counter = this.happen.length - resIndex;
		this.happen = this.happen.slice(resIndex);
		return counter;
	}
}

class RecentCounter {
	private queue: number[] = [];

	constructor() {}

	ping(t: number): number {
		this.queue.push(t);
		const target = t - 3000;
		while (this.queue[0] < target) {
			this.queue.shift();
		}
		return this.queue.length;
	}
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */

export default RecentCounter;
