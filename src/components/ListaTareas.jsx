import { useTareas } from '../contexts/TaskContext';
import { ElementoTarea } from './ElementoTarea';
import '../styles/tareas.css';

export const ListaTareas = ({ tareaEdicion, alEditar }) => {
  const { tareas, cargando } = useTareas();

  const tareasIncompletas = tareas.filter((t) => !t.completada);
  const tareasCompletadas = tareas.filter((t) => t.completada);

  if (cargando) {
    return <div className="contenedor-carga">Cargando tareas...</div>;
  }

  if (tareas.length === 0) {
    return (
      <div className="contenedor-sin-tareas">
        <p>No hay tareas. ¡Crea una nueva!</p>
      </div>
    );
  }

  return (
    <div className="contenedor-listas-tareas">
      {tareasIncompletas.length > 0 && (
        <section className="seccion-tareas">
          <h2>Tareas Pendientes ({tareasIncompletas.length})</h2>
          <div className="lista-tareas">
            {tareasIncompletas.map((tarea) => (
              <ElementoTarea
                key={tarea.id}
                tarea={tarea}
                alEditar={alEditar}
              />
            ))}
          </div>
        </section>
      )}

      {tareasCompletadas.length > 0 && (
        <section className="seccion-tareas">
          <h2>Tareas Completadas ({tareasCompletadas.length})</h2>
          <div className="lista-tareas">
            {tareasCompletadas.map((tarea) => (
              <ElementoTarea
                key={tarea.id}
                tarea={tarea}
                alEditar={alEditar}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
