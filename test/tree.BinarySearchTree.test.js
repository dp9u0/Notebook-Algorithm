const BinarySearchTree = require("../src/tree/BinarySearchTree");
const expect = require('chai').expect;


describe('BinarySearchTree', function () {
  describe('#insert()', function () {
    it(`insert should work ok`, function () {
      const input = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
      let tree = new BinarySearchTree();
      for (let i = 0; i < input.length; i++) {
        const element = input[i];
        tree.insert(element);
        expect(tree.validate()).to.be.true;
        expect(tree.size, `tree size should be ${i+1}`).to.equal(i + 1);
      }
    });

    it(`insert should work ok`, function () {
      const input = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15].sort((a, b) => a - b);
      let tree = new BinarySearchTree();
      for (let i = 0; i < input.length; i++) {
        const element = input[i];
        tree.insert(element);
        expect(tree.validate()).to.be.true;
        expect(tree.size, `tree size should be ${i+1}`).to.equal(i + 1);
      }
    });
  });

  describe('#search()', function () {
    it(`search should work ok`, function () {
      const input = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
      let tree = BinarySearchTree.fromArray(input);
      for (let i = 0; i < input.length; i++) {
        const element = input[i];
        expect(tree.search(element), `tree should contains ${element}`).to.be.true;
      }
      expect(tree.search(888), `tree should not contains 888`).to.be.false;
      expect(tree.search(`888`), `tree should not contains 888`).to.be.false;
    });
  });

  describe('#delete()', function () {
    it(`delete should work ok(sorted)`, function () {
      const input = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
      let tree = BinarySearchTree.fromArray(input);
      let array = [...input].sort((a, b) => a - b)
      for (let i = 0; i < array.length; i++) {
        tree.delete(array[i]);
        expect(tree.validate(), `after delete ${array[i]} ,bst should be validate`).to.be.true;
        expect(tree.size, `tree size should be ${array.length - (i + 1)}`).to.equal(array.length - (i + 1));
      }
    });

    it(`delete should work ok(sorted desc)`, function () {
      const input = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
      let tree = BinarySearchTree.fromArray(input);
      let array = [...input].sort((a, b) => b - a);
      for (let i = 0; i < array.length; i++) {
        tree.delete(array[i]);
        expect(tree.validate(), `after delete ${array[i]} ,bst should be validate`).to.be.true;
        expect(tree.size, `tree size should be ${array.length - (i + 1)}`).to.equal(array.length - (i + 1));
      }
    });

    it(`delete should work ok(random)`, function () {
      let tree = BinarySearchTree.fromArray([8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15]);
      let array = [9, 12, 8, 4, 14, 1, 3, 5, 7, 11, 13, 15, 2, 6, 10]
      for (let i = 0; i < array.length; i++) {
        tree.delete(array[i]);
        expect(tree.validate(), `after delete ${array[i]} ,bst should be validate`).to.be.true;
        expect(tree.size, `tree size should be ${array.length - (i + 1)}`).to.equal(array.length - (i + 1));
      }
    });
  });

  describe('#randomTest()', function () {
    this.timeout(30000);
    it(`randomTest should work ok()`, function (done) {
      const INPUT_COUNT = 1e5;
      const INPUT_MAX = 1e3;

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
      let tree = new BinarySearchTree();
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
        expect(tree.size, `tree size should be ${i+1}`).to.equal(set.size);
        expect(tree.validate(), `bst should be validate`).to.be.true;
      }
      done()
    });
  })
});