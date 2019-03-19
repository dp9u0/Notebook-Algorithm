/**
 * check element ordered
 * @param {Number} first first element
 * @param {Number} second second element
 */
function _defalutMinOrderedFn(first, second) {
  return first < second;
}

/**
 * 
 * @param {*[]} heap heap to validate
 * @param {Function} ordered check if tow element in ordered
 */
function _validate(heap, ordered = _defalutMinOrderedFn) {
  for (let i = heap.length - 1; i > 0; i--) {
    let parent = _parentIndex(i);
    if (!ordered(heap[parent], heap[i])) {
      return false;
    }
  }
  return true;
}

/**
 * 
 * @param {*[]} heap 
 * @param {Number} index 
 */
function _validateIndex(heap, index) {
  if (!heap || !heap.length || index >= heap.length) {
    throw RangeError(`${index} is invalid in ${heap}`)
  }
}

/**
 * get left Child Index of a element
 * @param {number} index
 * @return {number} index of left
 */
function _leftIndex(index) {
  return (2 * index) + 1;
}

/**
 * get right Child Index of a element
 * @param {number} index
 * @return {number} index of right
 */
function _rightIndex(index) {
  return (2 * index) + 2;
}

/**
 * @param {number} index index of element
 * @return {number} index of parent
 */
function _parentIndex(index) {
  return ~~((index - 1) / 2);
}

/**
 * @param {number} index index of element
 * @return {boolean} has parent or not
 */
function _hasParent(index) {
  return index > 0;
}

/**
 * @param {number} index index of element
 * @param {number} heap heap size
 * @return {boolean} has left or not
 */
function _hasLeft(heap, index) {
  _validateIndex(heap, index);
  return _leftIndex(index) < heap.length;
}

/**
 * @param {number} index
 * @param {number} heap heap size
 * @return {boolean}  has right or not
 */
function _hasRight(heap, index) {
  _validateIndex(heap, index);
  return _rightIndex(index) < heap.length;
}

/**
 * heapify up 
 * @param {*[]} heap heap values
 * @param {Number} index start index to up,default index is last index in heap
 * @param {Function} ordered check if tow element in ordered
 */
function _heapifyUp(heap, index = heap.length - 1, ordered = _defalutMinOrderedFn) {
  _validateIndex(heap, index);
  while (_hasParent(index)) {
    let parent = _parentIndex(index);
    if (ordered(heap[parent], heap[index])) {
      break;
    }
    _swap(heap, parent, index);
    index = parent;
  }
}

/**
 * heapify down 
 * @param {*[]} heap heap values
 * @param {Number} index start index to down,default index is root in heap
 * @param {Function} ordered check if tow element in ordered
 */
function _heapifyDown(heap, index = 0, ordered = _defalutMinOrderedFn) {
  _validateIndex(heap, index);
  while (_hasLeft(heap, index)) {
    let left = _leftIndex(index);
    let child = left;
    if (_hasRight(heap, index)) {
      let right = _rightIndex(index)
      if (!ordered(heap[left], heap[right])) {
        child = right;
      }
    }
    if (ordered(heap[index], heap[child])) {
      break;
    }
    _swap(heap, index, child);
    index = child;
  }
}

/**
 * 
 * @param {*[]} heap heap values
 * @param {Number} x index of first value
 * @param {Number} y index of second value
 */
function _swap(heap, x, y) {
  _validateIndex(heap, x);
  _validateIndex(heap, y);
  [heap[y], heap[x]] = [heap[x], heap[y]];
}

/**
 * 
 * @param {*[]} heap heap values
 */
function _print(heap) {
  const fill = (rows, index, r, s, e) => {
    if (index >= heap.length) return;
    let i = ~~((s + e) / 2);
    rows[r][i] = heap[index];
    fill(rows, _leftIndex(index), r + 1, s, i - 1);
    fill(rows, _rightIndex(index), r + 1, i + 1, e);
  }
  let h = Math.ceil(Math.log2(heap.length + 1));
  let l = Math.pow(2, h - 1) * 2 - 1;
  let rows = Array.from({
    length: h
  }, () => new Array(l).fill(''));
  fill(rows, 0, 0, 0, l - 1);
  return rows;
}

module.exports = {
  _leftIndex,
  _rightIndex,
  _parentIndex,
  _hasParent,
  _hasLeft,
  _hasRight,
  _heapifyUp,
  _heapifyDown,
  _swap,
  _validate,
  _print
};