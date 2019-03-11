const Comparator = require("../common/Comparator");
const {
  _leftIndex,
  _rightIndex,
  _parentIndex,
  _hasParent,
  _hasLeft,
  _hasRight,
  _heapifyUp,
  _heapifyDown,
  _swap
} = require("./HeapCommon");

/**
 * MinHeap
 */
class MinHeap {
  
  /**
   * 构造
   * @param {Function} fn comparator function
   */
  constructor(fn = null) {
    this.comparator = new Comparator(fn);
    this.heap = [];
  }
}

module.exports = MinHeap;