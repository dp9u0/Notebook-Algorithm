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
   * LinkedList 构造
   */
  constructor() {
    this.dummyHead = new LinkedListNode();
  }

  /**
   * 链表中是否存在某个值
   * @param {*} value 
   */
  contains(value) {
    let node = this.dummyHead.next;
    while (node) {
      if (node.value === value) {
        return true;
      }
    }
    return false;
  }

  /**
   * 计算链表长度
   */
  length() {
    let length = 0;
    let node = this.dummyHead.next;
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
    newNode.next = this.dummyHead.next;
    this.dummyHead.next = newNode;
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
   * 在 某个值(after)后面插入数据,如果不存在插入到最后
   * @param {*} value 
   * @param {*} after 
   */
  insert(value, after) {
    let node = this.dummyHead;
    while (node.value !== after && node.next) {
      node = node.next;
    }
    let newNode = new LinkedListNode(value);
    newNode.next = node.next;
    node.next = newNode;
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