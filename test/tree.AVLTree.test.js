const expect = require('chai').expect;
const Tree = require("../src/tree/AVLTree");
const {
  _arrayToTree,
  _setLeft,
  _setRight,
  _replace,
  _remove,
  _getUncle,
  _size,
  _height,
  _leftHeight,
  _leftSize,
  _rightHeight,
  _rightSize,
  _rotateLeft,
  _rotateRight,
  _inOrderTraverse,
  _print,
  _validate,
} = require("../src/tree/BinaryTree");


const INPUT_COUNT = 1e4;
const INPUT_MAX = 1e2;

// const INPUT_COUNT = 1;
// const INPUT_MAX = 1;

function insertTest() {
  describe('#insert()', function () {
    // [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15]
    it(`insert to an empty tree , inserted element should be root`, function () {
      const input = [];
      let set = new Set(input);
      let tree = Tree.fromArray(input);
      let element = 8;
      tree.insert(element);
      set.add(element)
      let insertedNode = tree.root;
      expect(tree.validate(), `tree should be validate`).to.be.true;
      expect(insertedNode.value, `inserted element should be ${element}`).to.equal(element);
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
    });

    it(`insert left`, function () {
      const input = [8];
      let set = new Set(input);
      let tree = Tree.fromArray(input);
      let element = 4;
      tree.insert(element);
      set.add(element)
      let insertedNode = tree.root.left;
      expect(tree.validate(), `tree should be validate`).to.be.true;
      expect(insertedNode.value, `inserted element should be ${element}`).to.equal(element);
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
    });

    it(`insert right`, function () {
      const input = [8, null];
      let set = new Set(input);
      let tree = Tree.fromArray(input);
      let element = 12;
      tree.insert(element);
      set.add(element)
      let insertedNode = tree.root.right;
      expect(tree.validate(), `tree should be validate`).to.be.true;
      expect(insertedNode.value, `inserted element should be ${element}`).to.equal(element);
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
    });

    it(`insert exist element`, function () {
      const input = [8, 4, 12, 2, 6];
      let set = new Set(input);
      let tree = Tree.fromArray(input);
      let element = 4;
      tree.insert(element);
      set.add(element)
      expect(tree.validate(), `tree should be validate`).to.be.true;
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
    });
  });
}

function searchTest() {
  describe('#search()', function () {
    it(`search should work ok`, function () {
      const input = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
      let tree = Tree.fromArray(input);
      for (let i = 0; i < input.length; i++) {
        const element = input[i];
        expect(tree.search(element), `tree should contains ${element}`).to.be.true;
      }
      expect(tree.search(888), `tree should not contains 888`).to.be.false;
      expect(tree.search(`888`), `tree should not contains 888`).to.be.false;
    });
  });
}

function deleteTest() {
  describe('#delete()', function () {
    it(`delete root should work ok`, function () {
      const input = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
      let set = new Set(input);
      let tree = Tree.fromArray(input);
      let element = 8;
      tree.delete(element);
      set.delete(element);
      let node = tree.root;
      expect(tree.validate(), `tree should be validate`).to.be.true;
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(node.value, `new root value should be 9`).to.equal(9);
    });

    it(`delete single root should work ok`, function () {
      const input = [8];
      let set = new Set(input);
      let tree = Tree.fromArray(input);
      let element = 8;
      tree.delete(element);
      set.delete(element);
      let node = tree.root;
      expect(tree.validate(), `tree should be validate`).to.be.true;
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(node, `new root should be null`).to.be.null;
    });

    it(`delete left(left has full child) should work ok`, function () {
      const input = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
      let set = new Set(input);
      let tree = Tree.fromArray(input);
      let element = 4;
      tree.delete(element);
      set.delete(element);
      let node = tree.root.left;
      expect(tree.validate(), `tree should be validate`).to.be.true;
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(node.value, `new root value should be 5`).to.equal(5);
    });

    it(`delete left(left has no child) should work ok`, function () {
      const input = [8, 4, 12];
      let set = new Set(input);
      let tree = Tree.fromArray(input);
      let element = 4;
      tree.delete(element);
      set.delete(element);
      let node = tree.root.left;
      expect(tree.validate(), `tree should be validate`).to.be.true;
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(node, `new root should be null`).to.be.null;
    });

    it(`delete left(left only has left) should work ok`, function () {
      const input = [8, 4, 12, 2, null, 10, 14, 1, 3, null, null, 9, 11, 13, 15];
      let set = new Set(input);
      let tree = Tree.fromArray(input);
      let element = 4;
      tree.delete(element);
      set.delete(element);
      let node = tree.root.left;
      expect(tree.validate(), `tree should be validate`).to.be.true;
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(node.value, `new root value should be 2`).to.equal(2);
    });

    it(`delete left(left only has right) should work ok`, function () {
      const input = [8, 4, 12, null, 6, 10, 14, null, null, 5, 7, 9, 11, 13, 15];
      let set = new Set(input);
      let tree = Tree.fromArray(input);
      let element = 4;
      tree.delete(element);
      set.delete(element);
      let node = tree.root.left;
      expect(tree.validate(), `tree should be validate`).to.be.true;
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(node.value, `new root value should be 5`).to.equal(5);
    });


    it(`delete left(left only has right,and right min is left child) should work ok`, function () {
      const input = [8, 4, 12, null, 6, 10, 14, null, null, null, 7, 9, 11, 13, 15];
      let set = new Set(input);
      let tree = Tree.fromArray(input);
      let element = 4;
      tree.delete(element);
      set.delete(element);
      let node = tree.root.left;
      expect(tree.validate(), `tree should be validate`).to.be.true;
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(node.value, `new root value should be 6`).to.equal(6);
    });

    it(`delete right(right has full child) should work ok`, function () {
      const input = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
      let set = new Set(input);
      let tree = Tree.fromArray(input);
      let element = 12;
      tree.delete(element);
      set.delete(element);
      let node = tree.root.right;
      expect(tree.validate(), `tree should be validate`).to.be.true;
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(node.value, `new root value should be 13`).to.equal(13);
    });

    it(`delete right(right has no child) should work ok`, function () {
      const input = [8, 4, 12];
      let set = new Set(input);
      let tree = Tree.fromArray(input);
      let element = 12;
      tree.delete(element);
      set.delete(element);
      let node = tree.root.right;
      expect(tree.validate(), `tree should be validate`).to.be.true;
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(node, `new root should be null`).to.be.null;
    });
  });
}

function randomTest() {
  describe('#random()', function () {
    this.timeout(60000 * 5);
    it(`randomTest should work ok()`, function (done) {
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
          if (op < 1) { // DELETE [0]
            ops.push(1);
          } else if (op < 7) { // SEARCH [1,2,3,4,5,6]
            ops.push(2);
          } else {
            ops.push(3); // INSERT [7,8,9]
          }
          count--;
        }
        return ops;
      }
      const input = randomArray(INPUT_COUNT);
      const ops = randomOp(INPUT_COUNT);
      let tree = new Tree();
      let set = new Set();
      let i = s = d = 0;
      for (let j = 0; j < INPUT_COUNT; j++) {
        let value = input[j];
        let op = ops[j];
        if (op === 1) {
          tree.delete(value);
          set.delete(value);
        } else if (op === 2) {
          expect(tree.search(value)).to.equal(set.has(value));
        } else {
          tree.insert(value);
          set.add(value);
        }
        expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
        expect(tree.validate(), `bst should be validate`).to.be.true;
      }
      done()
    });
  })
}

function balanceTest() {
  describe('#balance()', function () {
    it(`balance_insert root rotation right`, function () {
      const input = [1, 2];
      let set = new Set(input);
      let tree = Tree.fromArray(input);
      let element = 3;
      tree.insert(element);
      set.add(element);
      let node = tree.root;
      expect(tree.validate(), `tree should be validate`).to.be.true;
      expect(node.leftHeight, `node.leftHeight should be`).to.equal(1);
      expect(node.rightHeight, `node.rightHeight should be`).to.equal(1);
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(node.value, `tree structure is not match`).to.equal(2);
    });

    it(`balance_insert root rotation left`, function () {
      const input = [3, 2];
      let set = new Set(input);
      let tree = Tree.fromArray(input);
      let element = 1;
      tree.insert(element);
      set.add(element);
      let node = tree.root;
      expect(tree.validate(), `tree should be validate`).to.be.true;
      expect(node.leftHeight, `node.leftHeight should be`).to.equal(1);
      expect(node.rightHeight, `node.rightHeight should be`).to.equal(1);
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(node.value, `tree structure is not match`).to.equal(2);
    });

    it(`balance_insert root.left rotation left and then root rotation right`, function () {
      const input = [3, 1];
      let set = new Set(input);
      let tree = Tree.fromArray(input);
      let element = 2;
      tree.insert(element);
      set.add(element);
      let node = tree.root;
      expect(tree.validate(), `tree should be validate`).to.be.true;
      expect(node.leftHeight, `node.leftHeight should be`).to.equal(1);
      expect(node.rightHeight, `node.rightHeight should be`).to.equal(1);
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(node.value, `tree structure is not match`).to.equal(2);
    });

    it(`balance_insert root.right rotation right and then root rotation left`, function () {
      const input = [1, 3];
      let set = new Set(input);
      let tree = Tree.fromArray(input);
      let element = 2;
      tree.insert(element);
      set.add(element);
      let node = tree.root;
      expect(tree.validate(), `tree should be validate`).to.be.true;
      expect(node.leftHeight, `node.leftHeight should be`).to.equal(1);
      expect(node.rightHeight, `node.rightHeight should be`).to.equal(1);
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(node.value, `tree structure is not match`).to.equal(2);
    });
  })
}


function singleTest() {
  describe('#singleTest()', function () {
    it(`singleTest 001`, function () {
      let input = [126, 256, 809, 249, 458, 11, 384, 947, 248, 144, 140, 877, 857, 546, 472, 169, 564, 665, 54, 452, 276, 254,
        871, 368, 425, 690, 586, 717, 519, 922, 780, 984, 813, 422, 975, 42, 478, 964, 311, 313, 502, 504, 509, 450, 76, 596, 62,
        486, 676, 982, 810, 674, 944, 318, 231, 551, 160, 453, 36, 948, 869, 300, 589, 73, 644, 122, 499, 127, 672, 199, 442, 550,
        444, 698, 395, 843, 783, 190, 134, 764, 900, 801, 607, 781, 730, 736, 79, 879, 990, 124, 578, 926, 131, 26, 464, 917, 594,
        661, 351, 788, 282, 332, 362, 348, 597, 434, 572, 898, 200, 693, 381, 628, 883, 389, 241, 397, 534, 347, 909, 603, 31, 826,
        901, 226, 230, 960, 37, 158, 367, 350, 816, 43, 369, 337, 7, 821, 59, 151, 994, 667, 937, 103, 765, 258, 80, 962, 278, 645,
        85, 763, 375, 891, 724, 522, 941, 408, 346, 345, 833, 500, 72, 743, 128, 620, 41, 757, 943, 881, 608, 979, 631, 321, 15, 956,
        205, 954, 322, 27, 119, 245, 961, 69, 270, 109, 436, 940, 562, 136, 222, 799, 892,
        866, 28, 308, 514, 678, 4, 210, 679, 432, 651, 760, 659, 277, 216, 521, 627, 305, 349, 753, 630, 950, 616, 856, 113
      ];
      let set = new Set();
      let tree = Tree.fromArray([]);
      for (let i = 0; i < input.length; i++) {
        let element = input[i];
        tree.insert(element);
        set.add(element);
        expect(tree.validate(), `tree should be validate`).to.be.true;
        expect(tree.root.leftHeight, `node.leftHeight should be`).to.equal(_height(tree.root.left));
        expect(tree.root.rightHeight, `node.rightHeight should be`).to.equal(_height(tree.root.right));
        expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      }
    });
  });
}
describe('AVLTree', function () {
  insertTest()
  searchTest();
  deleteTest();
  balanceTest();
  singleTest();
  randomTest();
});