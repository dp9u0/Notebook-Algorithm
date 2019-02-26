/**
 * AVLTree
 */
class AVLTree {

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
      this.root = new ALVTreeNode(value);
    } else {
      let node = this.root,
        parent = null;
      while (node) {
        parent = node;
        if (node.value === value) {
          return;
          // throw new Error("value has been exist")
        }
        node = node.value > value ? node.left : node.right;
      }
      if (parent.value === value) {
        return;
        // throw new Error("value has been exist")
      } else if (parent.value > value) {
        parent.left = new ALVTreeNode(value);
      } else {
        parent.right = new ALVTreeNode(value);
      }
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
      return;
    }
    let {
      left,
      right
    } = node;
    if (left && right) {
      let d = right;
      let p = node;
      while (d.left) {
        p = d;
        d = p.left;
      }
      node.value = d.value;
      node = d;
      parent = p;
      [left, right] = [node.left, node.right];
    }
    if (parent) {
      if (parent.left === node) {
        parent.left = left || right;
      } else {
        parent.right = left || right;
      }
    } else {
      this.root = left || right;
    }
    node.value = null;
    node.left = null;
    node.right = null;
  }

  /**
   * 平衡AVL Tree
   */
  balance(){}

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
    let h = this.height();
    let l = Math.pow(2, h - 1) * 2 - 1;
    let rows = Array.from({
      length: h
    }, () => new Array(l).fill(''));
    fill(rows, this.root, 0, 0, l - 1);
    // console.log(rows);
    return rows;
  }

  /**
   * toString
   */
  toString() {
    return JSON.stringify(this.root);
  }

  /**
   * toArray
   */
  toArray() {
    let array = [];
    let q = [this.root];
    while (q.length) {
      let newQ = [];
      while (q.length) {
        let node = q.shift();
        if (node) {
          array.push(node.value);
          newQ.push(node.left);
          newQ.push(node.right);
        }
      }
      q = newQ;
    }
    return array;
  }

  /**
   * 树的高度
   */
  height() {
    const calcHeight = (node) => {
      return node ? (Math.max(calcHeight(node.left), calcHeight(node.right))) + 1 : 0;
    }
    return calcHeight(this.root);
  }

  /**
   * 树中节点数量
   */
  count() {
    const calcCount = (node) => {
      return node ? (calcCount(node.left) + calcCount(node.right) + 1) : 0;
    }
    return calcCount(this.root);
  }

  /**
   * 验证是否是个BST
   */
  validate() {
    const valid = (node) => {
      if (!node) return true;
      return (!node.left || (node.value > node.left.value && valid(node.left))) &&
        (!node.right || (node.value < node.right.value && valid(node.right)));
    }
    return valid(this.root)
  }
}

/**
 * 
 */
class ALVTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.balanceFactor = 0;
  }
}