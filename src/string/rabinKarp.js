const DEFAULT_BASE = 37;
const DEFAULT_MODULUS = 101;

/**
 * Converts char to number.
 *
 * @param {string} char
 * @return {number}
 */
function charToNumber(char) {
  let charCode = char.codePointAt(0);
  // Check if character has surrogate pair.
  const surrogate = char.codePointAt(1);
  if (surrogate !== undefined) {
    const surrogateShift = 2 ** 16;
    charCode += surrogate * surrogateShift;
  }

  return charCode;
}

/**
 * Creates hash code for a string
 * @param {string} word 
 */
function hash(word) {
  const charCodes = Array.from(word).map(char => charToNumber(char));
  let hash = 0;
  for (let charIndex = 0; charIndex < charCodes.length; charIndex += 1) {
    hash *= DEFAULT_BASE;
    hash += charCodes[charIndex];
    hash %= DEFAULT_MODULUS;
  }
  return hash;
}

/**
 * Function that creates hash representation of the word
 * based on previous word (shifted by one character left) hash value.
 *
 * Recalculates the hash representation of a word so that it isn't
 * necessary to traverse the whole word again.
 * @param {number} prevHash 
 * @param {string} prevWord 
 * @param {string} newWord 
 */
function roll(prevHash, prevWord, newWord) {
  let hash = prevHash;

  const prevValue = charToNumber(prevWord[0]);
  const newValue = charToNumber(newWord[newWord.length - 1]);

  let prevValueMultiplier = 1;
  // If we donnot use DEFAULT_MODULUS to keep hash safe
  // It will be possible to calc prevValueMultiplier directly use prevWord insted of for...
  for (let i = 1; i < prevWord.length; i += 1) {
    prevValueMultiplier *= DEFAULT_BASE;
    prevValueMultiplier %= DEFAULT_MODULUS;
  }

  hash += DEFAULT_MODULUS;
  hash -= (prevValue * prevValueMultiplier) % DEFAULT_MODULUS;
  hash *= DEFAULT_BASE;
  hash += newValue;
  hash %= DEFAULT_MODULUS;
  return hash;
}

/**
 * 
 * Word search
 * @param {string} text - Text that may contain the searchable pattern.
 * @param {string} pattern - Pattern that is being searched in text.
 * @return {number} - Position of the pattern in text.
 */
function rabinKarp(text, pattern) {
  // Calculate word hash that we will use for comparison with other substring hashes.
  const patternHash = hash(pattern);
  let prevFrame = null;
  let currentFrameHash = null;
  // Go through all substring of the text that may match.
  for (let charIndex = 0; charIndex <= (text.length - pattern.length); charIndex += 1) {
    const currentFrame = text.substring(charIndex, charIndex + pattern.length);
    // Calculate the hash of current substring.
    if (currentFrameHash === null) {
      currentFrameHash = hash(currentFrame);
    } else {
      currentFrameHash = roll(currentFrameHash, prevFrame, currentFrame);
    }
    prevFrame = currentFrame;
    // Compare the hash of current substring and seeking string.
    // In case if hashes match let's make sure that substrings are equal.
    // In case of hash collision the strings may not be equal.
    if (
      patternHash === currentFrameHash &&
      text.substr(charIndex, pattern.length) === pattern
    ) {
      return charIndex;
    }
  }
  return -1;
}

module.exports = rabinKarp;