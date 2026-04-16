import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { FileSystemProvider } from './context/FileSystemContext'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { FileSystemPage } from './pages/FileSystemPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import './styles/global.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <FileSystemProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/file-system"
              element={
                <ProtectedRoute>
                  <FileSystemPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/file-system" replace />} />
            <Route path="*" element={<Navigate to="/file-system" replace />} />
          </Routes>
        </FileSystemProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
