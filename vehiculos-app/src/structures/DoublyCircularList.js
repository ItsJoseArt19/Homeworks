// Lista Circular Doblemente Enlazada para inversionistas activos
class DoublyCircularNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyCircularList {
  constructor() {
    this.head = null;
  }

  insert(data) {
    const newNode = new DoublyCircularNode(data);
    if (this.head === null) {
      this.head = newNode;
      this.head.next = this.head;
      this.head.prev = this.head;
    } else {
      const tail = this.head.prev;
      tail.next = newNode;
      newNode.prev = tail;
      newNode.next = this.head;
      this.head.prev = newNode;
    }
  }

  delete(id) {
    if (this.head === null) return false;

    // Si solo hay un nodo
    if (this.head.next === this.head) {
      if (this.head.data.id === id) {
        this.head = null;
        return true;
      }
      return false;
    }

    // Si el nodo a eliminar es la cabeza
    if (this.head.data.id === id) {
      const newHead = this.head.next;
      const tail = this.head.prev;
      tail.next = newHead;
      newHead.prev = tail;
      this.head = newHead;
      return true;
    }

    let current = this.head.next;
    while (current !== this.head) {
      if (current.data.id === id) {
        current.prev.next = current.next;
        current.next.prev = current.prev;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  toArrayForward() {
    const array = [];
    if (this.head === null) return array;

    let current = this.head;
    do {
      array.push(current.data);
      current = current.next;
    } while (current !== this.head);
    return array;
  }

  toArrayBackward() {
    const array = [];
    if (this.head === null) return array;

    let current = this.head.prev;
    do {
      array.push(current.data);
      current = current.prev;
    } while (current !== this.head.prev);
    return array;
  }

  findById(id) {
    if (this.head === null) return null;

    let current = this.head;
    do {
      if (current.data.id === id) {
        return current.data;
      }
      current = current.next;
    } while (current !== this.head);
    return null;
  }

  isEmpty() {
    return this.head === null;
  }

  getSize() {
    if (this.head === null) return 0;
    let count = 1;
    let current = this.head.next;
    while (current !== this.head) {
      count++;
      current = current.next;
    }
    return count;
  }
}
