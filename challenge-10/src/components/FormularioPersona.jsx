import React, { useState } from 'react';
import '../styles/formularios.css';

const FormularioPersona = ({ grafo, onAgregar }) => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [ciudadId, setCiudadId] = useState('');
  const [error, setError] = useState('');

  const ciudades = grafo.obtenerCiudades();

  const manejarSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!nombre.trim()) {
      setError('El nombre es requerido');
      return;
    }

    if (!edad || edad < 1 || edad > 120) {
      setError('Ingresa una edad válida (1-120)');
      return;
    }

    if (!ciudadId) {
      setError('Selecciona una ciudad');
      return;
    }

    try {
      const id = `persona-${Date.now()}`;
      grafo.agregarPersona(id, nombre, parseInt(edad), ciudadId);
      setNombre('');
      setEdad('');
      setCiudadId('');
      onAgregar();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="formulario-persona">
      <h3>👤 Agregar Persona</h3>
      <form onSubmit={manejarSubmit}>
        <div className="grupo-campo">
          <label htmlFor="nombre-persona">Nombre:</label>
          <input
            id="nombre-persona"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Juan"
          />
        </div>

        <div className="grupo-campo">
          <label htmlFor="edad-persona">Edad:</label>
          <input
            id="edad-persona"
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            placeholder="Ej: 25"
            min="1"
            max="120"
          />
        </div>

        <div className="grupo-campo">
          <label htmlFor="ciudad-persona">Ciudad:</label>
          <select
            id="ciudad-persona"
            value={ciudadId}
            onChange={(e) => setCiudadId(e.target.value)}
          >
            <option value="">-- Selecciona una ciudad --</option>
            {ciudades.map((ciudad) => (
              <option key={ciudad.id} value={ciudad.id}>
                {ciudad.nombre}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="boton-agregar">
          Agregar Persona
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default FormularioPersona;
