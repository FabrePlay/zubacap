import React, { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { authAPI } from '@/lib/api'
import type { User, LoginCredentials, RegisterData } from '@/types'
import toast from 'react-hot-toast'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = Cookies.get('token')
      if (token) {
        try {
          const userData = await authAPI.me()
          setUser(userData)
        } catch (error) {
          console.error('Error fetching user:', error)
          Cookies.remove('token')
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authAPI.login(credentials)
      Cookies.set('token', response.jwt, { expires: 7 })
      setUser(response.user)
      toast.success('¡Bienvenido!')
    } catch (error: any) {
      const message = error.response?.data?.error?.message || 'Error al iniciar sesión'
      toast.error(message)
      throw error
    }
  }

  const register = async (data: RegisterData) => {
    try {
      const response = await authAPI.register(data)
      Cookies.set('token', response.jwt, { expires: 7 })
      setUser(response.user)
      toast.success('¡Cuenta creada exitosamente!')
    } catch (error: any) {
      const message = error.response?.data?.error?.message || 'Error al crear cuenta'
      toast.error(message)
      throw error
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setUser(null)
    toast.success('Sesión cerrada')
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}