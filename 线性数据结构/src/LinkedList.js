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
    console.log(this.toArray());
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
    console.log(this.toArray());
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
    console.log(this.toArray());
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
    console.log(this.toArray());
  }

  /**
   * remove all node which value equels some value
   * @param {*} value 
   */
  remove(value) {
    let pre = this.dummyHead;
    let node = pre.next;
    while (node) {
      if (node.value === value) {
        pre.next = node.next;
        node.next = null;
        node.value = null;
      } else {
        pre = pre.next;
      }
      node = (pre ? pre.next : null);
    }
    console.log(this.toArray());
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