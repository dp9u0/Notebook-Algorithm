/**
 * LinkedListNode
 */
class LinkedListNode {

  /**
   * LinkedListNode 构造函数
   * @param {*} value 
   */
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

/**
 * LinkedList
 */
class LinkedList {

  /**
   * 
   */
  constructor() {
    this.dummyHead = new LinkedListNode();
  }

  /**
   * add value brefore head
   * @param {*} value 
   */
  prepend(value) {
    let newNode = new LinkedListNode(value);
    newNode.next = this.dummyHead.next;
    this.dummyHead.next = newNode;
    if (this.tail === this.dummyHead) {
      this.tail = newNode;
    }
  }

  /**
   * add value at tail
   * @param {*} value 
   */
  append(value) {
    let node = this.dummyHead;
    while (node.next) {
      node = node.next;
    }
    node.next = new LinkedListNode(value);
  }

  /**
   * remove first node 
   */
  removeHead() {
    if (this.dummyHead.next) {
      let remove = this.dummyHead.next;
      this.dummyHead.next = remove.next;
      // NOTE: for memory leak
      remove.value = null;
      remove.next = null;
    }
  }

  /**
   * remove last node
   */
  removeTail() {
    let node = this.dummyHead;
    let pre = null;
    while (node.next) {
      pre = node;
      node = node.next;
    }
    if (pre) {
      pre.next = null;
      // NOTE: for memory leak
      node.value = null;
      node.next = null;
    }
  }

  /**
   * 输出数组
   */
  toArray() {
    let array = new Array();
    let node = this.dummyHead.next;
    while (node) {
      array.push(node.value);
      node = node.next;
    }
    return array;
  }
}

exports.LinkedList = LinkedList;