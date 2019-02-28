/**
 * BinarySearchTreeNode
 */
class BinarySearchTreeNode {

  /**
   * BinarySearchTreeNode
   * @param {*} value 
   * @param {Comparator} fn comparator
   */
  constructor(value = null, comparator) {
    this._value = value;
    this._parent = null;
    this._left = null;
    this._right = null;
    this.comparator = comparator;
  }

  /**
   * insert value
   * @param {*} value value to insert
   * @return {BinarySearchTreeNode} node inserted if cannot insert return [null]
   */
  insert(value) {
    if (this.comparator.lessThan(value, this.value)) {
      if (this.left) {
        return this.left.insert(value);
      } else {
        this.left = this.newNode(value);
        return this.left;
      }
    } else if (this.comparator.greaterThan(value, this.value)) {
      if (this.right) {
        return this.right.insert(value);
      } else {
        this.right = this.newNode(value);
        return this.right;
      }
    }
    // no need to insert
    return null;
  }

  /**
   * delete value
   * @param {*} value value to delete
   * @return {BinarySearchTreeNode} this node after delete,may be return null
   */
  delete(value) {
    if (this.comparator.lessThan(value, this.value)) {
      this.left = this.left ? this.left.delete(value) : this.left;
      return this;
    } else if (this.comparator.greaterThan(value, this.value)) {
      this.right = this.right ? this.right.delete(value) : this.right;
      return this;
    }
    // delete this node
    let min = this.getMin();
    if (min) {
      this.value = min.value;
      min.parent.replaceChild(min, min.right);
      return this;
    }
    // 说明没有右子树,直接用左子树取代 this的位置
    return this.left;
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
   * @return {BinarySearchTreeNode} node found,if node found return null
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
    this._left && (this._left._parent = null); // memory leak
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
    this._right && (this._right._parent = null); // memory leak
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
    return this._left ? this._left.height : 0;
  }

  /**
   * subtree height of right
   * @return {number}
   */
  get rightHeight() {
    return this._right ? this._right.height : 0;
  }

  /**
   * subtree height of left
   * @return {number}
   */
  get leftCount() {
    return this._left ? this._left.count : 0;
  }

  /**
   * subtree height of right
   * @return {number}
   */
  get rightCount() {
    return this._right ? this._right.count : 0;
  }

  /**
   * tree height
   * 采用效率不高的递归方式获取 [height] .
   * 这是考虑到 [height] 使用频率不高,如果调用频率高导致对 [height] 有性能要求,可以使用主动更新的方式
   * @return {number}
   */
  get height() {
    return Math.max(this.leftHeight, this.rightHeight) + 1;
  }

  /**
   * count of nodes
   * 采用效率不高的递归方式获取 [count] .
   * 这是考虑到 [count] 使用频率不高,如果调用频率高导致对 [count] 有性能要求,可以使用主动更新的方式
   */
  get count() {
    let count = 1;
    this.left && (count += this.left.count);
    this.right && (count += this.right.count);
    return count;
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

  /**
   * get min value node
   * @return {BinarySearchTreeNode} the child(or grandchild) node has min value 
   */
  getMin() {
    let min = this.right;
    while (min && min.left) {
      min = min.left;
    }
    return min;
  }

  /**
   * 验证是否是个BST
   * @return {boolean} is a bst or not
   */
  validate() {
    return (!this.left || (this.comparator.lessThan(this.left.value, this.value) && this.left.validate())) &&
      (!this.right || (this.comparator.greaterThan(this.right.value, this.value) && this.right.validate()));
  }

  /**
   * template method to create new node
   * 用于 override
   */
  newNode(value) {
    return new BinarySearchTreeNode(value, this.comparator);
  }
}

module.exports = BinarySearchTreeNode;