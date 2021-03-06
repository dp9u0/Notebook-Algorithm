# 查找算法

查找是在大量的信息中寻找一个特定的信息元素,在计算机应用中,查找是常用的基本运算,例如编译程序中符号表的查找.

## 顺序表查找

顺序查找适合于存储结构为顺序存储或链接存储的线性表

顺序查找也称为线形查找,属于无序查找算法.从数据结构线形表的一端开始,顺序扫描,依次将扫描到的结点关键字与给定值k相比较,若相等则表示查找成功,若扫描结束仍没有找到关键字等于k的结点,表示查找失败.

```js
/**
 * Linear search implementation.
 *
 * @param {*[]} sortedArray array to search
 * @param {*} seekElement element
 * @param {} [comparatorFn] comparatorFn
 * @return {number} index found
 */
export default function linearSearch(array, seekElement, comparatorFn) {
  const comparator = new Comparator(comparatorFn);
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (comparator.equal(element, seekElement)) {
      return index;
    }
  }
  return -1;
}
```

## 有序表查找

有序表的情况下,可以通过每次查找,不断缩小查找范围:(假定有序表示递增顺序)如果查找点大于目标值,则只需要在查找点左侧继续查找,否则思路一样.

二分查找,斐波那契查找等都是利用这一思路进行查找的,可以统称为插值查找.

二分查找时每次选取中间位置为查找点,而斐波那契查找则利用斐波那契序列,在数组长度为 `F(n)`(所以每次初始化阶段需要对数组进行检查扩充为斐波那契数列上的长度) 情况下,选取将数组分为两段 `F(n-1)` 和 `F(n-2)`

```js
/**
 * Binary search implementation.
 *
 * @param {*[]} sortedArray array to search
 * @param {*} seekElement element
 * @param {} [comparatorFn] comparatorFn
 * @return {number}
 */
function binarySearch(sortedArray, seekElement, comparatorFn) {
  let startIndex = 0;
  let endIndex = sortedArray.length - 1;
  while (startIndex <= endIndex) {
    const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
    if (comparator.equal(sortedArray[middleIndex], seekElement)) {
      return middleIndex;
    }
    if (comparator.lessThan(sortedArray[middleIndex], seekElement)) {
      startIndex = middleIndex + 1;
    } else {
      endIndex = middleIndex - 1;
    }
  }
  return -1;
}
```

## 树查找

利用二叉查找树(例如[红黑树](../树形数据结构/RedBlackTree.md),[ALV树](../树形数据结构/AVLTree.md))进行查找 时间复杂度 `O(log(n))`

## 哈希表查找

利用[Hash表](../散列数据结构/README.md)进行查找,时间复杂度为 `O(1)`,但是需要实现构造Hash表.