import React, { createContext, useState, useEffect } from 'react'
import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, setUser, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
