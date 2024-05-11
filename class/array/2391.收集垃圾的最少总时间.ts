/**
2391. 收集垃圾的最少总时间

给你一个下标从 0 开始的字符串数组 garbage ，
其中 garbage[i] 表示第 i 个房子的垃圾集合。garbage[i] 只包含字符 'M' ，'P' 和 'G' ，但可能包含多个相同字符，
每个字符分别表示一单位的金属、纸和玻璃。垃圾车收拾 一 单位的任何一种垃圾都需要花费 1 分钟。

同时给你一个下标从 0 开始的整数数组 travel ，其中 travel[i] 是垃圾车从房子 i 行驶到房子 i + 1 需要的分钟数。

城市里总共有三辆垃圾车，分别收拾三种垃圾。每辆垃圾车都从房子 0 出发，按顺序 到达每一栋房子。但它们 不是必须 到达所有的房子。

任何时刻只有 一辆 垃圾车处在使用状态。当一辆垃圾车在行驶或者收拾垃圾的时候，另外两辆车 不能 做任何事情。

请你返回收拾完所有垃圾需要花费的 最少 总分钟数。

## 分析

因为一两车在行动，另外的车无法执行任何动作，所以不同车的运行完全是可以单独出来的加和的

 */

const travelTime = (travel: number[], i: number, j: number): number => {
	let time = 0;
	for (let k = i; k < j; k++) {
		time += travel[k];
	}
	return time;
};

function garbageCollection(garbage: string[], travel: number[]): number {
	const n = garbage.length;
	let res = 0;
	let m = 0;
	let p = 0;
	let g = 0;
	for (let i = 0; i < n; i++) {
		for (const trash of garbage[i]) {
			switch (trash) {
				case 'M':
					res += travelTime(travel, m, i);
					res += 1;
					m = i;
					break;
				case 'P':
					res += travelTime(travel, p, i);
					res += 1;
					p = i;
					break;
				default:
					res += travelTime(travel, g, i);
					res += 1;
					g = i;
					break;
			}
		}
	}
	return res;
}

// 基于前缀和的行驶时间优化
function _garbageCollection(garbage: string[], travel: number[]): number {
	const n = garbage.length;
	let prefixTime = [0];
	travel.forEach((item, index) => {
		prefixTime.push(prefixTime[index] + item);
	});
	let res = 0;
	let m = 0;
	let p = 0;
	let g = 0;
	for (let i = 0; i < n; i++) {
		for (const trash of garbage[i]) {
			switch (trash) {
				case 'M':
					res += prefixTime[i] - prefixTime[m];
					res += 1;
					m = i;
					break;
				case 'P':
					res += prefixTime[i] - prefixTime[p];
					res += 1;
					p = i;
					break;
				default:
					res += prefixTime[i] - prefixTime[g];
					res += 1;
					g = i;
					break;
			}
		}
	}
	return res;
}

export default garbageCollection;
