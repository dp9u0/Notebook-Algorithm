let Comparator = require('../common/Comparator');

/**
 * Linear search implementation.
 *
 * @param {*[]} sortedArray array to search
 * @param {*} seekElement element
 * @param {} [comparatorFn] comparatorFn
 * @return {number} index found
 */
export default function linearSearch(array, seekElement, comparatorFn) {
  const comparator = new Comparator(comparatorFn);
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (comparator.equal(element, seekElement)) {
      return index;
    }
  }
  return -1;
}