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

const INPUT_COUNT = 1e5;
const INPUT_MAX = 1e5;
const TEST_COUNT = 5;

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

function disordered(a, b) {
  return a > b;
}

function testOnce(input, sortFn, desc) {
  console.time(desc);
  sortFn(input, disordered);
  console.timeEnd(desc);
}

function sortTest(sortFns, inputCount, inputMax, testCount) {
  let inputs = Array.from({
    length: testCount
  }, () => {
    return randomArray(inputCount, inputMax)
  })
  for (let {
      sortFn,
      desc
    } of sortFns) {
    let count = testCount;
    while (count > 0) {
      count--;
      testOnce([...inputs[count]], sortFn, desc);
    }
  }
}

sortTest([{
  sortFn: bubbleSort,
  desc: 'bubbleSort'
}, {
  sortFn: quickSort,
  desc: 'quickSort'
}, {
  sortFn: insertionSort,
  desc: 'insertionSort'
}, {
  sortFn: shellSort,
  desc: 'shellSort'
}, {
  sortFn: selectionSort,
  desc: 'selectionSort'
}, {
  sortFn: heapSort,
  desc: 'heapSort'
}, {
  sortFn: mergeSort,
  desc: 'mergeSort'
}, {
  sortFn: countingSort,
  desc: 'countingSort'
}, {
  sortFn: radixSort,
  desc: 'radixSort'
}, {
  sortFn: bucketSort,
  desc: 'bucketSort'
}], INPUT_COUNT, INPUT_MAX, TEST_COUNT);