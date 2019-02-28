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
          q.push(node._left);
        }
        if (node._right) {
          q.push(node._right);
        }
      }
    });
    describe('#_arrayToTree()', function () {
      it(`should not throw exception`, function () {
        expect(() => {
          _arrayToTree([6, null, 4]);
        }).to.not.throw();
      });
      it(`should throw exception`, function () {
        expect(() => {
          let root = _arrayToTree([6, null, 4, null, null, null, null, 5, 1]);
        }).to.throw();
      });
      it(`should not throw exception`, function () {
        expect(() => {
          let root = _arrayToTree([6, null, null, null, null, null, null]);
        }).to.not.throw();
      });
      it(`should  throw exception`, function () {
        expect(() => {
          let root = _arrayToTree([6, null, null, 0, null, null, null]);
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
        expect(() => _setLeft(root, newLeft)).be.not.throw();
      });
      it(`after _setLeft old left' parent should be null`, function () {
        expect(left._parent).be.null;
      });
      it(`after _setLeft root._left should be new left`, function () {
        expect(root._left).be.equal(newLeft);
      });
      it(`after _setLeft newLeft._parent should be root`, function () {
        expect(newLeft._parent).be.equal(root);
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
        expect(() => _setRight(root, newRight)).be.not.throw();
      });
      it(`after _setRight old right' parent should be null`, function () {
        expect(right._parent).be.null;
      });
      it(`after _setRight root._right should be new left`, function () {
        expect(root._right).be.equal(newRight);
      });
      it(`after _setRight newRight._parent should be root`, function () {
        expect(newRight._parent).be.equal(root);
      });
    });
  });
}

function _replaceTest() {
  describe('BinaryTree', function () {
    describe('#_replace()', function () {
      it(``, function () {

      });
    });
  });
}

function _removeTest() {
  describe('BinaryTree', function () {
    describe('#_remove()', function () {
      it(``, function () {

      });
    });
  });
}

function _getUncleTest() {
  describe('BinaryTree', function () {
    describe('#_getUncle()', function () {
      it(``, function () {

      });
    });
  });
}

function _sizeTest() {
  let array = [6, 19, 4, 18, 12, 8, 2, 5, 16, 11, 7, 9, 14, 15, 1, 3, 10, 0, 13, 17];
  let root = _arrayToTree([...array]);
  describe('BinaryTree', function () {
    describe('#_size()', function () {
      it(`size of tree should be ${array.length}`, function () {
        expect(_size(root)).to.equal(array.length);
      });
    });
  });
}

function _heightTest() {
  let array = [6, 19, 4, 18, 12, 8, 2, 5, 16, 11, 7, 9, 14, 15, 1, 3, 10, 0, 13, 17];
  let root = _arrayToTree([...array]);
  describe('BinaryTree', function () {
    describe('#_size()', function () {
      it(`size of the tree should be 5`, function () {
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
      it(``, function () {

      });
    });
  });
}

function _rotateRightTest() {
  describe('BinaryTree', function () {
    describe('#_rotateRight()', function () {
      it(``, function () {

      });
    });
  });
}

function _inOrderTraverseTest() {
  describe('BinaryTree', function () {
    describe('#_inOrderTraverse()', function () {
      it(``, function () {

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
            throw new Error(`cannot find ${el} in ${array}`)
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

function runtest() {
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
  _rotateLeftTest();
  _rotateRightTest();
  _inOrderTraverseTest();
  _printTest();
}

runtest();