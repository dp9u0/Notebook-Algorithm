/* eslint-disable no-unused-vars */
// TODO: BinomialHeap

const Comparator = require("../common/Comparator");

/**
 * BinomialHeap
 */
class BinomialHeap {

  /**
   * 构造
   * @param {Function} fn comparator function
   */
  constructor(fn = null) {
    this.comparator = new Comparator(fn)
  }

  /**
   * Clears the heap's data, making it an empty heap.
   */
  clear() {

  }

  /**
   * Inserts a new key-value pair into the heap.
   * @param {*} value The value to insert.
   * @return {BinomialTreeNode} node The inserted node.
   */
  insert(value) {

  }

  /**
   * Returns the minimum node from the heap.
   * @return {*} node value of this heap's minimum node or null if the heap is empty.
   */
  peek() {

  }

  /**
   * pop and returns the minimum node value from the heap.
   * @return {*} node value of this heap's minimum node or null if the heap is empty.
   */
  pop() {

  }

  /**
   * Joins another heap to this one.
   * @param {BinomialHeap} heap The other heap.
   */
  union(heap) {

  }

  /**
   * Decreases value of a node.
   * @param {BinomialTreeNode} node node to decrease the key of.
   * @param {value} value new value to assign to the node.
   */
  decrease(node, value) {

  }

  /**
   * Deletes a node.
   * @param {BinomialTreeNode} node The node to delete.
   */
  delete(node) {

  }
}

module.exports = BinomialHeap;