# 最长公共子序列

`ADC` 是 `ABCDABC` 的一个子序列(注意排列顺序),同时也是 `ACDC` 的子序列,称之为这两个字符串的公共子序列,所有公共子序列中最长的称之为最长公共子序列.

## 分析

首先证明这样一个最优子结构:

假设 `A = {a0,a1,...,ax}` `B = {b0,b1,...,by}`, `C = {c0,c1,...,cz}` 是 A,B的LCS :

1. 如果 ax == by,Cz-1 是 Ax-1 和 By-1 的 LCS
2. 如果 ax != by,cz == ax , C 是 A 和 By-1 的 LCS
3. 如果 ax != by,cz == by , C 是 Ax-1 和 B 的 LCS

根据上面这样一个LCS 最优子结构,可以使用动态规划,自底向上计算LCS

## Code

```javascript
/**
 * LCS
 * @param {string} strA
 * @param {string} strB
 */
function LCS(strA, strB) {
  let lengthA = strA.length;
  let lengthB = strB.length;
  let f = [];
  f[-1] = []; // 哨兵
  for (let a = 0; a < lengthA; a++) {
    f[a] = [];
  }
  // build f[a][b]
  for (let a = 0; a < lengthA; a++) {
    for (let b = 0; b < lengthB; b++) {
      if (strA[a] === strB[b]) {
        f[a][b] = (f[a - 1][b - 1] || 0) + 1;
      } else {
        f[a][b] = Math.max((f[a - 1][b] || 0), (f[a][b - 1] || 0));
      }
    }
  }
  console.log(f);
  return f[lengthA - 1][lengthB - 1];
}

// TEST:
LCS('ABCD', 'ABCD')
LCS('ABCDF', 'ABCDE')
LCS('ABDFC', 'ABCDFEC')
```
