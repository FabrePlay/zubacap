import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { BookOpen, Clock, Users, Award, Calendar, ChevronRight } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { capacitacionAPI } from '@/lib/api'
import Navbar from '@/components/Navbar'
import LoadingSpinner from '@/components/LoadingSpinner'
import type { Capacitacion } from '@/types'

const DashboardPage = () => {
  const { user } = useAuth()
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const { data: capacitaciones, isLoading } = useQuery({
    queryKey: ['user-capacitaciones', user?.id],
    queryFn: () => capacitacionAPI.getUserCapacitaciones(user!.id),
    enabled: !!user,
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  const filteredCapacitaciones = capacitaciones?.filter((cap: Capacitacion) => {
    if (filter === 'active') return cap.estado === 'Publicado'
    if (filter === 'completed') return cap.estado === 'Archivado'
    return true
  }) || []

  const getUserRole = (capacitacion: Capacitacion) => {
    if (capacitacion.instructores?.some(instructor => instructor.id === user?.id)) {
      return 'Instructor'
    }
    if (capacitacion.supervisores?.some(supervisor => supervisor.id === user?.id)) {
      return 'Supervisor'
    }
    return 'Alumno'
  }

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'Publicado':
        return 'bg-green-100 text-green-800'
      case 'Borrador':
        return 'bg-yellow-100 text-yellow-800'
      case 'Archivado':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Instructor':
        return 'bg-blue-100 text-blue-800'
      case 'Supervisor':
        return 'bg-purple-100 text-purple-800'
      case 'Alumno':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-primary-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container-max section-padding">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary-900 mb-2">
              Bienvenido, {user?.username}
            </h1>
            <p className="text-primary-600">
              Aquí puedes acceder a todas tus capacitaciones y seguir tu progreso
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-900">
                    {capacitaciones?.length || 0}
                  </div>
                  <div className="text-sm text-primary-600">Capacitaciones</div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-900">
                    {filteredCapacitaciones.filter(cap => cap.estado === 'Publicado').length}
                  </div>
                  <div className="text-sm text-primary-600">Activas</div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-900">
                    {capacitaciones?.filter(cap => getUserRole(cap) === 'Instructor').length || 0}
                  </div>
                  <div className="text-sm text-primary-600">Como Instructor</div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-900">
                    {capacitaciones?.filter(cap => cap.ofreceCertificado).length || 0}
                  </div>
                  <div className="text-sm text-primary-600">Con Certificado</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary-900 text-white'
                  : 'bg-white text-primary-700 hover:bg-primary-50'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'active'
                  ? 'bg-primary-900 text-white'
                  : 'bg-white text-primary-700 hover:bg-primary-50'
              }`}
            >
              Activas
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'completed'
                  ? 'bg-primary-900 text-white'
                  : 'bg-white text-primary-700 hover:bg-primary-50'
              }`}
            >
              Completadas
            </button>
          </div>

          {/* Capacitaciones Grid */}
          {filteredCapacitaciones.length === 0 ? (
            <div className="card p-12 text-center">
              <BookOpen className="w-16 h-16 text-primary-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                No hay capacitaciones disponibles
              </h3>
              <p className="text-primary-600">
                {filter === 'all' 
                  ? 'Aún no tienes capacitaciones asignadas.'
                  : `No tienes capacitaciones ${filter === 'active' ? 'activas' : 'completadas'}.`
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCapacitaciones.map((capacitacion: Capacitacion) => (
                <Link
                  key={capacitacion.id}
                  to={`/capacitacion/${capacitacion.id}`}
                  className="card p-6 hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg mb-4 overflow-hidden">
                    {capacitacion.imagenPortada ? (
                      <img
                        src={capacitacion.imagenPortada.url}
                        alt={capacitacion.nombre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-primary-400" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold text-primary-900 group-hover:text-accent-600 transition-colors">
                        {capacitacion.nombre}
                      </h3>
                      <ChevronRight className="w-5 h-5 text-primary-400 group-hover:text-accent-600 transition-colors" />
                    </div>

                    <p className="text-primary-600 text-sm line-clamp-2">
                      {capacitacion.descripcion?.replace(/<[^>]*>/g, '') || 'Sin descripción disponible'}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(capacitacion.estado)}`}>
                        {capacitacion.estado}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(getUserRole(capacitacion))}`}>
                        {getUserRole(capacitacion)}
                      </span>
                      {capacitacion.ofreceCertificado && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Certificado
                        </span>
                      )}
                    </div>

                    {/* Dates */}
                    <div className="flex items-center space-x-4 text-xs text-primary-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(capacitacion.FechaInicio).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                      <span>-</span>
                      <span>
                        {new Date(capacitacion.FechaFin).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage