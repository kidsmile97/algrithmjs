/**
2739. 总行驶距离

卡车有两个油箱。给你两个整数，mainTank 表示主油箱中的燃料（以升为单位），additionalTank 表示副油箱中的燃料（以升为单位）。

该卡车每耗费 1 升燃料都可以行驶 10 km。每当主油箱使用了 5 升燃料时，如果副油箱至少有 1 升燃料，则会将 1 升燃料从副油箱转移到主油箱。

返回卡车可以行驶的最大距离。

注意：从副油箱向主油箱注入燃料不是连续行为。这一事件会在每消耗 5 升燃料时突然且立即发生。

## 示例 1：
```
输入：mainTank = 5, additionalTank = 10
输出：60
解释：
在用掉 5 升燃料后，主油箱中燃料还剩下 (5 - 5 + 1) = 1 升，行驶距离为 50km 。
在用掉剩下的 1 升燃料后，没有新的燃料注入到主油箱中，主油箱变为空。
总行驶距离为 60km 。
```
 */

// 模拟
function distanceTraveled(mainTank: number, additionalTank: number): number {
	let leftTank = mainTank;
	let leftAdditionalTank = additionalTank;
	let fuel = 0;
	while (leftTank >= 5 && leftAdditionalTank > 0) {
		leftAdditionalTank--;
		leftTank = leftTank - 4;
		fuel = fuel + 5;
	}
	return (fuel + leftTank) * 10;
}

/** 数学方程
 * 可从副油箱获得油量 k = Math.floor(mainTank / 4) || additionalTank
 */
export function _distanceTraveled(mainTank: number, additionalTank: number): number {
	return (Math.min(Math.floor(mainTank / 4), additionalTank) + mainTank) * 10;
}

export default distanceTraveled;
