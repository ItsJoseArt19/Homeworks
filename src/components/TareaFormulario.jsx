import { useState } from 'react';
import { useTareas } from '../contexts/TaskContext';
import '../styles/tareas.css';

export const TareaFormulario = ({ tareaEdicion = null, alCerrar = null }) => {
  const [titulo, setTitulo] = useState(tareaEdicion?.titulo || '');
  const [descripcion, setDescripcion] = useState(tareaEdicion?.descripcion || '');
  const [cargando, setCargando] = useState(false);
  const { agregarTarea, actualizarTarea } = useTareas();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    if (!titulo.trim()) {
      alert('El título es requerido');
      return;
    }

    setCargando(true);

    try {
      if (tareaEdicion) {
        await actualizarTarea(tareaEdicion.id, { titulo, descripcion });
      } else {
        await agregarTarea(titulo, descripcion);
      }
      
      setTitulo('');
      setDescripcion('');
      
      if (alCerrar) {
        alCerrar();
      }
    } catch (error) {
      alert('Error al guardar la tarea: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="formulario-tarea">
      <div className="grupo-formulario">
        <label htmlFor="titulo">Título:</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Escribe el título de la tarea"
          maxLength={100}
          disabled={cargando}
        />
      </div>

      <div className="grupo-formulario">
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Escribe una descripción (opcional)"
          rows={4}
          maxLength={500}
          disabled={cargando}
        />
      </div>

      <div className="botones-formulario">
        <button type="submit" disabled={cargando} className="boton-primario">
          {cargando
            ? 'Guardando...'
            : tareaEdicion
              ? 'Actualizar Tarea'
              : 'Agregar Tarea'}
        </button>
        {alCerrar && (
          <button type="button" onClick={alCerrar} className="boton-secundario">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
