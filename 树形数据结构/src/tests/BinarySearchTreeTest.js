let {
  BinarySearchTree
} = require("../BinarySearchTree")

let bst = new BinarySearchTree();

let array = [5, 1, 4, 8, 6, 2, 3, 7, 9]
for (let i = 0; i < array.length; i++) {
  bst.insert(array[i]);
  console.log(bst.toString())
}

for (let i = 0; i < array.length; i++) {
  console.log(bst.search(array[i]));
}

for (let i = 0; i < array.length; i++) {
  bst.delete(array[i]);
  console.log(bst.toString())
}