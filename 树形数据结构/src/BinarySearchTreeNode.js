const BinaryTreeNode = require("./BinaryTreeNode")
const Comparator = require("./Comparator");

/**
 * BinarySearchTreeNode
 */
class BinarySearchTreeNode extends BinaryTreeNode {

  /**
   * BinarySearchTreeNode
   * @param {*} value 
   * @param {Function} fn comparator function
   */
  constructor(value = null, fn = null) {
    super(value);
    this.comparator = new Comparator(fn);
  }

  /**
   * insert value
   * @param {*} value value to insert
   * @return {BinarySearchTreeNode} node inserted if cannot insert return undefined
   */
  insert(value) {
    if (this.comparator.lessThan(value, this.value)) {
      if (this.left) {
        return this.left.insert(value);
      } else {
        this.left = new BinarySearchTreeNode(value);
        return this.left;
      }
    } else if (this.comparator.greaterThan(value, this.value)) {
      if (this.right) {
        return this.right.insert(value);
      } else {
        this.right = new BinarySearchTreeNode(value);
        return this.right;
      }
    }
    // cannot insert
    return null;
  }

  /**
   * delete value
   * @param {*} value value to delete
   * @return {BinarySearchTreeNode} this node after delete,may be return null
   */
  delete(value) {
    if (this.comparator.lessThan(value, this.value)) {
      this.left = this.left ? this.left.delete(value) : null;
      return this;
    } else if (this.comparator.greaterThan(value, this.value)) {
      this.right = this.right ? this.right.delete(value) : null;
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
    if (this.comparator.lessThan(value, this.value)) {
      return this.left && this.left.search(value);
    } else if (this.comparator.greaterThan(value, this.value)) {
      return this.right && this.right.search(value);
    }
    return true;
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
}

module.exports = BinarySearchTreeNode;