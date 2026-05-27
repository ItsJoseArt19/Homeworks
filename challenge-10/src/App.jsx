import React, { useState, useEffect } from 'react';
import VisualizacionGrafo from './components/VisualizacionGrafo';
import FormularioCiudad from './components/FormularioCiudad';
import FormularioPersona from './components/FormularioPersona';
import FormularioAmistad from './components/FormularioAmistad';
import ListaPersonasPorCiudad from './components/ListaPersonasPorCiudad';
import Estadisticas from './components/Estadisticas';
import { crearDatosEjemplo } from './data/datosEjemplo';
import './styles/app.css';

const App = () => {
  const [grafo, setGrafo] = useState(null);
  const [nodoSeleccionado, setNodoSeleccionado] = useState(null);
  const [mostrarFormularios, setMostrarFormularios] = useState(false);

  // Inicializar el grafo con datos de ejemplo
  useEffect(() => {
    const grafoInicial = crearDatosEjemplo();
    setGrafo(grafoInicial);
  }, []);

  const manejarActualizacionGrafo = () => {
    // Forzar re-render creando una nueva copia del grafo
    // Esto es necesario para que React detecte los cambios
    const nuevoGrafo = Object.assign(Object.create(Object.getPrototypeOf(grafo)), grafo);
    setGrafo(nuevoGrafo);
  };

  const manejarNodoClick = (nodo) => {
    setNodoSeleccionado(nodo);
    console.log('Nodo seleccionado:', nodo);
  };

  if (!grafo) {
    return <div className="cargando">Cargando...</div>;
  }

  return (
    <div className="app-contenedor">
      {/* Header */}
      <header className="app-header">
        <h1>Gráfico de Amigos y Ciudades</h1>
      </header>

      {/* Navegación de secciones */}
      <nav className="navegacion">
        <button
          className={`nav-boton ${!mostrarFormularios ? 'activo' : ''}`}
          onClick={() => setMostrarFormularios(false)}
        >
          📊 Inicio
        </button>
        <button
          className={`nav-boton ${mostrarFormularios ? 'activo' : ''}`}
          onClick={() => setMostrarFormularios(true)}
        >
          ➕ Agregar
        </button>
      </nav>

      {/* Sección Inicio - Gráfico con barra lateral */}
      {!mostrarFormularios && (
        <div className="layout-principal">
          {/* Gráfico full-width */}
          <div className="contenedor-grafo-principal">
            <VisualizacionGrafo
              grafo={grafo}
              onNodoClick={manejarNodoClick}
              nodoSeleccionado={nodoSeleccionado}
            />
          </div>

          {/* Barra lateral derecha */}
          <aside className="barra-lateral-derecha">
            {/* Estadísticas */}
            <div className="panel-lateral">
              <Estadisticas grafo={grafo} />
            </div>

            {/* Búsqueda de personas */}
            <div className="panel-lateral">
              <ListaPersonasPorCiudad grafo={grafo} />
            </div>

            {/* Info del nodo seleccionado */}
            {nodoSeleccionado && (
              <div className="panel-lateral info-nodo-lateral">
                <h3>ℹ️ Seleccionado</h3>
                <div className="detalles-nodo">
                  {nodoSeleccionado.tipo === 'ciudad' ? (
                    <>
                      <p>
                        <strong>Tipo:</strong> Ciudad
                      </p>
                      <p>
                        <strong>Nombre:</strong> {nodoSeleccionado.nombre}
                      </p>
                      <p>
                        <strong>Habitantes:</strong>{' '}
                        {
                          grafo.obtenerPersonasPorCiudad(
                            nodoSeleccionado.id
                          ).length
                        }
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        <strong>Tipo:</strong> Persona
                      </p>
                      <p>
                        <strong>Nombre:</strong> {nodoSeleccionado.nombre}
                      </p>
                      <p>
                        <strong>Edad:</strong> {nodoSeleccionado.edad} años
                      </p>
                      <p>
                        <strong>Ciudad:</strong>{' '}
                        {
                          grafo.obtenerCiudad(nodoSeleccionado.ciudadId)
                            ?.nombre
                        }
                      </p>
                      <p>
                        <strong>Amigos:</strong>{' '}
                        {nodoSeleccionado.amigos.length}
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Sección Agregar */}
      {mostrarFormularios && (
        <main className="contenido-agregar">
          <div className="seccion-agregar">
            <FormularioCiudad
              grafo={grafo}
              onAgregar={manejarActualizacionGrafo}
            />
            <FormularioPersona
              grafo={grafo}
              onAgregar={manejarActualizacionGrafo}
            />
            <FormularioAmistad
              grafo={grafo}
              onAgregar={manejarActualizacionGrafo}
            />
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>Total de nodos: {grafo.contarNodos()} | Ciudades: {grafo.contarCiudades()} | Personas: {grafo.contarPersonas()}</p>
      </footer>
    </div>
  );
};

export default App;
