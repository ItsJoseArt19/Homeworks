import { createContext, useContext, useEffect } from 'react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';

const ContextoAutenticacion = createContext();

export const ProveedorAutenticacion = ({ children }) => {
  const {
    usuario,
    cargando,
    error,
    registrar,
    iniciarSesion,
    cerrarSesion,
    verificarEstado,
  } = useFirebaseAuth();

  useEffect(() => {
    const desuscribir = verificarEstado();
    return desuscribir;
  }, []);

  const valor = {
    usuario,
    cargando,
    error,
    registrar,
    iniciarSesion,
    cerrarSesion,
  };

  return (
    <ContextoAutenticacion.Provider value={valor}>
      {children}
    </ContextoAutenticacion.Provider>
  );
};

export const useAutenticacion = () => {
  const contexto = useContext(ContextoAutenticacion);
  if (!contexto) {
    throw new Error(
      'useAutenticacion debe ser usado dentro de ProveedorAutenticacion'
    );
  }
  return contexto;
};
