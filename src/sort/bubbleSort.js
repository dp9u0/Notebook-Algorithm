/**
 * bubble sort
 * @param {*[]} input source array
 * @param {(a,b)=> boolean} disordered The function used to determine if two element is disordered.
 * @return {*[]} sort results
 */
function sort(input, disordered) {
  let maxIndex = input.length - 1;
  for (let i = 0; i < maxIndex; i++) {
    for (let j = 0; j < maxIndex - i; j++) {
      if (disordered(input[j], input[j + 1])) {
        [input[j + 1], input[j]] = [input[j], input[j + 1]];
      }
    }
  }
  return input;
}

module.exports = sort;