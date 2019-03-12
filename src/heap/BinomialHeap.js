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
    this.comparator = new Comparator(fn);
  }
}

module.exports = BinomialHeap;