/**
218. 天际线问题

城市的 天际线 是从远处观看该城市中所有建筑物形成的轮廓的外部轮廓。给你所有建筑物的位置和高度，请返回 由这些建筑物形成的 天际线 。

每个建筑物的几何信息由数组 buildings 表示，其中三元组 buildings[i] = [lefti, righti, heighti] 表示：

lefti 是第 i 座建筑物左边缘的 x 坐标。
righti 是第 i 座建筑物右边缘的 x 坐标。
heighti 是第 i 座建筑物的高度。

你可以假设所有的建筑都是完美的长方形，在高度为 0 的绝对平坦的表面上。

buildings 按 lefti 非递减排序

天际线 应该表示为由 “关键点” 组成的列表，格式 [[x1,y1],[x2,y2],...] ，并按 x 坐标 进行 排序 。
关键点是水平线段的左端点。列表中最后一个点是最右侧建筑物的终点，y 坐标始终为 0 ，仅用于标记天际线的终点。
此外，任何两个相邻建筑物之间的地面都应被视为天际线轮廓的一部分。

注意：输出天际线中不得有连续的相同高度的水平线。
例如 [...[2 3], [4 5], [7 5], [11 5], [12 7]...] 是不正确的答案；
三条高度为 5 的线应该在最终输出中合并为一个：[...[2 3], [4 5], [12 7], ...]

## 分析：

本题的难点在于，buildings[i] 是按照 lefti 有序的，但是 righti 是不确定的

所以会存在 righti 横跨整个天际线的情况，则每个 buildings[i] 绘出的关键点，可能受整个列表中的任意 buildings[j] 影响

初步分析认为本题难度不在于算法思想，而是梳理简化找到关键点的逻辑

## `关键点`的特性

1. 关键点只存在于：building[i] 的 4 个定点、building[i] 与 building[j] 的相交点
2. 关键点 (x, y) 一定是  (lefti, heightj) 或 （righti, heightj），i、j 可能为 buildings 内任意值

## 参考答案后解析

1. 所有关键点 (x, y) 都有，x、y 属于 buildings 内的 [lefti, righti] 和 [heighti] 的组合
2. 当前建筑的 left 或者 right 是否是关键点的 x

## 扫描线

参考类似于滑动窗口的操作，在 buildings 里面逐个 x 轴滑动，每次停在一个 x 轴上

1. 当前 x 轴上最高的 height，这个 height 是左闭右开的空间，[left, right)，与 x 轴的交点 p(x, y)
2. p.y 与前一个关键点相同，则不是关键点，否则 p(x, y) 为关键点

问题简化成，寻找 x 对应的最高的 height

 */

import Heap from '@structure/heap/Heap';

function getSkyline(buildings: number[][]): number[][] {
	// 收集 x 轴并排序
	const xSet: Set<number> = new Set();
	buildings.forEach((item) => {
		xSet.add(item[0]);
		xSet.add(item[1]);
	});
	const xAxis: number[] = Array.from(xSet.values()).sort((a, b) => a - b);

	const res: [number, number][] = [];
	let buildingi = 0;
	const heightQueue = new Heap<number[]>([], (a, b) => b[2] - a[2]);
	for (const x of xAxis) {
		// 维护 buildings 高度 height 的大顶堆
		while (buildingi < buildings.length && x >= buildings[buildingi][0] && x < buildings[buildingi][1]) {
			heightQueue.push(buildings[buildingi]);
			buildingi++;
		}
		while (heightQueue.size > 0 && (heightQueue.top() as number[])[1] <= x) {
			heightQueue.pop();
		}
		// 寻找最高点
		const h = heightQueue.size > 0 ? (heightQueue.top() as number[])[2] : 0;
		if (res.length == 0 || res[res.length - 1][1] !== h) {
			res.push([x, h]);
		}
	}

	return res;
}

export default getSkyline;
