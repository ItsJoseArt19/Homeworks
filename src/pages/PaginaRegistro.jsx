import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAutenticacion } from '../contexts/AuthContext';
import '../styles/autenticacion.css';

export const PaginaRegistro = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const { registrar } = useAutenticacion();
  const navegar = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');

    if (contraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (contraseña.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setCargando(true);

    try {
      await registrar(email, contraseña);
      navegar('/tareas');
    } catch (err) {
      setError(err.message || 'Error al registrar');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="contenedor-autenticacion">
      <div className="tarjeta-autenticacion">
        <h1>Crear Cuenta</h1>
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

          <div className="grupo-formulario">
            <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label>
            <input
              id="confirmarContraseña"
              type="password"
              value={confirmarContraseña}
              onChange={(e) => setConfirmarContraseña(e.target.value)}
              placeholder="••••••••"
              required
              disabled={cargando}
            />
          </div>

          <button type="submit" disabled={cargando} className="boton-primario">
            {cargando ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="enlace-registro">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};
