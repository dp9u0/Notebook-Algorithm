/**
 * 递归求和
 * @param {number} x 
 */
function recsum(x) {
  if (x === 1) {
    return x;
  }
  return x + recsum(x - 1);
}

/** 
recsum(5)
5 + recsum(4)
5 + (4 + recsum(3))
5 + (4 + (3 + recsum(2)))
5 + (4 + (3 + (2 + recsum(1))))
5 + (4 + (3 + (2 + 1)))
5 + (4 + (3 + 3))
5 + (4 + 6)
5 + 10
15
*/

/**
 * 递归求和(尾递归)
 * @param {number} x 
 */
function tailrecsum(x, sum = 0) {
  if (x === 0) {
    return sum;
  }
  return recsum(x - 1, sum + x);
}

/** 
tailrecsum(5, 0) 
tailrecsum(4, 5) 
tailrecsum(3, 9)
tailrecsum(2, 12) 
tailrecsum(1, 14) 
tailrecsum(0, 15) 
15
*/