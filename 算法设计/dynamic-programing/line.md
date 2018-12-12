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

### Code

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

### 优化

上面代码的时间复杂度是 O(n^2),考虑仅仅需要返回长度,因此考虑从内层循环进行优化,使用贪心+二分+栈,每次遍历到一个数字,如果大于栈顶,则入栈,否则替换栈中大于(上升)这个数字的数,

```javascript
/**
 * 最长上升子序列
 * @param {number[]} input
 */
function LIS2(input) {
  let length = input.length;
  let stack = [];
  stack[0] = 0;
  for (let i = 0; i < length; i++) {
    if (input[i] > stack[stack.length - 1]) {
      stack.push(input[i]);
    } else {
      binary_replace(stack, input[i], 1, stack.length - 1);
    }
  }
  return stack.length - 1;
}

function binary_replace(array, element, start, end) {
  let middle = Math.floor((start + end) / 2);
  if ((array[middle] >= element && array[middle - 1] < element)) {
    array[middle] = element;
  } else if (array[middle] > element) {
    binary_replace(array, element, start, middle);
  } else {
    binary_replace(array, element, middle + 1, end);
  }
}
//TEST:
input = [1, 1, 2, 6, 3, 4];
console.log(LIS2(input))
```

## 拦截导弹