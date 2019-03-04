const {
  _setLeft,
  _setRight,
  _rotateLeft,
  _rotateRight,
  _inOrderTraverse,
  _print,
  _validate,
  _leftHeight,
  _rightHeight,
  _insert,
  _delete,
  _find
} = require("./BinarySearchTreeCommon");

const Comparator = require("../common/Comparator");

/**
 * 
 * @param {AVLTreeNode} node 
 */
function _nodeValidate(node) {
  return Math.abs(_leftHeight(node) - _rightHeight(node)) < 2;
}

/**
 * 维护AVLTreeNode 
 * 1.更新 _height
 * 2.保持平衡
 * @param {AVLTreeNode} node 
 */
function _maintain(node) {
  while (node) {
    if (Math.abs(node.balanceFactor) > 1) {
      _balance(node);
    }
    _recalculate(node);
    node = node._parent;
  }
}

/**
 * 重新计算节点的高度和size
 * @param {AVLTreeNode} node 
 */
function _recalculate(node) {
  node._height = Math.max(node.leftHeight, node.rightHeight) + 1
  node._size = node.leftSize + node.rightSize + 1
}

/**
 * 平衡AVLTreeNode
 * @param {AVLTreeNode} node 
 */
function _balance(node) {
  if (node.leftHeight > node.rightHeight) {
    if (node.left.leftHeight < node.left.rightHeight) {
      let nodeLeft = node.left;
      _rotateLeft(nodeLeft);
      _recalculate(nodeLeft)
    }
    _rotateRight(node);
  } else {
    if (node.right.rightHeight < node.right.leftHeight) {
      let nodeRight = node.right;
      _rotateRight(nodeRight);
      _recalculate(nodeRight)
    }
    _rotateLeft(node);
  }
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
    let root = this;
    let node = _insert(this, value, this.comparator, (value) => {
      return new AVLTreeNode(value, this.comparator);
    });
    if (node) {
      _maintain(node._parent);
      while (root && root._parent) {
        root = root._parent;
      }
    }
    return root;
  }

  /**
   * delete this node's child(or grandchild) equals [value]
   * @param {*} value [value] to delete
   * @return {AVLTreeNode} root node after delete,may be return [null]
   */
  delete(value) {
    let {
      root,
      parent,
      deleted
    } = _delete(this, value, this.comparator);
    if (deleted) {
      _maintain(parent);
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
   * Get Height of Left
   */
  get leftHeight() {
    return this._left ? this._left.height : 0
  }

  /**
   * Get Height of Right
   */
  get rightHeight() {
    return this._right ? this._right.height : 0
  }


  /**
   * Get Size of Left
   */
  get leftSize() {
    return this._left ? this._left.size : 0
  }

  /**
   * Get Size of Right
   */
  get rightSize() {
    return this._right ? this._right.size : 0
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
    return this._height;
  }

  /**
   * size of nodes
   */
  get size() {
    return this._size;
  }

  /**
   * 验证是否是个 AVL Tree
   */
  validate() {

    return _validate(this, this.comparator, _nodeValidate);
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