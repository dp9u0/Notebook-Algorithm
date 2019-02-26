const TEST_COUNT = Math.pow(10, 4);
const MAX_NUM = Math.pow(10, 1);

let BinarySearchTree = require("../BinarySearchTree")

let bst = new BinarySearchTree.BinarySearchTree();

const Random = () => {
  return ~~(Math.random() * MAX_NUM);
}
// CASE:INSERT
for (let i = 0; i < TEST_COUNT; i++) {
  let value = Random()
  bst.insert(value);
}

// CASE:SEARCH 

// CASE:DELETE 
for (let i = 0; i < 10; i++) {
  let value = Random()
  bst.delete(value);
}

