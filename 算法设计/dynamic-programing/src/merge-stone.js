/**
 * 合并石子
 * @param {number[]} stones 
 */
function merge_stones(stones) {
  let length = stones.length;
  let f = [];

  for (let i = 0; i < length; i++) {
    f[i] = [];
    f[i][i] = 0;
    ((i + 1 < length) && (f[i][i + 1] = stones[i] + stones[i + 1]));
  }

  for (let l = 2; l < length; l++) {
    for (let end = l; end < length; end++) {
      let start = end - l;
      let min;
      for (let k = start + 1; k < end; k++) {
        let value = f[start][k] + f[k + 1][end];
        min = min ? Math.floor(min, value) : value;
      }
      f[start][end] = min;
    }
  }
  console.log(f);
  console.log(f[0][length - 1]);
}

merge_stones([1, 1, 1, 1, 1, 1, 1, 1])