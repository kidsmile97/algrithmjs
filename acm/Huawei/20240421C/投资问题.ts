/**
投资问题，求汇报最高的投资方案

给定
项目回报 [10, 20, 30, 40, 50]
项目风险 [3, 4, 5, 6, 10]
项目最大投入份额 [20, 30, 40, 30, 40]

问，手持 money 的资金，最大可承受风险 risk，最多投资 2 个项目的前提下，返回最佳投资方案

## 示例：

回报率 [10, 20, 30, 40]
项目风险 [4, 6, 10, 11]
最大份额 [40, 60, 50, 50]

资金 money: 100
可承受风险 risk: 10

输出:
[40, 60, 0, 0]
解析：项目 1 投 40，项目 2 投 60，项目 3、4 投入 0

 * 
 */

interface Project {
	// 回报率
	roi: number;
	// 风险
	risk: number;
	// 开放份额
	num: number;
	// 原项目编号
	index: number;
}
// 只投资一个项目
const investSingle = (i: number, projects: Project[], money: number) => {};
// 优先投资 i 的回报
const invest = (i: number, j: number, projects: Project[], money: number) => {};

function bestInvestment(rois: number[], risks: number[], nums: number[], money: number, r: number): number[] {
	// 组织数据
	let projects: Project[] = [];
	// 整合项目信息
	for (let i = 0; i < rois.length; i++) {
		projects.push({
			roi: rois[i],
			risk: risks[i],
			num: nums[i],
			index: i,
		});
	}
	// 过滤不可能投资的项目
	projects = projects.filter((item) => item.risk <= r);
	projects.sort((a, b) => a.risk - b.risk);
	// 计算最佳投资策略，双指针法
	let max = [0, 1, 0, 0, 0];
	let i = 0;
	let j = projects.length - 1;
	while (j > 0) {
		if (projects[j].risk == r) {
			const investResult = investSingle(j, projects, money);
			j--;
			continue;
		}
		while (j > i && projects[i].risk + projects[j].risk <= r) {
			i++;
		}
		const flag = Math.min(i, j);
		for (let k = 0; k < flag; k++) {
			const investResult = invest(j, k, projects, money);
		}
		j--;
	}

	return [0];
}

export default bestInvestment;
