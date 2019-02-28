const INPUT_COUNT = 1e7;
const INPUT_MAX = 1e3;
const TEST_COUNT = 10;
const OPS_COUNT = 1e5;

function time() {
  return process.hrtime();
};

function performance(start, end) {
  return ~~(((end[0] * 1e9 + end[1]) - (start[0] * 1e9 + start[1])) / 1e6)
}

function Random() {
  return ~~(Math.random() * INPUT_MAX);
}

function Random10() {
  return ~~(Math.random() * 10);
}

function randomArray(count) {
  let array = [];
  while (count) {
    array.push(Random());
    count--;
  }
  return array;
}

function randomOp(count) {
  let ops = [];
  while (count) {
    let op = Random10();
    if (op < 1) { // DELETE
      ops.push(1);
    } else if (op < 7) { // SEARCH
      ops.push(2);
    } else {
      ops.push(3); // INSERT
    }
    count--;
  }
  return ops;
}

function BenchmarkTest(trees, count) {
  let results = {};
  trees.forEach((tree, index) => {
    tree.desc = tree.desc || index;
    results[tree.desc] = {
      desc: tree.desc,
      MIX: [],
      MIX_SUM: 0,
    }
  });
  const input = randomArray(INPUT_COUNT);
  while (count) {
    const ops = randomOp(OPS_COUNT);
    for (let n = 0; n < trees.length; n++) {
      const {
        Tree,
        desc
      } = trees[n];
      let result = results[desc];
      tree = new Tree()
      // BEGIN: MIX
      start = time();
      let i = s = d = 0;
      for (let j = 0; j < INPUT_COUNT; j++) {
        let op = ops[j % OPS_COUNT];
        let value = input[j];
        if (op === 1) {
          tree.delete(value);
          d++;
        } else if (op === 2) {
          tree.search(value);
          s++;
        } else {
          tree.insert(value);
          i++;
        }
      }
      end = time();
      cost = performance(start, end)
      result.MIX.push(cost);
      result.MIX_SUM += cost
      // END: MIX
    }
    count--;
  }
  return results;
}

/**
 * Benckmark
 */
class SetFakeTree {
  constructor() {
    this.set = new Set();
  }

  insert(value) {
    this.set.add(value)
  }

  delete(value) {
    this.set.add(value)
  }

  search(value) {
    return this.set.has(value)
  }
}

// TEST: 
let BinarySearchTree = require("../../src/tree/BinarySearchTree");
let AVLTree = require("../../src/tree/AVLTree");

console.log(BenchmarkTest([{
  Tree: SetFakeTree,
  desc: "Set"
}, {
  Tree: BinarySearchTree,
  desc: 'BinarySearchTree'
}, {
  Tree: BinarySearchTree,
  desc: 'AVLTree'
}], TEST_COUNT))