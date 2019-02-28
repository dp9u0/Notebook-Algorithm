const {
  _arrayToTree,
  _setLeft,
  _setRight,
  _replace,
  _remove,
  _getUncle,
  _size,
  _height,
  _leftHeight,
  _leftSize,
  _rightHeight,
  _rightSize,
  _rotateLeft,
  _rotateRight,
  _inOrderTraverse,
  _print,
} = require("../common/BinaryTree");

const assert = require('assert');
const BinarySearchTree = require("../BinarySearchTree");
const AVLTree = require("../AVLTree");

const TEST_COUNT = 1e4;
const MAX_NUM = 1e2;

function Random() {
  return ~~(Math.random() * MAX_NUM);
}

function _arrayToTreeTest() {
  let array = [6, 19, 4, 18, 12, 8, 2, 5, 16, 11, 7, 9, 14, 15, 1, 3, 10, 0, 13, 17];
  let tree = _arrayToTree([...array]);
  console.table(_print(tree));
  assert(tree._value === 6, "_arrayToTreeTest");
  assert(tree._left._value === 19, "_arrayToTreeTest");
}

function _setLeftTest() {}

function _setRightTest() {}

function _replaceTest() {}

function _removeTest() {}

function _getUncleTest() {}

function _sizeTest() {
  let array = [6, 19, 4, 18, 12, 8, 2, 5, 16, 11, 7, 9, 14, 15, 1, 3, 10, 0, 13, 17];
  let tree = _arrayToTree([...array]);
  assert(_size(tree) === array.length, `${_size(tree)} === ${array.length}`)
}

function _heightTest() {
  let array = [6, 19, 4, 18, 12, 8, 2, 5, 16, 11, 7, 9, 14, 15, 1, 3, 10, 0, 13, 17];
  let tree = _arrayToTree([...array]);
  assert(_height(tree) === 5, `${_height(tree)} === 5`);
}

function _leftHeightTest() {
  let array = [6, 19, 4, 18, 12, 8, 2, 5, 16, 11, 7, 9, 14, 15, 1, 3, 10, 0, 13, 17];
  let tree = _arrayToTree([...array]);
  assert(_leftHeight(tree) === 4, `${_leftHeight(tree)} === 4`);
}

function _leftSizeTest() {
  let array = [6, 19, 4, 18, 12, 8, 2, 5, 16, 11, 7, 9, 14, 15, 1, 3, 10, 0, 13, 17];
  let tree = _arrayToTree([...array]);
  assert(_leftSize(tree) === _size(tree._left), `${_leftSize(tree)} === ${_size(tree._left)}`);
}

function _rightHeightTest() {
  let array = [6, 19, 4, 18, 12, 8, 2, 5, 16, 11, 7, 9, 14, 15, 1, 3, 10, 0, 13, 17];
  let tree = _arrayToTree([...array]);
  assert(_rightHeight(tree) === 3, `${_rightHeight(tree)} === 3`);
}

function _rightSizeTest() {
  let array = [6, 19, 4, 18, 12, 8, 2, 5, 16, 11, 7, 9, 14, 15, 1, 3, 10, 0, 13, 17];
  let tree = _arrayToTree([...array]);
  assert(_rightSize(tree) === _size(tree._right), `${_rightSize(tree)} === ${_size(tree._right)}`);
}

function _rotateLeftTest() {}

function _rotateRightTest() {}

function _inOrderTraverseTest() {}

function _printTest() {}

function BinaryTreeOperationTest() {
  _arrayToTreeTest();
  _setLeftTest();
  _setRightTest();
  _replaceTest();
  _removeTest();
  _getUncleTest();
  _sizeTest();
  _heightTest();
  _leftHeightTest();
  _leftSizeTest();
  _rightHeightTest();
  _rightSizeTest();
  _rotateLeftTest();
  _rotateRightTest();
  _inOrderTraverseTest();
  _printTest();
}

function BinarySearchTreeTest(Tree) {
  let tree = new Tree();
}

function runAllBstTest() {}

BinaryTreeOperationTest();
runAllBstTest();