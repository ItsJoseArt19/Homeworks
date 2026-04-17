import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutenticacion } from '../contexts/AuthContext';
import { TareaFormulario } from '../components/TareaFormulario';
import { ListaTareas } from '../components/ListaTareas';
import '../styles/tareas.css';

export const PaginaTareas = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tareaEdicion, setTareaEdicion] = useState(null);
  const { usuario, cerrarSesion } = useAutenticacion();
  const navegar = useNavigate();

  const manejarEditar = (tarea) => {
    setTareaEdicion(tarea);
    setMostrarFormulario(true);
  };

  const manejarCerrarFormulario = () => {
    setMostrarFormulario(false);
    setTareaEdicion(null);
  };

  const manejarCerrarSesion = async () => {
    try {
      await cerrarSesion();
      navegar('/login');
    } catch (error) {
      alert('Error al cerrar sesión: ' + error.message);
    }
  };

  return (
    <div className="pagina-tareas">
      <header className="encabezado-tareas">
        <div className="contenedor-titulo">
          <h1>Gestor de Tareas</h1>
          <p className="usuario-email">{usuario?.email}</p>
        </div>
        <button onClick={manejarCerrarSesion} className="boton-cerrar-sesion">
          Cerrar Sesión
        </button>
      </header>

      <main className="contenido-principal">
        {!mostrarFormulario && (
          <button
            onClick={() => setMostrarFormulario(true)}
            className="boton-agregar-tarea"
          >
            + Agregar Nueva Tarea
          </button>
        )}

        {mostrarFormulario && (
          <section className="seccion-formulario">
            <h2>{tareaEdicion ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
            <TareaFormulario
              tareaEdicion={tareaEdicion}
              alCerrar={manejarCerrarFormulario}
            />
          </section>
        )}

        <ListaTareas tareaEdicion={tareaEdicion} alEditar={manejarEditar} />
      </main>
    </div>
  );
};
