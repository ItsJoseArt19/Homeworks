import { Navigate } from 'react-router-dom';
import { useAutenticacion } from '../contexts/AuthContext';

export const RutaProtegida = ({ children }) => {
  const { usuario, cargando } = useAutenticacion();

  if (cargando) {
    return (
      <div className="contenedor-carga">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
