# 树形动归

树形动态规划需要考虑通过子问题的解计算上层问题时,子问题深度会随之增加,增加深度导致的Value增长也需要考虑到.

## 最优二叉查找树

需要构造一颗最优二叉查找树,共有n个关键字 `{k1,k2,...,kn}` 每个关键字命中概率分别为 `{p1,p2,...,pn}`,另外可能不会命中任何关键字,因此构造虚拟关键字集合 `{d0,d1,...,dn}` 表示不命中的情况,对应概率 `{q0,q2,...,qn}`.

### 分析

对于关键字集合 {ki,...kr...,kj} , 使用kr 作为根,则两颗子树 {ki,...,kr-1} 和 {kr+1,...,kj}} 同样也有最优子结构

并且其搜索次数期望 `f[i][j] = p[r] + e[i][r-1] + e[r+1][j] + w[i][r-1] + w[r+1][j]`

#### 关于`w[x][y]`

其中 `w[x][y]` 表示子树高度降低1 所造成的额外的搜索次数期望值, 实际为 sum({px,...,py}) + sum({qx-1,...,py})

`w[i][j] = w[i][r - 1] + p[r] + w[r + 1][j]`

再进一步可以得到 `w[i][j] = w[i][j - 1] + p[j] + q[j]`

#### 关于`f[i][j] = p[r] + e[i][r-1] + e[r+1][j] + w[i][r-1] + w[r+1][j]`

`w[i][j] = w[i][r - 1] + p[r] + w[r + 1][j]` 带入消除项

可以得到 `f[i][r - 1] + f[r + 1][j] + w[i][j]`

### Code

```javascript
/**
 * 最优二叉查找树
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

//TEST:
opt_bst([15, 10, 5, 10, 20], [5, 10, 5, 5, 5, 10])
```