const {
  _size,
  _height,
  _rotateLeft,
  _rotateRight,
  _inOrderTraverse,
  _setLeft,
  _setRight,
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
function _isRoot(node) {
  return node && !node._parent;
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
function _setColorRed(node) {
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
 * 判断一个节点是否是红色.
 * @param {RedBlackTreeNode} node 判断的节点
 */
function _isRed(node) {
  return _getColor(node) === COLOR_RED;
}

/**
 * 判断一个节点是否是红色.
 * @param {RedBlackTreeNode} node 判断的节点
 */
function _isBlack(node) {
  return _getColor(node) === COLOR_BLACK;
}

/**
 * node是否是左孩子,供 insertFixup 使用,前提是 node 肯定不为空
 * @param {RedBlackTreeNode} node 
 */
function _isLeft(node) {
  let parent = node._parent;
  return parent && parent._left === node;
}

/**
 * node是否是右孩子,供 insertFixup 使用,前提是 node 肯定不为空
 * @param {RedBlackTreeNode} node 
 */
function _isRight(node) {
  let parent = node._parent;
  return parent && parent._right === node;
}

/**
 * 获取一个节点的兄弟节点,供 insertFixup 使用,前提是 node 肯定不为空
 * @param {*} node 
 */
function _getBrother(node) {
  let parent = node._parent;
  if (parent) {
    return parent._left === node ? parent._right : parent._left;
  }
}

/**
 * node是否是左孩子,供 deleteFixup 使用,node 可能为空
 * 无法通过 node._parent 获取到parent,需要主动传入parent
 * @param {RedBlackTreeNode} node 判断的node
 * @param {RedBlackTreeNode} parent parent节点
 */
function _isLeftV2(node, parent) {
  return parent._left === node;
}

/**
 * node是否是右孩子,供 deleteFixup 使用,node 可能为空
 * 无法通过 node._parent 获取到parent,需要主动传入parent
 * @param {RedBlackTreeNode} node 判断的node
 * @param {RedBlackTreeNode} parent parent节点
 */
function _isRightV2(node, parent) {
  return parent._right === node;
}

/**
 * 获取一个节点的兄弟节点,供 deleteFixup 使用,node 可能为空
 * 无法通过 node._parent 获取到parent,需要主动传入parent
 * @param {RedBlackTreeNode} node 判断的node
 * @param {RedBlackTreeNode} parent parent节点
 */
function _getBrotherV2(node, parent) {
  return parent._left === node ? parent._right : parent._left;
}

/**
 * 
 * @param {RedBlackTreeNode} node 
 */
function _nodeValidate(node) {
  if (_isRed(node)) {
    if (_isRoot(node) || _isRed(node._parent)) {
      return false;
    }
  }
  let leaves = [];
  let nodes = [node];
  while (nodes.length) {
    let n = nodes.shift();
    let {
      left,
      right
    } = n;
    if (left || right) {
      if (left) {
        nodes.push(left);
      }
      if (right) {
        nodes.push(right);
      }
    } else {
      leaves.push(n);
    }
  }
  let set = new Set();
  for (let i = 0; i < leaves.length; i++) {
    let blackHeight = 1;
    let leaf = leaves[i];
    while (leaf && leaf !== node) {
      if (_isBlack(leaf)) {
        blackHeight++;
      }
      leaf = leaf._parent;
    }
    set.add(blackHeight);
  }
  let blackHeights = set.size;
  return blackHeights === 1;
}

/**
 * fixup after insert
 * @param {RedBlackTreeNode} z node inserted
 * @param {RedBlackTreeNode} p parents of z
 * @param {RedBlackTreeNode} root old root of tree
 */
function _insertFixup(z, p, root) {
  while (_isRed(p)) {
    let isLeft = _isLeft(p);
    let u = _getBrother(p);
    let g = p._parent;
    if (_isRed(u)) { // case 1
      _setColorBlack(p);
      _setColorBlack(u);
      _setColorRed(g);
      z = g;
      p = z._parent;
    } else { // case 2/3
      let case2 = isLeft ? _isRight(z) : _isLeft(z);
      if (case2) { // CASE:2
        if (isLeft) {
          _rotateLeft(p);
        } else {
          _rotateRight(p);
        }
        z = p;
        p = z._parent;
      }
      // CASE:3
      _setColorBlack(p);
      _setColorRed(g);
      if (isLeft) {
        _rotateRight(g);
      } else {
        _rotateLeft(g);
      }
    }
  }
  // 旋转后,root 可能不再是root了,需要重新更新root.
  while (!_isRoot(root)) {
    root = root._parent;
  }
  _setColorBlack(root);
  return root;
}

/**
 * fixup after delete
 * @param {RedBlackTreeNode} x replacement of node deleted
 * @param {RedBlackTreeNode} p parents of x
 * @param {RedBlackTreeNode} root old root of tree
 */
function _deleteFixup(x, p, root) {
  while (!_isRoot(x) && _isBlack(x)) {
    let isLeft = _isLeftV2(x, p);
    let w = _getBrotherV2(x, p);
    if (_isRed(w)) { // CASE: 1
      _setColorBlack(w);
      _setColorRed(p);
      if (isLeft) {
        _rotateLeft(p)
      } else {
        _rotateRight(p);
      }
      w = _getBrotherV2(x, p);
    }
    let {
      _left: wl,
      _right: wr
    } = w;
    if (_isBlack(wl) && _isBlack(wr)) { // CASE: 2
      _setColorRed(w);
      x = p;
    } else {
      let case3 = isLeft ? _isBlack(wr) : _isBlack(wl);
      if (case3) { // CASE: 3
        _setColorRed(w);
        if (isLeft) {
          _setColorBlack(wl);
          _rotateRight(w);
        } else {
          _setColorBlack(wr);
          _rotateLeft(w);
        }
        w = _getBrotherV2(x, p);
      }
      // CASE: 4
      _setColor(w, _getColor(p));
      _setColorBlack(p)
      if (isLeft) {
        _setColorBlack(wr);
        _rotateLeft(p);
      } else {
        _setColorBlack(wl);
        _rotateRight(p);
      }
      while (!_isRoot(root)) {
        root = root._parent;
      }
      x = root;
    }
  }
  _setColorBlack(x);
  // 旋转后,root 可能不再是root了,需要重新更新root.
  while (!_isRoot(root)) {
    root = root._parent;
  }
  return root;
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
      root = _insertFixup(node, node._parent, root);
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
    if (deleted && _isBlack(deleted)) {
      root = _deleteFixup(replacement, parent, root);
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
   * Get color of this node
   */
  get color() {
    return this._color;
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
    // TODO: JUST FOR TEST
    // return _validate(this, this.comparator, _nodeValidate);
    return _validate(this, this.comparator);
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
    this._root = null;
  }

  /**
   * 插入
   * @param {*} value : value
   */
  insert(value) {
    if (!this._root) {
      this._root = new RedBlackTreeNode(value, this.comparator, COLOR_BLACK);
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
   * 验证是否是个BST
   */
  validate() {
    return this._root ? this._root.validate() : true;
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

  /**
   * 通过 array 创建一个 RedBlackTree
   * @param {RedBlackTreeNode[]}
   * @return {RedBlackTree}
   */
  static _fromNodeArray(values, colors) {
    const isNull = (value) => {
      return value === null || value === undefined;
    }
    let tree = new RedBlackTree();
    let comparator = new Comparator();
    if (!values.length || !values[0]) {
      return tree;
    }
    values = [...values];
    let value = values.shift();
    let color = colors.shift();
    tree._root = new RedBlackTreeNode(value, comparator, color);
    let q = [tree.root];
    while (values.length) {
      let node = q.shift();
      let left = values.shift();
      let colorL = colors.shift();
      let right = values.shift();
      let colorR = colors.shift();
      if (!node && !(isNull(left) && isNull(right))) {
        throw new Error("invalid array");
      }
      if (!isNull(left)) {
        _setLeft(node, new RedBlackTreeNode(left, comparator, colorL));
        q.push(node._left);
      } else {
        q.push(null);
      }
      if (!isNull(right)) {
        _setRight(node, new RedBlackTreeNode(right, comparator, colorR));
        q.push(node._right);
      } else {
        q.push(null);
      }
    }
    return tree;
  }
}

module.exports = RedBlackTree;