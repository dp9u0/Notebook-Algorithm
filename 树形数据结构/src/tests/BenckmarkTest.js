const TEST_COUNT = Math.pow(10, 6);
const MAX_NUM = Math.pow(10, 3);

const Random = () => {
  return ~~(Math.random() * MAX_NUM);
}

const test = (tree, description = '') => {
  let result = {
    description
  };
  // CASE:INSERT
  for (let i = 0; i < TEST_COUNT; i++) {
    let value = Random()
    tree.insert(value);
  }
  // CASE:INSERT
  for (let i = 0; i < TEST_COUNT; i++) {
    let value = Random()
    tree.search(value);
  }
  // CASE:DELETE 
  for (let i = 0; i < 10; i++) {
    let value = Random()
    tree.delete(value);
  }
  return result;
}

let BinarySearchTree = require("../BinarySearchTree")
let bst = new BinarySearchTree();
console.log(test(bst))