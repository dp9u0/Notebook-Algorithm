const Comparator = require("../common/Comparator");

const {
  _heapifyUp,
  _heapifyDown,
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
    if (this.has(value)) {
      _remove.call(this, value);
      this.add(value, priority);
    } else {
      throw new Error('value not exist in this queue');
    }
    return this;
  }

  /**
   * check has value
   * @param {*} value value to find
   * @returns {boolean} have or not
   */
  has(value) {
    return this._priorities.has(value);
  }

  /**
   * pop value on the top of PriorityQueue
   * @returns {*} value
   */
  pop() {
    if (this.isEmpty) {
      return null;
    }
    let value = this._heap.shift();
    this._priorities.delete(value);
    if (!this.isEmpty) {
      this._heap.unshift(this._heap.pop());
      _heapifyDown(this._heap, 0, (first, second) => this._comparator.lessThanOrEqual(first, second));
    }
    return value;
  }

  /**
   * peek value on the top of PriorityQueue
   * @returns {*} value
   */
  peek() {
    if (this.isEmpty) {
      return null;
    }
    return this._heap[0];
  }

  /**
   * empty or not
   * @returns {boolean} if this queue has no element
   */
  get isEmpty() {
    return this._heap.length === 0;
  }
}

module.exports = PriorityQueue;