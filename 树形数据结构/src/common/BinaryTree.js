/**
 * 
 */
class BinaryTreeNode {

  /**
   * BinaryTreeNode
   * @param {*} value 
   */
  constructor(value = null) {
    this._value = value;
    this._parent = null;
    this._left = null;
    this._right = null;
  }
}

/** 
 * 
 * @param {number[]} voyage 
 * @return {BinaryTreeNode}
 */
function _arrayToTree(array) {
  if (!array.length || !array[0]) {
    return null;
  }
  let root = new BinaryTreeNode(array.shift());
  let q = [root];
  while (array.length) {
    let node = q.shift();
    if (!node) {
      throw new Error('unvalid array')
    }
    if (array[0] !== null && array[0] !== undefined) {
      let left = new BinaryTreeNode(array.shift());
      _setLeft(node, left);
      q.push(left);
    }
    if (array[0] !== null && array[0] !== undefined) {
      let right = new BinaryTreeNode(array.shift());
      _setRight(node, right);
      q.push(right);
    }
  }
  return root;
}

/**
 * 
 * @param {*} value 
 */
function _assetNotNull(value) {
  if (!value) {
    throw new ReferenceError("argument cannot be null");
  }
}

/**
 * 
 * @param {BinaryTreeNode} node 
 * @param {BinaryTreeNode} newNode 
 */
function _replace(node, newNode) {
  let parent = node._parent;
  if (parent) {
    if (parent._left === node) {
      _setLeft(parent, newNode);
    } else {
      _setRight(parent, newNode);
    }
  }
}

/**
 * 
 * @param {BinaryTreeNode} node 
 */
function _remove(node) {
  _replace(node, null);
}

/**
 * 
 * @param {BinaryTreeNode} node 
 * @param {BinaryTreeNode} left 
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
 * 
 * @param {BinaryTreeNode} node 
 * @param {BinaryTreeNode} right 
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
 * 
 * @param {BinaryTreeNode} node 
 * @return {BinaryTreeNode}
 */
function _getUncle(node) {
  let parent = node._parent;
  if (parent && parent._parent) {
    let grandParent = parent._parent;
    return grandParent.left === parent ? grandParent._right : grandParent._left;
  }
  return null;
}

/**
 * 
 * @param {BinaryTreeNode} node 
 */
function _leftSize(node) {
  return _size(node._left);
}

/**
 * 
 * @param {BinaryTreeNode} node 
 */
function _rightSize(node) {
  return _size(node._right);
}

/**
 * 
 * @param {BinaryTreeNode} node 
 */
function _leftHeight(node) {
  return _height(node._left);
}

/**
 * 
 * @param {BinaryTreeNode} node 
 */
function _rightHeight(node) {
  return _height(node._right);
}

/**
 * 
 * @param {BinaryTreeNode} node 
 */
function _size(node) {
  if (!node) return 0;
  return _leftSize(node) + _rightSize(node) + 1;
}

/**
 * 
 * @param {BinaryTreeNode} node 
 */
function _height(node) {
  if (!node) {
    return 0;
  }
  return Math.max(_leftHeight(node), _rightHeight(node)) + 1;
}

/**
 * 
 * @param {BinaryTreeNode} node 
 */
function _inOrderTraverse(node) {
  let traverse = [];
  if (!node) {
    return traverse;
  }
  traverse = traverse.concat(_inOrderTraverse(node._left));
  traverse.push(node._value);
  traverse = traverse.concat(_inOrderTraverse(node._right));
  return traverse;
}

/**
 * 
 * @param {BinaryTreeNode} node 
 */
function _print(node) {
  const fill = (rows, node, r, s, e) => {
    if (!node) return;
    let i = ~~((s + e) / 2);
    rows[r][i] = '' + node._value;
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
 * @param {BinaryTreeNode} node 
 */
function _rotateRight(node) {
  let nodeLeft = node._left;
  let nodeLeftRight = node._left._right;
  _setLeft(node, null);
  _replace(node, nodeLeft);
  _setLeft(node, nodeLeftRight);
  _setRight(nodeLeft, node);
}

/**
 * 
 * @param {BinaryTreeNode} node 
 */
function _rotateLeft(node) {
  let nodeRight = node._right;
  let nodeRightLeft = node._right._left;
  _setRight(node, null);
  _replace(node, nodeRight);
  _setRight(node, nodeRightLeft);
  _setLeft(nodeRight, node);
}

// Export
module.exports = {
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
}