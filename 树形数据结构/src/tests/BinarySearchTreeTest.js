const assert = require('assert');
require('./common');
let BinarySearchTree = require("../BinarySearchTree");
let bst = new BinarySearchTree.BinarySearchTree();
let array = [6, 4, 8, 2, 5, 7, 9, 1, 3];

for (let i = 0; i < array.length; i++) {
  bst.insert(array[i]);

}
console.log(bst.print());
assert(bst.validate(), `bst.validate()`);
assert(bst.toArray().sort((a, b) => a - b).equals([...array].sort((a, b) => a - b)), 'bst.toArray().equals(array)');
assert(bst.count() === array.length, 'bst.count()===array.length');
assert(bst.height() === 4, 'bst.height()===4');

for (let i = 0; i < array.length; i++) {
  assert(bst.search(array[i]), `bst.search(${array[i]})`);
}

while (array.length) {
  let num = array.shift();
  bst.delete(num);
  assert(bst.validate(), `bst.validate()`);
  assert(bst.toArray().sort((a, b) => a - b).equals([...array].sort((a, b) => a - b)), 'bst.toArray().equals(array)');
  assert(!bst.search(num), `bst.search(${num})`);
  console.log(bst.print());
  num = array.pop();
  bst.delete(num);
  assert(bst.validate(), `bst.validate()`);
  assert(bst.toArray().sort((a, b) => a - b).equals([...array].sort((a, b) => a - b)), 'bst.toArray().equals(array)');
  assert(!bst.search(num), `bst.search(${num})`);
  console.log(bst.print());
}