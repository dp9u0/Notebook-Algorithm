const {
  _rotateLeft,
  _rotateRight,
  _size,
  _height,
  _inOrderTraverse,
  _validate,
  _insert,
  _delete,
  _find,
  _setLeft,
  _setRight
} = require("./BinarySearchTreeCommon");

const Comparator = require("../common/Comparator");

const MaxPriority = 1e3;

/**
 * Random Priority
 */
function _randonPriority() {
  return ~~(Math.random() * MaxPriority);
}

/**
 * fixup after insert
 * @param {Treap} node 
 */
function _insertFixup(node) {
  while (node && node._parent) {
    let p = node._parent;
    if (node._priority < p._priority) {
      if (node === p._left) {
        _rotateRight(p);
      } else {
        _rotateLeft(p);
      }
    } else {
      break;
    }
  }
}

/**
 * 将二叉树输出为可打印格式的数组
 * @param {Node} node 
 */
function _print(node) {
  const fill = (rows, node, r, s, e) => {
    if (!node) return;
    let i = ~~((s + e) / 2);
    rows[r][i] = node._value + '(' + node._priority + ")";
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
 * 
 * @param {RedBlackTreeNode} node 
 */
function _nodeValidate(node) {
  if (node._left) {
    if (node._priority > node._left._priority) {
      return false;
    }
  }
  if (node._right) {
    if (node._priority > node._right._priority) {
      return false;
    }
  }
  return true;
}

/**
 * TreapNode
 */
class TreapNode {

  /**
   * TreapNode
   * @param {*} value 
   * @param {Comparator} fn comparator
   */
  constructor(value = null, comparator, priority = null) {
    this._value = value;
    this._parent = null;
    this._left = null;
    this._right = null;
    this._priority = priority === null ? _randonPriority() : priority;
    this.comparator = comparator;
  }

  /**
   * insert [value] as this node's child(or grandchild)
   * @param {*} value [value] to insert
   * @return {TreapNode} root node after inserted
   */
  insert(value) {
    let root = this;
    let node = _insert(this, value, this.comparator, (value) => {
      return new TreapNode(value, this.comparator)
    });
    if (node) {
      _insertFixup(node);
      // root may changed
      while (root._parent) {
        root = root._parent;
      }
    }
    return root;
  }

  /**
   * delete this node's child(or grandchild) equals [value]
   * @param {*} value [value] to delete
   * @return {TreapNode} node after delete,may be return [null]
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
  search(value) {
    let node = _find(this, value, this.comparator);
    return !!node;
  }

  /**
   * Get parent
   * @return {TreapNode}
   */
  get parent() {
    return this._parent;
  }

  /**
   * Get left child
   * @return {TreapNode}
   */
  get left() {
    return this._left;
  }

  /**
   * Get right child
   * @return {TreapNode}
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
   * 验证是否是个BST
   */
  validate() {
    return _validate(this, this.comparator, _nodeValidate);
  }
}

/**
 * Treap
 */
class Treap {

  /**
   * 构造
   * @param {Function} fn comparator function
   */
  constructor(fn = null) {
    this.comparator = new Comparator(fn);
    this._root = null;
  }

  /**
   * 插入
   * @param {*} value : value
   */
  insert(value) {
    if (!this._root) {
      this._root = new TreapNode(value, this.comparator);
    } else {
      this._root = this._root.insert(value);
    }
  }

  /**
   * 删除
   * @param {*} value : value
   */
  delete(value) {
    if (this._root) {
      this._root = this._root.delete(value)
    }
  }

  /**
   * 查找
   * @param {*} value : value
   * @return {bool} 是否存在
   */
  search(value) {
    return this._root ? this._root.search(value) : false;
  }

  /**
   * Get Root Node Of This Tree
   */
  get root() {
    return this._root;
  }

  /**
   * tree height
   * @return {number}
   */
  get height() {
    return this._root ? this._root.height : 0;
  }

  /**
   * size of nodes
   */
  get size() {
    return this._root ? this._root.size : 0;
  }

  /**
   * 中序遍历
   * @return {*[]}
   */
  inOrderTraverse() {
    return _inOrderTraverse(this._root);
  }

  /**
   * 格式化打印
   */
  print() {
    return _print(this._root);
  }

  /**
   * 验证是否是个 Treap
   */
  validate() {
    return this._root ? this._root.validate() : true;
  }

  /**
   * 通过 array 创建一个 Treap
   * @param {*[]}
   * @return {Treap}
   */
  static fromArray(array) {
    let tree = new Treap();
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      tree.insert(element)
    }
    return tree;
  }

  /**
   * 通过 array 创建一个 Treap
   * @param {TreapNode[]}
   * @return {Treap}
   */
  static _fromNodeArray(values, priorities) {
    const isNull = (value) => {
      return value === null || value === undefined;
    }
    let tree = new Treap();
    let comparator = new Comparator();
    if (!values.length || !values[0]) {
      return tree;
    }
    values = [...values];
    let value = values.shift();
    let priority = priorities.shift();
    tree._root = new TreapNode(value, comparator, priority);
    let q = [tree.root];
    while (values.length) {
      let node = q.shift();
      let left = values.shift();
      let priorityL = priorities.shift();
      let right = values.shift();
      let priorityR = priorities.shift();
      if (!node && !(isNull(left) && isNull(right))) {
        throw new Error("invalid array");
      }
      if (!isNull(left)) {
        _setLeft(node, new TreapNode(left, comparator, priorityL));
        q.push(node._left);
      } else {
        q.push(null);
      }
      if (!isNull(right)) {
        _setRight(node, new TreapNode(right, comparator, priorityR));
        q.push(node._right);
      } else {
        q.push(null);
      }
    }
    return tree;
  }
}

// EXPORT
module.exports = Treap;