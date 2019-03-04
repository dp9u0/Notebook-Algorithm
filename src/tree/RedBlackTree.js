const {
  _size,
  _height,
  _rotateLeft,
  _rotateRight,
  _inOrderTraverse,
  _print,
  _validate,
  _insert,
  _delete,
  _find
} = require("./BinarySearchTreeCommon");

const Comparator = require("../common/Comparator");
const COLOR_BLACK = 'B';
const COLOR_RED = 'R';

/**
 * 
 * @param {*} node 
 */
function _color(node) {
  if (!node) {
    return COLOR_BLACK;
  }
  return node._color;
}
/**
 * 
 * @param {RedBlackTreeNode} node 
 */
function _nodeValidate(node) {
  return true;
}

/**
 * fixup after insert
 * @param {RedBlackTreeNode} node 
 */
function _insertFixup(node) {
  while (node && node._parent && _color(node._parent) === COLOR_RED) {
    node = node._parent;
  }
}

/**
 * fixup after delete
 * @param {RedBlackTreeNode} node 
 */
function _deleteFixup(node) {
  while (node && node._parent && _color(node) === COLOR_BLACK) {
    node = node._parent;
  }
}

/**
 * RedBlackTreeNode
 */
class RedBlackTreeNode {

  /**
   * RedBlackTreeNode
   * @param {*} value 
   * @param {Comparator} fn comparator
   */
  constructor(value = null, comparator) {
    this._value = value;
    this._parent = null;
    this._left = null;
    this._right = null;
    this._color = COLOR_RED;
    this.comparator = comparator;
  }

  /**
   * insert [value] as this node's child(or grandchild)
   * @param {*} value [value] to insert
   * @return {RedBlackTreeNode} root node after inserted
   */
  insert(value) {
    let root = this;
    let node = _insert(this, value, this.comparator, (value) => {
      return new RedBlackTreeNode(value, this.comparator)
    });
    if (node) {
      _insertFixup(node);
      while (root && root._parent) {
        root = root._parent;
      }
    }
    return root;
  }

  /**
   * delete this node's child(or grandchild) equals [value]
   * @param {*} value [value] to delete
   * @return {RedBlackTreeNode} node after delete,may be return [null]
   */
  delete(value) {
    let {
      root,
      parent,
      deleted
    } = _delete(this, value, this.comparator);
    if (deleted) {
      _deleteFixup(parent);
      while (root && root._parent) {
        root = root._parent;
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
    let node = _find(this, value, this.comparator);
    return !!node;
  }

  /**
   * Get parent
   * @return {RedBlackTreeNode}
   */
  get parent() {
    return this._parent;
  }

  /**
   * Get left child
   * @return {RedBlackTreeNode}
   */
  get left() {
    return this._left;
  }

  /**
   * Get right child
   * @return {RedBlackTreeNode}
   */
  get right() {
    return this._right;
  }

  /**
   * Get value
   * @return {*}
   */
  get value() {
    return this._value;
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
   * 验证是否是个 RB Tree
   */
  validate() {
    return _validate(this, this.comparator, _nodeValidate);
  }
}

/**
 * RedBlackTree
 */
class RedBlackTree {
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
      this.root = new RedBlackTreeNode(value, this.comparator);
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
    return this.root ? this.root.search(value) : false;
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
   * 通过 array 创建一个 RedBlackTree
   * @param {*[]}
   * @return {RedBlackTree}
   */
  static fromArray(array) {
    let tree = new RedBlackTree();
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      tree.insert(element)
    }
    return tree;
  }
}

module.exports = RedBlackTree;