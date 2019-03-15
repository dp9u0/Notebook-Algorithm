/**
 * insertion sort
 * @param {*[]} input source array
 * @param {(a,b)=> boolean} disordered The function used to determine if two element is disordered.
 * @return {*[]} sort results
 */
function sort(input, disordered) {
  for (let i = 1; i < input.length; i++) {
    let j = i - 1;
    let value = input[i];
    while (j >= 0 && disordered(input[j], value)) {
      input[j + 1] = input[j];
      j--;
    }
    input[j + 1] = value;
  }
  return input;
}

module.exports = sort;