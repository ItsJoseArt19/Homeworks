import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/login.css'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Por favor completa todos los campos')
      return
    }

    const success = login(email, password)
    if (success) {
      navigate('/home')
    } else {
      setError('Email o contraseña incorrectos')
      setPassword('')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@mail.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="123"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-btn">
            Ingresar
          </button>
        </form>

        <div className="credentials-info">
          <p><strong>Credenciales de prueba:</strong></p>
          <p>Email: user@mail.com</p>
          <p>Contraseña: 123</p>
        </div>
      </div>
    </div>
  )
}
