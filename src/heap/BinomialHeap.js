const Comparator = require("../common/Comparator");

/**
 * BinomialHeapNode
 */
class BinomialHeapNode {

  /**
   * BinomialHeapNode
   * @param {*} value value of this node
   */
  constructor(value) {
    this._value = value;
    this._degree = 0;
    this._parent = null;
    this._child = null;
    this._sibling = null;
  }

  /**
   * getter of value
   */
  get value() {
    return this._value;
  }
}

/**
 * BinomialHeap
 */
class BinomialHeap {
  /**
   * 构造
   * @param {Function} fn comparator function
   */
  constructor(fn = null) {
    this.comparator = new Comparator(fn);
  }

  /**
   * Clears the heap's data, making it an empty heap.
   */
  clear() {}

  /**
   * pop and returns the minimum node value from the heap.
   * @return {*}} node value of this heap's minimum node or null if the heap is empty.
   */
  pop() {}

  /**
   * Returns the minimum node from the heap.
   * @return {*} node value of this heap's minimum node or null if the heap is empty.
   */
  peek() {}

  /**
   * Inserts a new key-value pair into the heap.
   * @param {*} value The value to insert.
   * @return {BinomialHeapNode} node The inserted node.
   */
  insert(value) {

  }

  /**
   * Joins another heap to this one.
   * @param {BinomialHeap} heap The other heap.
   */
  union(heap) {

  }

  /**
   * Decreases value of a node.
   * @param {BinomialHeapNode} node node to decrease the key of.
   * @param {value} value new value to assign to the node.
   */
  decrease(node, value) {}


  /**
   * Deletes a node.
   * @param {BinomialHeapNode} node The node to delete.
   */
  delete(node) {

  }
}

module.exports = BinomialHeap;