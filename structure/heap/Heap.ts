/**
 * 堆实现
 * 默认实现是最小堆
 * 通过改变内部 compare 即可变更为最大堆
 * 支持复杂结构元素，但需要提供比较器
 * */

import Comparator from '@utilClass/Comparator';

class Heap<T = number> extends Comparator<T> {
	private _data: T[] = [];
	private _size: number = 0;

	get size() {
		return this._size;
	}

	private __swap(i: number, j: number) {
		const temp = this._data[i];
		this._data[i] = this._data[j];
		this._data[j] = temp;
	}

	// 从数组开始初始化堆
	private __init(d: T[]) {
		this._size = d.length;
		for (let i = 0; i < this._size; i++) {
			this._data[i] = d[i];
		}
		this.heapify();
	}

	private __shiftDown(index: number) {
		let fatherIndex = index;
		let leftIndex = index * 2 + 1;
		while (leftIndex < this._size) {
			const rightIndex = leftIndex + 1;
			const largestIndex =
				rightIndex < this._size && this.compare(this._data[rightIndex], this._data[leftIndex]) < 0
					? rightIndex
					: leftIndex;
			const compareRes = this.compare(this._data[fatherIndex], this._data[largestIndex]);
			if (compareRes <= 0) {
				break;
			} else {
				this.__swap(fatherIndex, largestIndex);
				fatherIndex = largestIndex;
				leftIndex = largestIndex * 2 + 1;
			}
		}
	}

	private __shiftUp(index: number) {
		let fatherIndex = (index - 1) >> 1;
		let selfIndex = index;
		while (fatherIndex >= 0) {
			const compareRes = this.compare(this._data[selfIndex], this._data[fatherIndex]);
			if (compareRes >= 0) break;
			this.__swap(selfIndex, fatherIndex);
			selfIndex = fatherIndex;
			fatherIndex = (fatherIndex - 1) >> 1;
		}
	}

	constructor(data?: T[], comparator?: (a: T, b: T) => number) {
		super(comparator);
		if (data) {
			this.__init(data);
		}
	}

	/** 整理堆 */
	heapify(): Heap<T> {
		for (let i = this._size - 1; i >= 0; i--) {
			this.__shiftDown(i);
		}
		return this;
	}

	/**
	 * 入堆
	 * @param d 入堆数据
	 * @return void
	 */
	push(d: T): Heap<T> {
		this._data[this._size] = d;
		this.__shiftUp(this._size);
		this._size++;
		return this;
	}

	/** 查看堆顶元素 */
	top(): T | undefined {
		if (this._size > 0) {
			return this._data[0];
		}
		return undefined;
	}

	/** 出堆 */
	pop(): T | undefined {
		if (this._size > 0) {
			const res = this._data[0];
			this._size--;
			this._data[0] = this._data[this._size];
			this.__shiftDown(0);
			return res;
		}
		return undefined;
	}

	/** 清空堆，并按顺序返回元素素组 */
	clear(): T[] {
		let result: T[] = [];
		while (this._size > 0) {
			result.push(this.pop() as T);
		}
		this._data = [];
		return result;
	}
}

export default Heap;
