/**
 * Clase Ciudad
 * Representa una ciudad en el gráfico
 */
class Ciudad {
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = 'ciudad';
  }
}

/**
 * Clase Persona
 * Representa una persona en el gráfico
 */
class Persona {
  constructor(id, nombre, edad, ciudadId) {
    this.id = id;
    this.nombre = nombre;
    this.edad = edad;
    this.ciudadId = ciudadId;
    this.tipo = 'persona';
    this.amigos = []; // Lista de IDs de amigos
  }

  agregarAmigo(idAmigo) {
    if (!this.amigos.includes(idAmigo)) {
      this.amigos.push(idAmigo);
    }
  }

  obtenerAmigos() {
    return this.amigos;
  }
}

/**
 * Clase Grafo
 * Maneja la estructura del gráfico de personas y ciudades
 */
class Grafo {
  constructor() {
    this.nodos = {}; // { id: Persona | Ciudad }
    this.listaAdyacencia = {}; // { id: [ids conectados] }
    this.personasPorCiudad = {}; // { ciudadId: [personaIds] }
  }

  /**
   * Agregar una ciudad al gráfico
   */
  agregarCiudad(id, nombre) {
    const ciudad = new Ciudad(id, nombre);
    this.nodos[id] = ciudad;
    this.listaAdyacencia[id] = [];
    this.personasPorCiudad[id] = [];
    return ciudad;
  }

  /**
   * Agregar una persona al gráfico
   */
  agregarPersona(id, nombre, edad, ciudadId) {
    // Verificar que la ciudad existe
    if (!this.nodos[ciudadId] || this.nodos[ciudadId].tipo !== 'ciudad') {
      throw new Error(`La ciudad con ID ${ciudadId} no existe`);
    }

    const persona = new Persona(id, nombre, edad, ciudadId);
    this.nodos[id] = persona;
    this.listaAdyacencia[id] = [];

    // Agregar relación persona -> ciudad
    this.listaAdyacencia[id].push(ciudadId);
    if (!this.listaAdyacencia[ciudadId].includes(id)) {
      this.listaAdyacencia[ciudadId].push(id);
    }

    // Agregar a personasPorCiudad
    if (!this.personasPorCiudad[ciudadId]) {
      this.personasPorCiudad[ciudadId] = [];
    }
    this.personasPorCiudad[ciudadId].push(id);

    return persona;
  }

  /**
   * Agregar amistad entre dos personas
   */
  agregarAmistad(idPersona1, idPersona2) {
    if (!this.nodos[idPersona1] || this.nodos[idPersona1].tipo !== 'persona') {
      throw new Error(`La persona con ID ${idPersona1} no existe`);
    }
    if (!this.nodos[idPersona2] || this.nodos[idPersona2].tipo !== 'persona') {
      throw new Error(`La persona con ID ${idPersona2} no existe`);
    }

    this.nodos[idPersona1].agregarAmigo(idPersona2);
    this.nodos[idPersona2].agregarAmigo(idPersona1);

    // Agregar a lista de adyacencia
    if (!this.listaAdyacencia[idPersona1].includes(idPersona2)) {
      this.listaAdyacencia[idPersona1].push(idPersona2);
    }
    if (!this.listaAdyacencia[idPersona2].includes(idPersona1)) {
      this.listaAdyacencia[idPersona2].push(idPersona1);
    }
  }

  /**
   * Obtener todas las personas que viven en una ciudad
   */
  obtenerPersonasPorCiudad(ciudadId) {
    return (this.personasPorCiudad[ciudadId] || []).map(
      (personaId) => this.nodos[personaId]
    );
  }

  /**
   * Obtener información de la ciudad
   */
  obtenerCiudad(ciudadId) {
    return this.nodos[ciudadId];
  }

  /**
   * Obtener información de la persona
   */
  obtenerPersona(personaId) {
    return this.nodos[personaId];
  }

  /**
   * Obtener todos los nodos
   */
  obtenerNodos() {
    return Object.values(this.nodos);
  }

  /**
   * Obtener todas las ciudades
   */
  obtenerCiudades() {
    return Object.values(this.nodos).filter((nodo) => nodo.tipo === 'ciudad');
  }

  /**
   * Obtener todas las personas
   */
  obtenerPersonas() {
    return Object.values(this.nodos).filter((nodo) => nodo.tipo === 'persona');
  }

  /**
   * Obtener la lista de adyacencia del gráfico
   */
  obtenerListaAdyacencia() {
    return this.listaAdyacencia;
  }

  /**
   * Contar nodos
   */
  contarNodos() {
    return Object.keys(this.nodos).length;
  }

  /**
   * Contar ciudades
   */
  contarCiudades() {
    return this.obtenerCiudades().length;
  }

  /**
   * Contar personas
   */
  contarPersonas() {
    return this.obtenerPersonas().length;
  }

  /**
   * Imprimir estadísticas del gráfico
   */
  imprimirEstadisticas() {
    console.log('=== Estadísticas del Gráfico ===');
    console.log(`Total de nodos: ${this.contarNodos()}`);
    console.log(`Total de ciudades: ${this.contarCiudades()}`);
    console.log(`Total de personas: ${this.contarPersonas()}`);
    console.log('=== Personas por Ciudad ===');

    this.obtenerCiudades().forEach((ciudad) => {
      const personas = this.obtenerPersonasPorCiudad(ciudad.id);
      console.log(
        `${ciudad.nombre}: ${personas.length} persona(s)`
      );
      personas.forEach((persona) => {
        console.log(
          `  - ${persona.nombre} (${persona.edad} años)`
        );
      });
    });
  }
}

export { Grafo, Persona, Ciudad };
