const BinarySearchTreeNode = require("./BinarySearchTreeNode")

/**
 * 二叉查找树
 */
class BinarySearchTree {

  /**
   * 构造
   */
  constructor() {
    console.log('BinarySearchTree')
    this.root = null;
  }

  /**
   * 插入
   * @param {*} value : value
   */
  insert(value) {
    if (!this.root) {
      this.root = new BinarySearchTreeNode(value);
    } else {
      this.root.insert(value)
    }
  }

  /**
   * 删除
   * @param {*} value : value
   */
  delete(value) {
    this.root && (this.root = this.root.delete(value));
  }

  /**
   * 查找
   * @param {*} value : value
   * @returns {bool} 是否存在
   */
  search(value) {
    return this.root && this.root.search(value);
  }

  /**
   * toString
   */
  toString() {
    return this.root ? this.root.toString() : "";
  }

  /**
   * toArray
   */
  toArray() {
    return this.root ? this.root.toArray() : "";
  }

  /**
   * 树的高度
   */
  height() {
    return this.root ? this.root.height : 0;
  }

  /**
   * 树中节点数量
   */
  count() {
    return this.root ? this.root.count : 0;
  }

  /**
   * 验证是否是个BST
   */
  validate() {
    return this.root ? this.root.validate() : true;
  }

  inOrderTraverse() {
    return this.root ? this.root.inOrderTraverse() : [];
  }

  print() {
    return this.root ? this.root.print() : [];
  }
}

module.exports = BinarySearchTree;