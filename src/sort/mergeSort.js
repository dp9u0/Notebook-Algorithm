/**
 * merge sort
 * @param {*[]} input source array
 * @param {(a,b)=> boolean} disordered The function used to determine if two element is disordered.
 * @return {*[]} sort results
 */
function sort(input, disordered) {
  mergeSort(input, 0, input.length - 1, disordered);
  return input;
}

/**
 * merge sort inplace sort
 * @param {*[]} A source array
 * @param {number} li merge sort start
 * @param {number} hi merge sort end
 * @param {(a,b)=> boolean} disordered The function used to determine if two element is disordered.
 */
function mergeSort(A, li, hi, disordered) {
  if (li < hi) {
    let mid = ~~((hi + li) / 2);
    mergeSort(A, li, mid, disordered);
    mergeSort(A, mid + 1, hi, disordered);
    // merge tow array
    merge(A, li, mid, hi, disordered);
  }
}

/**
 * merge sort inplace sort
 * @param {*[]} A source array
 * @param {number} li merge sort start
 * @param {number} mid mid of merge array
 * @param {number} hi merge sort end
 * @param {(a,b)=> boolean} disordered The function used to determine if two element is disordered.
 */
function merge(A, li, mid, hi, disordered) {
  let left = A.slice(li, mid + 1);
  let right = A.slice(mid + 1, hi + 1);
  for (let i = li; i <= hi; i++) {
    A[i] = (!left.length || disordered(left[0], right[0])) ? right.shift() : left.shift();
  }
}

module.exports = sort;