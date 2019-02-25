/**
 * 二叉查找树
 */
class BinarySearchTree {

  /**
   * 构造
   */
  constructor() {
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
      let node = this.root,
        parent = null;
      while (node) {
        parent = node;
        node = node.value > value ? node.left : node.right;
      }
      if (parent.value === value) {
        throw new Error("value has been exist")
      } else if (parent.value > value) {
        parent.left = new BinarySearchTreeNode(value);
      } else {
        parent.right = new BinarySearchTreeNode(value);
      }
    }
  }

  /**
   * 查找
   * @param {*} value : value
   * @returns {bool} 是否存在
   */
  search(value) {
    if (!this.root) {
      return false;
    } else {
      let node = this.root;
      while (node) {
        if (node.value === value) {
          return true;
        }
        node = node.value > value ? node.left : node.right;
      }
      return false;
    }
  }

  /**
   * 删除
   * @param {*} value : value
   */
  delete(value) {
    let node = this.root,
      parent = null;
    while (node && node.value !== value) {
      parent = node;
      node = parent.value > value ? parent.left : parent.right;
    }
    if (!node) {
      throw new Error('value not found');
    }
    let {
      left,
      right
    } = node;
    if (parent) {
      if (parent.left === node) {
        parent.left = left || right;
      } else {
        parent.right = left || right;
      }
    } else {
      this.root = left || right;
    }
    if (left) {
      let append = left;
      while (append.right) {
        append = append.right;
      }
      append.right = right;
    }
    node.left = null;
    node.right = null;
    node.value = null;
  }

  /**
   * toString
   */
  toString() {
    return JSON.stringify(this.root);
  }
}

/**
 * 二叉查找树节点
 */
class BinarySearchTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

exports.BinarySearchTree = BinarySearchTree;