/**
 * lintcode 669
 * coin change
 */

function coin(coins, amount) {
  // 初始条件
  let res = [0]
  let n = coins.length
  for (let i = 1; i <= amount; i++) {
    // 定义无解情况，这里初始化默认无解
    res[i] = Number.MAX_VALUE
    for (let j = 0; j < n; j++) {
      // 边界条件
      if (i >= coins[j] && res[i - coins[j]] != Number.MAX_VALUE) {
        res[i] = res[i - coins[j]] + 1
      }
    }
  }
  return res[amount] === Number.MAX_VALUE ? -1 : res[amount]
}

console.log(coin([1,3,5], 11))