/**
 * LCS
 * @param {string} strA 
 * @param {string} strB 
 */
function LCS(strA, strB) {
  let lengthA = strA.length;
  let lengthB = strB.length;
  let f = [];
  f[-1] = []; // 哨兵
  for (let a = 0; a < lengthA; a++) {
    f[a] = [];
  }
  // build f[a][b]
  for (let a = 0; a < lengthA; a++) {
    for (let b = 0; b < lengthB; b++) {
      if (strA[a] === strB[b]) {
        f[a][b] = (f[a - 1][b - 1] || 0) + 1;
      } else {
        f[a][b] = Math.max((f[a - 1][b] || 0), (f[a][b - 1] || 0));
      }
    }
  }
  console.log(f);
  return f[lengthA - 1][lengthB - 1];
}

// TEST:
LCS('ABCD', 'ABCD')
LCS('ABCDF', 'ABCDE')
LCS('ABDMFC', 'ABCDFEC')