const Comparator = require("../common/Comparator");

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
    /**
     * @type {LinkedListNode}
     */
    this._next = null;
  }
}

/**
 * LinkedList
 */
class LinkedList {

  /**
   * LinkedList 构造
   */
  constructor(fn = null) {
    this.comparator = new Comparator(fn);
    this.dummyHead = new LinkedListNode();
  }

  /**
   * find node's value equals value 
   * @param {*} value value to found
   * @return {LinkedListNode} node founded
   */
  find(value) {
    let node = this.dummyHead._next;
    while (node) {
      if (this.comparator.equal(node.value, value)) {
        return node;
      }
    }
    return null;
  }

  /**
   * 链表中是否存在某个值
   * @param {*} value 
   */
  contains(value) {
    return this.find(value) !== null;
  }

  /**
   * 计算链表长度
   */
  length() {
    let length = 0;
    let node = this.dummyHead._next;
    while (node) {
      length++;
    }
    return length;
  }

  /**
   * add value brefore head
   * @param {*} value 
   */
  prepend(value) {
    let newNode = new LinkedListNode(value);
    newNode._next = this.dummyHead._next;
    this.dummyHead._next = newNode;
  }

  /**
   * add value at tail
   * @param {*} value 
   */
  append(value) {
    let node = this.dummyHead;
    while (node._next) {
      node = node._next;
    }
    node._next = new LinkedListNode(value);
  }

  /**
   * 在 某个值(after)后面插入数据,如果不存在插入到最后
   * @param {*} value 
   * @param {*} after 
   */
  insert(value, after) {
    let node = this.dummyHead;
    while (!this.comparator.equal(node.value, after) && node._next) {
      node = node._next;
    }
    let newNode = new LinkedListNode(value);
    newNode._next = node._next;
    node._next = newNode;
  }

  /**
   * remove first node 
   */
  removeHead() {
    if (this.dummyHead._next) {
      let remove = this.dummyHead._next;
      this.dummyHead._next = remove._next;
      // NOTE: for memory leak
      remove.value = null;
      remove._next = null;
    }
  }

  /**
   * remove last node
   */
  removeTail() {
    let node = this.dummyHead;
    let pre = null;
    while (node._next) {
      pre = node;
      node = node._next;
    }
    if (pre) {
      pre._next = null;
      // NOTE: for memory leak
      node.value = null;
      node._next = null;
    }
  }

  /**
   * remove all node which value equels some value
   * @param {*} value 
   */
  remove(value) {
    let pre = this.dummyHead;
    let node = pre._next;
    while (node) {
      if (this.comparator.equal(node.value, value)) {
        pre._next = node._next;
        node._next = null;
        node.value = null;
      } else {
        pre = pre._next;
      }
      node = (pre ? pre._next : null);
    }
  }

  /**
   * 输出数组
   */
  toArray() {
    let array = new Array();
    let node = this.dummyHead._next;
    while (node) {
      array.push(node.value);
      node = node._next;
    }
    return array;
  }
}

exports.LinkedList = LinkedList;