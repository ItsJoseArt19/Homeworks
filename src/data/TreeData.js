// Clase Nodo del Árbol Binario
export class NodoArbol {
  constructor(valor) {
    this.valor = valor;
    this.izquierda = null;
    this.derecha = null;
  }
}

// Clase Árbol Binario de Búsqueda
export class ArbolBinarioBusqueda {
  constructor() {
    this.raiz = null;
  }

  // Insertar un valor en el árbol
  insertar(valor) {
    const nodoNuevo = new NodoArbol(valor);
    if (this.raiz === null) {
      this.raiz = nodoNuevo;
    } else {
      this._insertarRecursivo(this.raiz, nodoNuevo);
    }
  }

  _insertarRecursivo(nodo, nodoNuevo) {
    if (nodoNuevo.valor < nodo.valor) {
      if (nodo.izquierda === null) {
        nodo.izquierda = nodoNuevo;
      } else {
        this._insertarRecursivo(nodo.izquierda, nodoNuevo);
      }
    } else {
      if (nodo.derecha === null) {
        nodo.derecha = nodoNuevo;
      } else {
        this._insertarRecursivo(nodo.derecha, nodoNuevo);
      }
    }
  }

  // Recorrido Inorden (Izquierda - Raíz - Derecha)
  inorden(nodo = this.raiz, resultado = []) {
    if (nodo !== null) {
      this.inorden(nodo.izquierda, resultado);
      resultado.push(nodo.valor);
      this.inorden(nodo.derecha, resultado);
    }
    return resultado;
  }

  // Recorrido Postorden (Izquierda - Derecha - Raíz)
  postorden(nodo = this.raiz, resultado = []) {
    if (nodo !== null) {
      this.postorden(nodo.izquierda, resultado);
      this.postorden(nodo.derecha, resultado);
      resultado.push(nodo.valor);
    }
    return resultado;
  }

  // Recorrido Preorden (Raíz - Izquierda - Derecha)
  preorden(nodo = this.raiz, resultado = []) {
    if (nodo !== null) {
      resultado.push(nodo.valor);
      this.preorden(nodo.izquierda, resultado);
      this.preorden(nodo.derecha, resultado);
    }
    return resultado;
  }

  // Buscar un valor en el árbol
  buscar(valor, nodo = this.raiz) {
    if (nodo === null) {
      return false;
    }

    if (valor === nodo.valor) {
      return true;
    } else if (valor < nodo.valor) {
      return this.buscar(valor, nodo.izquierda);
    } else {
      return this.buscar(valor, nodo.derecha);
    }
  }

  // Convertir árbol a formato para react-d3-tree
  obtenerDatos() {
    if (this.raiz === null) {
      return {};
    }
    return this._nodosADatos(this.raiz);
  }

  _nodosADatos(nodo) {
    if (nodo === null) {
      return null;
    }

    const nodoFormato = {
      name: nodo.valor.toString(),
      children: [],
    };

    if (nodo.izquierda !== null) {
      nodoFormato.children.push(this._nodosADatos(nodo.izquierda));
    }
    if (nodo.derecha !== null) {
      nodoFormato.children.push(this._nodosADatos(nodo.derecha));
    }

    if (nodoFormato.children.length === 0) {
      delete nodoFormato.children;
    }

    return nodoFormato;
  }
}

// Crear árbol con números iniciales
export const crearArbolInicial = () => {
  const arbol = new ArbolBinarioBusqueda();
  const numeros = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 65];
  numeros.forEach(num => arbol.insertar(num));
  return arbol;
};
