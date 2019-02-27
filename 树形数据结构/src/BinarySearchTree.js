const BinarySearchTreeNode = require("./common/BinarySearchTreeNode");
const Comparator = require("./common/Comparator");

/**
 * 二叉查找树
 */
class BinarySearchTree {

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
   * @return {BinarySearchTreeNode} node inserted if cannot insert return [null]
   */
  insert(value) {
    if (!this.root) {
      this.root = new BinarySearchTreeNode(value, this.comparator);
      return this.root;
    } else {
      return this.root.insert(value);
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
   * @return {bool} 是否存在
   */
  search(value) {
    return this.root && this.root.search(value);
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

  /**
   * 中序遍历
   * @return {*[]}
   */
  inOrderTraverse() {
    return this.root ? this.root.inOrderTraverse() : [];
  }

  /**
   * 后序遍历
   * @return {*[]}
   */
  postOrderTraverse() {
    return this.root ? this.root.postOrderTraverse() : [];
  }

  /**
   * 前序遍历
   * @return {*[]}
   */
  postOrderTraverse() {
    return this.root ? this.root.preOrderTraverse() : [];
  }

  /**
   * 格式化打印
   */
  print() {
    return this.root ? this.root.print() : [];
  }

  /**
   * toArray
   */
  toArray() {
    return this.root ? this.root.toArray() : [];
  }

  /**
   * toString
   */
  toString() {
    return this.root ? this.root.toString() : "";
  }

}

module.exports = BinarySearchTree;