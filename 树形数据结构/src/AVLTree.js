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
   * @return {AVLTreeNode} node inserted if cannot insert return [null]
   */
  insert(value) {
    if (!this.root) {
      this.root = new Node(value, this.comparator);
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
   * 清空
   */
  empty() {
    this.root = null;
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

  balance(node) {

  }

  /**
   * @param {AVLTreeNode} node
   */
  rotateLeftLeft(node) {
    // Detach left node from root node.
    const leftNode = node.left;
    node.left = null;
    // Make left node to be a child of node's parent.
    if (node.parent) {
      node.parent.left = leftNode;
    } else if (node === this.root) {
      // If root node is root then make left node to be a new root.
      this.root = leftNode;
    }
    // If left node has a right child then detach it and
    // attach it as a left child for node.
    if (leftNode.right) {
      node.left = leftNode.right;
    }
    // Attach node to the right of leftNode.
    leftNode.right = node;
  }

  /**
   * @param {AVLTreeNode} node
   */
  rotateLeftRight(node) {
    // Detach left node from node since it is going to be replaced.
    const leftNode = node.left;
    node.left = null;

    // Detach right node from leftNode.
    const leftRightNode = leftNode.right;
    leftNode.right = null;

    // Preserve leftRightNode's left subtree.
    if (leftRightNode.left) {
      leftNode.right = leftRightNode.left;
      leftRightNode.left = null;
    }

    // Attach leftRightNode to the node.
    node.left = leftRightNode;

    // Attach leftNode as left node for leftRight node.
    leftRightNode.left = leftNode;

    // Do left-left rotation.
    this.rotateLeftLeft(node);
  }

  /**
   * @param {AVLTreeNode} node
   */
  rotateRightLeft(node) {
    // Detach right node from node since it is going to be replaced.
    const rightNode = node.right;
    node.right = null;

    // Detach left node from rightNode.
    const rightLeftNode = rightNode.left;
    rightNode.left = null;

    if (rightLeftNode.right) {
      rightNode.left = rightLeftNode.right;
      rightLeftNode.right = null;
    }

    // Attach rightLeftNode to the node.
    node.right = rightLeftNode;

    // Attach rightNode as right node for rightLeft node.
    rightLeftNode.right = rightNode;

    // Do right-right rotation.
    this.rotateRightRight(node);
  }

  /**
   * @param {AVLTreeNode} node
   */
  rotateRightRight(node) {
    // Detach right node from root node.
    const rightNode = node.right;
    node.right = null;
    // Make right node to be a child of node's parent.
    if (node.parent) {
      node.parent.right = rightNode;
    } else if (node === this.root) {
      // If root node is root then make right node to be a new root.
      this.root = rightNode;
    }

    // If right node has a left child then detach it and
    // attach it as a right child for node.
    if (rightNode.left) {
      node.right = rightNode.left;
    }

    // Attach node to the left of rightNode.
    rightNode.left = node;
  }
}

module.exports = AVLTree;