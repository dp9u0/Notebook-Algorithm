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
  _validate
} = require("./BinaryTree");

const Comparator = require("../common/Comparator");

/**
 * 维护AVLTreeNode 
 * 1.更新 _height
 * 2.保持平衡
 * @param {AVLTreeNode} node 
 */
function _maintain(node) {
  while (node) {
    if (Math.abs(node.balanceFactor) > 1) {
      node = _balance(node);
    }
    node._height = Math.max(node.leftHeight, node.rightHeight) + 1
    node = node._parent;
  }
}

/**
 * 平衡AVLTreeNode
 * @param {AVLTreeNode} node 
 */
function _balance(node) {
  let balanced = node;
  if (node.leftHeight > node.rightHeight) {
    if (node.left.leftHeight < node.left.rightHeight) {
      balanced = node.left;
      _rotateLeft(node.left);
    }
    _rotateRight(node);
  } else {
    if (node.right.rightHeight < node.right.leftHeight) {
      balanced = node.right;
      _rotateRight(node.right);
    }
    _rotateLeft(node);
  }
  return balanced;
}

/**
 * AVLTreeNode
 */
class AVLTreeNode {

  /**
   * AVLTreeNode
   * @param {*} value 
   * @param {Comparator} fn comparator
   */
  constructor(value = null, comparator) {
    this._value = value;
    this._parent = null;
    this._left = null;
    this._right = null;
    this._height = 1;
    this._size = 1;
    this.comparator = comparator;
  }

  /**
   * insert [value] as this node's child(or grandchild)
   * @param {*} value [value] to insert
   * @return {AVLTreeNode} root node after inserted
   */
  insert(value) {
    let node = this,
      root = this;
    let comparator = node.comparator;
    while (node) {
      if (comparator.lessThan(value, node.value)) {
        if (node.left) {
          node = node.left;
        } else {
          _setLeft(node, new AVLTreeNode(value, comparator));
          break;
        }
      } else if (comparator.greaterThan(value, node.value)) {
        if (node.right) {
          node = node.right;
        } else {
          _setRight(node, new AVLTreeNode(value, comparator));
          break;
        }
      } else {
        break;
      }
    }
    _maintain(node);
    while (root && root._parent) {
      root = root._parent;
    }
    return root;
  }

  /**
   * delete this node's child(or grandchild) equals [value]
   * @param {*} value [value] to delete
   * @return {AVLTreeNode} root node after delete,may be return [null]
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
      let maintain;
      if (actual) {
        node.value = actual.value;
        maintain = actual._parent;
        _replace(actual, actual.right);
      } else {
        maintain = node._parent;
        let newNode = _replace(node, node.left);
        // update root ,because root deleted
        if (root === node) {
          root = newNode;
        }
      }
      _maintain(maintain);
    }
    while (root && root._parent) {
      root = root._parent;
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
   * Get parent
   * @return {AVLTreeNode}
   */
  get parent() {
    return this._parent;
  }

  /**
   * Get left child
   * @return {AVLTreeNode}
   */
  get left() {
    return this._left;
  }

  /**
   * Set left child
   * @param {AVLTreeNode} node
   */
  set left(node) {
    _setLeft(this, node);
    _maintain(this);
  }

  /**
   * Get right child
   * @return {AVLTreeNode}
   */
  get right() {
    return this._right;
  }

  /**
   * Set right child
   * @param {AVLTreeNode} node
   */
  set right(node) {
    _setRight(this, node);
    _maintain(this);
  }

  /**
   * 平衡因子
   * @return {Number} [-2,-1,-0,1,2]
   */
  get balanceFactor() {
    return this.leftHeight - this.rightHeight;
  }

  /**
   * 
   */
  get leftHeight() {
    return this._left ? this._left.height : 0
  }

  /**
   * 
   */
  get rightHeight() {
    return this._right ? this._right.height : 0
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
    //return this._height;
    return _height(this);
  }

  /**
   * size of nodes
   */
  get size() {
    return _size(this);
  }

  /**
   * 验证是否是个 AVL Tree
   */
  validate() {
    // let balance = (Math.abs(this.balanceFactor) < 2);
    // let leftParent = !this.left || this.left._parent === this;
    // let rightParent = !this.right || this.right._parent === this;
    // let leftValue = !this.left || this.comparator.lessThan(this.left.value, this.value);
    // let rightValue = !this.right || this.comparator.greaterThan(this.right.value, this.value);
    // let leftValid = !this.left || this.left.validate();
    // let rightValid = !this.right || this.right.validate();
    // let valid = (balance) &&
    //   (!this.left || (leftParent && leftValue && leftValid)) &&
    //   (!this.right || (rightParent && rightValue && rightValid));
    // if (!valid) {
    //   console.log({
    //     balance,
    //     leftParent,
    //     leftValue,
    //     leftValid,
    //     rightParent,
    //     rightValue,
    //     rightValid
    //   })
    //   console.table(_print(this))
    // }
    // return valid;
    return (Math.abs(this.balanceFactor) < 2) &&
      (!this.left || (this.left._parent === this && this.comparator.lessThan(this.left.value, this.value) && this.left.validate())) &&
      (!this.right || (this.right._parent === this && this.comparator.greaterThan(this.right.value, this.value) && this.right.validate()));
  }
}

/**
 * AVLTree
 */
class AVLTree {

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
      this.root = new AVLTreeNode(value, this.comparator);
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
   * 通过 array 创建一个 AVLTree
   * @param {*[]}
   * @return {AVLTree}
   */
  static fromArray(array) {
    let tree = new AVLTree();
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      tree.insert(element)
    }
    return tree;
  }
}

module.exports = AVLTree;