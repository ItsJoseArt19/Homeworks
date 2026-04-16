import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LoginPage } from './components/LoginPage'
import { HomePage } from './components/HomePage'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
