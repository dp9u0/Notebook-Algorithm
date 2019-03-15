/**
 * quick sort
 * @param {*[]} input source array
 * @param {(a,b)=> boolean} disordered The function used to determine if two element is disordered.
 * @return {*[]} sort results
 */
function sort(input, disordered) {
  quickSort(input, 0, input.length - 1, disordered);
  return input;
}

/**
 * quick sort (inplace sort)
 * @param {*[]} A  source array
 * @param {number} li low index
 * @param {number} hi hight index
 * @param {(a,b)=> boolean} disordered The function used to determine if two element is disordered.
 */
function quickSort(A, li, hi, disordered) {
  if (li < hi) {
    let pi = partition(A, li, hi, disordered);
    quickSort(A, li, pi - 1, disordered);
    quickSort(A, pi + 1, hi, disordered);
  }
}

/**
 * partition method
 * @param {*[]} A  source array
 * @param {number} li low index
 * @param {number} hi hight index
 * @param {(a,b)=> boolean} disordered The function used to determine if two element is disordered.
 * @return {number} pivot index
 */
function partition(A, li, hi, disordered) {
  let pivot = A[hi];
  let i = li;
  for (let j = li; j < hi; j++) {
    if (disordered(pivot, A[j])) {
      [A[i], A[j]] = [A[j], A[i]];
      i++;
    }
  }
  [A[i], A[hi]] = [A[hi], A[i]];
  return i;
}

module.exports = sort;