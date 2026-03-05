// Lista Enlazada Simple para vehículos disponibles
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
  }

  insert(data) {
    const newNode = new Node(data);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  delete(id) {
    if (this.head === null) return false;

    if (this.head.data.id === id) {
      this.head = this.head.next;
      return true;
    }

    let current = this.head;
    while (current.next !== null) {
      if (current.next.data.id === id) {
        current.next = current.next.next;
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

  findById(id) {
    let current = this.head;
    while (current !== null) {
      if (current.data.id === id) {
        return current.data;
      }
      current = current.next;
    }
    return null;
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
