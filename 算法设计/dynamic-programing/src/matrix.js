/**
 * 矩阵乘法
 * @param {number[]} p 
 */
function matrix_chain(p) {
  let f = [];
  let count = p.length - 2; // 矩阵数量
  for (let i = 0; i <= count; i++) {
    f[i] = [];
    f[i][i] = 0;
  }
  for (let l = 1; l <= count; l++) {
    for (let end = l; end <= count; end++) {
      let start = end - l;
      let min;
      for (let k = start; k < end; k++) {
        // console.log(`${start},${k},${end},${f[start][k]},${f[k + 1][end]},${p[start] * p[k + 1] * p[end+1]}`);
        let value = f[start][k] + f[k + 1][end] + p[start] * p[k + 1] * p[end + 1];
        min = min ? Math.min(min, value) : value;
      }
      f[start][end] = min;
    }
  }
  console.log(f[0][count]);
}

matrix_chain([1, 4, 5, 5])