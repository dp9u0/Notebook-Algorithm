/**
 * selection sort
 * @param {*[]} input source array
 * @param {(a,b)=> boolean} disordered The function used to determine if two element is disordered.
 * @return {*[]} sort results
 */
function sort(input, disordered) {
  for (let i = 0; i < input.length; i++) {
    let min = i;
    for (let j = i + 1; j < input.length; j++) {
      if (disordered(input[min], input[j])) {
        min = j;
      }
    }
    [input[i], input[min]] = [input[min], input[i]];
  }
  return input;
}

module.exports = sort;