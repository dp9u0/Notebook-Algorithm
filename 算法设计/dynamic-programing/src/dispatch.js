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

// TEST:
dispatch(1, 3, [4, 2, 5, 5, 6], [4, 1, 4, 5, 6], [4, 1, 4, 5, 6, 7], [4, 2, 5, 5, 6, 7], 2, 3)