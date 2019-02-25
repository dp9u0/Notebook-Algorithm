# 散列(Hash)数据结构

散列表是对数组的一种扩展,数组可以通过索引`index`,在`O(1)`时间内对数据进行增删查,日常使用中,经常会碰到无法使用连续的`index`而是需要使用一些诸如字符串等作为索引对数据进行增删查的操作,这里就需要hash数据结构了.

首先介绍Hash表的一些相关技术

## HashTable/HashMap

* 装填因子 : a=n/m,其中n为关键字个数,m为表长
* 直接寻址 : 当Key值范围较小时可以直接使用一个数组(称为直接寻址表)用来存储Value.
* 散列函数 : 当Key值范围很大时,使用直接寻址表用来存储所有的Key就不现实了,因此需要使用散列函数将Key映射到一个较小的空间上
* 碰撞解决 : 使用散列函数可能会出现多个Key 映射到一个位置上的情况,这称之为碰撞.发生碰撞的情况需要采取方式进行避免.常见的避免碰撞的方式为链表法,相同位置的Key,存放在一个链表上.查找时,在链表上依次查找这个Key.
* 全域散列 : 定义一个散列函数集合,可以将key 值等可能的映射到 {0,1,...m-1} 位置集中.最开始随机选择散列函数集合中的一个作为散列函数.
* 开放寻址 : 所有元素都存放在散列表中对于关键字Key每次都探查一个可行的位置进行存放.

存放Key Value

## HashSet

Set 是存放 Value,Value 作为 散列的Key值.用于去重等.

## 实践

### 设计 HashMap

```javascript
/**
 * Initialize your data structure here.
 */
var HashMap = function () {
  this.payload = Array.from({
    length: 1000
  }, x => []);
  this.h = function (key) {
    return key % 1000;
  }
};

/**
 * value will always be non-negative.
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
HashMap.prototype.put = function (key, value) {
  let bucket = this.payload[this.h(key)];
  let index = bucket.indexOf(key);
  if (index === -1) bucket.push(key, '' + value);
  else bucket.splice(index + 1, 1, '' + value);
};

/**
 * Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key
 * @param {number} key
 * @return {number}
 */
HashMap.prototype.get = function (key) {
  let bucket = this.payload[this.h(key)];
  let index = bucket.indexOf(key);
  if (index !== -1) return +bucket[index + 1];
  return -1;
};

/**
 * Removes the mapping of the specified value key if this map contains a mapping for the key
 * @param {number} key
 * @return {void}
 */
HashMap.prototype.remove = function (key) {
  let bucket = this.payload[this.h(key)];
  let index = bucket.indexOf(key);
  if (index !== -1) bucket.splice(index, 2);
};

var obj = Object.create(HashMap).createNew()
obj.put(key,value)
var param_2 = obj.get(key)
obj.remove(key)
```

### 设计HashSet

```javascript
/**
 * Initialize your data structure here.
 */
var HashSet = function () {
  this.payload = Array.from({
    length: 1000
  }, x => []);
  this.f = function (num) {
    return num % 1000;
  }
};

/**
 * @param {number} key
 * @return {void}
 */
HashSet.prototype.add = function (key) {
  let bucket = this.payload[this.f(key)],
    index = bucket.indexOf(key);
  if (index === -1) bucket.push(key);
};

/**
 * @param {number} key
 * @return {void}
 */
HashSet.prototype.remove = function (key) {
  let bucket = this.payload[this.f(key)],
    index = bucket.indexOf(key);
  if (index !== -1) bucket.splice(index, 1);
};

/**
 * Returns true if this set contains the specified element
 * @param {number} key
 * @return {boolean}
 */
HashSet.prototype.contains = function (key) {
  let array = this.payload[this.f(key)],
    index = array.indexOf(key);
  return index !== -1;
};

var obj = Object.create(HashSet).createNew()
obj.add(key)
obj.remove(key)
var param_3 = obj.contains(key)

```