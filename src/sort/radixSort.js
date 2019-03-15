/**
 * radix sort(only support asc sorting)
 * @param {number[]} input source array
 * @return {number[]} sort results
 */
function sort(input) {
  let length = input.length;
  let buckets = Array.from({
    length: 10
  }, () => []);
  let haveHigherDigit = true;
  let devidedby = 1;
  while (haveHigherDigit) {
    for (let i = 0; i < length; i++) {
      const element = input[i];
      let bucketIndex = (~~(element / devidedby)) % 10;
      buckets[bucketIndex].push(element);
    }
    let index = 0;
    for (let i = 0; i < 10; i++) {
      const bucket = buckets[i];
      // 如果都放在了一个bucket中,说明已经没有更高位可以比较了
      if (bucket.length === length) {
        haveHigherDigit = false;
      }
      while (bucket.length) {
        input[index++] = bucket.shift();
      }
    }
    devidedby *= 10;
  }
  return input;
}

module.exports = sort;