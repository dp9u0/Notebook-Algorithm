/**
 * 建学校(dp)
 * @param {number[]} d : 村庄之间的距离
 * @param {number} n : 学校数量
 */
function build_school(d, n) {
  let m = d.length + 1; // 村庄数量
  if (m <= n) {
    return 0;
  }
  let d0 = []; // 村庄i到村庄0的距离
  let dist = []; // 两个村庄i,j间修一个学校的最短总距离(总距离最短实际是将学校修建在中点处村庄)
  let f = []; // 状态矩阵 : 村庄0到村庄i之间修建s个学校的最短总距离 f[m-1][n] 即为该问题的解
  // build d0[]
  d0[0] = 0;
  for (let i = 1; i < m; i++) {
    d0[i] = d[i - 1] + d0[i - 1];
  }
  console.log(d0);
  // build dist[][]
  for (let i = 0; i < m; i++) {
    dist[i] = [];
  }
  for (let i = 0; i < m; i++) {
    for (let j = i; j < m; j++) {
      if (i === j) {
        dist[i][j] = 0;
      } else {
        // 1,3 -> 1,4
        // 1,4 -> 1,5
        dist[i][j] = dist[j][i] = dist[i][j - 1] + d0[j] - d0[Math.floor((i + j) / 2)];
      }
    }
  }
  console.log(dist);
  // build f[][]
  // f[i][0] f[i][1]
  for (let i = 0; i < m; i++) {
    f[i] = [];
    f[i][0] = 'Inf';
    f[i][1] = dist[0][i];
  }
  for (let i = 0; i < m; i++) {
    for (let s = 2; s <= n; s++) {
      let min = null;
      for (let j = 0; j < i; j++) {
        let value = f[j][s - 1] + dist[j + 1][i];
        min = min ? Math.min(min, value) : value;
      }
      f[i][s] = min || 0;
    }
  }
  console.log(f);
  return f[n - 1][m];
}

// TEST:
let d, n;
d = [2, 4, 6, 5, 2, 4, 3, 1, 3], n = 10;
console.log(build_school(d, n))