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
   * insert value after this [node]
   * @param {*} value value to insert
   * @return {AVLTreeNode} [node] after inserted
   */
  insert(value) {
    if (this.comparator.lessThan(value, this.value)) {
      if (this.left) {
        return this.left.insert(value);
      } else {
        this.left = this.newNode(value);
        return true;
      }
    } else if (this.comparator.greaterThan(value, this.value)) {
      if (this.right) {
        return this.right.insert(value);
      } else {
        this.right = this.newNode(value);
        return true;
      }
    }
    return false;
  }

  /**
   * delete value from this [node]
   * @param {*} value value to delete
   * @return {AVLTreeNode} [node] after delete,may be null
   */
  delete(value) {
    if (this.comparator.lessThan(value, this.value)) {
      this.left = this.left ? this.left.delete(value) : this.left;
      return this;
    } else if (this.comparator.greaterThan(value, this.value)) {
      this.right = this.right ? this.right.delete(value) : this.right;
      return this;
    } else {
      // delete this node
      let actual = this.getMin();
      if (actual) {
        // swao this and actual
        [this.value, actual.value] = [actual.value, this.value];
        //delete actual
        actual.parent.replaceChild(actual, actual.right);
        return this;
      }
      // 说明没有右子树,直接用左子树取代 [this] 的位置
      return this.left;
    }
  }

  /**
   * search for value
   * @param {*} value value to search
   * @return {boolean} find or not
   */
  search(value) {
    return !!this.find(value);
  }

  /**
   * find node for value
   * @param {*} value value to find
   * @return {AVLTreeNode} node found,if node found return null
   */
  find(value) {
    if (this.comparator.lessThan(value, this.value)) {
      return this.left ? this.left.find(value) : null;
    } else if (this.comparator.greaterThan(value, this.value)) {
      return this.right ? this.right.find(value) : null;
    }
    return this;
  }

  /**
   * Get parent
   * @return {AVLTreeNode}
   */
  get parent() {
    return this._parent;
  }

  /**
   * Get parent's sibling if it exists.
   * @return {AVLTreeNode}
   */
  get uncle() {
    if (this.parent && this.parent.parent) {
      return this.parent.parent.left === this.parent ? this.parent.parent.right : this.parent.parent.left;
    }
    return null;
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
    if (AVLTreeNode._setLeft(this, node)) {
      AVLTreeNode._maintain(this);
    }
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
    if (AVLTreeNode._setRight(this, node)) {
      AVLTreeNode._maintain(this);
    }
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
   * subtree height of left
   * @return {number}
   */
  get leftHeight() {
    return this._left ? this._left._height : 0;
  }

  /**
   * subtree height of right
   * @return {number}
   */
  get rightHeight() {
    return this._right ? this._right._height : 0;
  }

  get balanceFactor() {
    return this.leftHeight - this.rightHeight;
  }

  /**
   * subtree height of left
   * @return {number}
   */
  get leftSize() {
    return this._left ? this._left._size : 0;
  }

  /**
   * subtree height of right
   * @return {number}
   */
  get rightSize() {
    return this._right ? this._right._size : 0;
  }

  /**
   * tree height 
   * 使用主动更新的方式
   * @return {number}
   */
  get height() {
    return this._height;
  }

  /**
   * count of nodes
   * 采用效率不高的递归方式获取 [size] .
   * 这是考虑到 [size] 使用频率不高,如果调用频率高导致对 [size] 有性能要求,可以使用主动更新的方式
   */
  get size() {
    return this._size;
  }

  /**
   * remove child
   * @param {BinaryTreeNode} child child node to remove
   * @return {boolean} removed or not
   */
  removeChild(child) {
    return replaceChild(child, null);
  }

  /**
   * replace chile by another node
   * @param {BinaryTreeNode} child
   * @param {BinaryTreeNode} node
   * @return {boolean} replaced or not
   */
  replaceChild(child, node) {
    let result = AVLTreeNode._replaceChild(this, child, node);
    if (result) {
     AVLTreeNode._maintain(this);
    }
    return result;
  }

  /**
   * 中序遍历
   * @return {*[]}
   */
  inOrderTraverse() {
    let traverse = [];
    this.left && (traverse = traverse.concat(this.left.inOrderTraverse()));
    traverse.push(this.value);
    this.right && (traverse = traverse.concat(this.right.inOrderTraverse()));
    return traverse;
  }

  /**
   * 前序遍历
   * @return {*[]}
   */
  preOrderTraverse() {
    let traverse = [];
    traverse.push(this.value);
    this.left && (traverse = traverse.concat(this.left.preOrderTraverse()));
    this.right && (traverse = traverse.concat(this.right.preOrderTraverse()));
    return traverse;
  }

  /**
   * 后序遍历
   * @return {*[]}
   */
  postOrderTraverse() {
    let traverse = [];
    this.left && (traverse = traverse.concat(this.left.postOrderTraverse()));
    this.right && (traverse = traverse.concat(this.right.postOrderTraverse()));
    traverse.push(this.value);
    return traverse;
  }

  /**
   * 输出完全二叉树数组
   * @return {*[]}
   */
  toArray() {
    let array = [];
    let q = [this];
    let hasNode = true;
    while (hasNode) {
      hasNode = false;
      let newQ = [];
      while (q.length) {
        let node = q.shift()
        if (!node) {
          node = {
            value: null,
            left: null,
            right: null
          };
        }
        if (node.left || node.right) {
          hasNode = true;
        }
        array.push(node.value);
        newQ.push(node.left);
        newQ.push(node.right);
      }
      q = newQ;
    }
    return array;
  }

  /**
   * @return {string}
   */
  toString() {
    return this.toArray().toString();
  }

  /**
   * 格式化打印
   */
  print() {
    const fill = (rows, node, r, s, e) => {
      if (!node) return;
      let i = ~~((s + e) / 2);
      rows[r][i] = '' + node.value;
      fill(rows, node.left, r + 1, s, i - 1);
      fill(rows, node.right, r + 1, i + 1, e);
    }
    let h = this.height;
    let l = Math.pow(2, h - 1) * 2 - 1;
    let rows = Array.from({
      length: h * 2
    }, () => new Array(l).fill(''));
    fill(rows, this, 0, 0, l - 1);
    return rows;
  }

  /**
   * get min value node
   * @return {AVLTreeNode} the child(or grandchild) node has min value 
   */
  getMin() {
    let min = this.right;
    while (min && min.left) {
      min = min.left;
    }
    return min;
  }

  /**
   * 验证是否是个 AVL Tree
   * @return {boolean} is a AVL Tree or not
   */
  validate() {
    return /* Math.abs(this.balanceFactor) <= 1 && */ (!this.left || (this.comparator.lessThan(this.left.value, this.value) && this.left.validate())) &&
      (!this.right || (this.comparator.greaterThan(this.right.value, this.value) && this.right.validate()));
  }

  /**
   * template method to create new node
   * 用于 override
   */
  newNode(value) {
    return new AVLTreeNode(value, this.comparator);
  }

  static _setRight(node, right) {
    if (node._right === right) {
      return false;
    }
    node._right && (node._right._parent = null);
    node._right = right;
    node._right && (node._right._parent = node);
    return true;
  }

  static _setLeft(node, left) {
    if (node._left === left) {
      return false;
    }
    node._left && (node._left._parent = null);
    node._left = left;
    node._left && (node._left._parent = node);
    return true;
  }

  /**
   * replace chile by another node
   * @param {BinaryTreeNode} parent
   * @param {BinaryTreeNode} child
   * @param {BinaryTreeNode} newChild
   * @return {boolean} replaced or not
   */
  static _replaceChild(parent, child, newChild) {
    if (parent._left === child) {
      AVLTreeNode._setLeft(parent, newChild);
      return true;
    } else if (parent._right === child) {
      AVLTreeNode._setRight(parent, newChild);
      return true;
    }
    return false;
  }

  /**
   * 更新 [node] 到 [root] 路径上的所有节点的高度,在更新 [left] 和 [right] 之后调用
   */
  static _maintain(node) {
    while (node) {
      if (Math.abs(node.balanceFactor) > 1) {
        AVLTreeNode._balance(node);
      } else {
        node._height = Math.max(node.leftHeight, node.rightHeight) + 1;
        node._size = node.leftSize + node.rightSize + 1;
      }
      node = node.parent;
    }
  }

  static _balance(node) {
    if (node.leftHeight < node.rightHeight) {
      if (node.right.leftHeight <= node.right.rightHeight) {
        AVLTreeNode._rotateLeft(node);
      } else {
        AVLTreeNode._rotateRightLeft(node);
      }
    } else {
      // right
      if (node.left.leftHeight >= node.left.rightHeight) {
        AVLTreeNode._rotateRight(node);
      } else {
        AVLTreeNode._rotateLeftRight(node);
      }
    }
  }

  /**
   * @param {AVLTreeNode} node
   */
  static _rotateLeft(node) {
    let nodeParent = node._parent;
    let nodeRight = node._right;
    let nodeRightLeft = node._right._left;
    AVLTreeNode._setRight(node, null);
    if (nodeParent) {
      AVLTreeNode._replaceChild(nodeParent, node, nodeRight);
    }
    AVLTreeNode._setRight(node, nodeRightLeft);
    AVLTreeNode._setLeft(nodeRight, node);
    node._height = Math.max(node.leftHeight, node.rightHeight) + 1;
    node._size = node.leftSize + node.rightSize + 1;
  }

  /**
   * @param {AVLTreeNode} node
   */
  static _rotateRightLeft(node) {
    AVLTreeNode._rotateRight(node.right);
    AVLTreeNode._rotateLeft(node);
  }

  /**
   * @param {AVLTreeNode} node
   */
  static _rotateRight(node) {
    let nodeParent = node._parent;
    let nodeLeft = node._left;
    let nodeLeftRight = node._left._right;
    AVLTreeNode._setLeft(node, null);
    if (nodeParent) {
      AVLTreeNode._replaceChild(nodeParent, node, nodeLeft);
    }
    AVLTreeNode._setLeft(node, nodeLeftRight);
    AVLTreeNode._setRight(nodeLeft, node);
    node._height = Math.max(node.leftHeight, node.rightHeight) + 1;
    node._size = node.leftSize + node.rightSize + 1;
  }

  /**
   * @param {AVLTreeNode} node
   */
  static _rotateLeftRight(node) {
    AVLTreeNode._rotateLeft(node.left);
    AVLTreeNode._rotateRight(node);
  }
}

module.exports = AVLTreeNode;