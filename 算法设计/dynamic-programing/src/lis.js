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

// // TEST:
// let input;
// input = [1, 1, 2, 6, 3, 4];
// console.log(LIS(input))

/**
 * 最长上升子序列
 * @param {number[]} input 
 */
function LIS2(input) {
  let length = input.length;
  let stack = [];
  stack[0] = 0;
  for (let i = 0; i < length; i++) {
    if (input[i] > stack[stack.length - 1]) {
      stack.push(input[i]);
    } else {
      binary_replace(stack, input[i], 1, stack.length - 1);
    }
  }
  return stack.length - 1;
}

function binary_replace(array, element, start, end) {
  let middle = Math.floor((start + end) / 2);
  if ((array[middle] >= element && array[middle - 1] < element)) {
    array[middle] = element;
  } else if (array[middle] > element) {
    binary_replace(array, element, start, middle);
  } else {
    binary_replace(array, element, middle + 1, end);
  }
}

//TEST:
input = [1, 1, 2, 6, 3, 4];
console.log(LIS2(input))