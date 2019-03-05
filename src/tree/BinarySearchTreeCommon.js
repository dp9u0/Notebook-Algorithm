const Comparator = require("../common/Comparator");
const DefaultComparator = new Comparator();
/**
 * Default Binary Search Node
 */
class Node {

  /**
   * Node
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
 * 完全二叉树数组形式转换成 BinaryTree 并返回 root 节点
 * @param {number[]} array 
 * @return {Node}
 */
function _arrayToTree(array) {
  if (!array.length || !array[0]) {
    return null;
  }
  const isNull = (value) => {
    return value === null || value === undefined;
  }
  array = [...array];
  let root = new Node(array.shift());
  let q = [root];
  while (array.length) {
    let node = q.shift();
    let left = array.shift();
    let right = array.shift();
    if (!node && !(isNull(left) && isNull(right))) {
      throw new Error("invalid array");
    }
    if (!isNull(left)) {
      _setLeft(node, new Node(left));
      q.push(node._left);
    } else {
      q.push(null);
    }
    if (!isNull(right)) {
      _setRight(node, new Node(right));
      q.push(node._right);
    } else {
      q.push(null);
    }
  }
  return root;
}

/**
 * 替换节点
 * @param {Node} node 
 * @param {Node} newNode 
 */
function _replace(node, newNode) {
  let parent = node._parent;
  if (parent) {
    if (parent._left === node) {
      _setLeft(parent, newNode);
    } else {
      _setRight(parent, newNode);
    }
  } else if (newNode) {
    newNode._parent = null;
  }
  return newNode;
}

/**
 * 移除节点
 * @param {Node} node 
 */
function _remove(node) {
  _replace(node, null);
}

/**
 * 设置左子树
 * @param {Node} node 
 * @param {Node} left 
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
 * @param {Node} node 
 * @param {Node} right 
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
 * 获取叔父节点
 * @param {Node} node 
 * @return {Node}
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
 * 左子树大小
 * @param {Node} node 
 */
function _leftSize(node) {
  return _size(node._left);
}

/**
 * 右子树大小
 * @param {Node} node 
 */
function _rightSize(node) {
  return _size(node._right);
}

/**
 * 左子树高度
 * @param {Node} node 
 */
function _leftHeight(node) {
  return _height(node._left);
}

/**
 * 右子树高度
 * @param {Node} node 
 */
function _rightHeight(node) {
  return _height(node._right);
}

/**
 * 树大小
 * @param {Node} node 
 */
function _size(node) {
  let nodes = [node];
  let size = 0;
  while (nodes.length) {
    let n = nodes.shift();
    if (n) {
      size++;
      nodes.push(n._left);
      nodes.push(n._right);
    }
  }
  return size;
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
 * 中序遍历
 * @param {Node} node 
 */
function _inOrderTraverse(node) {
  let traverse = [];
  if (node) {
    let nodes = [];
    let p = node;
    while (p || nodes.length) {
      while (p) {
        nodes.push(p);
        p = p._left;
      }
      if (nodes.length) {
        p = nodes.pop();
        traverse.push(p._value);
        p = p._right;
      }
    }
  }
  return traverse;
}

/**
 * 将二叉树输出为可打印格式的数组
 * @param {Node} node 
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
 * 节点右旋
 * @param {Node} node 
 */
function _rotateRight(node) {
  let nodeLeft = node._left;
  let nodeLeftRight = node._left._right;
  _setLeft(node, null);
  _replace(node, nodeLeft);
  _setRight(nodeLeft, node);
  _setLeft(node, nodeLeftRight);
  return nodeLeft;
}

/**
 * 节点左旋
 * @param {Node} node 
 */
function _rotateLeft(node) {
  let nodeRight = node._right;
  let nodeRightLeft = node._right._left;
  _setRight(node, null);
  _replace(node, nodeRight);
  _setLeft(nodeRight, node);
  _setRight(node, nodeRightLeft);
  return nodeRight;
}

/**
 * validate if a node has BinaryTree structure
 * @param {Node} node 
 * @param {Comparator} comparator 
 * @param {Function} nodeValidator 
 */
function _validate(node, comparator = DefaultComparator, nodeValidator = (node) => true) {
  if (!node) {
    return true;
  }
  let nodes = [node];
  let set = new Set();
  while (nodes.length) {
    node = nodes.pop();
    if (set.has(node) || !nodeValidator(node)) {
      return false;
    }
    set.add(node);
    let {
      _left: left,
      _right: right
    } = node;
    if (left) {
      if (left._parent !== node || !comparator.lessThan(left._value, node._value)) {
        return false;
      }
      nodes.push(left);
    }
    if (right) {
      if (right._parent !== node || !comparator.greaterThan(right._value, node._value)) {
        return false;
      }
      nodes.push(right);
    }
  }
  return true;
}

/**
 * insert value after node
 * @param {Node} node insert after node
 * @param {*} value value to insert
 * @param {Comparator} comparator comparator to compare value
 * @param {Function} nodeCreator to create new node
 * @return {Node} node inserted,may be null
 */
function _insert(node, value, comparator = DefaultComparator, nodeCreator = (value) => new Node(value)) {
  while (node) {
    if (comparator.lessThan(value, node._value)) {
      if (node._left) {
        node = node._left;
      } else {
        _setLeft(node, nodeCreator(value));
        return node._left;
      }
    } else if (comparator.greaterThan(value, node._value)) {
      if (node._right) {
        node = node._right;
      } else {
        _setRight(node, nodeCreator(value));
        return node._right;
      }
    } else {
      return null;
    }
  }
  // NOTE: Will Never reach here
  return null;
}

/**
 * delete value after node
 * @param {Node} node delete after node
 * @param {*} value value to delete
 * @param {Comparator} comparator comparator to compare value
 * @return {Object} 
 *        return.deleted : deleted node
 *        return.parent : parent of node that deleted,may be null
 *        return.root : root after node that delete,may be null
 */
function _delete(node, value, comparator = DefaultComparator) {
  let root = node;
  let parent = null;
  let deleted = null;
  let replacement = null;
  while (node) {
    if (comparator.lessThan(value, node._value)) {
      node = node._left;
    } else if (comparator.greaterThan(value, node._value)) {
      node = node._right;
    } else {
      break;
    }
  }
  // delete node
  if (node) {
    if (node._left && node._right) {
      // 找到后继
      let actual = node._right;
      while (actual._left) {
        actual = actual._left;
      }
      // give actual._value to node
      node._value = actual._value;
      deleted = node = actual;
      parent = node._parent;
      replacement = node._right;
      // replace actual by actual._right,so node actual
      _replace(node, replacement);
    } else {
      deleted = node;
      parent = node._parent;
      replacement = node._left ? node._left : node._right;
      // replace node by node.children,so node deleted
      _replace(node, replacement);
    }
    if (root === node) {
      root = replacement;
    }
  }
  return {
    root,
    deleted,
    parent,
    replacement
  };
}

/**
 * find node that value euals [value] after node
 * @param {Node} node find value node after node
 * @param {*} value value to find
 * @param {Comparator} comparator comparator to compare value
 * @return {Node} node founded,may be null
 */
function _find(node, value, comparator = DefaultComparator) {
  while (node) {
    if (comparator.lessThan(value, node._value)) {
      node = node._left
    } else if (comparator.greaterThan(value, node._value)) {
      node = node._right;
    } else {
      return node;
    }
  }
  return null;
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
  _validate,
  _insert,
  _delete,
  _find
}