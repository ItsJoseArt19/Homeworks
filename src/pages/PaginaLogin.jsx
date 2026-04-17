import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAutenticacion } from '../contexts/AuthContext';
import '../styles/autenticacion.css';

export const PaginaLogin = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const { iniciarSesion } = useAutenticacion();
  const navegar = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      await iniciarSesion(email, contraseña);
      navegar('/tareas');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="contenedor-autenticacion">
      <div className="tarjeta-autenticacion">
        <h1>Iniciar Sesión</h1>
        {error && <div className="alerta-error">{error}</div>}
        
        <form onSubmit={manejarEnvio}>
          <div className="grupo-formulario">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              disabled={cargando}
            />
          </div>

          <div className="grupo-formulario">
            <label htmlFor="contraseña">Contraseña:</label>
            <input
              id="contraseña"
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="••••••••"
              required
              disabled={cargando}
            />
          </div>

          <button type="submit" disabled={cargando} className="boton-primario">
            {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="enlace-registro">
          ¿No tienes cuenta? <Link to="/registrar">Registrate aquí</Link>
        </p>
      </div>
    </div>
  );
};
