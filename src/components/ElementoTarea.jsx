import { useState } from 'react';
import { useTareas } from '../contexts/TaskContext';
import '../styles/tareas.css';

export const ElementoTarea = ({ tarea, alEditar }) => {
  const { alternarTarea, eliminarTarea } = useTareas();
  const [cargando, setCargando] = useState(false);

  const manejarAlternar = async () => {
    setCargando(true);
    try {
      await alternarTarea(tarea.id);
    } catch (error) {
      alert('Error al actualizar la tarea: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  const manejarEliminar = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      setCargando(true);
      try {
        await eliminarTarea(tarea.id);
      } catch (error) {
        alert('Error al eliminar la tarea: ' + error.message);
      } finally {
        setCargando(false);
      }
    }
  };

  return (
    <div className={`elemento-tarea ${tarea.completada ? 'completada' : ''}`}>
      <div className="contenido-tarea">
        <input
          type="checkbox"
          checked={tarea.completada}
          onChange={manejarAlternar}
          disabled={cargando}
          className="checkbox-tarea"
        />
        <div className="texto-tarea">
          <h3 className="titulo-tarea">{tarea.titulo}</h3>
          {tarea.descripcion && (
            <p className="descripcion-tarea">{tarea.descripcion}</p>
          )}
          <small className="fecha-tarea">
            {new Date(tarea.fechaCreacion).toLocaleDateString()}
          </small>
        </div>
      </div>

      <div className="acciones-tarea">
        <button
          onClick={() => alEditar(tarea)}
          disabled={cargando}
          className="boton-editar"
          title="Editar tarea"
        >
          ✏️
        </button>
        <button
          onClick={manejarEliminar}
          disabled={cargando}
          className="boton-eliminar"
          title="Eliminar tarea"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};
