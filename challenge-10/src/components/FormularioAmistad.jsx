import React, { useState } from 'react';
import '../styles/formularios.css';

const FormularioAmistad = ({ grafo, onAgregar }) => {
  const [persona1Id, setPersona1Id] = useState('');
  const [persona2Id, setPersona2Id] = useState('');
  const [error, setError] = useState('');

  const personas = grafo.obtenerPersonas();

  const manejarSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!persona1Id) {
      setError('Selecciona la primera persona');
      return;
    }

    if (!persona2Id) {
      setError('Selecciona la segunda persona');
      return;
    }

    if (persona1Id === persona2Id) {
      setError('Una persona no puede ser amiga de sí misma');
      return;
    }

    try {
      grafo.agregarAmistad(persona1Id, persona2Id);
      setPersona1Id('');
      setPersona2Id('');
      onAgregar();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="formulario-amistad">
      <h3>🤝 Agregar Amistad</h3>
      <form onSubmit={manejarSubmit}>
        <div className="grupo-campo">
          <label htmlFor="persona1">Primera Persona:</label>
          <select
            id="persona1"
            value={persona1Id}
            onChange={(e) => setPersona1Id(e.target.value)}
          >
            <option value="">-- Selecciona una persona --</option>
            {personas.map((persona) => (
              <option key={persona.id} value={persona.id}>
                {persona.nombre} ({persona.edad} años)
              </option>
            ))}
          </select>
        </div>

        <div className="grupo-campo">
          <label htmlFor="persona2">Segunda Persona:</label>
          <select
            id="persona2"
            value={persona2Id}
            onChange={(e) => setPersona2Id(e.target.value)}
          >
            <option value="">-- Selecciona una persona --</option>
            {personas.map((persona) => (
              <option key={persona.id} value={persona.id}>
                {persona.nombre} ({persona.edad} años)
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="boton-agregar">
          Agregar Amistad
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default FormularioAmistad;
