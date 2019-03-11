const Comparator = require("../common/Comparator");

/**
 * MaxHeap
 */
class MaxHeap {
  
  /**
   * 构造
   * @param {Function} fn comparator function
   */
  constructor(fn = null) {
    this.comparator = new Comparator(fn);
  }
}

module.exports = MaxHeap;