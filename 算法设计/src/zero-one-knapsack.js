/**
 * 
 * @param {number[]} values : 每个物品的价值
 * @param {number[]} volumes : 每个物品的体积
 * @param {number} capacity :背包容积
 */
function zero_one_knapsack(values, volumes, capacity) {
  let length = values.length; // 物品个数
  let matrix = []; // 状态转移矩阵
  // 遍历每个物品
  for (let index = 0; index < length; index++) {
    const value = values[index];
    const volume = volumes[index];
    let preIndex = index - 1;
    matrix[index] = [];
    for (let selectedVolumn = 0; selectedVolumn <= capacity; selectedVolumn++) {
      let pre = preIndex >= 0 ? matrix[preIndex][selectedVolumn] : 0; // 前面选择中不包含当前物品的总价值
      if (selectedVolumn < volume) { // 无法容纳当前物品
        matrix[index][selectedVolumn] = pre;
      } else {
        // 可以容纳当前物品
        // 选择价值大选择 
        // 1. 选择当前物品 其他 n-1 个物品 使用容积 (capacity - volume)
        // 2. 不选择当前物品 其他 n-1 个物品 使用容积 (capacity)
        let withCurrent = (preIndex >= 0 ? matrix[preIndex][selectedVolumn - volume] : 0) + value;  // 选择当前物品重量所能包含的最大的总价值
        // let withoutCurrent = preJ;
        matrix[index][selectedVolumn] = Math.max(withCurrent, pre);
      }
    }
  }
  // 从最优解回溯整个矩阵,构建选择结果
  let select = [];
  // 最优选择一定是从 (length - 1) 和 (capacity) 开始的
  let x = length - 1,
    y = capacity;
  for (; x > 0; x--) {
    const value = matrix[x][y];
    if (value === matrix[x - 1][y]) {
      // 说明最优选择没有选择当前物品(也有可能是 选择当前物品价值刚好等于 不选择当前物品价值,统一认为没有选择)
      select.unshift(0);
    } else {
      // 说明最优选择选择了当前物品
      select.unshift(1);
      y -= volumes[x];
    }
  }
  select.unshift(~~(y !== 0));
  return {
    matrix,
    select,
    maxValue: matrix[length - 1][capacity]
  }
}

let values, volumes, capacity;
values = [2, 3, 4, 5], volumes = [2, 3, 4, 5], capacity = 5;
console.log(zero_one_knapsack(values, volumes, capacity))

values = [3, 4, 5, 6], volumes = [2, 3, 4, 5], capacity = 8;
console.log(zero_one_knapsack(values, volumes, capacity))