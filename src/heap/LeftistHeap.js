const Comparator = require("../common/Comparator");
/**
 * LeftistHeap
 */
class LeftistHeap {
  /**
   * 构造
   * @param {Function} fn comparator function
   */
  constructor(fn = null) {
    this.comparator = new Comparator(fn);
  }
}

module.exports = LeftistHeap;