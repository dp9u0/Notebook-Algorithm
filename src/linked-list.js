class LinkedListNode {
    value
}

class LinkedList {

    head;

    length;

    constructor() {
        this.first = null;
        this.tail = null;
        this.length = 0;
    }

    [Symbol.iterator] = function() {

    }

    list() {
        node = head;
        while (node) {
            yield node.value;
            node = node.next;
        }
    }

    get length() {
        return this.length;
    }

    add(value) {

    }

    get(index) {

    }

    contains(value) {

    }

    get(index) {

    }

    delete(value) {

    }

    delete(index) {

    }
}

// TEST: