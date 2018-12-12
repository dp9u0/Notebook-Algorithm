# 区间动归

区间动态规划状态转移方程类似于 `f[i][j]=opt(f[i][j],f[i][k]+f[k+1][j]+something)`,其中 `j <= k <= j`,其关键点是使用分割点 k,划分区间,将问题分割为一系列子问题,然后去其中最优的那个.

## 矩阵乘法

这是算法导论这本书上的一个章节,用于介绍动态规划.问题是这样的,矩阵 `A1 * A2`,A1 是`p * q`矩阵, A2是 `q * r` 矩阵,需要计算 `p * q * r`次乘法.
对于矩阵链 {A0,A1,A2,A3...,An-2},输入数组 [p0,p1,p2,...,pn-1],矩阵 Ai 维数为 `p[i] * p[i+1]`,则最少乘法计算次数为?

### 分析

这就是个很经典的区间动归的例子,首先构建子结构:

矩阵 {Ai,...,Ak,...Aj} 构成的矩阵链,需要运行的乘法次数为`f[i][j]`,如果以Ak为分割点,`f[i][j] = f[i][k] + f[k+1][j] + p[i] * p[k+1] *p[j+1]`,
那么自底向上计算子问题,然后 取`f[i][j] = min{f[i][k] + f[k+1][j] + p[i-1] * p[k] *p[j]}`即可.

状态矩阵构建完成后,`f[0][n]` 即为结果

### Code

```javascript
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
```

## 合并石子

在一个圆形操场的四周摆放N堆石子,现要将石子有次序地合并成一堆.规定每次只能选相邻的2堆合并成新的一堆,合并的花费为这相邻两堆石子的数量之和,试设计算法,计算出将N堆石子合并成一堆的最小花费.

同样,这个问题也是一个区间动态规划的例子,而且比矩阵乘法还简单(数组跟区间点数量一致)

```javascript
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
```