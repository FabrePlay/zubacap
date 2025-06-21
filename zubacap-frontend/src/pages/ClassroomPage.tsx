import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { BookOpen, Play, FileText, CheckCircle, Clock, Users, Calendar } from 'lucide-react'
import { capacitacionAPI, moduloAPI, leccionAPI } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'
import Navbar from '@/components/Navbar'
import LoadingSpinner from '@/components/LoadingSpinner'
import type { Capacitacion, Modulo, Leccion } from '@/types'

const ClassroomPage = () => {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const [selectedModulo, setSelectedModulo] = useState<number | null>(null)
  const [selectedLeccion, setSelectedLeccion] = useState<Leccion | null>(null)

  const { data: capacitacion, isLoading: loadingCapacitacion } = useQuery({
    queryKey: ['capacitacion', id],
    queryFn: () => capacitacionAPI.getById(id!),
    enabled: !!id,
  })

  const { data: modulos, isLoading: loadingModulos } = useQuery({
    queryKey: ['modulos', id],
    queryFn: () => moduloAPI.getByCapacitacion(id!),
    enabled: !!id,
  })

  const { data: lecciones } = useQuery({
    queryKey: ['lecciones', selectedModulo],
    queryFn: () => leccionAPI.getByModulo(selectedModulo!.toString()),
    enabled: !!selectedModulo,
  })

  if (loadingCapacitacion || loadingModulos) {
    return <LoadingSpinner />
  }

  if (!capacitacion) {
    return (
      <div className="min-h-screen bg-primary-50">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="container-max section-padding">
            <div className="card p-12 text-center">
              <h2 className="text-2xl font-bold text-primary-900 mb-4">
                Capacitación no encontrada
              </h2>
              <p className="text-primary-600">
                La capacitación que buscas no existe o no tienes acceso a ella.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getUserRole = () => {
    if (capacitacion.instructores?.some(instructor => instructor.id === user?.id)) {
      return 'Instructor'
    }
    if (capacitacion.supervisores?.some(supervisor => supervisor.id === user?.id)) {
      return 'Supervisor'
    }
    return 'Alumno'
  }

  return (
    <div className="min-h-screen bg-primary-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container-max section-padding">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-900 to-accent-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary-900">
                  {capacitacion.nombre}
                </h1>
                <div className="flex items-center space-x-4 text-primary-600">
                  <span className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{getUserRole()}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(capacitacion.FechaInicio).toLocaleDateString('es-ES')} - {' '}
                      {new Date(capacitacion.FechaFin).toLocaleDateString('es-ES')}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            
            {capacitacion.descripcion && (
              <div 
                className="text-primary-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: capacitacion.descripcion }}
              />
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Course Content */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-primary-900 mb-4">
                  Contenido del Curso
                </h3>
                
                <div className="space-y-2">
                  {modulos?.map((modulo: Modulo, index: number) => (
                    <div key={modulo.id}>
                      <button
                        onClick={() => {
                          setSelectedModulo(selectedModulo === modulo.id ? null : modulo.id)
                          setSelectedLeccion(null)
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedModulo === modulo.id
                            ? 'bg-accent-100 text-accent-800'
                            : 'hover:bg-primary-50 text-primary-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            selectedModulo === modulo.id
                              ? 'bg-accent-600 text-white'
                              : 'bg-primary-200 text-primary-700'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="font-medium">{modulo.titulo}</span>
                        </div>
                      </button>
                      
                      {selectedModulo === modulo.id && lecciones && (
                        <div className="ml-6 mt-2 space-y-1">
                          {lecciones.map((leccion: Leccion) => (
                            <button
                              key={leccion.id}
                              onClick={() => setSelectedLeccion(leccion)}
                              className={`w-full text-left p-2 rounded-md text-sm transition-colors ${
                                selectedLeccion?.id === leccion.id
                                  ? 'bg-accent-50 text-accent-700'
                                  : 'hover:bg-primary-50 text-primary-600'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                {leccion.videoUrl ? (
                                  <Play className="w-4 h-4" />
                                ) : (
                                  <FileText className="w-4 h-4" />
                                )}
                                <span>{leccion.titulo}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {selectedLeccion ? (
                <div className="space-y-6">
                  {/* Lesson Header */}
                  <div className="card p-6">
                    <h2 className="text-2xl font-bold text-primary-900 mb-2">
                      {selectedLeccion.titulo}
                    </h2>
                    <div className="flex items-center space-x-4 text-primary-600">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Lección {selectedLeccion.orden}</span>
                      </span>
                    </div>
                  </div>

                  {/* Video Player */}
                  {selectedLeccion.videoUrl && (
                    <div className="card p-6">
                      <div className="aspect-video bg-black rounded-lg overflow-hidden">
                        <iframe
                          src={selectedLeccion.videoUrl}
                          className="w-full h-full"
                          allowFullScreen
                          title={selectedLeccion.titulo}
                        />
                      </div>
                    </div>
                  )}

                  {/* Lesson Content */}
                  {selectedLeccion.contenido && (
                    <div className="card p-6">
                      <h3 className="text-lg font-semibold text-primary-900 mb-4">
                        Contenido de la Lección
                      </h3>
                      <div 
                        className="prose prose-primary max-w-none"
                        dangerouslySetInnerHTML={{ __html: selectedLeccion.contenido }}
                      />
                    </div>
                  )}

                  {/* Resources */}
                  {selectedLeccion.recursos_adjuntos && selectedLeccion.recursos_adjuntos.length > 0 && (
                    <div className="card p-6">
                      <h3 className="text-lg font-semibold text-primary-900 mb-4">
                        Recursos Adicionales
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedLeccion.recursos_adjuntos.map((recurso, index) => (
                          <a
                            key={index}
                            href={recurso.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-3 border border-primary-200 rounded-lg hover:border-accent-300 hover:bg-accent-50 transition-colors"
                          >
                            <FileText className="w-5 h-5 text-accent-600" />
                            <div>
                              <div className="font-medium text-primary-900">{recurso.name}</div>
                              <div className="text-sm text-primary-600">{recurso.ext?.toUpperCase()}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Progress Actions */}
                  <div className="card p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-primary-700">Marcar como completada</span>
                      </div>
                      <button className="btn-primary">
                        Completar Lección
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Welcome Screen */
                <div className="card p-12 text-center">
                  <BookOpen className="w-16 h-16 text-primary-300 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-primary-900 mb-4">
                    Bienvenido a tu capacitación
                  </h2>
                  <p className="text-primary-600 mb-8 max-w-2xl mx-auto">
                    Selecciona un módulo del menú lateral para comenzar con las lecciones. 
                    Podrás seguir tu progreso y acceder a todos los recursos disponibles.
                  </p>
                  
                  {modulos && modulos.length > 0 && (
                    <button
                      onClick={() => {
                        setSelectedModulo(modulos[0].id)
                      }}
                      className="btn-primary"
                    >
                      Comenzar Primer Módulo
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassroomPage