/**
 * heap sort
 * @param {*[]} input source array
 * @param {(a,b)=> boolean} disordered The function used to determine if two element is disordered.
 * @return {*[]} sort results
 */
function sort(input, disordered) {
  // build max heap
  let length = input.length;
  for (let i = ~~(length / 2); i >= 0; i--) {
    heapifyDown(input, i, disordered);
  }
  // sort
  for (let i = length - 1; i >= 0; i--) {
    [input[0], input[length - 1]] = [input[length - 1], input[0]]; // move max value to the end
    length--; // update unsorted length
    heapifyDown(input, 0, disordered, length); // heapfyDown the element at 0(made it max)
  }
  return input;
}

/**
 * heapifyDown an elemnet in heap
 * @param {*[]} heap array of heap
 * @param {number} i index of element
 * @param {(a,b)=> boolean} disordered The function used to determine if two element is disordered.
 * @param {number} length stop length of array
 */
function heapifyDown(heap, i, disordered, length = heap.length) {
  let left = 2 * i + 1,
    right = 2 * i + 2,
    largest = i;
  if (left < length && disordered(heap[left], heap[largest])) {
    largest = left;
  }
  if (right < length && disordered(heap[right], heap[largest])) {
    largest = right;
  }
  if (largest !== i) {
    [heap[i], heap[largest]] = [heap[largest], heap[i]]
    heapifyDown(heap, largest, disordered, length);
  }
}

module.exports = sort;