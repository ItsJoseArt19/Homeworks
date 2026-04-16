import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/home.css'

export const HomePage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="home-container">
      <nav className="navbar">
        <h1>Bienvenido</h1>
        <div className="user-info">
          <span>Usuario: <strong>{user?.email}</strong></span>
          <button onClick={handleLogout} className="logout-btn">
            Cerrar sesión
          </button>
        </div>
      </nav>

      <div className="content">
        <div className="welcome-card">
          <h2>¡Hola!</h2>
          <p>Has iniciado sesión correctamente como:</p>
          <p className="user-email">{user?.email}</p>
          <p>Esta es la página principal protegida.</p>
        </div>
      </div>
    </div>
  )
}
