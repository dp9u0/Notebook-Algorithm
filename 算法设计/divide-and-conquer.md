# 分治算法

分支法思想是 将原始问题分解成n个规模较小的与原问题类似的子问题,(这些子问题又可以通过分解解决)递归解决这些子问题,最后将结果合并,即为原问题的结果.具体可以分为三步:

* 分解 : 将问题分解成 n个子问题
* 解决 : 递归解子问题,若问题足够简单,直接解决
* 合并 : 合并结果

## MergeSort

分治算法最经典的例子当为合并排序(*merge sort*) :

```javascript
/**
 * Merge Sort In O(n * logn)
 * @param {number[]} array
 */
function mergeSort(array) {
  if (array.length > 1) {
    const middle = array.length >> 1;
    const left = mergeSort(array.slice(0, middle));
    const right = mergeSort(array.slice(middle));
    array = merge(left, right);
  }
  return array;
}

/**
 * Merge Tow Sorted Array
 * @param {number[]} left
 * @param {number[]} right
 */
const merge = (left, right) => {
  let indexLeft = 0;
  let indexRight = 0;
  const result = [];
  while (indexLeft < left.length && indexRight < right.length) {
    result.push(left[indexLeft] <= right[indexRight] ? left[indexLeft++] : right[indexRight++]);
  }
  return result.concat(indexLeft < left.length ? left.slice(indexLeft) : right.slice(indexRight));
};

// TEST:
console.log(mergeSort([1, 24, 5, 1, 2, 6, 7, 8, 24, 7, 9, 35, 13, 5, 135, 5]))
```

## 分治法分析

假设通过分治法,将原始问题分割为 `a` 个规模为原问题规模的 `1/b` 的子问题,同时,分割问题和合并问题开销分别为 `D(n)` 和 `C(n)`,那么,分治时间开销为 : ```T(n) =  a * T(n/b) + D(n) + M(n)```

根据[主定理](./recursion.md#主定理) : T(n) = Θ(nlogn)