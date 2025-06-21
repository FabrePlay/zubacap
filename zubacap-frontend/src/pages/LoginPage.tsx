import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { authAPI } from '@/lib/api'
import toast from 'react-hot-toast'

const loginSchema = z.object({
  identifier: z.string().min(1, 'Email o usuario requerido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

const registerSchema = z.object({
  username: z.string().min(3, 'El usuario debe tener al menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

type LoginFormData = z.infer<typeof loginSchema>
type RegisterFormData = z.infer<typeof registerSchema>

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [invitationData, setInvitationData] = useState<any>(null)
  const { login, register, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { codigo } = useParams()

  const from = location.state?.from?.pathname || '/dashboard'

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  useEffect(() => {
    if (codigo) {
      validateInvitationCode()
      setIsLogin(false) // Switch to register mode for invitation codes
    }
  }, [codigo])

  const validateInvitationCode = async () => {
    try {
      const response = await authAPI.validateInvitationCode(codigo!)
      if (response.data && response.data.length > 0) {
        setInvitationData(response.data[0])
        toast.success('Código de invitación válido')
      } else {
        toast.error('Código de invitación inválido')
        navigate('/login')
      }
    } catch (error) {
      toast.error('Error al validar el código de invitación')
      navigate('/login')
    }
  }

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      await login(data)
      navigate(from, { replace: true })
    } catch (error) {
      // Error is handled in the auth context
    }
  }

  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      const registerData = {
        username: data.username,
        email: data.email,
        password: data.password,
        codigo: codigo,
      }
      await register(registerData)
      navigate(from, { replace: true })
    } catch (error) {
      // Error is handled in the auth context
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center section-padding">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al inicio</span>
        </Link>

        <div className="card p-8 space-y-6">
          {/* Logo */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-900 to-accent-600 rounded-xl flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-lg">Z</span>
            </div>
            <h1 className="text-2xl font-bold gradient-text">Zubacap</h1>
            <p className="text-primary-600">
              {isLogin ? 'Accede a tu cuenta' : 'Crea tu cuenta'}
            </p>
          </div>

          {/* Invitation info */}
          {invitationData && (
            <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
              <p className="text-sm text-accent-800">
                <strong>Invitación para:</strong> {invitationData.attributes.capacitacion?.data?.attributes?.nombre}
              </p>
              <p className="text-xs text-accent-600 mt-1">
                Empresa: {invitationData.attributes.empresa?.data?.attributes?.nombre}
              </p>
            </div>
          )}

          {/* Toggle buttons */}
          {!codigo && (
            <div className="flex bg-primary-100 rounded-lg p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  isLogin
                    ? 'bg-white text-primary-900 shadow-sm'
                    : 'text-primary-600 hover:text-primary-900'
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  !isLogin
                    ? 'bg-white text-primary-900 shadow-sm'
                    : 'text-primary-600 hover:text-primary-900'
                }`}
              >
                Registrarse
              </button>
            </div>
          )}

          {/* Login Form */}
          {isLogin ? (
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Email o Usuario
                </label>
                <input
                  {...loginForm.register('identifier')}
                  type="text"
                  className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                  placeholder="tu@email.com"
                />
                {loginForm.formState.errors.identifier && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginForm.formState.errors.identifier.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    {...loginForm.register('password')}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-4 py-3 pr-12 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400 hover:text-primary-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loginForm.formState.isSubmitting}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loginForm.formState.isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Usuario
                </label>
                <input
                  {...registerForm.register('username')}
                  type="text"
                  className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                  placeholder="usuario123"
                />
                {registerForm.formState.errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerForm.formState.errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Email
                </label>
                <input
                  {...registerForm.register('email')}
                  type="email"
                  className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                  placeholder="tu@email.com"
                />
                {registerForm.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    {...registerForm.register('password')}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-4 py-3 pr-12 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400 hover:text-primary-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {registerForm.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Confirmar Contraseña
                </label>
                <input
                  {...registerForm.register('confirmPassword')}
                  type="password"
                  className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                  placeholder="••••••••"
                />
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {registerForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={registerForm.formState.isSubmitting}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {registerForm.formState.isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-primary-600">
            <p>
              ¿Necesitas ayuda?{' '}
              <a href="mailto:soporte@zubacap.com" className="text-accent-600 hover:text-accent-700">
                Contacta soporte
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage