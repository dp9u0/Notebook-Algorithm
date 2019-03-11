const Comparator = require("../common/Comparator");
/**
 * FibonacciHeap
 */
class FibonacciHeap {
  /**
   * 构造
   * @param {Function} fn comparator function
   */
  constructor(fn = null) {
    this.comparator = new Comparator(fn);
  }
}

module.exports = FibonacciHeap;