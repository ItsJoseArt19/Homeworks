import React, { useState } from 'react'
import { useFileSystem } from '../context/FileSystemContext'
import { useFirebaseFileSystem } from '../hooks/useFirebaseFileSystem'

export const CreateItemForm = ({ parentId, isDisabled }) => {
  const [name, setName] = useState('')
  const [type, setType] = useState('folder')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { createItem } = useFirebaseFileSystem()
  const { root } = useFileSystem()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('El nombre es requerido')
      return
    }

    if (!parentId) {
      setError('Debes seleccionar una carpeta primero')
      return
    }

    setLoading(true)

    const result = await createItem(parentId, name.trim(), type)

    if (result.success) {
      setName('')
      setType('folder')
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  const parentName = parentId ? (parentId === 'root' ? 'Mi Computadora' : getNodeName(root, parentId)) : 'Nada seleccionado'

  return (
    <div className="create-item-form">
      <h3>Crear Nuevo Elemento</h3>

      <div className="form-info">
        <p>
          <strong>Ubicación:</strong> {parentName}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del elemento"
            disabled={loading || isDisabled}
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Tipo:</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value)} disabled={loading || isDisabled}>
            <option value="folder">📁 Carpeta</option>
            <option value="file">📄 Archivo</option>
          </select>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-primary" disabled={loading || isDisabled}>
          {loading ? 'Creando...' : 'Crear'}
        </button>
      </form>
    </div>
  )
}

function getNodeName(node, targetId) {
  if (node.id === targetId) return node.name

  if (node.children) {
    for (const child of node.children) {
      const found = getNodeName(child, targetId)
      if (found) return found
    }
  }

  return null
}
