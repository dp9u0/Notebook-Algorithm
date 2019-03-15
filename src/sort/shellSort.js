/**
 * shell sort
 * @param {*[]} input source array
 * @param {(a,b)=> boolean} disordered The function used to determine if two element is disordered.
 * @return {*[]} sort results
 */
function sort(input, disordered) {
  let length = input.length;
  let gaps = [];
  let gap = length >> 1;
  while (gap) {
    gaps.push(gap);
    gap >>= 1;
  }
  for (const gap of gaps) {
    // 对每列进行插入排序
    // 正常来说应该是 第一列插入排序结束然后再排序第二列  
    // 即 i=gap, i+=gap,排序好再 第二列 i=gap+1,i+=gap
    // 但是考虑内存缓存问题
    // 读取 i 会缓存 i ,i+1,i+2... 既然都缓存好了 
    // 就按照下面顺序插入排序 第一列第二个元素 第二列第二个元素 ....然后 第一列第三个元素 第二列第三个元素...
    for (let i = gap; i < length; i++) {
      let j = i - gap;
      let value = input[i];
      while (j >= 0 && disordered(input[j], value)) {
        input[j + gap] = input[j];
        j -= gap;
      }
      input[j + gap] = value;
    }
  }
  return input;
}

module.exports = sort;