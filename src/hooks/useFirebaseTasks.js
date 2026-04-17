import { useState } from 'react';
import { ref, push, update, remove, get } from 'firebase/database';
import { database } from '../firebase/config';

export const useFirebaseTasks = (usuarioId) => {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todas las tareas del usuario
  const obtenerTareas = async () => {
    if (!usuarioId) return;
    
    try {
      setCargando(true);
      setError(null);
      const tareasRef = ref(database, `tareas/${usuarioId}`);
      const snapshot = await get(tareasRef);
      
      if (snapshot.exists()) {
        const datos = snapshot.val();
        const listaTareas = Object.entries(datos).map(([id, tarea]) => ({
          id,
          ...tarea,
        }));
        setTareas(listaTareas);
      } else {
        setTareas([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  // Agregar nueva tarea
  const agregarTarea = async (titulo, descripcion = '') => {
    if (!usuarioId) return null;
    
    try {
      setError(null);
      const tareasRef = ref(database, `tareas/${usuarioId}`);
      const nuevaTarea = {
        titulo,
        descripcion,
        completada: false,
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString(),
      };
      
      const resultado = await push(tareasRef, nuevaTarea);
      const tareaCreada = { id: resultado.key, ...nuevaTarea };
      setTareas([...tareas, tareaCreada]);
      return tareaCreada;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Actualizar tarea
  const actualizarTarea = async (tareaId, actualizaciones) => {
    if (!usuarioId) return null;
    
    try {
      setError(null);
      const tareaRef = ref(database, `tareas/${usuarioId}/${tareaId}`);
      const datosActualizados = {
        ...actualizaciones,
        fechaActualizacion: new Date().toISOString(),
      };
      
      await update(tareaRef, datosActualizados);
      
      const tareaActualizada = tareas.map((t) =>
        t.id === tareaId ? { ...t, ...datosActualizados } : t
      );
      setTareas(tareaActualizada);
      return datosActualizados;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Marcar tarea como completada/incompleta
  const alternarTarea = async (tareaId) => {
    const tarea = tareas.find((t) => t.id === tareaId);
    if (tarea) {
      return actualizarTarea(tareaId, { completada: !tarea.completada });
    }
  };

  // Eliminar tarea
  const eliminarTarea = async (tareaId) => {
    if (!usuarioId) return;
    
    try {
      setError(null);
      const tareaRef = ref(database, `tareas/${usuarioId}/${tareaId}`);
      await remove(tareaRef);
      setTareas(tareas.filter((t) => t.id !== tareaId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    tareas,
    cargando,
    error,
    obtenerTareas,
    agregarTarea,
    actualizarTarea,
    alternarTarea,
    eliminarTarea,
  };
};
