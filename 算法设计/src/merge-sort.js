/**
 * Merge Sort In O(n * logn)
 * @param {number[]} array 
 */
function mergeSort(array) {
  if (array.length > 1) {
    const middle = array.length >> 1;
    const left = mergeSort(array.slice(0, middle));
    const right = mergeSort(array.slice(middle));
    array = merge(left, right);
  }
  return array;
}

/**
 * Merge Tow Sorted Array
 * @param {number[]} left 
 * @param {number[]} right 
 */
const merge = (left, right) => {
  let indexLeft = 0;
  let indexRight = 0;
  const result = [];
  while (indexLeft < left.length && indexRight < right.length) {
    result.push(left[indexLeft] <= right[indexRight] ? left[indexLeft++] : right[indexRight++]);
  }
  return result.concat(indexLeft < left.length ? left.slice(indexLeft) : right.slice(indexRight));
};

// TEST:
console.log(mergeSort([1, 24, 5, 1, 2, 6, 7, 8, 24, 7, 9, 35, 13, 5, 135, 5]))