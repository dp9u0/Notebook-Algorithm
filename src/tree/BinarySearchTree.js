const {
  _setLeft,
  _setRight,
  _replace,
  _size,
  _height,
  _inOrderTraverse,
  _print,
} = require("./BinaryTree");

const Comparator = require("../common/Comparator");

/**
 * BinarySearchTreeNode
 */
class BinarySearchTreeNode {

  /**
   * BinarySearchTreeNode
   * @param {*} value 
   * @param {Comparator} fn comparator
   */
  constructor(value = null, comparator) {
    this._value = value;
    this._parent = null;
    this._left = null;
    this._right = null;
    this.comparator = comparator;
  }

  /**
   * insert [value] as this node's child(or grandchild)
   * @param {*} value [value] to insert
   * @return {BinarySearchTreeNode} root node after inserted
   */
  insert(value) {
    let node = this;
    let comparator = node.comparator;
    while (node) {
      if (comparator.lessThan(value, node.value)) {
        if (node.left) {
          node = node.left;
        } else {
          _setLeft(node, new BinarySearchTreeNode(value, comparator));
          break;
        }
      } else if (comparator.greaterThan(value, node.value)) {
        if (node.right) {
          node = node.right;
        } else {
          _setRight(node, new BinarySearchTreeNode(value, comparator));
          break;
        }
      } else {
        break;
      }
    }
    return this;
  }

  /**
   * delete this node's child(or grandchild) equals [value]
   * @param {*} value [value] to delete
   * @return {BinarySearchTreeNode} node after delete,may be return [null]
   */
  delete(value) {
    let node = this,
      root = this;
    let comparator = node.comparator;
    while (node) {
      if (comparator.lessThan(value, node.value)) {
        node = node.left;
      } else if (comparator.greaterThan(value, node.value)) {
        node = node.right;
      } else {
        break;
      }
    }
    if (node) {
      // delete node
      let actual = node.right;
      while (actual && actual.left) {
        actual = actual.left;
      }
      if (actual) {
        node.value = actual.value;
        _replace(actual, actual.right);
      } else {
        let newNode = _replace(node, node.left);
        if (root === node) {
          root = newNode
        }
      }
    }
    return root;
  }

  /**
   * search for value
   * @param {*} value value to search
   * @return {boolean} find or not
   */
  search(value) {
    let node = this;
    let comparator = node.comparator;
    while (node) {
      if (comparator.lessThan(value, node.value)) {
        node = node.left
      } else if (comparator.greaterThan(value, node.value)) {
        node = node.right;
      } else {
        return true;
      }
    }
    return false;
  }

  /**
   * Get left child
   * @return {BinarySearchTree}
   */
  get left() {
    return this._left;
  }

  /**
   * Set left child
   * @param {BinarySearchTree} node
   */
  set left(node) {
    _setLeft(this, node);
  }

  /**
   * Get right child
   * @return {BinarySearchTree}
   */
  get right() {
    return this._right;
  }

  /**
   * Set right child
   * @param {BinarySearchTree} node
   */
  set right(node) {
    _setRight(this, node);
  }

  /**
   * Get value
   * @return {*}
   */
  get value() {
    return this._value;
  }

  /**
   * Set value
   * @param {*} value
   */
  set value(value) {
    this._value = value;
  }

  /**
   * tree height
   * @return {number}
   */
  get height() {
    return _height(this);
  }

  /**
   * size of nodes
   */
  get size() {
    return _size(this);
  }

  /**
   * 验证是否是个BST
   */
  validate() {
    return (!this.left || (this.left._parent === this && this.comparator.lessThan(this.left.value, this.value) && this.left.validate())) &&
      (!this.right || (this.right._parent === this && this.comparator.greaterThan(this.right.value, this.value) && this.right.validate()));
  }
}

/**
 * BinarySearchTree
 */
class BinarySearchTree {

  /**
   * 构造
   * @param {Function} fn comparator function
   */
  constructor(fn = null) {
    this.comparator = new Comparator(fn);
    this.root = null;
  }

  /**
   * 插入
   * @param {*} value : value
   */
  insert(value) {
    if (!this.root) {
      this.root = new BinarySearchTreeNode(value, this.comparator);
    } else {
      this.root = this.root.insert(value);
    }
  }

  /**
   * 删除
   * @param {*} value : value
   */
  delete(value) {
    if (this.root) {
      this.root = this.root.delete(value)
    }
  }

  /**
   * 查找
   * @param {*} value : value
   * @return {bool} 是否存在
   */
  search(value) {
    if (this.root) {
      return this.root.search(value);
    } else {
      return false;
    }
  }

  /**
   * tree height
   * @return {number}
   */
  get height() {
    return this.root ? this.root.height : 0;
  }

  /**
   * size of nodes
   */
  get size() {
    return this.root ? this.root.size : 0;
  }

  /**
   * 中序遍历
   * @return {*[]}
   */
  inOrderTraverse() {
    return _inOrderTraverse(this.root);
  }

  /**
   * 格式化打印
   */
  print() {
    return _print(this.root);
  }

  /**
   * 验证是否是个BST
   */
  validate() {
    return this.root ? this.root.validate() : true;
  }

  /**
   * 通过 array 创建一个 BinarySearchTree
   * @param {*[]}
   * @return {BinarySearchTree}
   */
  static fromArray(array) {
    let tree = new BinarySearchTree();
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      tree.insert(element)
    }
    return tree;
  }
}

// EXPORT
module.exports = BinarySearchTree;