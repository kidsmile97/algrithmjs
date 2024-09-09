/**
295. 数据流的中位数

中位数是有序整数列表中的中间值。如果列表的大小是偶数，则没有中间值，中位数是两个中间值的平均值。

例如 arr = [2,3,4] 的中位数是 3 。
例如 arr = [2,3] 的中位数是 (2 + 3) / 2 = 2.5 。
实现 MedianFinder 类:

MedianFinder() 初始化 MedianFinder 对象。

void addNum(int num) 将数据流中的整数 num 添加到数据结构中。

double findMedian() 返回到目前为止所有元素的中位数。与实际答案相差 10-5 以内的答案将被接受。

 */

import Heap from '@structure/heap/Heap';

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

// 时间复杂度 O(n) 冒泡排序
class _MedianFinder {
	_data: number[];
	constructor() {
		this._data = [];
	}

	addNum(num: number): void {
		this._data.push(num);
		for (let i = this._data.length - 1; i > 0; i--) {
			let pre = i - 1;
			if (this._data[i] < this._data[pre]) {
				const temp = this._data[i];
				this._data[i] = this._data[pre];
				this._data[pre] = temp;
			}
		}
	}

	findMedian(): number {
		const n = this._data.length;
		return (this._data[n >> 1] + this._data[(n - 1) >> 1]) / 2;
	}
}

// 堆排序
class MedianFinder {
	minQueue: Heap<number>;
	maxQueue: Heap<number>;
	constructor() {
		this.minQueue = new Heap<number>([], (a, b) => b - a);
		this.maxQueue = new Heap<number>([]);
	}

	addNum(num: number): void {
		this.minQueue.push(num);
		const leftTop = this.minQueue.top();
		const rightTop = this.maxQueue.top();
		if (this.minQueue.size - this.maxQueue.size > 1 || (leftTop && rightTop && leftTop > rightTop)) {
			this.maxQueue.push(this.minQueue.pop() as number);
		}
	}

	findMedian(): number {
		const leftTop = this.minQueue.top();
		const rightTop = this.maxQueue.top();
		if (leftTop) {
			if (this.minQueue.size > this.maxQueue.size) {
				return leftTop;
			} else {
				return (leftTop + (rightTop as number)) / 2;
			}
		}
		return 0;
	}
}

export default MedianFinder;
