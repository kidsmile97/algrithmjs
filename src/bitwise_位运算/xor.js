/**
 *
异或运算符，也称之为不进位加法

（1）交换律  a ^ b = b ^ a
（2）结合律  a ^ b ^ c = a ^ (b ^ c)

- x ^ 0 = x
- x ^ x = 0

 *
 */

// 应用 1：数值交换
const exchange = ({ a, b }) => {
  a = a ^ b;
  b = a ^ b;
  a = a ^ b;
  return { a, b }
}

// 加法实现器
const plus = (a, b) => {
  if (a == 0) {
    return b
  }
  if (b == 0) {
    return a
  }
  return plus((a ^ b), (a & b) << 1)
}

// 寻找数组中唯一出现奇数次的数


module.exports = {
  exchange,
  plus,
}
