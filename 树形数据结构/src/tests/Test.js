require('../common/utils');
const assert = require('assert');
const TEST_COUNT = Math.pow(10, 4);
const MAX_NUM = Math.pow(10, 2);
const set = new Set()
const Random = () => {
  return ~~(Math.random() * MAX_NUM);
}

const BinarySearchTree = require("../BinarySearchTree");
const AVLTree = require("../AVLTree");

const tree = new AVLTree();
const array = [6, 19, 4, 18, 12, 8, 2, 5, 16, 11, 7, 9, 14, 15, 1, 3, 10, 0, 13, 17];

// BEGIN: Normal Test
// INSERT
for (let i = 0; i < array.length; i++) {
  tree.insert(array[i]);
  tree.height();
  assert(tree.validate(), `bst.validate()`);
}
assert(tree.count() === array.length, `${tree.count()}===array.length`);
assert(tree.inOrderTraverse().sort((a, b) => a - b).equals([...array].sort((a, b) => a - b)), `${tree.inOrderTraverse()}.equals(${array})`);

// SEARCH
for (let i = 0; i < array.length; i++) {
  assert(tree.search(array[i]), `bst.search(${array[i]})`);
}

// DELETE
while (array.length) {
  let num = array.shift();
  tree.delete(num);
  tree.height();
  assert(tree.inOrderTraverse().sort((a, b) => a - b).equals([...array].sort((a, b) => a - b)), `${tree.inOrderTraverse()}.equals(${array})`);
  assert(!tree.search(num), `bst.search(${num})`);
  assert(tree.validate(), `bst.validate()`);

  num = array.pop();
  tree.delete(num);
  tree.height();
  assert(tree.validate(), `bst.validate()`);
  assert(tree.inOrderTraverse().sort((a, b) => a - b).equals([...array].sort((a, b) => a - b)), `${tree.inOrderTraverse()}.equals(${array})`);
  assert(!tree.search(num), `bst.search(${num})`);
}

assert(tree.count() === 0, `bst.count()===0`);

// END: Normal Test

// BEGIN: Random Test
for (let i = 0; i < TEST_COUNT; i++) {
  let value = Random();
  tree.insert(value);
  set.add(value);
  tree.height();
  assert(tree.validate(), `bst.validate()`);
  assert(tree.search(value), `bst.search(${value})`);
  assert(tree.count() === set.size, `${tree.count()} = ${set.size}`);
}

for (let i = 0; i < TEST_COUNT; i++) {
  let value = Random();
  tree.delete(value);
  set.delete(value);
  tree.height();
  assert(tree.validate(), `bst.validate()`);
  assert(!tree.search(value), `bst.search(${value})`);
  assert(tree.count() === set.size, `${tree.count()} = ${set.size}`);
}