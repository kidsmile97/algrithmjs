/**
54. 螺旋遍历矩阵（二维数组）

1 2 3
4 5 6
7 8 9

=> 

1 2 3 6 9 8 7 4 5

 * 
 */

const spiralOrder = (matrix) => {
  // 方向标识
  let direction = 1;
  // 遍历边界
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;
  // 当前位置
  let i = 0;
  let j = 0;
  // 结果
  const result = [];

  // 开始循环遍历
  while(top <= bottom && left <= right) {
    result.push(matrix[i][j]);
    switch (direction) {
      case 1:
        if (j + 1 > right) {
          top++;
          i++;
          direction = 2;
        } else {
          j++;
        }
        break;
      case 2:
        if (i + 1 > bottom) {
          right--;
          j--;
          direction = 3;
        } else {
          i++;
        }
        break;
      case 3:
        if (j - 1 < left) {
          direction = 4;
          i--;
          bottom--;
        } else {
          j--;
        }
        break;
      case 4:
        if (i - 1 < top) {
          direction = 1;
          j++;
          left++;
        } else {
          i--;
        }
        break;
      default:
        break;
    }
  }
  return result;
}

module.exports = spiralOrder;
