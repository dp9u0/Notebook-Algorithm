/**
 * Comparator
 */
class Comparator {

  /**
   * Comparator
   * @param {(a:*,b:*)=>boolean} compareFunction compareFunction
   */
  constructor(compareFunction) {
    this.compareFunction = compareFunction || /*defaultCompareFunction*/ ((a, b) => a === b ? 0 : a < b ? -1 : 1);
  }

  /**
   * Checks if two variables are equal.
   * @param {*} a first value
   * @param {*} b second value
   * @return {boolean} equal or not
   */
  equal(a, b) {
    return this.compareFunction(a, b) === 0;
  }

  /**
   * Checks if variable "a" is less than "b".
   * @param {*} a first value
   * @param {*} b second value
   * @return {boolean} lessThan or not
   */
  lessThan(a, b) {
    return this.compareFunction(a, b) < 0;
  }

  /**
   * Checks if variable "a" is greater than "b".
   * @param {*} a first value
   * @param {*} b second value
   * @return {boolean} greaterThan or not
   */
  greaterThan(a, b) {
    return this.compareFunction(a, b) > 0;
  }

  /**
   * Checks if variable "a" is less than or equal to "b".
   * @param {*} a first value
   * @param {*} b second value
   * @return {boolean} lessThanOrEqual or not
   */
  lessThanOrEqual(a, b) {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  /**
   * Checks if variable "a" is greater than or equal to "b".
   * @param {*} a first value
   * @param {*} b second value
   * @return {boolean} greaterThanOrEqual or not
   */
  greaterThanOrEqual(a, b) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  /**
   * Reverses the comparison order.
   */
  reverse() {
    const compareOriginal = this.compareFunction;
    this.compareFunction = (a, b) => compareOriginal(b, a);
    return this;
  }
}


module.exports = Comparator;