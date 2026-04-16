import React, { useState } from 'react';
import { crearArbolInicial } from './data/TreeData';
import VisualizacionArbol from './components/VisualizacionArbol';
import ControlesArbol from './components/ControlesArbol';
import './styles/global.css';

const App = () => {
  const [arbol] = useState(() => crearArbolInicial());
  const [, setActualizacion] = useState(0);

  const handleActualizar = () => {
    setActualizacion(prev => prev + 1);
  };

  return (
    <div className="app-contenedor">
      <header className="app-header">
        <h1>🌳 Árbol Binario de Búsqueda</h1>
        <p>Explora recorridos inorden, postorden y preorden</p>
      </header>

      <div className="app-layout">
        <div className="seccion-arbol">
          <h2>Visualización del Árbol</h2>
          <VisualizacionArbol arbol={arbol} key={Math.random()} />
        </div>

        <div className="seccion-controles">
          <ControlesArbol arbol={arbol} alActualizar={handleActualizar} />
        </div>
      </div>

      <footer className="app-footer">
        <p>Challenge 08 - Estructura de Datos: Árbol Binario de Búsqueda</p>
      </footer>
    </div>
  );
};

export default App;
