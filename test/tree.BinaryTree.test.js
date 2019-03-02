const expect = require('chai').expect;

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

function _arrayToTreeTest() {
  describe('BinaryTree', function () {
    describe('#_arrayToTree()', function () {
      let array = [6, 19, 4, 18, 12, 8, 2, 5, 16, 11, 7, 9, 14, 15, 1, 3, 10, 0, 13, 17];
      let root = _arrayToTree([...array]);
      let q = [root];
      let values = [...array];
      while (q.length) {
        let node = q.shift();
        let value = values.shift();
        it(`node._value(${node._value}) should be ${value}`, function () {
          expect(node._value).to.equal(value);
        });
        if (node._left) {
          expect(node._left._parent).to.equal(node);
          q.push(node._left);
        }
        if (node._right) {
          expect(node._right._parent).to.equal(node);
          q.push(node._right);
        }
      }
    });
    describe('#_arrayToTree() check valid', function () {
      it(`should not throw exception`, function () {
        expect(() => {
          _arrayToTree([6, null, 4]);
        }).to.not.throw();
      });
      it(`should throw exception`, function () {
        expect(() => {
          _arrayToTree([6, null, 4, null, null, null, null, 5, 1]);
        }).to.throw();
      });
      it(`should not throw exception`, function () {
        expect(() => {
          _arrayToTree([6, null, null, null, null, null, null]);
        }).to.not.throw();
      });
      it(`should  throw exception`, function () {
        expect(() => {
          _arrayToTree([6, null, null, 0, null, null, null]);
        }).to.throw();
      });
    });
  });
}

function _setLeftTest() {
  let root = _arrayToTree([3, 1]);
  let left = root._left;
  let newLeft = _arrayToTree([6]);
  describe('BinaryTree', function () {
    describe('#_setLeft()', function () {
      it(`_setLeft should not throw exception`, function () {
        expect(() => _setLeft(root, newLeft)).to.not.throw();
      });
      it(`after _setLeft old left' parent should be null`, function () {
        expect(left._parent).to.be.null;
      });
      it(`after _setLeft root._left should be new left`, function () {
        expect(root._left).to.equal(newLeft);
      });
      it(`after _setLeft newLeft._parent should be root`, function () {
        expect(newLeft._parent).to.equal(root);
      });
    });
  });
}

function _setRightTest() {
  let root = _arrayToTree([3, null, 2]);
  let right = root._right;
  let newRight = _arrayToTree([6]);
  describe('BinaryTree', function () {
    describe('#_setRight()', function () {
      it(`_setLeft should not throw exception`, function () {
        expect(() => _setRight(root, newRight)).to.not.throw();
      });
      it(`after _setRight old right' parent should be null`, function () {
        expect(right._parent).to.be.null;
      });
      it(`after _setRight root._right should be new left`, function () {
        expect(root._right).to.equal(newRight);
      });
      it(`after _setRight newRight._parent should be root`, function () {
        expect(newRight._parent).to.equal(root);
      });
    });
  });
}

function _replaceTest() {
  describe('BinaryTree', function () {
    describe('#_replace()', function () {
      it(`_replace right should be ok`, function () {
        let root = _arrayToTree([3, null, 2]);
        let right = root._right;
        let newRight = _arrayToTree([6, 4]);
        let newRightLeft = newRight._left;
        _replace(right, newRight);
        expect(root._right).to.equal(newRight);
        expect(right._parent).to.be.null;
        expect(root._right._left).to.equal(newRightLeft);
      });
      it(`_replace left should be ok`, function () {
        let root = _arrayToTree([3, 4, 2]);
        let left = root._left;
        let newLeft = _arrayToTree([6, 4]);
        let newLeftLeft = newLeft._left;
        _replace(left, newLeft);
        expect(root._left).to.equal(newLeft);
        expect(left._parent).to.be.null;
        expect(root._left._left).to.equal(newLeftLeft);
      });
    });
  });
}

function _removeTest() {
  describe('BinaryTree', function () {
    describe('#_remove()', function () {
      it(`_remove right should be ok`, function () {
        let root = _arrayToTree([3, null, 2]);
        let right = root._right;
        _remove(right);
        expect(root._right).to.be.null;
        expect(right._parent).to.be.null;
      });
      it(`_remove left should be ok`, function () {
        let root = _arrayToTree([3, 4, 2]);
        let left = root._left;
        _remove(left);
        expect(root._left).to.be.null;
        expect(left._parent).to.be.null;
      });
    });
  });
}

function _getUncleTest() {
  describe('BinaryTree', function () {
    describe('#_getUncle()', function () {
      let root = _arrayToTree([3, null, 5, null, null, 4, 6, null, null, null, null, null, null, null, 7]);
      let right = root._right;
      let rightLeft = right._left;
      let rightRight = right._right;
      let rightRightRight = rightRight._right;
      it(`_getUncle show work ok`, function () {
        expect(_getUncle(right)).to.be.null;
        expect(_getUncle(rightRight)).to.be.null;
        expect(_getUncle(rightRightRight)).to.equal(rightLeft);
      });
    });
  });
}

function _sizeTest() {
  describe('BinaryTree', function () {
    describe('#_size()', function () {
      let array = [6, 19, 4, 18, 12, 8, 2, 5, 16, 11, 7, 9, 14, 15, 1, 3, 10, 0, 13, 17];
      let root = _arrayToTree([...array]);
      it(`size of tree should be ${array.length}`, function () {
        expect(_size(root)).to.equal(array.length);
      });
    });
  });
}

function _heightTest() {
  describe('BinaryTree', function () {
    describe('#_height()', function () {
      let array = [6, 19, 4, 18, 12, 8, 2, 5, 16, 11, 7, 9, 14, 15, 1, 3, 10, 0, 13, 17];
      let root = _arrayToTree([...array]);
      it(`height of the tree should be 5`, function () {
        expect(_height(root)).to.equal(5);
      });
    });
  });
}

function _leftHeightTest() {
  let array = [6, 19, 4, 18, 12, 8, 2, 5, 16, 11, 7, 9, 14, 15, 1, 3, 10, 0, 13, 17];
  let tree = _arrayToTree([...array]);
  describe('BinaryTree', function () {
    describe('#_leftHeight()', function () {
      it(`left height of tree should be 4`, function () {
        expect(_leftHeight(tree)).to.equal(4);
      });
    });
  });
}

function _leftSizeTest() {
  let array = [6, 19, 4, 18, 12, 8, 2, 5, 16, 11, 7, 9, 14, 15, 1, 3, 10, 0, 13, 17];
  let root = _arrayToTree([...array]);
  describe('BinaryTree', function () {
    describe('#_leftSize()', function () {
      it(`left size of tree should be _size(root._left)`, function () {
        expect(_leftSize(root)).to.equal(_size(root._left));
      });
    });
  });
}

function _rightHeightTest() {
  let array = [6, 19, 4, 18, 12, 8, 2, 5, 16, 11, 7, 9, 14, 15, 1, 3, 10, 0, 13, 17];
  let root = _arrayToTree([...array]);
  describe('BinaryTree', function () {
    describe('#_rightHeight()', function () {
      it(`right height of tree should be 3`, function () {
        expect(_rightHeight(root)).to.equal(3);
      });
    });
  });
}

function _rightSizeTest() {
  let array = [6, 19, 4, 18, 12, 8, 2, 5, 16, 11, 7, 9, 14, 15, 1, 3, 10, 0, 13, 17];
  let root = _arrayToTree([...array]);
  describe('BinaryTree', function () {
    describe('#_rightSize()', function () {
      it(`right size of tree should be _size(root._right)`, function () {
        expect(_rightSize(root)).to.equal(_size(root._right));
      });
    });
  });
}

function _rotateLeftTest() {
  describe('BinaryTree', function () {
    describe('#_rotateLeft()', function () {
      it(`_rotateLeft(root) showld worked ok`, function () {
        let root, array = [2, null, 3, null, null, null, 4];
        root = _arrayToTree([...array]);
        root = _rotateLeft(root)
        expect(_validate(root)).to.be.true;
        expect(root).to.deep.equal(_arrayToTree([3, 2, 4]));
      });

      it(`_rotateLeft(!root) showld worked ok`, function () {
        let root, array = [2, null, 3, null, null, null, 4];
        root = _arrayToTree([...array]);
        let right = root._right;
        _rotateLeft(right);
        expect(_validate(root)).to.be.true;
        expect(root).to.deep.equal(_arrayToTree([2, null, 4, null, null, 3]));
      });

      it(`_rotateLeft(root but has child) showld worked ok`, function () {
        let root, array = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
        root = _arrayToTree([...array]);
        root = _rotateLeft(root);
        expect(_validate(root), "validate root").to.be.true;

        let traverse = _inOrderTraverse(root)
        expect(traverse).to.to.have.ordered.members(array.sort((a, b) => a - b))
        expect(root).to.deep.equal(_arrayToTree([
          12,
          8, 14,
          4, 10, 13, 15,
          2, 6, 9, 11, null, null, null, null,
          1, 3, 5, 7, null, null, null, null, null, null, null, null, null, null, null, null
        ]));
      });

      it(`_rotateLeft(!root but has child) showld worked ok`, function () {
        let root, array = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
        root = _arrayToTree([...array]);
        _rotateLeft(root._left._left);
        expect(_validate(root), "validate root").to.be.true;
        let traverse = _inOrderTraverse(root)
        expect(traverse).to.to.have.ordered.members(array.sort((a, b) => a - b))
        expect(root).to.deep.equal(_arrayToTree([
          8,
          4, 12,
          3, 6, 10, 14,
          2, null, 5, 7, 9, 11, 13, 15,
          1, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null
        ]));
      });

      it(`_rotateLeft(!root but has child) showld worked ok`, function () {
        let root, array = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
        root = _arrayToTree([...array]);
        _rotateLeft(root._right._right);
        expect(_validate(root), "validate root").to.be.true;
        let traverse = _inOrderTraverse(root)
        expect(traverse).to.to.have.ordered.members(array.sort((a, b) => a - b))
        expect(root).to.deep.equal(_arrayToTree([
          8,
          4, 12,
          2, 6, 10, 15,
          1, 3, 5, 7, 9, 11, 14, null,
          null, null, null, null, null, null, null, null, null, null, null, null, 13, null, null, null
        ]));
      });

      it(`_rotateLeft(!root but has child) showld worked ok`, function () {
        let root, array = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
        root = _arrayToTree([...array]);
        _rotateLeft(root._left._right);
        expect(_validate(root), "validate root").to.be.true;
        let traverse = _inOrderTraverse(root)
        expect(traverse).to.to.have.ordered.members(array.sort((a, b) => a - b))
        expect(root).to.deep.equal(_arrayToTree([
          8,
          4, 12,
          2, 7, 10, 14,
          1, 3, 6, null, 9, 11, 13, 15,
          null, null, null, null, 5, null, null, null, null, null, null, null, null, null, null, null
        ]));
      });

      it(`_rotateLeft(!root but has child) showld worked ok`, function () {
        let root, array = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
        root = _arrayToTree([...array]);
        _rotateLeft(root._right._left);
        expect(_validate(root), "validate root").to.be.true;
        let traverse = _inOrderTraverse(root)
        expect(traverse).to.to.have.ordered.members(array.sort((a, b) => a - b))
        expect(root).to.deep.equal(_arrayToTree([
          8,
          4, 12,
          2, 6, 11, 14,
          1, 3, 5, 7, 10, null, 13, 15,
          null, null, null, null, null, null, null, null, 9, null, null, null, null, null, null, null
        ]));
      });
    });
  });
}

function _rotateRightTest() {
  describe('BinaryTree', function () {
    describe('#_rotateRight()', function () {
      it(`_rotateRight(root) showld worked ok`, function () {
        let root, array = [4, 3, null, 2];
        root = _arrayToTree([...array]);
        root = _rotateRight(root)
        expect(_validate(root)).to.be.true;
        expect(root).to.deep.equal(_arrayToTree([3, 2, 4]));
      });

      it(`_rotateRight(!root) showld worked ok`, function () {
        let root, array = [4, 3, null, 2];
        root = _arrayToTree([...array]);
        let left = root._left;
        _rotateRight(left);
        expect(_validate(root)).to.be.true;
        expect(root).to.deep.equal(_arrayToTree([4, 2, null, null, 3]));
      });

      it(`_rotateRight(root but has child) showld worked ok`, function () {
        let root, array = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
        root = _arrayToTree([...array]);
        root = _rotateRight(root);
        expect(_validate(root), "validate root").to.be.true;
        let traverse = _inOrderTraverse(root)
        expect(traverse).to.to.have.ordered.members(array.sort((a, b) => a - b))
        expect(root).to.deep.equal(_arrayToTree([
          4,
          2, 8,
          1, 3, 6, 12,
          null, null, null, null, 5, 7, 10, 14,
          null, null, null, null, null, null, null, null, null, null, null, null, 9, 11, 13, 15
        ]));
      });

      it(`_rotateRight(!root but has child) showld worked ok`, function () {
        let root, array = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
        root = _arrayToTree([...array]);
        _rotateRight(root._left._left);
        expect(_validate(root), "validate root").to.be.true;
        let traverse = _inOrderTraverse(root)
        expect(traverse).to.to.have.ordered.members(array.sort((a, b) => a - b))
        expect(root).to.deep.equal(_arrayToTree([
          8,
          4, 12,
          1, 6, 10, 14,
          null, 2, 5, 7, 9, 11, 13, 15,
          null, null, null, 3, null, null, null, null, null, null, null, null, null, null, null, null
        ]));
      });

      it(`_rotateRight(!root but has child) showld worked ok`, function () {
        let root, array = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
        root = _arrayToTree([...array]);
        _rotateRight(root._right._right);
        expect(_validate(root), "validate root").to.be.true;
        let traverse = _inOrderTraverse(root)
        expect(traverse).to.to.have.ordered.members(array.sort((a, b) => a - b))
        expect(root).to.deep.equal(_arrayToTree([
          8,
          4, 12,
          2, 6, 10, 13,
          1, 3, 5, 7, 9, 11, null, 14,
          null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 15
        ]));
      });

      it(`_rotateRight(!root but has child) showld worked ok`, function () {
        let root, array = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
        root = _arrayToTree([...array]);
        _rotateRight(root._left._right);
        expect(_validate(root), "validate root").to.be.true;
        let traverse = _inOrderTraverse(root)
        expect(traverse).to.to.have.ordered.members(array.sort((a, b) => a - b))
        expect(root).to.deep.equal(_arrayToTree([
          8,
          4, 12,
          2, 5, 10, 14,
          1, 3, null, 6, 9, 11, 13, 15,
          null, null, null, null, null, null, null, 7, null, null, null, null, null, null, null, null
        ]));
      });

      it(`_rotateRight(!root but has child) showld worked ok`, function () {
        let root, array = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
        root = _arrayToTree([...array]);
        _rotateRight(root._right._left);
        expect(_validate(root), "validate root").to.be.true;
        let traverse = _inOrderTraverse(root)
        expect(traverse).to.to.have.ordered.members(array.sort((a, b) => a - b))
        expect(root).to.deep.equal(_arrayToTree([
          8,
          4, 12,
          2, 6, 9, 14,
          1, 3, 5, 7, null, 10, 13, 15,
          null, null, null, null, null, null, null, null, null, null, null, 11, null, null, null, null
        ]));
      });
    });
  });
}

function _inOrderTraverseTest() {
  describe('BinaryTree', function () {
    describe('#_inOrderTraverse()', function () {
      it(`_inOrderTraverse showld worked ok`, function () {
        let array = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
        let root = _arrayToTree([...array]);
        let traverse = _inOrderTraverse(root)
        expect(traverse).to.to.have.ordered.members(array.sort((a, b) => a - b))
      });
    });
  });
}

function _validateTest() {
  describe('BinaryTree', function () {
    describe('#_validate()', function () {
      it(`_validate [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15] should be true`, function () {
        let array = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
        let root = _arrayToTree([...array]);
        expect(_validate(root)).to.be.true;
      });

      it(`_validate (not set _parent) `, function () {
        let array = [8];
        let root = _arrayToTree([...array]);
        let array2 = [1, 5, 4];
        let root2 = _arrayToTree([...array2]);
        root2._left = root;
        expect(_validate(root2)).to.be.false;
      });

      it(`_validate (not set _parent) `, function () {
        let array = [8];
        let root = _arrayToTree([...array]);
        let array2 = [1, 5, 4];
        let root2 = _arrayToTree([...array2]);
        _setLeft(root2, root);
        expect(_validate(root2)).to.be.true;
      });

      it(`_validate (loop)`, function () {
        let array = [8];
        let root = _arrayToTree([...array]);
        let array2 = [1, 5, 4];
        let root2 = _arrayToTree([...array2]);
        _setLeft(root2, root);
        _setLeft(root, root2);
        expect(_validate(root2)).to.be.false;
      });
    });
  });
}

function _printTest() {
  function test(array) {
    let arr = [...array];
    let rows = _print(_arrayToTree(arr));
    arr = [...array];
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i]
      for (let j = 0; j < row.length; j++) {
        let el = row[j];
        if (el) {
          let index = arr.indexOf(Number(el));
          if (index === -1) {
            throw new Error(`cannot find ${Number(el)} in ${arr}`)
          }
          arr.splice(index, 1);
        }
      }
    }
    if (arr.length) {
      throw new Error("array not emptyerror")
    }
  }
  describe('BinaryTree', function () {
    describe('#_print()', function () {
      it(`_print should not throw exception`, function () {
        expect(() => {
          test([6, 19, 4, 18, 12, 8, 2, 5, 16, 11, 7, 9, 13, 17]);
          test([6, 19, 4, 18, 12, 8, 19, 14, 15, 1, 3, 10, 0, 13, 17]);
          test([6, 19, 4, 18, 12, 8, 2, 1, 3, 10, 0, 13, 17]);
          test([6, 19, 4, 18, 7, 9, 14, 15, 1, 3, 10, 0, 13, 17]);
          test([6, 19, 7, 9, 14, 15, 1, 3, 10, 0, 13, 17]);
        }).to.not.throw()
      });
    });
  });
}

(() => {
  _arrayToTreeTest();
  _setLeftTest();
  _setRightTest();
  _replaceTest();
  _removeTest();
  _getUncleTest();
  _sizeTest();
  _heightTest();
  _leftHeightTest();
  _leftSizeTest();
  _rightHeightTest();
  _rightSizeTest();
  _inOrderTraverseTest();
  _validateTest();
  _printTest();
  _rotateLeftTest();
  _rotateRightTest();
})();