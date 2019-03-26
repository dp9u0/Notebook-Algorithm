const Comparator = require("../common/Comparator");
const {
  _heapifyUp,
  _heapifyDown,
  _print,
  _validate
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

  /**
   * 
   * @param {*} value element to insert
   */
  insert(value) {
    this.heap.push(value);
    _heapifyUp(this.heap, this.heap.length - 1, (first, second) => this.comparator.lessThanOrEqual(first, second));
  }

  /**
   * delete element on top of heap and return
   * @return {*} element on top of heap
   */
  pop() {
    if (this.isEmpty) {
      return null;
    }
    let element = this.heap.shift();
    if (!this.isEmpty) {
      this.heap.unshift(this.heap.pop());
      _heapifyDown(this.heap, 0, (first, second) => this.comparator.lessThanOrEqual(first, second));
    }
    return element;
  }

  /**
   * return element on top of heap
   * @return {*} element on top of heap
   */
  peek() {
    if (!this.heap.length) {
      return null;
    }
    return this.heap[0];
  }

  /**
   * empty or not
   * @returns {boolean} if this heap has no element
   */
  get isEmpty() {
    return this.heap.length === 0;
  }

  /**
   * print
   */
  print() {
    return _print(this.heap);
  }

  /**
   * validate heap
   */
  validate() {
    return _validate(this.heap, (first, second) => this.comparator.lessThanOrEqual(first, second));
  }

  /**
   * create heap from array
   * @param {*[]} array 
   * @
   */
  static from(array) {
    let heap = new MinHeap();
    for (let i = 0; i < array.length; i++) {
      heap.insert(array[i]);
    }
    return heap;
  }
}

module.exports = MinHeap;