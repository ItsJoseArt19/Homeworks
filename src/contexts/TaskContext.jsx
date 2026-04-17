import { createContext, useContext, useEffect } from 'react';
import { useFirebaseTasks } from '../hooks/useFirebaseTasks';
import { useAutenticacion } from './AuthContext';

const ContextoTareas = createContext();

export const ProveedorTareas = ({ children }) => {
  const { usuario } = useAutenticacion();
  const {
    tareas,
    cargando,
    error,
    obtenerTareas,
    agregarTarea,
    actualizarTarea,
    alternarTarea,
    eliminarTarea,
  } = useFirebaseTasks(usuario?.uid);

  useEffect(() => {
    if (usuario) {
      obtenerTareas();
    }
  }, [usuario]);

  const valor = {
    tareas,
    cargando,
    error,
    agregarTarea,
    actualizarTarea,
    alternarTarea,
    eliminarTarea,
    obtenerTareas,
  };

  return (
    <ContextoTareas.Provider value={valor}>
      {children}
    </ContextoTareas.Provider>
  );
};

export const useTareas = () => {
  const contexto = useContext(ContextoTareas);
  if (!contexto) {
    throw new Error('useTareas debe ser usado dentro de ProveedorTareas');
  }
  return contexto;
};
