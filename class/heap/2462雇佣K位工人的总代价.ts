/**
2462. 雇佣 K 位工人的总代价

给你一个下标从 0 开始的整数数组 costs ，其中 costs[i] 是雇佣第 i 位工人的代价。

同时给你两个整数 k 和 candidates 。我们想根据以下规则恰好雇佣 k 位工人：

总共进行 k 轮雇佣，且每一轮恰好雇佣一位工人。
在每一轮雇佣中，从最前面 candidates 和最后面 candidates 人中选出代价最小的一位工人，如果有多位代价相同且最小的工人，选择下标更小的一位工人。
比方说，costs = [3,2,7,7,1,2] 且 candidates = 2 ，第一轮雇佣中，我们选择第 4 位工人，因为他的代价最小 [3,2,7,7,1,2] 。
第二轮雇佣，我们选择第 1 位工人，因为他们的代价与第 4 位工人一样都是最小代价，而且下标更小，[3,2,7,7,2] 。注意每一轮雇佣后，剩余工人的下标可能会发生变化。
如果剩余员工数目不足 candidates 人，那么下一轮雇佣他们中代价最小的一人，如果有多位代价相同且最小的工人，选择下标更小的一位工人。
一位工人只能被选择一次。
返回雇佣恰好 k 位工人的总代价。

## 按规则模拟

 */

import Heap from '@structure/heap/Heap';

function _totalCost(costs: number[], k: number, candidates: number): number {
	let price = 0;
	let costK = costs;
	for (let i = 0; i < k; i++) {
		let minIndex = 0;
		const last = costK.length - 1;
		for (let j = 0; j < candidates; j++) {
			if (costK[last - j] < costK[minIndex]) {
				minIndex = last - j;
			}
			if (costK[j] <= costK[minIndex]) {
				minIndex = j;
			}
		}
		price += costK[minIndex];
		costK.splice(minIndex, 1);
	}
	return price;
}

// 堆
function totalCost(costs: number[], k: number, candidates: number): number {
	const heap = new Heap<[number, number]>([], (a, b) => {
		const r = a[1] - b[1];
		if (r == 0) {
			return a[0] - b[0];
		}
		return r;
	});
	let price = 0;
	let left = candidates - 1;
	let right = costs.length - candidates;
	if (left + 1 < right) {
		for (let i = 0; i < candidates; i++) {
			heap.push([i, costs[i]]);
			heap.push([right + i, costs[right + i]]);
		}
	} else {
		costs.forEach((val, index) => {
			heap.push([index, val]);
		});
	}
	for (let i = 0; i < k; i++) {
		const [index, val] = heap.pop() as [number, number];
		price += val;
		if (index <= left) {
			left++;
			if (left < right) {
				heap.push([left, costs[left]]);
			}
		} else {
			right--;
			if (left < right) {
				heap.push([right, costs[right]]);
			}
		}
	}
	return price;
}
export default totalCost;
