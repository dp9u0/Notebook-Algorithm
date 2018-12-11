# 回溯法

按选优条件或某个目标向前搜索,当探索到某一步时,发现原先选择并不优或达不到目标,就退回一步重新选择,这种走不通就退回再走的技术为回溯法,而满足回溯条件的某个状态的点称为**回溯点** ,最经典的回溯法问题当属 "8-皇后问题"

## 8-Queen

## 解

 > 8-Queen : 在8×8格的国际象棋上摆放八个皇后,使其不能互相攻击,即任意两个皇后都不能处于同一行,同一列或同一斜线上,问有多少种摆法?

 其实,8皇后问题可以扩展到N皇后问题,其解题思路是一致的.

1. 遍历N个皇后,每个皇后至少处于不同的行,例如第一个位于第一行,第二个位于第二行...
2. 用回溯法不断的试探每个皇后在自己行所在的位置,如果跟已有的皇后互相不冲突,则试探下一个皇后,如果所有位置都遍历并且没有不冲突的位置,则回溯上一个皇后的位置,试探下一个位置.
3. 直到所有的皇后遍历完,则认为是一种解法.记录结果,并接着回溯.直到所有皇后所有位置都试探完毕.解题结束.

```javascript
/**
 * @param {number} n
 * @return {number[][]}
 */
var solveNQueens = function (n) {
  solution = {
    n,
    line: [],
    queens: [],
    count: 0,
    results: [],
    puzzles: [],
  };
  solution.line = 'Q';
  for (let index = 0; index < n - 1; index++) {
    solution.line = '.' + solution.line + '.';
  }
  solveNQueensRecursion(solution);
  // return solution.count;
  return solution.puzzles;
};

function solveNQueensRecursion(solution, currentIndex = 0) {
  // console.log(solution);
  if (currentIndex === solution.n) {
    // solved
    let result = solution.queens.slice(0);
    // solution.results.push(solution.queens.slice(0));
    let puzzle = [];
    const n = solution.n;
    for (let index = 0; index < result.length; index++) {
      const element = result[index];
      let start = n - 1 - element;
      let end = start + n;
      puzzle[index] = solution.line.slice(start, end).concat();
    }
    solution.puzzles.push(puzzle);
    solution.count++;
    return;
  }
  for (let pisition = 0; pisition < solution.n; pisition++) {
    solution.queens[currentIndex] = pisition;
    let foundPisition = true;
    for (let indexExist = 0; indexExist < currentIndex; indexExist++) {
      const existPisition = solution.queens[indexExist];
      if (existPisition === pisition || Math.abs(pisition - existPisition) === Math.abs(currentIndex - indexExist)) {
        foundPisition = false;
        break;
      }
    }
    if (foundPisition) {
      solveNQueensRecursion(solution, currentIndex + 1);
    }
  }
}

// TEST:
console.log(solveNQueens(4));

// TEST:
console.log(solveNQueens(8));
```

### 优化

拿4-Queen为例,可以看到,实际上这两种解释对称结构,因此可以每个皇后只遍历一半的位置,其他解通过结构对称即可获取.

```javascript
// 解1
'.Q..'
'...Q'
'Q...'
'..Q.'

// 解2
'..Q.'
'Q...'
'...Q'
'.Q..'
```