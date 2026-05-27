import React, { useState } from 'react'
import { useFirebaseFileSystem } from '../hooks/useFirebaseFileSystem'

export const FileSystemView = ({ node, selectedNodeId, setSelectedNodeId }) => {
  const [expandedNodes, setExpandedNodes] = useState(new Set(['root']))
  const { deleteItem, renameItem } = useFirebaseFileSystem()
  const [renamingId, setRenamingId] = useState(null)
  const [newName, setNewName] = useState('')

  const toggleExpand = (nodeId) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId)
    } else {
      newExpanded.add(nodeId)
    }
    setExpandedNodes(newExpanded)
  }

  const handleDelete = async (nodeId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esto?')) {
      await deleteItem(nodeId)
    }
  }

  const handleRename = async (nodeId, currentName) => {
    setRenamingId(nodeId)
    setNewName(currentName)
  }

  const handleSaveRename = async (nodeId) => {
    if (newName.trim() && newName !== node.name) {
      await renameItem(nodeId, newName.trim())
    }
    setRenamingId(null)
    setNewName('')
  }

  const renderNode = (currentNode, depth = 0) => {
    const isExpanded = expandedNodes.has(currentNode.id)
    const isSelected = selectedNodeId === currentNode.id
    const hasChildren = currentNode.children && currentNode.children.length > 0
    const isRenaming = renamingId === currentNode.id

    return (
      <div key={currentNode.id} className={`node node-${currentNode.type} ${isSelected ? 'selected' : ''}`} style={{ marginLeft: `${depth * 20}px` }}>
        <div className="node-header">
          {currentNode.type === 'folder' && hasChildren && (
            <button className={`expand-btn ${isExpanded ? 'expanded' : ''}`} onClick={() => toggleExpand(currentNode.id)}>
              ▶
            </button>
          )}
          {currentNode.type === 'folder' && !hasChildren && <span className="expand-btn-empty">·</span>}

          <span className="node-icon">{currentNode.type === 'folder' ? '📁' : '📄'}</span>

          {isRenaming ? (
            <input
              type="text"
              className="rename-input"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={() => handleSaveRename(currentNode.id)}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(currentNode.id)}
              autoFocus
            />
          ) : (
            <span className="node-name" onClick={() => setSelectedNodeId(currentNode.id)}>
              {currentNode.name}
            </span>
          )}

          <div className="node-actions">
            <button className="btn-action" onClick={() => handleRename(currentNode.id, currentNode.name)} title="Renombrar">
              ✏️
            </button>
            {currentNode.id !== 'root' && (
              <button className="btn-action" onClick={() => handleDelete(currentNode.id)} title="Eliminar">
                🗑️
              </button>
            )}
          </div>
        </div>

        {currentNode.type === 'folder' && isExpanded && currentNode.children && currentNode.children.length > 0 && (
          <div className="node-children">
            {currentNode.children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return <div className="file-system-view">{renderNode(node)}</div>
}
