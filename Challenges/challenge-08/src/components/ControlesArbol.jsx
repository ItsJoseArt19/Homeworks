import React, { useState } from 'react';
import '../styles/tree.css';

const ControlesArbol = ({ arbol, alActualizar }) => {
  const [numeroInput, setNumeroInput] = useState('');
  const [numeroBusqueda, setNumeroBusqueda] = useState('');
  const [resultadoBusqueda, setResultadoBusqueda] = useState(null);
  const [inorden, setInorden] = useState([]);
  const [postorden, setPostorden] = useState([]);
  const [preorden, setPreorden] = useState([]);

  const handleInsertar = () => {
    const numero = parseInt(numeroInput);
    if (!isNaN(numero)) {
      arbol.insertar(numero);
      setNumeroInput('');
      actualizarRecorridos();
      alActualizar();
    }
  };

  const handleBuscar = () => {
    const numero = parseInt(numeroBusqueda);
    if (!isNaN(numero)) {
      const encontrado = arbol.buscar(numero);
      setResultadoBusqueda({
        valor: numero,
        encontrado: encontrado,
      });
    }
  };

  const actualizarRecorridos = () => {
    setInorden(arbol.inorden());
    setPostorden(arbol.postorden());
    setPreorden(arbol.preorden());
  };

  const handleLimpiar = () => {
    setInorden([]);
    setPostorden([]);
    setPreorden([]);
    setResultadoBusqueda(null);
  };

  return (
    <div className="controles-contenedor">
      <div className="seccion-insertar">
        <h3>Insertar Número</h3>
        <div className="input-grupo">
          <input
            type="number"
            value={numeroInput}
            onChange={(e) => setNumeroInput(e.target.value)}
            placeholder="Ingresa un número"
            onKeyPress={(e) => e.key === 'Enter' && handleInsertar()}
          />
          <button onClick={handleInsertar} className="btn btn-insertar">
            Insertar
          </button>
        </div>
      </div>

      <div className="seccion-buscar">
        <h3>Buscar Número</h3>
        <div className="input-grupo">
          <input
            type="number"
            value={numeroBusqueda}
            onChange={(e) => setNumeroBusqueda(e.target.value)}
            placeholder="Busca un número"
            onKeyPress={(e) => e.key === 'Enter' && handleBuscar()}
          />
          <button onClick={handleBuscar} className="btn btn-buscar">
            Buscar
          </button>
        </div>
        {resultadoBusqueda && (
          <div className={`resultado-busqueda ${resultadoBusqueda.encontrado ? 'encontrado' : 'no-encontrado'}`}>
            {resultadoBusqueda.encontrado
              ? `✓ ${resultadoBusqueda.valor} fue encontrado en el árbol`
              : `✗ ${resultadoBusqueda.valor} no existe en el árbol`}
          </div>
        )}
      </div>

      <div className="seccion-recorridos">
        <h3>Recorridos</h3>
        <div className="recorrido-item">
          <h4>Inorden (Izquierda-Raíz-Derecha):</h4>
          <p className="recorrido-valores">{inorden.length > 0 ? inorden.join(' → ') : 'Vacío'}</p>
        </div>
        <div className="recorrido-item">
          <h4>Postorden (Izquierda-Derecha-Raíz):</h4>
          <p className="recorrido-valores">{postorden.length > 0 ? postorden.join(' → ') : 'Vacío'}</p>
        </div>
        <div className="recorrido-item">
          <h4>Preorden (Raíz-Izquierda-Derecha):</h4>
          <p className="recorrido-valores">{preorden.length > 0 ? preorden.join(' → ') : 'Vacío'}</p>
        </div>
      </div>

      <div className="seccion-acciones">
        <button onClick={actualizarRecorridos} className="btn btn-recorridos">
          Actualizar Recorridos
        </button>
        <button onClick={handleLimpiar} className="btn btn-limpiar">
          Limpiar Resultados
        </button>
      </div>
    </div>
  );
};

export default ControlesArbol;
