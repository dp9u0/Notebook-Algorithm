/**
 * counting sort(only support asc sorting)
 * @param {number[]} input source array
 * @return {number[]} sort results
 */
function sort(input) {
  let map = [];
  for (const num of input) {
    map[num] = (map[num] || 0) + 1;
  }
  let index = 0;
  for (let num = 0; num < map.length; num++) {
    let count = map[num];
    while (count) {
      input[index++] = num;
      count--;
    }
  }
  return input;
}

module.exports = sort;