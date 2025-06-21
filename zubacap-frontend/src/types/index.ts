export interface User {
  id: number
  username: string
  email: string
  confirmed: boolean
  blocked: boolean
  role: Role
  capacitaciones_como_instructor?: Capacitacion[]
  capacitaciones_como_supervisor?: Capacitacion[]
  inscripciones?: Inscripcion[]
  progresos_leccion?: ProgresoLeccion[]
  progresos_test?: ProgresoTestAlumno[]
  notificaciones?: Notificacion[]
}

export interface Role {
  id: number
  name: string
  description: string
  type: string
}

export interface Capacitacion {
  id: number
  nombre: string
  descripcion: string
  FechaInicio: string
  FechaFin: string
  imagenPortada?: Media
  estado: 'Borrador' | 'Publicado' | 'Archivado'
  visibilidadCalificaciones: 'Solo_Instructor' | 'Instructor_y_Supervisor' | 'Todos'
  ofreceCertificado: boolean
  instructores?: User[]
  supervisores?: User[]
  inscripciones?: Inscripcion[]
  modulos?: Modulo[]
  tests?: Test[]
  anuncios?: Anuncio[]
  codigos_invitacion?: CodigoInvitacion[]
}

export interface Modulo {
  id: number
  titulo: string
  orden: number
  lecciones?: Leccion[]
}

export interface Leccion {
  id: number
  titulo: string
  contenido: string
  videoUrl?: string
  orden: number
  recursos_adjuntos?: Media[]
  progresos?: ProgresoLeccion[]
}

export interface Test {
  id: number
  titulo: string
  instrucciones: string
  preguntas?: Pregunta[]
  progresos_alumnos?: ProgresoTestAlumno[]
}

export interface Pregunta {
  id: number
  enunciado: string
  alternativas?: Alternativa[]
}

export interface Alternativa {
  id: number
  Texto: string
  esCorrecta: boolean
}

export interface Inscripcion {
  id: number
  fechaInscripcion: string
  estado: 'Activa' | 'Completada' | 'Cancelada'
  fechaFinalizacion?: string
  urlCertificado?: string
  alumno?: User
}

export interface ProgresoLeccion {
  id: number
  estado: 'NoIniciado' | 'Completado'
  alumno?: User
  leccion?: Leccion
}

export interface ProgresoTestAlumno {
  id: number
  respuesta?: any
  calificacion?: number
  feedback?: string
  estado: 'Pendiente' | 'Enviado' | 'Calificado'
  alumno?: User
  test?: Test
}

export interface Anuncio {
  id: number
  titulo: string
  contenido: string
}

export interface Notificacion {
  id: number
  mensaje: string
  leido: boolean
  tipo: 'Test_Calificado' | 'Nuevo_Contenido' | 'Anuncio_General'
  usuario_destino?: User
}

export interface CodigoInvitacion {
  id: number
  codigo: string
  usosMaximos: number
  usosActuales: number
  capacitacion?: Capacitacion
  empresa?: Empresa
}

export interface Empresa {
  id: number
  nombre: string
  rut: string
  direccion?: string
  contactoNombre?: string
  contactoTelefono?: string
  contactoEmail?: string
  capacitaciones?: Capacitacion[]
  users?: User[]
  codigos_invitacion?: CodigoInvitacion[]
}

export interface Media {
  id: number
  name: string
  alternativeText?: string
  caption?: string
  width?: number
  height?: number
  formats?: any
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl?: string
  provider: string
  provider_metadata?: any
}

export interface AuthResponse {
  jwt: string
  user: User
}

export interface LoginCredentials {
  identifier: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
  codigo?: string
}