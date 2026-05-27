// Lista Doblemente Enlazada para historial de alquileres
class DoublyNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  insert(data) {
    const newNode = new DoublyNode(data);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  insertAtBeginning(data) {
    const newNode = new DoublyNode(data);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  delete(id) {
    if (this.head === null) return false;

    if (this.head.data.id === id) {
      if (this.head.next === null) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.head.prev = null;
      }
      return true;
    }

    let current = this.head;
    while (current !== null) {
      if (current.data.id === id) {
        if (current === this.tail) {
          this.tail = current.prev;
          this.tail.next = null;
        } else {
          current.prev.next = current.next;
          current.next.prev = current.prev;
        }
        return true;
      }
      current = current.next;
    }
    return false;
  }

  toArray() {
    const array = [];
    let current = this.head;
    while (current !== null) {
      array.push(current.data);
      current = current.next;
    }
    return array;
  }

  toArrayReverse() {
    const array = [];
    let current = this.tail;
    while (current !== null) {
      array.push(current.data);
      current = current.prev;
    }
    return array;
  }

  isEmpty() {
    return this.head === null;
  }

  getSize() {
    let count = 0;
    let current = this.head;
    while (current !== null) {
      count++;
      current = current.next;
    }
    return count;
  }
}
