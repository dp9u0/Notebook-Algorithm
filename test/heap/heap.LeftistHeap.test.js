let expect = require("chai").expect;
const Heap = require("../../src/heap/LeftistHeap");

function insertTest() {
  describe("insert()", function () {
    it("insert", function () {
      const array = [4, 5, 6, 1, 3, 8, 9, 7, 2, 9, 4, 5, 6, 8, 3]
      let heap = new Heap();
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        heap.insert(element);
        expect(heap.validate()).to.be.true;
      }
    });
  });
}

function popTest() {
  describe("pop()", function () {
    it("pop", function () {
      const array = [4, 5, 6, 1, 3, 8, 9, 7, 2, 9, 4, 5, 6, 8, 3]
      let heap = Heap.from(array);
      while (heap.pop()) {
        expect(heap.validate()).to.be.true;
      }
    });
  });
}

describe("LeftistHeap", function () {
  insertTest();
  popTest();
})