/**
 * 
 * @typedef {Object} PatternTable
 * @property {Object[]} badCharacter badCharacter
 * @property {number[]} L goodSuffix L array
 * L[i] is the largest position less than n - 1 such that string P[i..n-1] matches a suffix of P[0..L[i]]
 * If none exists,L[i] is defined to be -1 .
 * @property {number[]} H goodSuffix H array
 * H[i] is the length of the largest suffix of P[i..n-1] that is also a prefix of P, if one exists. 
 * If none exists,H[i] is defined to be -1 .
 * @property {number[]} goodSuffixOffset goodSuffixOffset calc by L and H
 * @property {number} length length of pattern
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
    badCharacter[i][pattern[i - 1]] = (i - 1);
  }

  // Both of these tables are constructible in O(n) time and use O(n) space.
  let L = new Array(length).fill(-1);
  let lastIndex = pattern.length - 1;
  let j = lastIndex; // good suffix index
  let i = lastIndex - 1;
  while (i >= 0 && j > 0) {
    let l = i + (lastIndex - j); // last index of current frame.
    if (l < j) {
      if (pattern[i] === pattern[j]) {
        L[j] = (L[j] === -1 ? l : L[j]);
        j--;
      }
      i--;
    } else {
      i = j - 1;
      j = lastIndex;
    }
  }
  // H should only be used if L[i] is -1 or a match has been found.
  let H = new Array(length).fill(-1);
  j = lastIndex; // good suffix index
  for (; j >= 0; j--) {
    let goodSuffixMaxSuffixLength = j + 1;
    let maxSuffixLength = length - goodSuffixMaxSuffixLength;
    if (pattern.substr(0, maxSuffixLength) === pattern.substr(goodSuffixMaxSuffixLength, maxSuffixLength)) {
      H[j] = maxSuffixLength - 1;
    } else {
      H[j] = H[j + 1] === undefined ? -1 : H[j + 1];
    }
  }
  // The alignment shift for index i in P is given by n - 1 - L[i] or n - 1 - H[i]. 
  let goodSuffixOffset = L.map((value, index) => {
    if (value === -1) {
      value = H[index];
    }
    return length - 1 - value;
  });

  return {
    badCharacter,
    goodSuffixOffset,
    L,
    H,
  };
}

/**
 * calc offset from pattern table
 * @param {PatternTable} patternTable  pattern table
 * @param {number} mismatchIndex  mismatchIndex in pattern
 * @param {string} badChar  mismatch character in text
 */
function getOffset(patternTable, mismatchIndex, badChar) {
  let badCharIndex = patternTable.badCharacter[mismatchIndex][badChar] === undefined ? -1 : patternTable.badCharacter[mismatchIndex][badChar];
  let badCharOffset = mismatchIndex - badCharIndex;
  let goodSuffixOffset = patternTable.goodSuffixOffset[mismatchIndex + 1] || badCharOffset;
  return Math.max(badCharOffset, goodSuffixOffset);
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
  let pLastIndex = pattern.length - 1; // pattern last index
  let fLastIndex = pLastIndex; // frame last index
  let comparedCount = 0; // compared count beween pattern and frame
  while (fLastIndex < text.length) {
    let pIndex = pLastIndex - comparedCount; // calc current compare index in pattern;
    let fIndex = fLastIndex - comparedCount; // calc current compare index in frame;
    if (text[fIndex] === pattern[pIndex]) {
      if (pIndex === 0) {
        return fIndex;
      }
      comparedCount++;
    } else {
      // not match reset compared count and go to next frame
      fLastIndex = fLastIndex + getOffset(patternTable, pIndex, text[fIndex]);
      comparedCount = 0;
    }
  }
  return -1;
}

module.exports = {
  boyerMoore,
  buildPattern
};