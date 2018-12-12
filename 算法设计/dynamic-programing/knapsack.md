# 背包问题

## 0-1背包

n个物品,每个物品都有价值和体积,给定容量的背包,能容纳最多价值的物品的方案.

### 分析

从0选择到物品i,对于这个物品要么选,要么不选,依据是选择和不选,是否能产生足够大的价值,比较下面两个价值 :

1. 选择当前物品 index ,0 到 index-1 个物品使用容积 (capacity - volume)产生的价值加上当前物品价值
2. 不选当前物品 index ,0 到 index-1 个物品使用容积 (capacity) 产生的价值

既可以做出当前物品 0 还是 1

### Code

```javascript
/**
 * 0-1 knapsack
 * @param {number[]} values : 每个物品的价值
 * @param {number[]} volumes : 每个物品的体积
 * @param {number} capacity :背包容积
 */
function zero_one_knapsack(values, volumes, capacity) {
  let length = values.length; // 物品个数 + 1
  let f = []; // 转移矩阵
  // 遍历每个物品
  for (let index = 0; index < length; index++) {
    const value = values[index];
    const volume = volumes[index];
    let preIndex = index - 1;
    f[index] = [];
    for (let selectedVolumn = 0; selectedVolumn <= capacity; selectedVolumn++) {
      let pre = preIndex >= 0 ? f[preIndex][selectedVolumn] : 0; // 前面选择中不包含当前物品的总价值
      if (selectedVolumn < volume) { // 无法容纳当前物品
        f[index][selectedVolumn] = pre;
      } else {
        // 可以容纳当前物品 判断价值大选择
        // 1. 选择当前物品 index ,0 到 i-1 个物品使用容积 (capacity - volume)
        // 2. 不选当前物品 index ,0 到 i-1 个物品使用容积 (capacity)
        let withCurrent = (preIndex >= 0 ? f[preIndex][selectedVolumn - volume] : 0) + value; // 选择当前物品重量所能包含的最大的总价值
        // let withoutCurrent = preJ;
        f[index][selectedVolumn] = Math.max(withCurrent, pre);
      }
    }
  }
  // 从最优解回溯整个矩阵,构建选择结果
  let select = [];
  // 最优选择一定是从 f[物品个数 = length - 1,capacity] 开始的
  let x = length - 1,
    y = capacity;
  for (; x > 0; x--) {
    const value = f[x][y];
    if (value === f[x - 1][y]) {
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
    f,
    select,
    maxValue: f[length - 1][capacity]
  }
}

// TEST:
let values, volumes, capacity;
values = [2, 3, 4, 5], volumes = [2, 3, 4, 5], capacity = 5;
console.log(zero_one_knapsack(values, volumes, capacity))

values = [3, 4, 5, 6], volumes = [2, 3, 4, 5], capacity = 8;
console.log(zero_one_knapsack(values, volumes, capacity))
```