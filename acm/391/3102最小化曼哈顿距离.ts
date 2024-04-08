/**
3102. 最小化曼哈顿距离

给你一个下标从 0 开始的数组 points ，它表示二维平面上一些点的整数坐标，其中 points[i] = [xi, yi] 。

两点之间的距离定义为它们的曼哈顿距离

请你恰好移除一个点，返回移除后任意两点之间的 最大 距离可能的 最小 值。

输入：points = [[3,10],[5,15],[10,2],[4,4]]
输出：12
解释：移除每个点后的最大距离如下所示：
- 移除第 0 个点后，最大距离在点 (5, 15) 和 (10, 2) 之间，为 |5 - 10| + |15 - 2| = 18 。
- 移除第 1 个点后，最大距离在点 (3, 10) 和 (10, 2) 之间，为 |3 - 10| + |10 - 2| = 15 。
- 移除第 2 个点后，最大距离在点 (5, 15) 和 (4, 4) 之间，为 |5 - 4| + |15 - 4| = 12 。
- 移除第 3 个点后，最大距离在点 (5, 15) 和 (10, 2) 之间的，为 |5 - 10| + |15 - 2| = 18 。
在恰好移除一个点后，任意两点之间的最大距离可能的最小值是 12 。

## 显而易见的暴力解法

1. 使用一个二维数组 d[i, x[]] 记录移除 point[i] 点后，剩余点两两之间的最小距离 x[]
2. 寻找每个 x[] 中的最大值，取最小那个即可
3. 时间复杂度 O(n * C(2,n-1)) => O(n^3)，空间复杂度 O(n^3)

tips: C(2,n-1) 是组合公式

分析：
曼哈顿距离，即平面坐标轴两点 x、y 的偏差值之和， (x1, y1) - (x2, y2) => abs(x1 - x2) + abs(y1 - y2)

移除一点，得到任意两点最大距离，要求这个最大距离尽可能小

1. 肯定优先移除当前最大距离两点中的一点
2. 最大距离相同的点有多对时，需要考虑移除后的情形

## 数学下的精妙解法

曼哈顿距离：abs(x1 - x2) + abs(y1 - y2)

切比雪夫距离：max(abs(x1 - x2), abs(y1 - y2))

曼哈顿转切比雪夫，这里转换应该理解为，两者距离相同，但是坐标系不一致下的坐标转换

M(x, y) = Q(x + y, y - x)

即点 M(1, 0) 到原点的曼哈顿距离 = 点 Q(1, -1) 到原点的切比雪夫距离

那转换坐标系有什么作用呢？

由切比雪夫距离定义可知，两点间距离是 x 和 y 坐标的最大差值

则一系列点中的最大距离 = max( max(y) - min(y), max(x) - min(x) )
！！tips：由于不需要知道是哪两个点，所以可以直接找最大即可

大大简化了点和点之间距离的计算，同时明确可能得要删除的点只有4个，其他不用尝试计算

主要复杂度在排序，由于 typescript 缺乏一些好用的数据结构类型，比如自动排序的集合类

 */

function getXQ(points: number[][]) {
	const xm = points[points.length - 1][0] - points[0][0];
	points.sort((a, b) => a[1] - b[1]);
	const ym = points[points.length - 1][1] - points[0][1];
	return Math.max(xm, ym);
}

function getYQ(points: number[][]) {
	const ym = points[points.length - 1][1] - points[0][1];
	points.sort((a, b) => a[0] - b[0]);
	const xm = points[points.length - 1][0] - points[0][0];
	return Math.max(xm, ym);
}

function minimumDistance(points: number[][]): number {
	// 坐标系转换
	const qPoints: Array<[number, number]> = [];
	for (const p of points) {
		qPoints.push([p[0] + p[1], p[1] - p[0]]);
	}
	// x排序
	qPoints.sort((a, b) => a[0] - b[0]);
	// 删除最大x
	const xm = getXQ(qPoints.slice(1));
	// 删除最小x
	const xsm = getXQ(qPoints.slice(0, -1));
	// y排序
	qPoints.sort((a, b) => a[1] - b[1]);
	// 删除最大y
	const ym = getYQ(qPoints.slice(1));
	// 删除最小y
	const ysm = getYQ(qPoints.slice(0, -1));
	return Math.min(xm, xsm, ym, ysm);
}

export default minimumDistance;
