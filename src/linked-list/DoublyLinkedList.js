/**
 * 双向链表
 */
class DoublyLinkedList {

  /**
   * 构造函数
   */
  constructor() {
    this.dummyHead = new DoublyLinkedListNode();
    this.dummyTail = new DoublyLinkedListNode();
    this.dummyHead.next = this.dummyTail;
    this.dummyTail.previous = this.dummyHead;
  }


  /**
   * 计算链表长度
   */
  length() {
    let length = 0
    let node = this.dummyHead.next;
    while (node !== this.dummyTail) {
      length++;
    }
    return length;
  }

  /**
   * 是否包含某个值
   * @param {*} value 
   */
  contains(value) {
    let node = this.dummyHead.next;
    while (node !== this.dummyTail) {
      if (node.value === value) {
        return true;
      }
    }
    return false;
  }

  /**
   * add value brefore head
   * @param {*} value 
   */
  prepend(value) {
    let newNode = new DoublyLinkedListNode(value);
    newNode.previous = this.dummyHead;
    newNode.next = this.dummyHead.next;
    this.dummyHead.next.previous = newNode;
    this.dummyHead.next = newNode;
  }

  /**
   * add value at tail
   * @param {*} value 
   */
  append(value) {
    let newNode = new DoublyLinkedListNode(value);
    newNode.previous = this.dummyTail.previous;
    newNode.next = this.dummyTail;
    this.dummyTail.previous.next = newNode;
    this.dummyTail.previous = newNode;
  }

  /**
   * 在 某个值(after)后面插入数据,如果不存在插入到最后
   * @param {*} value 
   * @param {*} after 
   */
  insert(value, after) {
    let node = this.dummyHead;
    while (node.value !== after && node.next != this.dummyTail) {
      node = node.next;
    }
    let newNode = new DoublyLinkedListNode(value);
    newNode.next = node.next;
    newNode.previous = node;
    node.next.previous = newNode;
    node.next = newNode;
  }

  /**
   * remove first node 
   */
  removeHead() {
    if (this.dummyHead.next !== this.dummyTail) {
      let remove = this.dummyHead.next;
      remove.previous.next = remove.next;
      remove.next.previous = remove.previous;

      // NOTE: for memory leak
      remove.value = null;
      remove.previous = null;
      remove.next = null;
    }
  }

  /**
   * remove last node
   */
  removeTail() {
    if (this.dummyTail.previous !== this.dummyHead) {
      let remove = this.dummyTail.previous;
      remove.previous.next = remove.next;
      remove.next.previous = remove.previous;
      // NOTE: for memory leak
      remove.value = null;
      remove.previous = null;
      remove.next = null;
    }
  }

  /**
   * remove all node which value equels some value
   * @param {*} value 
   */
  remove(value) {
    let node = this.dummyHead.next;
    while (node !== this.dummyTail) {
      let next = node.next;
      if (node.value === value) {
        node.previous.next = node.next;
        node.next.previous = node.previous;
        // NOTE: for memory leak
        node.value = null;
        node.previous = null;
        node.next = null;
      }
      node = next;
    }
  }

  /**
   * 输出数组
   */
  toArray() {
    let array = new Array();
    let node = this.dummyHead.next;
    while (node != this.dummyTail) {
      array.push(node.value);
      node = node.next;
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
    this.value = value;
    this.previous = null;
    this.next = null;
  }

}

exports.DoublyLinkedList = DoublyLinkedList;
exports.DoublyLinkedListNode = DoublyLinkedListNode;