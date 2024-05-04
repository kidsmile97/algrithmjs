/**

## topk 问题的两种说法

```js
const arr = [5, 7, 7, 8, 8, 10];
```

1. 查找第一个大于等于 8 的数【 答案：arr[3] 】

2. 查找最大的小于 8 的数【 答案：arr[2] 】
 */

// 1. 查找第一个大于等于 8 的数【 答案：arr[3] 】
export function binarySearch(arr: number[], target: number): number {
	let left = 0;
	let right = arr.length - 1;
	while (left <= right) {
		const mid = (left + right) >> 1; // 注意和溢出风险
		if (arr[mid] < target) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}
	return left;
}

// 2. 查找最大的小于 8 的数【 答案：arr[2] 】
export function bs2(arr: number[], target: number): number {
	let left = 0;
	let right = arr.length - 1;
	while (left <= right) {
		const mid = (left + right) >> 1; // 注意和溢出风险
		if (arr[mid] >= target) {
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}
	return right;
}
