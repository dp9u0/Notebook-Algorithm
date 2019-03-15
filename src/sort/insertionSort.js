/**
 * insertion sort
 * @param {*[]} input source array
 * @param {(a,b)=> boolean} disordered The function used to determine if two element is disordered.
 * @return {*[]} sort results
 */
function sort(input, disordered) {
  for (let i = 1; i < input.length; i++) {
    let j = i - 1;
    while (disordered(input[j], input[i])) {
      input[j + 1] = input[j];
    }
    input[j] = input[i];
  }
  return input;
}

module.exports = sort;