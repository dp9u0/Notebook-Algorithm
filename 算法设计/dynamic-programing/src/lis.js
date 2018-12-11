/**
 * 最长上升子序列
 * @param {number[]} input 
 */
function LIS(input) {
  let length = input.length;
  let f = [1];
  for (let i = 0; i < length; i++) {
    let maxPrefixLength = 0;
    for (let j = 0; j < i; j++) {
      if (input[i] > input[j]) {
        maxPrefixLength = Math.max(f[j], maxPrefixLength);
      }
    }
    f[i] = maxPrefixLength + 1;
  }
  console.log(f);
}

// TEST:
let input;
input = [1, 1, 2, 6, 3, 4];
console.log(LIS(input))