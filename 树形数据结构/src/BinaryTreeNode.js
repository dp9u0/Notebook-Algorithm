/**
 * BinaryTreeNode
 */
class BinaryTreeNode {

  /**
   * @param {*} value node value.
   */
  constructor(value = null) {
    this._parent = null;
    this._left = null;
    this._right = null;
    this._value = value;
  }

  /**
   * Get parent
   * @return {BinaryTreeNode}
   */
  get parent() {
    return this._parent;
  }

  /**
   * Get parent's sibling if it exists.
   * @return {BinaryTreeNode}
   */
  get uncle() {
    if (this.parent && this.parent.parent) {
      return this.parent.parent.left === this.parent ? this.parent.parent.right : this.parent.parent.left;
    }
    return null;
  }

  /**
   * Get left child
   * @return {BinaryTreeNode}
   */
  get left() {
    return this._left;
  }

  /**
   * Set left child
   * @param {BinaryTreeNode} node
   */
  set left(node) {
    if (this._left === node) {
      return;
    }
    this._left && (this._left._parent = null);
    this._left = node;
    this._left && (this._left._parent = this);
  }

  /**
   * Get right child
   * @return {BinaryTreeNode}
   */
  get right() {
    return this._right;
  }

  /**
   * Set right child
   * @param {BinaryTreeNode} node
   */
  set right(node) {
    if (this._right === node) {
      return;
    }
    this._right && (this._right._parent = null);
    this._right = node;
    this._right && (this._right._parent = this);
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
    return this.left ? this.left.height : 0;
  }

  /**
   * subtree height of right
   * @return {number}
   */
  get rightHeight() {
    return this.right ? this.right.height : 0;
  }

  /**
   * tree height
   * @return {number}
   */
  get height() {
    return Math.max(this.left ? this.left.height : 0, this.right ? this.right.height : 0) + 1;
  }

  /**
   * count of nodes
   */
  get count() {
    let count = 1;
    this.left && (count += this.left.count);
    this.right && (count += this.right.count);
    return count;
  }

  /**
   * @return {number}
   */
  get balanceFactor() {
    return this.leftHeight - this.rightHeight;
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
    if (this.left === child) {
      this.left = node;
      return true;
    } else if (this.right === child) {
      this.right = node;
      return true;
    }
    return false;
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
      length: h
    }, () => new Array(l).fill(''));
    fill(rows, this, 0, 0, l - 1);
    return rows;
  }

}

module.exports = BinaryTreeNode;