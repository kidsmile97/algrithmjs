/**
2813. 子序列最大优雅度

给你一个长度为 n 的二维整数数组 items 和一个整数 k 。

items[i] = [profiti, categoryi]，其中 profiti 和 categoryi 分别表示第 i 个项目的利润和类别。

现定义 items 的 子序列 的 优雅度 可以用 total_profit + distinct_categories2 计算，其中

total_profit 是子序列中所有项目的利润总和，

distinct_categories 是所选子序列所含的所有类别中不同类别的数量。

你的任务是从 items 所有长度为 k 的子序列中，找出 最大优雅度 。

用整数形式表示并返回 items 中所有长度恰好为 k 的子序列的最大优雅度。

注意：数组的子序列是经由原数组删除一些元素（可能不删除）而产生的新数组，且删除不改变其余元素相对顺序。

# 暴力解法

计算所有长度 k 的子序列优雅度，找最大

### 如何获取所有子序列

 */

// 暴力解法
function findMaximumElegance(items: number[][], k: number): number {
	let res = 0;

	return res;
}

export default findMaximumElegance;
