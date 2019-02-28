let Node = require('./common/AVLTreeNode')
const Comparator = require("./common/Comparator");

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
      this.root = new Node(value, this.comparator);
    } else {
      this.root.insert(value);
      this.updateRoot();
    }
  }

  /**
   * 删除
   * @param {*} value : value
   */
  delete(value) {
    this.root && (this.root = this.root.delete(value));
    this.updateRoot();
  }

  updateRoot() {
    while (this.root && this.root.parent) {
      this.root = this.root.parent
    }
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
  get height() {
    return this.root ? this.root.height : 0;
  }

  /**
   * 树中节点数量
   */
  get size() {
    return this.root ? this.root.size : 0;
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
  preOrderTraverse() {
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

module.exports = AVLTree;