import axios from 'axios'
import Cookies from 'js-cookie'
import type { AuthResponse, LoginCredentials, RegisterData, User, Capacitacion } from '@/types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = Cookies.get('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/local', credentials)
    return response.data
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/local/register', data)
    return response.data
  },

  me: async (): Promise<User> => {
    const response = await api.get('/users/me?populate=*')
    return response.data
  },

  validateInvitationCode: async (codigo: string) => {
    const response = await api.get(`/codigo-invitacions?filters[codigo][$eq]=${codigo}&populate=*`)
    return response.data
  }
}

export const capacitacionAPI = {
  getAll: async (): Promise<Capacitacion[]> => {
    const response = await api.get('/capacitacions?populate=*')
    return response.data.data
  },

  getById: async (id: string): Promise<Capacitacion> => {
    const response = await api.get(`/capacitacions/${id}?populate=deep`)
    return response.data.data
  },

  getUserCapacitaciones: async (userId: number): Promise<Capacitacion[]> => {
    // Get capacitaciones where user is instructor, supervisor, or has inscripcion
    const [instructor, supervisor, inscripciones] = await Promise.all([
      api.get(`/capacitacions?filters[instructores][id][$eq]=${userId}&populate=*`),
      api.get(`/capacitacions?filters[supervisores][id][$eq]=${userId}&populate=*`),
      api.get(`/inscripcions?filters[alumno][id][$eq]=${userId}&populate=*`)
    ])

    const capacitacionesInstructor = instructor.data.data || []
    const capacitacionesSupervisor = supervisor.data.data || []
    const capacitacionesAlumno = inscripciones.data.data?.map((inscripcion: any) => inscripcion.attributes.capacitacion) || []

    // Combine and deduplicate
    const allCapacitaciones = [...capacitacionesInstructor, ...capacitacionesSupervisor, ...capacitacionesAlumno]
    const uniqueCapacitaciones = allCapacitaciones.filter((cap, index, self) => 
      index === self.findIndex(c => c.id === cap.id)
    )

    return uniqueCapacitaciones
  }
}

export const moduloAPI = {
  getByCapacitacion: async (capacitacionId: string) => {
    const response = await api.get(`/modulos?filters[capacitacion][id][$eq]=${capacitacionId}&populate=*&sort=orden:asc`)
    return response.data.data
  }
}

export const leccionAPI = {
  getByModulo: async (moduloId: string) => {
    const response = await api.get(`/leccions?filters[modulo][id][$eq]=${moduloId}&populate=*&sort=orden:asc`)
    return response.data.data
  }
}

export const progresoAPI = {
  updateProgresoLeccion: async (leccionId: number, estado: 'NoIniciado' | 'Completado') => {
    const response = await api.post('/progreso-leccions', {
      data: {
        leccion: leccionId,
        estado,
        alumno: await getCurrentUserId()
      }
    })
    return response.data
  },

  getProgresoByUser: async (userId: number) => {
    const response = await api.get(`/progreso-leccions?filters[alumno][id][$eq]=${userId}&populate=*`)
    return response.data.data
  }
}

async function getCurrentUserId(): Promise<number> {
  const user = await authAPI.me()
  return user.id
}

export default api