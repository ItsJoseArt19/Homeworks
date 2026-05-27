import { Grafo } from './Grafo.js';

/**
 * Crear datos de ejemplo para el gráfico
 */
export function crearDatosEjemplo() {
  const grafo = new Grafo();

  // Crear ciudades
  grafo.agregarCiudad('ciudad1', 'Medellín');
  grafo.agregarCiudad('ciudad2', 'Bogotá');
  grafo.agregarCiudad('ciudad3', 'Cali');
  grafo.agregarCiudad('ciudad4', 'Barranquilla');

  // Crear personas
  grafo.agregarPersona('persona1', 'Juan', 28, 'ciudad1');
  grafo.agregarPersona('persona2', 'María', 25, 'ciudad1');
  grafo.agregarPersona('persona3', 'Carlos', 32, 'ciudad1');
  grafo.agregarPersona('persona4', 'Ana', 29, 'ciudad2');
  grafo.agregarPersona('persona5', 'Pedro', 26, 'ciudad2');
  grafo.agregarPersona('persona6', 'Laura', 31, 'ciudad3');
  grafo.agregarPersona('persona7', 'Diego', 27, 'ciudad4');
  grafo.agregarPersona('persona8', 'Sofía', 24, 'ciudad4');

  // Crear amistades
  grafo.agregarAmistad('persona1', 'persona2');
  grafo.agregarAmistad('persona1', 'persona3');
  grafo.agregarAmistad('persona2', 'persona3');
  grafo.agregarAmistad('persona4', 'persona5');
  grafo.agregarAmistad('persona6', 'persona1');
  grafo.agregarAmistad('persona7', 'persona8');
  grafo.agregarAmistad('persona3', 'persona4');

  return grafo;
}

/**
 * Convertir el gráfico a formato para react-d3-graph
 */
export function convertirAlFormatoReactD3Graph(grafo) {
  const nodos = grafo.obtenerNodos();
  const listaAdyacencia = grafo.obtenerListaAdyacencia();

  const nodes = nodos.map((nodo) => ({
    id: nodo.id,
    label: nodo.tipo === 'ciudad' ? `🏙️ ${nodo.nombre}` : `👤 ${nodo.nombre} (${nodo.edad})`,
    title:
      nodo.tipo === 'ciudad'
        ? `Ciudad: ${nodo.nombre}`
        : `Persona: ${nodo.nombre}, Edad: ${nodo.edad}`,
    type: nodo.tipo,
  }));

  const links = [];
  const visitados = new Set();

  nodos.forEach((nodo) => {
    (listaAdyacencia[nodo.id] || []).forEach((adyacente) => {
      const linkId = [nodo.id, adyacente].sort().join('-');
      if (!visitados.has(linkId)) {
        links.push({
          source: nodo.id,
          target: adyacente,
        });
        visitados.add(linkId);
      }
    });
  });

  return { nodes, links };
}
