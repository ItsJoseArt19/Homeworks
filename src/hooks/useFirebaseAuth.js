import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase/config';

export const useFirebaseAuth = () => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Registrar usuario
  const registrar = async (email, contraseña) => {
    try {
      setError(null);
      const resultado = await createUserWithEmailAndPassword(auth, email, contraseña);
      return resultado.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Iniciar sesión
  const iniciarSesion = async (email, contraseña) => {
    try {
      setError(null);
      const resultado = await signInWithEmailAndPassword(auth, email, contraseña);
      return resultado.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Cerrar sesión
  const cerrarSesion = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUsuario(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Verificar estado de autenticación
  const verificarEstado = (callback) => {
    const desuscribir = onAuthStateChanged(auth, (usuarioActual) => {
      setUsuario(usuarioActual);
      setCargando(false);
      if (callback) callback(usuarioActual);
    });
    return desuscribir;
  };

  return {
    usuario,
    cargando,
    error,
    registrar,
    iniciarSesion,
    cerrarSesion,
    verificarEstado,
  };
};
