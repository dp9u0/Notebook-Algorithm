const insertionSort = require('./insertionSort');

/**
 * bucket sort(only support asc sorting)
 * @param {number[]} input source array
 * @return {number[]} sort results
 */
function sort(input) {
  const max = Math.max(...input);
  const min = Math.min(...input);
  let DEFAULT_BUCKET_SIZE = 5; // 桶的容量
  let length = ~~((max - min) / DEFAULT_BUCKET_SIZE) + 1;
  let buckets = Array.from({
    length
  }, () => []);
  //利用映射函数将数据分配到各个桶中
  while (input.length) {
    let element = input.shift();
    buckets[~~((element - min) / DEFAULT_BUCKET_SIZE)].push(element);
  }
  for (i = 0; i < buckets.length; i++) {
    // 每个桶中仅有 ${DEFAULT_BUCKET_SIZE} 个元素,可以使用插入排序
    insertionSort(buckets[i], (a, b) => a > b);
    for (let j = 0; j < buckets[i].length; j++) {
      input.push(buckets[i][j]);
    }
  }

  return input;
}

module.exports = sort;