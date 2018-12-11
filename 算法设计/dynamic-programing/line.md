# 线性动规

## 最长上升子序列

对于含有n个元素的集合 `S = {a0,a1,...,an}`，对于S的一个子序列`S' = {ai,aj,ak}`，若满足 `ai < aj < ak` ,则称S'是S的一个上升子序列,在S众多的上升子序列中,含有元素最多的那个子序列的元素个数是多少

### 解析

考虑输入 `S = [2, 6, 3, 4, 2]` ,观察这个序列:

* 以位置0为结尾, S的最长上升子序列 : `{2}`
* 以位置1为结尾, S的最长上升子序列 : `{2,6}`
* 以位置2为结尾, S的最长上升子序列 : `{2,3}`
* 以位置3为结尾, S的最长上升子序列 : `{2,3,4}`
* 以位置3为结尾, S的最长上升子序列 : `{2}`

通过上述描述,使用一个状态转移矩阵,记录使用当前字符结尾可以形成最长上升子序列.

## Code

```javascript
/**
 * 最长上升子序列
 * @param {number[]} input
 */
function LIS(input) {
  let length = input.length;
  let f = [1];
  for (let i = 0; i < length; i++) {
    let maxPrefixLength = 0;
    for (let j = 0; j < i; j++) {
      if (input[i] > input[j]) {
        maxPrefixLength = Math.max(f[j], maxPrefixLength);
      }
    }
    f[i] = maxPrefixLength + 1;
  }
  console.log(f);
}

// TEST:
let input;
input = [1, 1, 2, 6, 3, 4];
console.log(LIS(input))
```

## 优化

TODO: