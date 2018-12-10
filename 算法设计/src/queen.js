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

console.log(solveNQueens(8));