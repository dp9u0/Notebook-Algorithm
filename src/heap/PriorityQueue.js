const Comparator = require("../common/Comparator");

const {
  _heapifyUp,
  _heapifyDown,
  _hasLeft,
  _hasRight,
  _parentIndex,
  _hasParent
} = require("./HeapCommon");

/**
 * remove value
 * @param {*} value value
 */
function _remove(value) {
  let index = this._heap.indexOf(value);
  if (index !== -1) {
    //delete
    if (index === (this._heap.length - 1)) {
      this._heap.pop();
    } else {
      this._heap[index] = this._heap.pop();
      let parent = _parentIndex(index);
      if (_hasParent(index) && this._comparator.greaterThan(this._heap[index], this._heap[parent])) {
        _heapifyUp(this._heap, index, (first, second) => this._comparator.lessThanOrEqual(first, second));
      } else {
        _heapifyDown(this._heap, index, (first, second) => this._comparator.lessThanOrEqual(first, second));
      }
    }
  }
  return this;
}

/**
 * PriorityQueue
 */
class PriorityQueue {

  /**
   * PriorityQueue
   */
  constructor() {
    this._priorities = new Map();
    this._heap = [];
    this._comparator = new Comparator((a, b) => {
      if (this._priorities.get(a) === this._priorities.get(b)) {
        return 0;
      }
      return this._priorities.get(a) < this._priorities.get(b) ? -1 : 1;
    });
  }

  /**
   * add value to PriorityQueue
   * @param {*} value value
   * @param {number} priority priority
   */
  add(value, priority) {
    this._heap.push(value);
    this._priorities.set(value, priority);
    _heapifyUp(this._heap, this._heap.length - 1, (first, second) => this._comparator.lessThanOrEqual(first, second));
    return this;
  }

  /**
   * changePriority
   * @param {*} value value
   * @param {number} priority priority
   */
  changePriority(value, priority) {
    _remove.call(this, value);
    this.add(value, priority);
    return this;
  }

  /**
   * pop value on the top of PriorityQueue
   * @returns {*} value
   */
  pop() {
    if (!this._heap.length) {
      return null;
    }
    let value = this._heap.shift();
    this._heap.unshift(this._heap.pop());
    this._priorities.delete(value);
    _heapifyDown(this._heap, 0, (first, second) => this._comparator.lessThanOrEqual(first, second));
    return value;
  }

  /**
   * peek value on the top of PriorityQueue
   * @returns {*} value
   */
  peek() {
    if (!this._heap.length) {
      return null;
    }
    return this._heap[0];
  }
}

module.exports = PriorityQueue;