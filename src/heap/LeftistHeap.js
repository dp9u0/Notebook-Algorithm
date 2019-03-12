const Comparator = require("../common/Comparator");

/**
 * 
 * @param {LeftistHeapNode} node1 node1 to merge
 * @param {LeftistHeapNode} node2 node2 to merge
 * @param {Comparator} comparator comparator for value
 * @return {LeftistHeapNode} root node after merge
 */
function _merge(node1, node2, comparator) {
  if (!node1) {
    return node2;
  }
  if (!node2) {
    return node1;
  }
  let root = node1,
    another = node2;
  if (!comparator.lessThan(node1._value, node2._value)) {
    root = node2;
    another = node1;
  }
  let right = root._right;
  _setRight(root, null);
  _setRight(root, _merge(right, another, comparator));
  if (_npl(root._left) < _npl(root._right)) {
    _swapLR(root);
  }
  root._npl = _npl(root._right) + 1;
  return root;
}

/**
 * 
 * @param {LeftistHeapNode} node 
 */
function _swapLR(node) {
  if (!node) {
    return;
  }
  let left = node._left,
    right = node._right;
  _setLeft(node, null);
  _setRight(node, null);
  _setLeft(node, right);
  _setRight(node, left);
}

/**
 * 设置左子树
 * @param {LeftistHeapNode} node root
 * @param {LeftistHeapNode} left left
 */
function _setLeft(node, left) {
  if (node._left === left) {
    return;
  }
  node._left && (node._left._parent = null);
  node._left = left;
  node._left && (node._left._parent = node);
}

/**
 * 设置右子树
 * @param {LeftistHeapNode} node root
 * @param {LeftistHeapNode} right right
 */
function _setRight(node, right) {
  if (node._right === right) {
    return;
  }
  node._right && (node._right._parent = null);
  node._right = right;
  node._right && (node._right._parent = node);
}


/**
 * calc _npl of node
 * @param {LeftistHeapNode} node get npl of node,if node is null, return -1
 */
function _npl(node) {
  if (!node) {
    return -1;
  }
  return node._npl;
}

/**
 * 将二叉树输出为可打印格式的数组
 * @param {LeftistHeapNode} node 
 */
function _print(node) {
  const fill = (rows, node, r, s, e, h) => {
    if (!node || r >= h) return;
    let i = ~~((s + e) / 2);
    rows[r][i] = node._value + "(" + _npl(node) + ")";
    fill(rows, node._left, r + 1, s, i - 1, h);
    fill(rows, node._right, r + 1, i + 1, e, h);
  }
  let h = _height(node);
  if (h > 6) h = 6;
  let l = Math.pow(2, h - 1) * 2 - 1;
  let rows = Array.from({
    length: h
  }, () => new Array(l).fill(''));
  fill(rows, node, 0, 0, l - 1, h);
  return rows;
}

/**
 * 树高度
 * @param {Node} node 
 */
function _height(node) {
  let nodes = [node];
  let height = 0;
  while (nodes.length) {
    let currentLevelNodes = [...nodes];
    nodes = [];
    for (let i = 0; i < currentLevelNodes.length; i++) {
      const n = currentLevelNodes[i];
      if (n) {
        nodes.push(n._left);
        nodes.push(n._right);
      }
    }
    if (nodes.length) {
      height++;
    }
  }
  return height;
}

/**
 * LeftistHeapNode
 */
class LeftistHeapNode {

  /**
   * LeftistHeapNode
   * @param {*} value 
   * @param {Comparator} comparator comparator for value
   */
  constructor(value = null) {
    this._value = value;
    this._parent = null;
    this._left = null;
    this._right = null;
    this._npl = 0;
  }
}
/**
 * LeftistHeap
 */
class LeftistHeap {

  /**
   * 构造
   * @param {Function} fn comparator function
   */
  constructor(fn = null) {
    this.comparator = new Comparator(fn);
    this.root = null;
  }

  /**
   * 
   * @param {*} value element to insert
   */
  insert(value) {
    let node = new LeftistHeapNode(value);
    this.root = _merge(this.root, node, this.comparator);
  }

  /**
   * delete element on top of heap and return
   * @return {*} element on top of heap
   */
  pop() {
    if (!this.root) {
      return null;
    }
    let value = this.root._value;
    this.root = _merge(this.root._left, this.root._right, this.comparator);
    return value;
  }

  /**
   * return element on top of heap
   * @return {*} element on top of heap
   */
  peek() {
    if (!this.root) {
      return null;
    }
    return this.root._value;
  }

  /**
   * print
   */
  print() {
    return _print(this.root);
  }

  /**
   * validate heap
   */
  validate() {
    if (!this.root) {
      return true;
    }
    let nodes = [this.root];
    while (nodes.length) {
      let node = nodes.pop();
      if (_npl(node._left) < _npl(node._right)) {
        return false;
      }
      if (node._left) {
        if (this.comparator.lessThan(node._left, node._value)) {
          return false;
        }
        nodes.push(node._left);
      }
      if (node._right) {
        if (this.comparator.lessThan(node._right, node._value)) {
          return false;
        }
        nodes.push(node._right);
      }
    }
    return true;
  }

  /**
   * create heap from array
   * @param {*[]} array 
   * @
   */
  static from(array) {
    let heap = new LeftistHeap();
    for (let i = 0; i < array.length; i++) {
      heap.insert(array[i]);
    }
    return heap;
  }
}

module.exports = LeftistHeap;