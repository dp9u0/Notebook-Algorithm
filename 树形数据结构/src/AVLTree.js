let BinarySearchTree = require("./BinarySearchTree");
let AVLTreeNode = require('./common/AVLTreeNode')

/**
 * AVLTree
 */
class AVLTree extends BinarySearchTree {

  /**
   * 构造
   */
  constructor(fn = null) {
    super(fn);
  }

  /**
   * 插入
   * @param {*} value : value
   * @return {BinarySearchTreeNode} node inserted if cannot insert return [null]
   */
  insert(value) {
    if (!this.root) {
      this.root = new AVLTreeNode(value, this.comparator);
      return this.root;
    }
    let node = this.root.insert(value);;
    this.balance(node);
    return node;
  }

  /**
   * 删除
   * @param {*} value : value
   */
  delete(value) {
    super.delete(value);
    this.balance(this.root);
  }

  balance(node) {

  }
}

module.exports = AVLTree;