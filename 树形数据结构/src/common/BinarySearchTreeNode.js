const BinaryTreeNode = require("./BinaryTreeNode")

/**
 * BinarySearchTreeNode
 */
class BinarySearchTreeNode extends BinaryTreeNode {

  /**
   * BinarySearchTreeNode
   * @param {*} value 
   * @param {Comparator} fn comparator
   */
  constructor(value = null, comparator) {
    super(value);
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