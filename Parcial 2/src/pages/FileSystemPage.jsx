import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFileSystem } from '../context/FileSystemContext'
import { useFirebaseAuth } from '../hooks/useFirebaseAuth'
import { FileSystemView } from '../components/FileSystemView'
import { CreateItemForm } from '../components/CreateItemForm'
import '../styles/file-system.css'

export const FileSystemPage = () => {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const { root, loading: fsLoading } = useFileSystem()
  const { logout } = useFirebaseAuth()
  const [selectedNodeId, setSelectedNodeId] = useState(null)

  if (authLoading || fsLoading) {
    return <div className="loading-container"><p>Cargando...</p></div>
  }

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      navigate('/login')
    }
  }

  return (
    <div className="file-system-container">
      <nav className="navbar">
        <div className="nav-content">
          <h1>📁 Sistema de Archivos</h1>
          <div className="nav-right">
            <span className="user-info">{user?.email}</span>
            <button onClick={handleLogout} className="btn-logout">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      <main className="file-system-main">
        <div className="file-system-layout">
          <div className="file-system-content">
            {root && <FileSystemView node={root} selectedNodeId={selectedNodeId} setSelectedNodeId={setSelectedNodeId} />}
          </div>

          <div className="file-system-sidebar">
            <CreateItemForm parentId={selectedNodeId || 'root'} isDisabled={!selectedNodeId && selectedNodeId !== 'root'} />
          </div>
        </div>
      </main>
    </div>
  )
}
