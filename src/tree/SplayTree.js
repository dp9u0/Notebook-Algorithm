const {
  _setLeft,
  _setRight,
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

/**
 * splay node to the root
 * @param {SplayTreeNode} node
 */
function _splay(node) {
  while (node._parent) {
    let p = node._parent;
    let g = p._parent;
    if (g) { // ZIG-ZIG or ZIG-ZAG
      if (g._left === p) {
        if (p._left === node) { // ZIG-ZIG
          _rotateRight(g);
          _rotateRight(p);
        } else { // ZIG-ZAG
          _rotateLeft(p);
          _rotateRight(g);
        }
      } else {
        if (p._right === node) { // ZIG-ZIG
          _rotateLeft(g);
          _rotateLeft(p);
        } else { // ZIG-ZAG
          _rotateRight(p);
          _rotateLeft(g);
        }
      }
    } else if (p._left === node) { // ZIG 
      _rotateRight(p);
    } else if (p._right === node) { // ZIG 
      _rotateLeft(p);
    }
  }
}

/**
 * SplayTreeNode
 */
class SplayTreeNode {
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
   * @return {SplayTreeNode} root node after inserted
   */
  insert(value) {
    let node = _insert(this, value, this.comparator, (value) => {
      return new SplayTreeNode(value, this.comparator)
    });
    return this;
  }

  /**
   * delete this node's child(or grandchild) equals [value]
   * @param {*} value [value] to delete
   * @return {SplayTreeNode} node after delete,may be return [null]
   */
  delete(value) {
    let result = _delete(this, value, this.comparator)
    return result.root;
  }

  /**
   * search for value
   * @param {*} value value to search
   * @return {boolean} find or not
   */
  search(value, out = {}) {
    let node = _find(this, value, this.comparator);
    let result = !!node
    if (result) {
      _splay(node);
      out.newRoot = node;
    }
    return result;
  }

  /**
   * Get left child
   * @return {SplayTreeNode}
   */
  get left() {
    return this._left;
  }

  /**
   * Set left child
   * @param {SplayTreeNode} node
   */
  set left(node) {
    _setLeft(this, node);
  }

  /**
   * Get right child
   * @return {SplayTreeNode}
   */
  get right() {
    return this._right;
  }

  /**
   * Set right child
   * @param {SplayTreeNode} node
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
    return _validate(this);
  }
}

/**
 * SplayTree
 */
class SplayTree {


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
      this.root = new SplayTreeNode(value, this.comparator);
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
      let out = {
        newRoot: this.root
      };
      let result = this.root.search(value, out);
      if (result) {
        this.root = out.newRoot;
      }
      return result;
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
   * 验证是否是个 Splay Tree
   */
  validate() {
    return this.root ? this.root.validate() : true;
  }

  /**
   * 通过 array 创建一个 Splay Tree
   * @param {*[]}
   * @return {SplayTree}
   */
  static fromArray(array) {
    let tree = new SplayTree();
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      tree.insert(element)
    }
    return tree;
  }
}

module.exports = SplayTree;