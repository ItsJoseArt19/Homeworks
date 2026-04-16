import React, { createContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { db } from '../firebase/config'
import { ref, onValue } from 'firebase/database'

export const FileSystemContext = createContext()

// Clase para representar un nodo del árbol n-ario
class FileNode {
  constructor(id, name, type, createdBy, createdAt = new Date().toISOString()) {
    this.id = id
    this.name = name
    this.type = type // 'folder' o 'file'
    this.createdBy = createdBy
    this.createdAt = createdAt
    this.children = [] // Solo para carpetas
  }

  addChild(child) {
    if (this.type === 'folder' && child.type === 'file' || child.type === 'folder') {
      this.children.push(child)
      return true
    }
    return false
  }

  removeChild(childId) {
    this.children = this.children.filter((child) => child.id !== childId)
  }

  getChild(childId) {
    return this.children.find((child) => child.id === childId)
  }
}

export const FileSystemProvider = ({ children }) => {
  const [root, setRoot] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      setRoot(null)
      setLoading(false)
      return
    }

    const fileSystemRef = ref(db, `users/${user.uid}/fileSystem`)

    const unsubscribe = onValue(fileSystemRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const treeRoot = buildTreeFromData(data, user.email)
        setRoot(treeRoot)
      } else {
        // Si no existe, crear la raíz
        const newRoot = new FileNode('root', 'Mi Computadora', 'folder', user.email)
        setRoot(newRoot)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user])

  const buildTreeFromData = (data, userEmail) => {
    const root = new FileNode(data.id, data.name, data.type, data.createdBy, data.createdAt)
    
    if (data.children && data.type === 'folder') {
      Object.values(data.children).forEach((childData) => {
        const childNode = buildTreeFromData(childData, userEmail)
        root.addChild(childNode)
      })
    }

    return root
  }

  return (
    <FileSystemContext.Provider value={{ root, setRoot, loading }}>
      {children}
    </FileSystemContext.Provider>
  )
}

export const useFileSystem = () => {
  const context = React.useContext(FileSystemContext)
  if (!context) {
    throw new Error('useFileSystem must be used within a FileSystemProvider')
  }
  return context
}
