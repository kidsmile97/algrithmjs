/**
 * @description
  给定一个 n * m 的二维数组，顺时针遍历所有元素
  sample：
[
  [1, 2, 3],
  [4, 5, 6],
]
  result:
1 2 3 6 5 4
 */

module.exports = (arr) => {
  let CUR_X = 0;
  let CUR_Y = 0;
  let DIRECTION = 1;
  let min_x_bound = 0;
  let max_x_bound = arr.length - 1;
  let min_y_bound = 0;
  let max_y_bound = arr[0].length - 1;
  const result = [];

  while (min_x_bound <= max_x_bound && min_y_bound <= max_y_bound) {
    result.push(arr[CUR_X][CUR_Y])
    switch (DIRECTION) {
      case 1:
        if (CUR_Y < max_y_bound) {
          CUR_Y += 1;
        } else {
          min_x_bound += 1;
          CUR_X += 1;
          DIRECTION = 2;
        }
        break;
      case 2:
        if (CUR_X < max_x_bound) {
          CUR_X += 1;
        } else {
          CUR_Y -= 1;
          max_y_bound -= 1;
          DIRECTION = 3;
        }
        break;
      case 3:
        if (CUR_Y > min_y_bound) {
          CUR_Y -= 1;
        } else {
          DIRECTION = 4;
          max_x_bound -= 1;
          CUR_X -= 1;
        }
        break;
      case 4:
        if (CUR_X > min_x_bound) {
          CUR_X -= 1;
        } else {
          DIRECTION = 1;
          CUR_Y += 1;
          min_y_bound += 1;
        }
        break;
      default:
        break;
    }
  }

  return result;
}
