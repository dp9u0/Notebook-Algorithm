require('./common');
const assert = require('assert');
const TEST_COUNT = Math.pow(10, 6);
const MAX_NUM = Math.pow(10, 3);
const Random = () => {
  return ~~(Math.random() * MAX_NUM);
}
const BinarySearchTree = require("../BinarySearchTree");
const bst = new BinarySearchTree();
const array = [6, 4, 8, 2, 5, 7, 9, 1, 3];

// BEGIN: Normal Test
for (let i = 0; i < array.length; i++) {
  bst.insert(array[i]);
}

assert(bst.validate(), `bst.validate()`);
assert(bst.count() === array.length, 'bst.count()===array.length');
assert(bst.height() === 4, 'bst.height()===4');
assert(bst.inOrderTraverse().sort((a, b) => a - b).equals([...array].sort((a, b) => a - b)), `${bst.inOrderTraverse()}.equals(${array})`);
for (let i = 0; i < array.length; i++) {
  assert(bst.search(array[i]), `bst.search(${array[i]})`);
}

while (array.length) {
  let num = array.shift();
  bst.delete(num);
  // console.log(`---------------------`)
  // console.log(`delete ${num}`)
  // console.log(bst.print())
  // console.log(array)
  // console.log(bst.inOrderTraverse())

  assert(bst.inOrderTraverse().sort((a, b) => a - b).equals([...array].sort((a, b) => a - b)), `${bst.inOrderTraverse()}.equals(${array})`);
  assert(!bst.search(num), `bst.search(${num})`);
  assert(bst.validate(), `bst.validate()`);
  num = array.pop();
  bst.delete(num);
  assert(bst.validate(), `bst.validate()`);
  // console.log(`---------------------`)
  // console.log(`delete ${num}`)
  // console.log(bst.print())
  // console.log(array)
  // console.log(bst.inOrderTraverse())
  assert(bst.inOrderTraverse().sort((a, b) => a - b).equals([...array].sort((a, b) => a - b)), `${bst.inOrderTraverse()}.equals(${array})`);
  assert(!bst.search(num), `bst.search(${num})`);
}

assert(bst.count() === 0, `bst.count()===0`);

// END: Normal Test

// BEGIN: Random Test
let d = new Date();
console.log((d.getHours()) + ":" +
  (d.getMinutes()) + ":" +
  (d.getSeconds()))
for (let i = 0; i < TEST_COUNT; i++) {
  let value = Random();
  bst.insert(value);
  assert(bst.validate(), `bst.validate()`);
  assert(bst.search(value), `bst.search(${value})`);
  assert(bst.count() <= MAX_NUM, `${bst.count()}<MAX_NUM`);
}

for (let i = 0; i < TEST_COUNT; i++) {
  let value = Random();
  bst.delete(value);
  assert(bst.validate(), `bst.validate()`);
  assert(!bst.search(value), `bst.search(${value})`);
  assert(bst.count() <= MAX_NUM, `${bst.count()}<MAX_NUM`);
}
d = new Date();
console.log((d.getHours()) + ":" +
  (d.getMinutes()) + ":" +
  (d.getSeconds()))