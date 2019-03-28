/**
 * build pattern table
 * @param {string} pattern word
 * @return {number[]} pattern table
 */
function buildPattern(pattern) {
  const patternTable = new Array(pattern.length).fill(0); // Initialize
  let prefixIndex = 0;
  for (let i = 1; i < pattern.length; i++) {
    if (pattern[i] === pattern[prefixIndex]) {
      patternTable[i] = ++prefixIndex;
    } else if (prefixIndex) {
      prefixIndex = patternTable[prefixIndex - 1];
      i--; // Still Compare Current pattern[i] with prefix
    }
  }
  return patternTable;
}

/**
 * Word search
 * @param {string} text - Text that may contain the searchable pattern.
 * @param {string} pattern - Pattern that is being searched in text.
 * @return {number} - Position of the pattern in text.
 */
function knuthMorrisPratt(text, pattern) {
  if (pattern.length === 0) {
    return 0;
  }
  const patternTable = buildPattern(pattern);
  let tIndex = 0;
  let pIndex = 0;
  while (tIndex < text.length) {
    if (pattern[pIndex] === text[tIndex]) {
      if (pIndex === pattern.length - 1) {
        return tIndex - pIndex;
      }
      tIndex++;
      pIndex++;
    } else {
      if (pIndex) {
        // Have Common Prefix
        pIndex = patternTable[pIndex - 1];
      } else {
        pIndex = 0;
        tIndex++;
      }
    }
  }
  return -1;
}

module.exports = knuthMorrisPratt;