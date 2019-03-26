/**
 * levenshteinDistance
 * calc Levenshtein Distance using dinamic programing
 * @param {string} from 
 * @param {string} to 
 */
function levenshteinDistance(from, to) {
  const f = Array.from({
    length: (from.length + 1)
  }, (v, i) => {
    return Array.from({
      length: (to.length + 1)
    }, (v, j) => {
      if (i === 0) {
        return j;
      }
      if (j === 0) {
        return i;
      }
      return Infinity;
    });
  });
  for (let i = 0; i < from.length; i++) {
    for (let j = 0; j < to.length; j++) {
      f[i + 1][j + 1] = Math.min(
        f[i][j + 1] + 1, // DELETE
        f[i + 1][j] + 1, // INSERT
        f[i][j] + (from[i] === to[j] ? 0 : 1) // REPLACE(WHEN NOT EQUAL) OR DO NOTHING
      )
    }
  }
  // console.table(f);
  return f[from.length][to.length];
}

module.exports = levenshteinDistance;