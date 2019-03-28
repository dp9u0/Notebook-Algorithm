/**
 * 
 * @typedef {Object} PatternTable
 * @property {Object[]} badCharacter badCharacter
 * @property {number[]} goodSuffix goodSuffix
 */

/**
 * Build Pattern Table for Pattern
 * @param {string} pattern pattern
 * @returns {PatternTable} pattern table
 */
function buildPattern(pattern) {
  let length = pattern.length;
  let badCharacter = [{}];
  // bad character
  for (let i = 1; i < pattern.length; i++) {
    badCharacter[i] = {}
    Object.assign(badCharacter[i], badCharacter[i - 1]);
    badCharacter[i][pattern[i - 1]] = i - 1;
  }
  let goodSuffix = new Array().fill(0);
  // console.table(badCharacter);
  // console.table(goodSuffix);
  return {
    badCharacter,
    goodSuffix,
  };
}

/**
 * calc offset from pattern table
 * @param {PatternTable} patternTable  pattern table
 * @param {number} dismatchIndex  dismatch index
 * @param {string} dismatchChar  dismatch character
 */
function getOffset(patternTable, dismatchIndex, badChar) {
  let posBadChar = patternTable.badCharacter[dismatchIndex][badChar] || -1;
  return Math.max(dismatchIndex - posBadChar, patternTable.goodSuffix[dismatchIndex]);
}

/**
 * Word search
 * @param {string} text - Text that may contain the searchable pattern.
 * @param {string} pattern - Pattern that is being searched in text.
 * @return {number} - Position of the pattern in text.
 */
function boyerMoore(text, pattern) {
  if (pattern.length === 0) {
    return 0;
  }
  const patternTable = buildPattern(pattern);
 
  let pIndex = pattern.length - 1;
  let tIndex = pIndex;
  while (tIndex < text.length) {
    if (text[tIndex] === pattern[pIndex]) {
      if (pIndex === 0) {
        return tIndex;
      }
      tIndex--;
      pIndex--;
    } else {
      tIndex += getOffset(patternTable, pIndex, text[tIndex]);
      pIndex = pattern.length - 1;
    }
  }
  return -1;
}

module.exports = boyerMoore;