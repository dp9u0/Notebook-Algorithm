/**
 * 
 * @param {number[]} p : possible of hit
 * @param {number[]} q : possible of miss
 */
function opt_bst(p, q) {
  p.unshift(0);
  let n = p.length - 1;
  let f = [];
  let w = [];
  for (let i = 1; i <= n + 1; i++) { // q.length
    f[i] = [];
    w[i] = [];
    f[i][i - 1] = w[i][i - 1] = q[i - 1];
    for (let j = i; j <= n; j++) {
      w[i][j] = w[i][j - 1] + p[j] + q[j];
    }
  }
  console.log(w);
  for (let i = 1; i <= n; i++) {
    for (let j = i; j <= n; j++) {
      let min = null;
      for (let r = i; r <= j; r++) {
        let value = f[i][r - 1] + f[r + 1][j] + w[i][j];
        min = min ? Math.min(min, value) : value;
      }
      f[i][j] = min;
    }
  }
  console.log(f);
}


opt_bst([15, 10, 5, 10, 20], [5, 10, 5, 5, 5, 10])