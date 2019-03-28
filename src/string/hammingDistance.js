/**
 * hammingDistance
 * @param {string} first first string
 * @param {string} second second string
 * @returns {number} distance
 */
function hammingDistance(first, second) {
  if (!first && !second) {
    return 0;
  }
  if (!first || !second) {
    return (first || second).length;
  }
  let maxLength = Math.max(first.length, second.length);
  let distance = 0;
  for (let i = 0; i < maxLength; i++) {
    if (first[i] !== second[i]) {
      distance++;
    }
  }
  return distance;
}

module.exports = hammingDistance;