const Comparator = require("../common/Comparator");

/**
 * 双向链表
 */
class DoublyLinkedList {

  /**
   * 构造函数
   */
  constructor(fn = null) {
    this.comparator = new Comparator(fn);
    this.dummyHead = new DoublyLinkedListNode();
    this.dummyTail = new DoublyLinkedListNode();
    this.dummyHead._next = this.dummyTail;
    this.dummyTail._previous = this.dummyHead;
  }


  /**
   * 计算链表长度
   */
  length() {
    let length = 0
    let node = this.dummyHead._next;
    while (node !== this.dummyTail) {
      length++;
    }
    return length;
  }

  /**
   * find node's value equals value 
   * @param {*} value value to found
   * @return {DoublyLinkedListNode} node founded
   */
  find(value) {
    let node = this.dummyHead._next;
    while (node !== this.dummyTail) {
      if (this.comparator.equal(node.value, value)) {
        return node;
      }
    }
    return null;
  }

  /**
   * 是否包含某个值
   * @param {*} value 
   */
  contains(value) {
    return find(value) !== null;
  }

  /**
   * add value brefore head
   * @param {*} value 
   */
  prepend(value) {
    let newNode = new DoublyLinkedListNode(value);
    newNode._previous = this.dummyHead;
    newNode._next = this.dummyHead._next;
    this.dummyHead._next._previous = newNode;
    this.dummyHead._next = newNode;
  }

  /**
   * add value at tail
   * @param {*} value 
   */
  append(value) {
    let newNode = new DoublyLinkedListNode(value);
    newNode._previous = this.dummyTail._previous;
    newNode._next = this.dummyTail;
    this.dummyTail._previous._next = newNode;
    this.dummyTail._previous = newNode;
  }

  /**
   * 在 某个值(after)后面插入数据,如果不存在插入到最后
   * @param {*} value 
   * @param {*} after 
   */
  insert(value, after) {
    let node = this.dummyHead;
    while (!this.comparator.equal(node.value, after) && node._next != this.dummyTail) {
      node = node._next;
    }
    let newNode = new DoublyLinkedListNode(value);
    newNode._next = node._next;
    newNode._previous = node;
    node._next._previous = newNode;
    node._next = newNode;
  }

  /**
   * remove first node 
   */
  removeHead() {
    if (this.dummyHead._next !== this.dummyTail) {
      let remove = this.dummyHead._next;
      remove._previous._next = remove._next;
      remove._next._previous = remove._previous;

      // NOTE: for memory leak
      remove.value = null;
      remove._previous = null;
      remove._next = null;
    }
  }

  /**
   * remove last node
   */
  removeTail() {
    if (this.dummyTail._previous !== this.dummyHead) {
      let remove = this.dummyTail._previous;
      remove._previous._next = remove._next;
      remove._next._previous = remove._previous;
      // NOTE: for memory leak
      remove.value = null;
      remove._previous = null;
      remove._next = null;
    }
  }

  /**
   * remove all node which value equels some value
   * @param {*} value 
   */
  remove(value) {
    let node = this.dummyHead._next;
    while (node !== this.dummyTail) {
      let next = node._next;
      if (this.comparator.equal(node.value, value)) {
        node._previous._next = node._next;
        node._next._previous = node._previous;
        // NOTE: for memory leak
        node.value = null;
        node._previous = null;
        node._next = null;
      }
      node = next;
    }
  }

  /**
   * 输出数组
   */
  toArray() {
    let array = new Array();
    let node = this.dummyHead._next;
    while (node != this.dummyTail) {
      array.push(node.value);
      node = node._next;
    }
    return array;
  }
}

/**
 * 双向链表节点
 */
class DoublyLinkedListNode {

  /**
   * 构造函数
   * @param {*} value 
   */
  constructor(value) {
    /**
     * @type {*}
     */
    this.value = value;
    /**
     * @type {DoublyLinkedListNode}
     */
    this._previous = null;
    /**
     * @type {DoublyLinkedListNode}
     */
    this._next = null;
  }

}

exports.DoublyLinkedList = DoublyLinkedList;
exports.DoublyLinkedListNode = DoublyLinkedListNode;