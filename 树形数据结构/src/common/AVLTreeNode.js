const BinarySearchTreeNode = require("./BinarySearchTreeNode")

/**
 * AVLTreeNode
 */
class AVLTreeNode extends BinarySearchTreeNode {

  /**
   * AVLTreeNode
   * @param {*} value 
   * @param {Comparator} fn comparator
   */
  constructor(value = null, comparator) {
    super(value, comparator);
    this._height = 1;
    this._count = 1;
  }

  /**
   * Get left child
   * @return {BinaryTreeNode}
   */
  get left() {
    // override set 必须同时 override get
    return super.left;
  }

  /**
   * Set left child (override)
   * @param {AVLTreeNode} node
   */
  set left(node) {
    if (this._left === node) {
      return;
    }
    super.left = node;
    this.maintain();
  }

  /**
   * Get right child
   * @return {BinaryTreeNode}
   */
  get right() {
    // override set 必须同时 override get
    return super.right;
  }

  /**
   * Set right child (override)
   * @param {AVLTreeNode} node
   */
  set right(node) {
    if (this._right === node) {
      return;
    }
    super.right = node;
    this.maintain();
  }

  /**
   * tree height
   * @return {number}
   */
  get height() {
    return this._height;
  }

  /**
   * tree count
   */
  get count() {
    return this._count;
  }

  /**
   * balance factor
   * @return {number}
   */
  get balanceFactor() {
    return this.leftHeight - this.rightHeight;
  }

  /**
   * 更新 [this] 到 [root] 路径上的所有节点的高度,在更新 [left] 和 [right] 之后调用
   */
  maintain() {
    let node = this;
    while (node) {
      node._height = Math.max(node.leftHeight, node.rightHeight) + 1;
      node._count = node.leftCount + node.rightCount + 1;
      node = node.parent;
    }
  }

  /**
   * template method to create new node
   * 用于 override
   */
  newNode(value) {
    return new AVLTreeNode(value, this.comparator);
  }

  // /**
  //  * 验证是否是个 AVL Tree
  //  * @return {boolean} is a AVL Tree or not
  //  */
  // validate() {
  //   return Math.abs(this.balanceFactor) <= 1 &&
  //     (!this.left || (this.comparator.lessThan(this.left.value, this.value) && this.left.validate())) &&
  //     (!this.right || (this.comparator.greaterThan(this.right.value, this.value) && this.right.validate()));
  // }
}

module.exports = AVLTreeNode;