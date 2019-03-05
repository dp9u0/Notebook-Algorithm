const {
  _size,
  _height,
  _rotateLeft,
  _rotateRight,
  _inOrderTraverse,
  _validate,
  _insert,
  _delete,
  _find
} = require("./BinarySearchTreeCommon");

const Comparator = require("../common/Comparator");
const COLOR_BLACK = 'B';
const COLOR_RED = 'R';

/**
 * 将二叉树输出为可打印格式的数组
 * @param {Node} node 
 */
function _print(node) {
  const fill = (rows, node, r, s, e) => {
    if (!node) return;
    let i = ~~((s + e) / 2);
    if (node._color === COLOR_RED) {
      rows[r][i] = '[' + node._value + "]";
    } else {
      rows[r][i] = '' + node._value;
    }
    fill(rows, node._left, r + 1, s, i - 1);
    fill(rows, node._right, r + 1, i + 1, e);
  }
  let h = _height(node);
  let l = Math.pow(2, h - 1) * 2 - 1;
  let rows = Array.from({
    length: h
  }, () => new Array(l).fill(''));
  fill(rows, node, 0, 0, l - 1);
  return rows;
}

/**
 * 是否是root节点
 */
function _isRoot() {
  return !node._parent;
}

/**
 * node是否是左孩子
 * @param {RedBlackTreeNode} node 
 */
function _isLeft(node) {
  return node._parent && node._parent._left === node;
}

/**
 * 获取 node 的颜色,如果node === null 则为黑色
 * @param {RedBlackTreeNode} node 
 */
function _getColor(node) {
  if (!node) {
    return COLOR_BLACK;
  }
  return node._color;
}


/**
 * 设置 node 的颜色,如果node === null,不做任何操作...
 * @param {RedBlackTreeNode} node 
 */
function _setColor(node, color) {
  if (node) {
    node._color = color;
  }
}

/**
 * 设置 node 的颜色为红色,如果node === null,不做任何操作...
 * @param {RedBlackTreeNode} node 
 */
function _setColor(node) {
  _setColor(node, COLOR_RED);
}

/**
 * 设置 node 的颜色为黑色,如果node === null,不做任何操作...
 * @param {RedBlackTreeNode} node 
 */
function _setColorBlack(node) {
  _setColor(node, COLOR_BLACK);
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
 * @param {RedBlackTreeNode} z node inserted
 * @param {RedBlackTreeNode} p parents of z
 */
function _insertFixup(z, p) {
  while (_getColor(p) === COLOR_RED) {
    if (_isLeft(p)) {

    } else { //same as then clause with "right" and "left" exchanged

    }
  }
}

/**
 * fixup after delete
 * @param {RedBlackTreeNode} x replacement of node deleted
 * @param {RedBlackTreeNode} p parents of x
 */
function _deleteFixup(x, p) {
  while (!_isRoot(x) && _getColor(x) === COLOR_BLACK) {

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
  constructor(value = null, comparator, color = COLOR_RED) {
    this._value = value;
    this._parent = null;
    this._left = null;
    this._right = null;
    this._color = color;
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
      // root = _insertFixup(node, node._parent);
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
      deleted,
      parent,
      replacement
    } = _delete(this, value, this.comparator);
    if (deleted) {
      // root = _deleteFixup(replacement, parent);
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
      this.root = new RedBlackTreeNode(value, this.comparator, COLOR_BLACK);
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