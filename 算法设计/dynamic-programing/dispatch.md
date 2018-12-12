# 装配线调度

某个汽车工厂共有两条装配线,每条有 n 个装配站.装配线 i 的第 j个装配站表示为 Si,j ,在该站的装配时间为 ai,j .一个汽车底盘进入工厂,然后进入装配线 i(i 为 1 或 2),花费时间为 ei .在通过一条线的第 j 个装配站后,这个底盘来到任一条装配线的第(j+1)个装配站.如果它留在相同的装配线,则没有移动开销.但是,如果它移动到另一条线上,则花费时间为 ti,j .在离开一条装配线的第 n 个装配站后,完成的汽车底盘花费时间为 xi 离开工厂.待求解的问题是,确定应该在装配线 1 内选择哪些站,在装配线 2 内选择哪些站,才能使汽车通过工厂的总时间最短.

## 分析

最省时间的调度方式要么从 1 要么从2出来,如果从 Si,j 节点出来, 那么要么通过S1,j-1 要么通过S2,j-1 ,进入 Si,j,只要选择进入 Si,j 节点是最省时间的即可.

这个问题很明显有最优子结构 : ```f1[index] = Math.min(pre1 + a1[index], pre2 + t2_1[index - 1])```

## Code

```javascript
/**
 * 调度问题
 * @param {number} e1
 * @param {number} e2
 * @param {number[]} t1_2 1转移到2
 * @param {number[]} t2_1 2转移到1
 * @param {number[]} a1
 * @param {number[]} a2
 * @param {number} x1
 * @param {number} x2
 */
function dispatch(e1, e2, t1_2, t2_1, a1, a2, x1, x2) {
  let f1 = [e1 + a1[0]];
  let f2 = [e2 + a2[0]]
  let length = a1.length;
  for (let index = 1; index < length; index++) {
    let pre1 = f1[index - 1];
    let pre2 = f2[index - 1];
    f1[index] = Math.min(pre1 + a1[index], pre2 + t2_1[index - 1]);
    f2[index] = Math.min(pre2 + a2[index], pre1 + t1_2[index - 1]);
  }
  console.log(f1);
  console.log(f2);
  return Math.min(f1[length - 1] + x1, f2[length - 1] + x2);
}

dispatch(1, 3, [4, 2, 5, 5, 6], [4, 1, 4, 5, 6], [4, 1, 4, 5, 6, 7], [4, 2, 5, 5, 6, 7], 2, 3)
```