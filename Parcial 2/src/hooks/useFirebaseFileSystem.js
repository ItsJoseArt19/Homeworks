import { db } from '../firebase/config'
import { useAuth } from '../context/AuthContext'
import { useFileSystem } from '../context/FileSystemContext'
import { ref, set, remove, update } from 'firebase/database'

export const useFirebaseFileSystem = () => {
  const { user } = useAuth()
  const { root } = useFileSystem()

  // Crear una carpeta o archivo
  const createItem = async (parentId, name, type) => {
    try {
      if (!user) throw new Error('Usuario no autenticado')
      if (type !== 'folder' && type !== 'file') throw new Error('Tipo inválido')

      const itemId = `${type}-${Date.now()}`
      const fileSystemRef = ref(db, `users/${user.uid}/fileSystem`)

      // Obtener el árbol actual y agregar el nuevo elemento
      const updatedTree = JSON.parse(JSON.stringify(convertTreeToJSON(root)))
      const parentNode = findNodeById(updatedTree, parentId)

      if (!parentNode) throw new Error('Carpeta padre no encontrada')
      if (parentNode.type !== 'folder') throw new Error('Solo se pueden agregar elementos a carpetas')

      const newItem = {
        id: itemId,
        name,
        type,
        createdBy: user.email,
        createdAt: new Date().toISOString(),
      }

      // Solo agregar children si es una carpeta
      if (type === 'folder') {
        newItem.children = []
      }

      if (!parentNode.children) parentNode.children = []
      parentNode.children.push(newItem)

      await set(fileSystemRef, updatedTree)
      return { success: true, id: itemId }
    } catch (error) {
      console.error('Error creating item:', error)
      return { success: false, error: error.message }
    }
  }

  // Eliminar una carpeta o archivo
  const deleteItem = async (itemId) => {
    try {
      if (!user) throw new Error('Usuario no autenticado')

      const fileSystemRef = ref(db, `users/${user.uid}/fileSystem`)
      const updatedTree = JSON.parse(JSON.stringify(convertTreeToJSON(root)))

      deleteNodeById(updatedTree, itemId)

      await set(fileSystemRef, updatedTree)
      return { success: true }
    } catch (error) {
      console.error('Error deleting item:', error)
      return { success: false, error: error.message }
    }
  }

  // Renombrar una carpeta o archivo
  const renameItem = async (itemId, newName) => {
    try {
      if (!user) throw new Error('Usuario no autenticado')

      const fileSystemRef = ref(db, `users/${user.uid}/fileSystem`)
      const updatedTree = JSON.parse(JSON.stringify(convertTreeToJSON(root)))
      const node = findNodeById(updatedTree, itemId)

      if (!node) throw new Error('Elemento no encontrado')
      node.name = newName

      await set(fileSystemRef, updatedTree)
      return { success: true }
    } catch (error) {
      console.error('Error renaming item:', error)
      return { success: false, error: error.message }
    }
  }

  return { createItem, deleteItem, renameItem }
}

// Funciones auxiliares
function convertTreeToJSON(node) {
  if (!node) return null

  const obj = {
    id: node.id,
    name: node.name,
    type: node.type,
    createdBy: node.createdBy,
    createdAt: node.createdAt,
  }

  if (node.type === 'folder' && node.children && node.children.length > 0) {
    obj.children = node.children.map((child) => convertTreeToJSON(child))
  }

  return obj
}

function findNodeById(node, id) {
  if (node.id === id) return node

  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, id)
      if (found) return found
    }
  }

  return null
}

function deleteNodeById(node, id) {
  if (node.children) {
    node.children = node.children.filter((child) => {
      if (child.id === id) return false
      deleteNodeById(child, id)
      return true
    })
  }
}
