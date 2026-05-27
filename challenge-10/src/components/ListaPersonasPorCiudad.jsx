import React, { useState } from 'react';
import '../styles/listas.css';

const ListaPersonasPorCiudad = ({ grafo }) => {
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState('');
  const ciudades = grafo.obtenerCiudades();
  const personasEnCiudad = ciudadSeleccionada
    ? grafo.obtenerPersonasPorCiudad(ciudadSeleccionada)
    : [];

  return (
    <div className="lista-personas-ciudad">
      <h3>👥 Personas por Ciudad</h3>

      <div className="selector-ciudad">
        <label htmlFor="selector-ciudad">Selecciona una ciudad:</label>
        <select
          id="selector-ciudad"
          value={ciudadSeleccionada}
          onChange={(e) => setCiudadSeleccionada(e.target.value)}
        >
          <option value="">-- Selecciona una ciudad --</option>
          {ciudades.map((ciudad) => (
            <option key={ciudad.id} value={ciudad.id}>
              🏙️ {ciudad.nombre}
            </option>
          ))}
        </select>
      </div>

      {ciudadSeleccionada && (
        <div className="resultado">
          {personasEnCiudad.length > 0 ? (
            <div>
              <h4>
                Personas en{' '}
                {ciudades.find((c) => c.id === ciudadSeleccionada)?.nombre} (
                {personasEnCiudad.length})
              </h4>
              <ul className="lista-personas">
                {personasEnCiudad.map((persona) => (
                  <li key={persona.id} className="item-persona">
                    <span className="icono">👤</span>
                    <div className="info-persona">
                      <strong>{persona.nombre}</strong>
                      <span className="edad">{persona.edad} años</span>
                      <span className="amigos">
                        Amigos: {persona.amigos.length}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="sin-resultados">
              No hay personas en esta ciudad
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ListaPersonasPorCiudad;
