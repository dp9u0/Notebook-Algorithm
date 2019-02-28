const INPUT_COUNT = 1e6;
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
    if (op < 2) {
      ops.push(1);
    } else if (op < 6) {
      ops.push(2);
    } else {
      ops.push(3);
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
      // INSERT: [],
      // INSERT_SUM: 0,
      // DELETE: [],
      // DELETE_SUM: 0,
      // SEARCH: [],
      // SEARCH_SUM: 0,
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

      // let tree = new Tree()
      // let cost;
      // // BEGIN:INSERT
      // start = time();
      // for (let j = 0; j < INPUT_COUNT; j++) {
      //   let value = input[j];
      //   tree.insert(value);
      // }
      // end = time();
      // cost = performance(start, end)
      // result.INSERT.push(cost);
      // result.INSERT_SUM += cost
      // // END:INSERT

      // // BEGIN:SEARCH
      // start = time();
      // for (let j = 0; j < INPUT_COUNT; j++) {
      //   let value = input[j];
      //   tree.search(value);
      // }
      // end = time();
      // cost = performance(start, end)
      // result.SEARCH.push(cost);
      // result.SEARCH_SUM += cost
      // // END:SEARCH

      // // BEGIN:DELETE 
      // start = time();
      // for (let j = 0; j < INPUT_COUNT; j++) {
      //   let value = input[j];
      //   tree.delete(value);
      // }
      // end = time();
      // cost = performance(start, end)
      // result.DELETE.push(cost);
      // result.DELETE_SUM += cost
      // // END:DELETE 

      tree = new Tree()

      // BEGIN:MIX
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
      // END:MIX
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

let BinarySearchTree = require("../BinarySearchTree")
let AVLTree = require("../AVLTree")

console.log(BenchmarkTest([{
  Tree: SetFakeTree,
  desc: "Set"
}, {
  Tree: BinarySearchTree,
  desc: 'BinarySearchTree'
}, {
  Tree: AVLTree,
  desc: 'AVLTree'
}], TEST_COUNT))