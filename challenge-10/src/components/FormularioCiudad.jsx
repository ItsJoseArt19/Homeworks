import React, { useState } from 'react';
import '../styles/formularios.css';

const FormularioCiudad = ({ grafo, onAgregar }) => {
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');

  const manejarSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!nombre.trim()) {
      setError('El nombre de la ciudad es requerido');
      return;
    }

    try {
      const id = `ciudad-${Date.now()}`;
      grafo.agregarCiudad(id, nombre);
      setNombre('');
      onAgregar();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="formulario-ciudad">
      <h3>➕ Agregar Ciudad</h3>
      <form onSubmit={manejarSubmit}>
        <div className="grupo-campo">
          <label htmlFor="nombre-ciudad">Nombre de la Ciudad:</label>
          <input
            id="nombre-ciudad"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Medellín"
          />
        </div>

        <button type="submit" className="boton-agregar">
          Agregar Ciudad
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default FormularioCiudad;
