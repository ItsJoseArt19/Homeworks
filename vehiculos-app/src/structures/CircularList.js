// Lista Circular para vehiculos destacados (rotación automática)
class CircularNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class CircularList {
  constructor() {
    this.head = null;
    this.currentNode = null;
  }

  insert(data) {
    const newNode = new CircularNode(data);
    if (this.head === null) {
      this.head = newNode;
      this.head.next = this.head;
      this.currentNode = this.head;
    } else {
      let current = this.head;
      while (current.next !== this.head) {
        current = current.next;
      }
      current.next = newNode;
      newNode.next = this.head;
    }
  }

  delete(id) {
    if (this.head === null) return false;

    // Si solo hay un nodo
    if (this.head.next === this.head) {
      if (this.head.data.id === id) {
        this.head = null;
        this.currentNode = null;
        return true;
      }
      return false;
    }

    // Si el nodo a eliminar es la cabeza
    if (this.head.data.id === id) {
      let current = this.head;
      while (current.next !== this.head) {
        current = current.next;
      }
      current.next = this.head.next;
      this.head = this.head.next;
      // Si el currentNode era el head, actualizar a nuevo head
      if (this.currentNode.data.id === id) {
        this.currentNode = this.head;
      }
      return true;
    }

    let current = this.head;
    while (current.next !== this.head) {
      if (current.next.data.id === id) {
        // Si el nodo a eliminar es el currentNode, apuntar al siguiente
        if (this.currentNode.data.id === id) {
          this.currentNode = current.next.next;
        }
        current.next = current.next.next;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  rotate() {
    if (this.head === null) return null;
    // Si es la primera rotación o currentNode es null, comenzar desde head
    if (this.currentNode === null) {
      this.currentNode = this.head;
    } else {
      // Avanzar al siguiente antes de retornar
      this.currentNode = this.currentNode.next;
    }
    return this.currentNode.data;
  }

  getCurrentItem() {
    return this.currentNode ? this.currentNode.data : null;
  }

  toArray() {
    const array = [];
    if (this.head === null) return array;

    let current = this.head;
    do {
      array.push(current.data);
      current = current.next;
    } while (current !== this.head);
    return array;
  }

  isEmpty() {
    return this.head === null;
  }

  getSize() {
    if (this.head === null) return 0;
    let count = 1;
    let current = this.head;
    while (current.next !== this.head) {
      count++;
      current = current.next;
    }
    return count;
  }
}
