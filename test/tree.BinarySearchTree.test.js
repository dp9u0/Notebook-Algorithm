const Tree = require("../src/tree/BinarySearchTree");
const expect = require('chai').expect;

const INPUT_COUNT = 1e4;
const INPUT_MAX = 1e2;

describe('BinarySearchTree', function () {
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

  describe('#randomTest()', function () {
    this.timeout(30000);
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
        expect(tree.size, `tree size should be ${i+1}`).to.equal(set.size);
        expect(tree.validate(), `bst should be validate`).to.be.true;
      }
      done()
    });
  })
});