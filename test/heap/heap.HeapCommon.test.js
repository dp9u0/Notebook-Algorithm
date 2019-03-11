let expect = require("chai").expect;

const {
  _leftIndex,
  _rightIndex,
  _parentIndex,
  _hasParent,
  _hasLeft,
  _hasRight,
  _validate,
  _heapifyUp,
  _heapifyDown,
  _swap,
  _print
} = require("../../src/heap/HeapCommon");

function _getIndexTest() {
  describe("#_leftIndex()/_rightIndex()/_parentIndex()", function () {
    it(`#_leftIndex()`, function () {
      let index, should;
      index = 0;
      should = 1;
      expect(_leftIndex(index), `left index of ${index} should be ${should}`).to.equal(should);
    });

    it(`#_rightIndex()`, function () {
      let index, should;
      index = 0;
      should = 2;
      expect(_rightIndex(index), `right index of ${index} should be ${should}`).to.equal(should);
    });

    it(`#_parentIndex()`, function () {
      let index, should;
      index = 2;
      should = 0;
      expect(_parentIndex(index), `parent index of ${index} should be ${should}`).to.equal(should);
    });
  });
}

function _hasTest() {
  const heap = [0,
    1, 2,
    3, 4, 5, 6,
    7, 8, 9, 10, 11, 12, 13, 14
  ]
  describe("#_hasParent()/_hasLeft()/_hasRight()", function () {
    it(`#_hasParent(0)`, function () {
      let index = 0;
      expect(_hasParent(index), `${index} should not have parent`).to.be.false;
    });

    it(`#_hasParent(1)`, function () {
      let index = 1;
      expect(_hasParent(index), `${index} should have parent`).to.be.true;
    });

    it(`#_hasLeft(0)`, function () {
      let index = 0;
      expect(_hasLeft(heap, index), `${index} should have left child`).to.be.true;
    });
    it(`#_hasLeft(14)`, function () {
      let index = 14;
      expect(_hasLeft(heap, index), `${index} should not have left child`).to.be.false;
    });

    it(`#_hasRight(0)`, function () {
      let index = 0;
      expect(_hasRight(heap, index), `${index} should have right child`).to.be.true;
    });
    it(`#_hasRight(14)`, function () {
      let index = 14;
      expect(_hasRight(heap, index), `${index} should not have right child`).to.be.false;
    });
  });
}

function _validateTest() {
  describe("#_validate()", function () {
    it(`#_validate()`, function () {
      const heap = [0,
        1, 2,
        3, 4, 5, 6,
        7, 8, 9, 10, 11, 12, 13, 14
      ]
      expect(_validate(heap), `${heap} should be valid`).to.be.true;
    });
  });

  describe("#_validate()", function () {
    it(`#_validate()`, function () {
      const heap = [0,
        1, 2,
        3, 4, 5, 15,
        7, 8, 9, 10, 11, 12, 13, 14
      ]
      expect(_validate(heap), `${heap} should be invalid`).to.be.false;
    });
  });
}


function _heapifyUpTest() {
  describe("#_heapifyUp()", function () {
    it(`#_heapifyUp()`, function () {
      const heap = [0,
        1, 2,
        3, 4, 5, 6,
        7, 8, 9, 10, 11, 12, 13, 14
      ]
      let element = -1;
      let shouldIndex = 0;
      heap.push(element);
      _heapifyUp(heap);
      expect(element, `after ${element} should be ${heap[shouldIndex]}`).to.equal(heap[shouldIndex]);
      expect(_validate(heap), `${heap} should be valid`).to.be.true;
    });

    it(`#_heapifyUp()`, function () {
      const heap = [0,
        1, 2,
        3, 4, 5, 6,
        7, 8, 9, 10, 11, 12, 13
      ]
      let element = -1;
      let shouldIndex = 0;
      heap.push(element);
      _heapifyUp(heap);
      expect(element, `after _heapifyUp ${element} should be ${heap[shouldIndex]}`).to.equal(heap[shouldIndex]);
      expect(_validate(heap), `${heap} should be valid`).to.be.true;
    });
  });
}

function _heapifyDownTest() {
  describe("#_heapifyDown()", function () {
    it(`#_heapifyDown()`, function () {
      const heap = [0,
        1, 2,
        3, 4, 5, 6,
        7, 8, 9, 10, 11, 12, 13
      ]
      heap.shift();
      heap.unshift(heap.pop());
      _heapifyDown(heap);
      expect(heap[0], `after _heapifyDown top element should be 1`).to.equal(1);
      expect(_validate(heap), `${heap} should be valid`).to.be.true;
    });

    it(`#_heapifyDown()`, function () {
      const heap = [0,
        1, 2,
        3, 4, 5, 6,
        7, 8, 9, 10, 11, 12, 13
      ]
      heap[4] = 15;
      _heapifyDown(heap, 4);
      expect(_validate(heap), `${heap} should be valid`).to.be.true;
    });
  });
}

function _swapTest() {
  describe("#_swap()", function () {
    it(`#_swap(0,1)`, function () {
      const heap = [0,
        1, 2,
        3, 4, 5, 6,
        7, 8, 9, 10, 11, 12, 13, 14
      ]
      _swap(heap, 0, 1);
      expect(heap[0], `after swap ${heap[0]} should be 1`).to.equal(1);
      expect(heap[1], `after swap ${heap[1]} should be 0`).to.equal(0);
    });

    it(`#_swap(0,1)`, function () {
      const heap = [0,
        1, 2,
        3, 4, 5, 6,
        7, 8, 9, 10, 11, 12, 13, 14
      ]
      _swap(heap, 0, 3);
      expect(heap[0], `after swap ${heap[0]} should be 1`).to.equal(3);
      expect(heap[3], `after swap ${heap[3]} should be 0`).to.equal(0);
    });
  });
}

function _printTest() {
  describe("#_print()", function () {
    it(`#_print()`, function () {
      expect(() => {
        const heap = [0,
          1, 2,
          3, 4, 5, 6,
          7, 8, 9, 10, 11, 12, 13, 14
        ]
        _print(heap);
      }).to.not.throw();
    });
  });
}
describe("HeapCommon", function () {
  _getIndexTest();
  _hasTest();
  _validateTest();
  _heapifyUpTest();
  _heapifyDownTest();
  _swapTest();
  _printTest();
})