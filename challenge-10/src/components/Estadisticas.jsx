import React, { useState, useEffect } from 'react';
import '../styles/estadisticas.css';

const Estadisticas = ({ grafo }) => {
  const [stats, setStats] = useState({
    totalNodos: 0,
    totalCiudades: 0,
    totalPersonas: 0,
    personasPorCiudad: {},
    topCiudades: [],
  });

  useEffect(() => {
    const ciudades = grafo.obtenerCiudades();
    const personasPorCiudad = {};
    const topCiudades = [];

    ciudades.forEach((ciudad) => {
      const personas = grafo.obtenerPersonasPorCiudad(ciudad.id);
      personasPorCiudad[ciudad.nombre] = personas.length;
      topCiudades.push({
        nombre: ciudad.nombre,
        cantidad: personas.length,
      });
    });

    topCiudades.sort((a, b) => b.cantidad - a.cantidad);

    setStats({
      totalNodos: grafo.contarNodos(),
      totalCiudades: grafo.contarCiudades(),
      totalPersonas: grafo.contarPersonas(),
      personasPorCiudad,
      topCiudades: topCiudades.slice(0, 5),
    });
  }, [grafo]);

  return (
    <div className="estadisticas">
      <h3>📊 Estadísticas</h3>
      <div className="contenedor-stats">
        <div className="stat-card">
          <span className="numero">{stats.totalNodos}</span>
          <span className="label">Nodos Totales</span>
        </div>
        <div className="stat-card">
          <span className="numero">{stats.totalCiudades}</span>
          <span className="label">Ciudades</span>
        </div>
        <div className="stat-card">
          <span className="numero">{stats.totalPersonas}</span>
          <span className="label">Personas</span>
        </div>
      </div>

      {stats.topCiudades.length > 0 && (
        <div className="top-ciudades">
          <h4>🏆 Ciudades con más personas</h4>
          <ul>
            {stats.topCiudades.map((ciudad, index) => (
              <li key={index}>
                <span className="posicion">#{index + 1}</span>
                <span className="nombre">{ciudad.nombre}</span>
                <span className="cantidad">{ciudad.cantidad} personas</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Estadisticas;
