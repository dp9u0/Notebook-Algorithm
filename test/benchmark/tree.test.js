const INPUT_COUNT = 1e7;
const INPUT_MAX = 1e6;
const TEST_COUNT = 5;

function Random(max) {
  return ~~(Math.random() * max);
}

function Random10() {
  return ~~(Math.random() * 10);
}

function randomArray(count, inputmax) {
  let array = [];
  while (count) {
    array.push(Random(inputmax));
    count--;
  }
  return array;
}

function randomOp(count) {
  let ops = [];
  while (count) {
    let op = Random10();
    if (op < 1) { // DELETE [0]
      ops.push(1);
    } else if (op < 8) { // SEARCH [1,2,3,4,5,6]
      ops.push(2);
    } else {
      ops.push(3); // INSERT [8,9]
    }
    count--;
  }
  return ops;
}

function BenchmarkTest(trees, testcount, inputcount, inputmax) {
  let results = {};
  trees.forEach((tree, index) => {
    tree.desc = tree.desc || index;
    results[tree.desc] = {}
  });
  const input = randomArray(inputcount, inputmax);
  console.log(`benchmark start :${inputcount} ${inputmax}`);
  while (testcount) {
    const ops = randomOp(inputcount);
    for (let n = 0; n < trees.length; n++) {
      const {
        Tree,
        desc
      } = trees[n];
      let result = results[desc];
      tree = new Tree();
      // BEGIN: MIX
      let {
        height
      } = testOnce(input, ops, Tree, desc)
      result[testcount] = height;
      // END: MIX
    }
    console.table(results);
    testcount--;
  }
  return results;
}


function testOnce(input, ops, Tree, desc) {
  console.time(desc);
  tree = new Tree();
  let length = input.length;
  // BEGIN: MIX
  for (let j = 0; j < length; j++) {
    let op = ops[j];
    let value = input[j];
    if (op === 1) {
      tree.delete(value);
    } else if (op === 2) {
      tree.search(value);
    } else {
      tree.insert(value);
    }
  }
  console.timeEnd(desc);
  return {
    height: tree.height
  }
}

/**
 * Benckmark SetFakeTree
 */
class SetFakeTree {
  constructor() {
    this.set = new Set();
  }

  insert(value) {
    this.set.add(value)
  }

  delete(value) {
    this.set.delete(value)
  }

  search(value) {
    return this.set.has(value)
  }
  validate() {
    return true;
  }
  get height() {
    return 0;
  }

  get size() {
    return this.set.size;
  }
}

// TEST: 
let AVLTree = require("../../src/tree/AVLTree");
let BinarySearchTree = require("../../src/tree/BinarySearchTree");
let SplayTree = require("../../src/tree/SplayTree");
let RedBlackTree = require("../../src/tree/RedBlackTree");
let Treap = require("../../src/tree/Treap");

let trees = [{
  Tree: SetFakeTree,
  desc: "Set"
}, {
  Tree: AVLTree,
  desc: 'AVLTree'
}, {
  Tree: RedBlackTree,
  desc: 'RedBlackTree'
}, {
  Tree: BinarySearchTree,
  desc: 'BinarySearchTree'
}, {
  Tree: SplayTree,
  desc: 'SplayTree'
}, {
  Tree: Treap,
  desc: 'Treap'
}]

BenchmarkTest(trees, TEST_COUNT, INPUT_COUNT, INPUT_MAX)
// BenchmarkTest(trees, TEST_COUNT, INPUT_COUNT * 10, INPUT_MAX)