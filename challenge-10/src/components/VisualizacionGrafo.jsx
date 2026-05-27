import React, { useState, useRef, useEffect } from 'react';
import '../styles/grafo.css';

const VisualizacionGrafo = ({
  grafo,
  onNodoClick,
  nodoSeleccionado,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [arrastrando, setArrastrando] = useState(false);
  const [inicioArrastre, setInicioArrastre] = useState({ x: 0, y: 0 });
  const [nodosPosiciones, setNodosPosiciones] = useState([]);
  const svgRef = useRef(null);

  // Convertir grafo a coordenadas para visualización con layout mejorado
  const nodos = grafo.obtenerNodos();
  const listaAdyacencia = grafo.obtenerListaAdyacencia();

  // Force-directed layout simplificado
  useEffect(() => {
    if (nodos.length === 0) return;

    let posiciones = nodos.map((nodo, indice) => {
      const angulo = (indice / nodos.length) * 2 * Math.PI;
      const radio = 150 + (nodos.length * 5);
      return {
        ...nodo,
        x: Math.cos(angulo) * radio + 350,
        y: Math.sin(angulo) * radio + 300,
        vx: 0,
        vy: 0,
      };
    });

    // Aplicar fuerzas repulsivas simples
    for (let iter = 0; iter < 10; iter++) {
      posiciones.forEach((nodo1, i) => {
        nodos.forEach((nodo2, j) => {
          if (i !== j) {
            const dx = posiciones[j].x - posiciones[i].x;
            const dy = posiciones[j].y - posiciones[i].y;
            const distancia = Math.sqrt(dx * dx + dy * dy) || 1;
            const fuerza = 100 / (distancia * distancia);
            posiciones[i].vx -= (dx / distancia) * fuerza * 0.01;
            posiciones[i].vy -= (dy / distancia) * fuerza * 0.01;
          }
        });
      });

      // Aplicar fuerzas atractivas para nodos conectados
      nodos.forEach((nodo, i) => {
        (listaAdyacencia[nodo.id] || []).forEach((idAdyacente) => {
          const j = nodos.findIndex((n) => n.id === idAdyacente);
          if (j !== -1) {
            const dx = posiciones[j].x - posiciones[i].x;
            const dy = posiciones[j].y - posiciones[i].y;
            const distancia = Math.sqrt(dx * dx + dy * dy) || 1;
            const fuerza = distancia / 20;
            posiciones[i].vx += (dx / distancia) * fuerza * 0.005;
            posiciones[i].vy += (dy / distancia) * fuerza * 0.005;
          }
        });
      });

      // Actualizar posiciones
      posiciones.forEach((nodo) => {
        nodo.x += nodo.vx;
        nodo.y += nodo.vy;
        nodo.vx *= 0.95;
        nodo.vy *= 0.95;
      });
    }

    setNodosPosiciones(posiciones);
  }, [nodos.length]);

  const enlaces = [];
  const visitados = new Set();

  nodos.forEach((nodo) => {
    (listaAdyacencia[nodo.id] || []).forEach((adyacente) => {
      const linkId = [nodo.id, adyacente].sort().join('-');
      if (!visitados.has(linkId)) {
        const nodoOrigen = nodosPosiciones.find((n) => n.id === nodo.id);
        const nodoDestino = nodosPosiciones.find((n) => n.id === adyacente);
        if (nodoOrigen && nodoDestino) {
          enlaces.push({
            id: linkId,
            x1: nodoOrigen.x,
            y1: nodoOrigen.y,
            x2: nodoDestino.x,
            y2: nodoDestino.y,
          });
        }
        visitados.add(linkId);
      }
    });
  });

  const manejarMouseDown = (e) => {
    if (e.button !== 0) return; // Solo click izquierdo
    setArrastrando(true);
    setInicioArrastre({ 
      x: e.clientX / zoomLevel, 
      y: e.clientY / zoomLevel 
    });
  };

  const manejarMouseMove = (e) => {
    if (!arrastrando || !svgRef.current) return;
    
    const dx = (e.clientX / zoomLevel) - inicioArrastre.x;
    const dy = (e.clientY / zoomLevel) - inicioArrastre.y;
    
    setOffset(prev => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));
    
    setInicioArrastre({ 
      x: e.clientX / zoomLevel, 
      y: e.clientY / zoomLevel 
    });
  };

  const manejarMouseUp = () => {
    setArrastrando(false);
  };

  const manejarMouseLeave = () => {
    setArrastrando(false);
  };

  // Obtener IDs de nodos conectados
  const obtenerNodosConectados = () => {
    if (!nodoSeleccionado) return new Set();
    const conectados = new Set([nodoSeleccionado.id]);
    (listaAdyacencia[nodoSeleccionado.id] || []).forEach((id) => {
      conectados.add(id);
    });
    return conectados;
  };

  // Obtener IDs de enlaces conectados
  const obtenerEnlacesConectados = () => {
    if (!nodoSeleccionado) return new Set();
    const conectados = obtenerNodosConectados();
    const enlacesIds = new Set();
    (listaAdyacencia[nodoSeleccionado.id] || []).forEach((idAdyacente) => {
      const linkId = [nodoSeleccionado.id, idAdyacente].sort().join('-');
      enlacesIds.add(linkId);
    });
    return enlacesIds;
  };

  const nodosConectados = obtenerNodosConectados();
  const enlacesConectados = obtenerEnlacesConectados();

  return (
    <div className="visualizacion-grafo">
      <div className="controles-grafo">
        <div className="zoom-controles">
          <button onClick={() => setZoomLevel(Math.max(0.3, zoomLevel - 0.2))}>
            🔍−
          </button>
          <span className="zoom-nivel">{Math.round(zoomLevel * 100)}%</span>
          <button onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.2))}>
            🔍+
          </button>
          <button
            onClick={() => {
              setOffset({ x: 0, y: 0 });
              setZoomLevel(1);
            }}
          >
            🔄 Reiniciar
          </button>
        </div>
      </div>

      <svg
        ref={svgRef}
        className="canvas-grafo"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid meet"
        style={{
          cursor: arrastrando ? 'grabbing' : 'grab',
        }}
        onMouseDown={manejarMouseDown}
        onMouseMove={manejarMouseMove}
        onMouseUp={manejarMouseUp}
        onMouseLeave={manejarMouseLeave}
      >
        {/* Grupo contenedor para pan y zoom */}
        <g
          className="contenedor-zoom"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoomLevel})`,
            transformOrigin: '0 0',
          }}
        >
          {/* Dibujar enlaces */}
          <g className="enlaces">
            {enlaces.map((enlace) => (
              <line
                key={enlace.id}
                x1={enlace.x1}
                y1={enlace.y1}
                x2={enlace.x2}
                y2={enlace.y2}
                className={`enlace-linea ${enlacesConectados.has(enlace.id) ? 'enlace-conectado' : ''}`}
              />
            ))}
          </g>

          {/* Dibujar nodos */}
          <g className="nodos">
            {nodosPosiciones.map((nodo) => (
              <g
                key={nodo.id}
                className={`nodo nodo-${nodo.tipo} ${
                  nodoSeleccionado?.id === nodo.id ? 'seleccionado' : ''
                } ${nodosConectados.has(nodo.id) && nodoSeleccionado ? 'conectado' : ''}`}
                onClick={() => onNodoClick(nodo)}
              >
                {/* Círculo del nodo */}
                <circle
                  cx={nodo.x}
                  cy={nodo.y}
                  r={nodo.tipo === 'ciudad' ? 35 : 30}
                  className="circulo-nodo"
                />

                {/* Texto del nodo */}
                <text x={nodo.x} y={nodo.y + 5} textAnchor="middle" className="texto-nodo">
                  {nodo.tipo === 'ciudad' ? '🏙️' : '👤'}
                </text>

                {/* Etiqueta */}
                <text
                  x={nodo.x}
                  y={nodo.y + 50}
                  textAnchor="middle"
                  className="etiqueta-nodo"
                >
                  {nodo.tipo === 'ciudad' ? nodo.nombre : `${nodo.nombre}`}
                </text>
              </g>
            ))}
          </g>
        </g>
      </svg>

      <div className="info-canvas">
        <p>Arrastra para mover | Usa zoom para acercar/alejar</p>
      </div>
    </div>
  );
};

export default VisualizacionGrafo;
