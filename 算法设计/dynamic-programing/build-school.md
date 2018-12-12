
# 建学校

在某山区修建了一条道路,恰好穿越总共m个村庄的每个村庄一次(编号依次为 `0,1,2,3...`),没有回路或交叉,任意两个村庄只能通过这条路来往.已知任意两个相邻的村庄(i和i+1)之间的距离为`d[i]`为正整数,其中,`0 <= i < m -1`.为了提高山区的文化素质,政府又决定从m个村中选择n个村建小学(设`0 < n < = m < 500`).请根据给定的m,n以及所有相邻村庄的距离,选择在哪些村庄建小学,才使得所有村到最近小学的距离总和最小,计算最小值.

例如,输入 `d = [2,4,6,5,2,4,3,1,3],n = 3`

## 分析

首先构造子结构:

假设要在两个村庄 `0,i` 之间建立 s 所学校, 首先考虑,如果存在学校j, `0,j` 之间建立的`s-1`所学校使得 `0,j` 都去这些学校上学的总距离最短,同时 `j+1,i` 之间建立的 `1`所学校使得`j+1,i`去这个学校上学的总距离最短,那么,这种建学校方式也是`0,i`之间建立学校的最佳方案.

需要的距离 `f[i][s]` 应该为 `min{ f[j][s - 1] + dist[j + 1][i]}` 其中 `0 <= j <= i`, `dist[j + 1][i]`为 `j + 1` 和 `i` 之间建立一所学校的总距离.

## Code

```javascript
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

let d, n;
d = [2, 4, 6, 5, 2, 4, 3, 1, 3], n = 10;
console.log(build_school(d, n))
```