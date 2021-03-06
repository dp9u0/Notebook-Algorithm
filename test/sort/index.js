const bubbleSort = require("../../src/sort/bubbleSort");
const quickSort = require("../../src/sort/quickSort");
const insertionSort = require("../../src/sort/insertionSort");
const shellSort = require("../../src/sort/shellSort");
const selectionSort = require("../../src/sort/selectionSort");
const heapSort = require("../../src/sort/heapSort");
const mergeSort = require("../../src/sort/mergeSort");
const countingSort = require("../../src/sort/countingSort");
const radixSort = require("../../src/sort/radixSort");
const bucketSort = require("../../src/sort/bucketSort");
const expect = require("chai").expect;

function Random(max = 100) {
  return ~~(Math.random() * max);
}

function randomArray(count, max = 100) {
  let array = [];
  while (count) {
    array.push(Random(max));
    count--;
  }
  return array;
}

const inputs = [
  [1, 6, 4, 5, 2, 4, 5, 6],
  randomArray(10),
  randomArray(20),
];

function checkSorted(output, expectOutput) {
  for (let i = 1; i < output.length; i++) {
    expect(expectOutput[i] === output[i], `expect ${i} : ${expectOutput[i]} === ${output[i]}`).to.be.true;
  }
}

function sortTest(sort, description) {
  describe(`${description}()`, function () {
    for (const input of inputs) {
      let expectOutput = [...input].sort((a, b) => a - b);
      let output = sort([...input], (a, b) => a > b)
      it(`sort ${input.length} elements: ${input.join(',')}
      exp : ${expectOutput.join(',')}
      got : ${output.join(',')}`, function () {
        checkSorted(output, expectOutput);
      });
    }
  });
}
describe("Sort", function () {
  sortTest(bubbleSort, 'bubbleSort');
  sortTest(quickSort, 'quickSort');
  sortTest(insertionSort, 'insertionSort');
  sortTest(shellSort, 'shellSort');
  sortTest(selectionSort, 'selectionSort');
  sortTest(heapSort, 'heapSort');
  sortTest(mergeSort, 'mergeSort');
  sortTest(countingSort, 'countingSort');
  sortTest(radixSort, 'radixSort');
  sortTest(bucketSort, 'bucketSort');
})