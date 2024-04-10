import { getRandArr } from '@/utils/array';
import Heap from './Heap';

test('最小堆', () => {
	const size = Math.floor(Math.random() * 10087);
	const arr = getRandArr(size, 1000000);
	const heap = new Heap<number>(arr);
	arr.sort((a, b) => a - b);
	expect(heap.size).toBe(size);
	expect(heap.top()).toBe(arr[0]);
	expect(heap.pop()).toBe(arr[0]);
	expect(heap.pop()).toBe(arr[1]);
	expect(heap.push(0).top()).toBe(0);

	const arr2 = getRandArr(size, 100832000);
	const heap2 = new Heap<number>(arr2);
	arr2.sort((a, b) => a - b);
	expect(heap2.clear()).toEqual(arr2);
});

test('最小堆 2', () => {
	const size = Math.floor(Math.random() * 109887);
	const arr = getRandArr(size, 1000000).map((item) => ({ x: item }));
	const compare = (a: any, b: any) => a.x - b.x;
	const heap = new Heap<{ x: number }>(arr, compare);
	arr.sort(compare);
	expect(heap.size).toBe(size);
	expect(heap.top()).toEqual(arr[0]);
	expect(heap.pop()).toEqual(arr[0]);
	expect(heap.pop()).toEqual(arr[1]);
	expect(heap.push({ x: 0 }).top()).toEqual({ x: 0 });

	const arr2 = getRandArr(size, 1000000).map((item) => ({ x: item }));
	const heap2 = new Heap<{ x: number }>(arr2, compare);
	arr2.sort(compare);
	expect(heap2.clear()).toEqual(arr2);
});

test('最大堆', () => {
	const cfn = (a: number, b: number) => b - a;
	const size = Math.floor(Math.random() * 10087);
	const arr = getRandArr(size, 1000000);
	const heap = new Heap<number>(arr, cfn);
	arr.sort(cfn);
	expect(heap.size).toBe(size);
	expect(heap.top()).toBe(arr[0]);
	expect(heap.pop()).toBe(arr[0]);
	expect(heap.pop()).toBe(arr[1]);
	expect(heap.push(10000008).top()).toBe(10000008);

	const arr2 = getRandArr(size, 100832000);
	const heap2 = new Heap<number>(arr2, cfn);
	arr2.sort(cfn);
	expect(heap2.clear()).toEqual(arr2);
});
