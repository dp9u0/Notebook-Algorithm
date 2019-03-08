const Tree = require("../src/tree/RedBlackTree");
const expect = require('chai').expect;

const INPUT_COUNT = 1e4;
const INPUT_MAX = 1e2;
const COLOR_BLACK = 'B';
const COLOR_RED = 'R';

function insertTest() {
  describe('#insert()', function () {
    it(`insert root work ok`, function () {
      let input = [];
      let tree = Tree.fromArray(input);
      let set = new Set(input);
      let element = 1;
      set.add(element);
      tree.insert(element);
      let node = tree._root;
      expect(tree._root.color, `root color should be "BLACK"`).to.equal(COLOR_BLACK);
      expect(node.color, `node color should be "BLACK"`).to.equal(COLOR_BLACK);
      expect(node.value, `node value should be ${element}`).to.equal(element);
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(tree.validate(), `bst should be validate`).to.be.true;
    });

    it(`insert root._left._left(left case 1) work ok`, function () {
      let input = [8, 6, 12];
      let tree = Tree.fromArray(input);
      let set = new Set(input);
      let element = 4;
      set.add(element);
      tree.insert(element);
      let node = tree._root._left._left;
      expect(tree._root.color, `node inserted color should be "BLACK"`).to.equal(COLOR_BLACK);
      expect(node.color, `node inserted color should be "RED"`).to.equal(COLOR_RED);
      expect(node.value, `node inserted value should be ${element}`).to.equal(element);
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(tree.validate(), `bst should be validate`).to.be.true;
    });

    it(`insert root._left._left(left case 3) work ok`, function () {
      let input = [8, 6];
      let tree = Tree.fromArray(input);
      let set = new Set(input);
      let element = 4;
      set.add(element);
      tree.insert(element);
      let node = tree._root._left;
      expect(tree._root.color, `root inserted color should be "BLACK"`).to.equal(COLOR_BLACK);
      expect(node.color, `node inserted color should be "RED"`).to.equal(COLOR_RED);
      expect(node.value, `node inserted value should be ${element}`).to.equal(element);
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(tree.validate(), `bst should be validate`).to.be.true;
      expect(tree._root.value, `node value should be "6"`).to.equal(6);
    });

    it(`insert root._left._right(left case 2) work ok`, function () {
      let input = [8, 6];
      let tree = Tree.fromArray(input);
      let set = new Set(input);
      let element = 7;
      set.add(element);
      tree.insert(element);
      let node = tree._root;
      expect(node.color, `node inserted color should be "BLACK"`).to.equal(COLOR_BLACK);
      expect(node.value, `node inserted value should be ${element}`).to.equal(element);
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(tree.validate(), `bst should be validate`).to.be.true;
    });

    it(`insert root._right._right (right case 1)work ok`, function () {
      let input = [8, 6, 12];
      let tree = Tree.fromArray(input);
      let set = new Set(input);
      let element = 14;
      set.add(element);
      tree.insert(element);
      let node = tree._root._right._right;
      expect(tree._root.color, `node inserted color should be "BLACK"`).to.equal(COLOR_BLACK);
      expect(node.color, `node inserted color should be "RED"`).to.equal(COLOR_RED);
      expect(node.value, `node inserted value should be ${element}`).to.equal(element);
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(tree.validate(), `bst should be validate`).to.be.true;
    });

    it(`insert root._right._right (right case 2)work ok`, function () {
      let input = [8, 12];
      let tree = Tree.fromArray(input);
      let set = new Set(input);
      let element = 14;
      set.add(element);
      tree.insert(element);
      let node = tree._root._right;
      expect(tree._root.color, `node inserted color should be "BLACK"`).to.equal(COLOR_BLACK);
      expect(node.color, `node inserted color should be "RED"`).to.equal(COLOR_RED);
      expect(node.value, `node inserted value should be ${element}`).to.equal(element);
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(tree.validate(), `bst should be validate`).to.be.true;
    });

    it(`insert root._right._left (right case 3)work ok`, function () {
      let input = [8, 12];
      let tree = Tree.fromArray(input);
      let set = new Set(input);
      let element = 11;
      set.add(element);
      tree.insert(element);
      let node = tree._root;
      expect(node.color, `node inserted color should be "BLACK"`).to.equal(COLOR_BLACK);
      expect(node.value, `node inserted value should be ${element}`).to.equal(element);
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(tree.validate(), `bst should be validate`).to.be.true;
    });
  });
}

function deleteTest() {
  describe('#delete()', function () {

    it(`delete 84 from []`, function () {

      let values = [64,
        53, 71,
        51, 60, 66, 73,
        50, 52, 56, 61, null, null, null, null,
        null, null, null, null, 54, 59, null, 63, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, 58
      ]
      let colors = [COLOR_BLACK,
        COLOR_RED, COLOR_BLACK,
        COLOR_BLACK, COLOR_BLACK, COLOR_BLACK, COLOR_BLACK,
        COLOR_BLACK, COLOR_BLACK, COLOR_RED, COLOR_BLACK, null, null, null, null,
        null, null, null, null, COLOR_BLACK, COLOR_BLACK, null, COLOR_RED, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null, null, COLOR_RED
      ];
      let tree = Tree._fromNodeArray(values, colors);
      let set = new Set(values);
      // console.table(tree.print())
      expect(tree.validate(), `bst should be validate`).to.be.true;
      set.delete(null);
      let element = 51;
      set.delete(element);
      tree.delete(element);
      // console.table(tree.print())
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(tree.validate(), `bst should be validate`).to.be.true;
    });

    it(`delete red node work ok`, function () {
      let values = [8, 6, 12, null, null, 11];
      let colors = [COLOR_BLACK, COLOR_BLACK, COLOR_BLACK, null, null, COLOR_RED]
      let tree = Tree._fromNodeArray(values, colors);
      let set = new Set(values);
      set.delete(null);
      let element = 11;
      set.delete(element);
      tree.delete(element);
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(tree.validate(), `bst should be validate`).to.be.true;
    });

    it(`delete 84 from [84, 79, 86, 77, 81, 85, 90, 76, 78, 80, 82, null, null, 87]`, function () {
      let values = [84, 79, 86, 77, 81, 85, 90, 76, 78, 80, 82, null, null, 87];
      let colors = [COLOR_BLACK, COLOR_RED, COLOR_RED, COLOR_BLACK, COLOR_BLACK, COLOR_BLACK, COLOR_BLACK, COLOR_RED, COLOR_RED, COLOR_RED, COLOR_RED, null, null, COLOR_RED]
      let tree = Tree._fromNodeArray(values, colors);
      let set = new Set(values);
      // console.table(tree.print())
      set.delete(null);
      let element = 84;
      set.delete(element);
      tree.delete(element);
      // console.table(tree.print())
      expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
      expect(tree.validate(), `bst should be validate`).to.be.true;
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

function randonTest() {
  describe('#randomTest()', function () {
    this.timeout(60000);
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
        let before = tree.print();
        let values = Array.from(set);
        let output = false;
        // console.log({
        //   op,
        //   value
        // })
        try {
          if (op === 1) {
            set.delete(value);
            tree.delete(value);
          } else if (op === 2) {
            expect(tree.search(value)).to.equal(set.has(value));
          } else {
            tree.insert(value);
            set.add(value);
          }
        } catch (error) {
          expect(() => {
            throw error
          }).not.throw();
          output = true;
        }
        let validate = tree.validate();
        // if (!validate || output) {
        //   console.log(values.join(","));
        //   console.table(before);
        //   console.table({
        //     op,
        //     value
        //   });
        //   console.table(tree.print());
        // }
        // if (tree.size !== set.size) {
        //   console.log({
        //     op,
        //     value
        //   })
        //   console.log(tree.inOrderTraverse().sort((a, b) => a - b).join(","));
        //   console.log(Array.from(set).sort((a, b) => a - b).join(","));
        // }
        expect(tree.size, `tree size should be ${set.size}`).to.equal(set.size);
        expect(validate, `bst should be validate`).to.be.true;
      }
      done()
    });
  })
}
describe('RedBlackTree', function () {
  insertTest();
  deleteTest();
  searchTest();
  randonTest();
});