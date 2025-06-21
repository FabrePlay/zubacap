import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut, BookOpen } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setShowUserMenu(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-primary-100">
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-900 to-accent-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <span className="text-xl font-bold gradient-text">Zubacap</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-primary-700 hover:text-primary-900 transition-colors">
              Inicio
            </Link>
            <Link to="/#servicios" className="text-primary-700 hover:text-primary-900 transition-colors">
              Servicios
            </Link>
            <Link to="/#contacto" className="text-primary-700 hover:text-primary-900 transition-colors">
              Contacto
            </Link>
            
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-primary-700 hover:text-primary-900 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{user?.username}</span>
                </button>
                
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-primary-100 py-2"
                    >
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-2 px-4 py-2 text-primary-700 hover:bg-primary-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Mis Capacitaciones</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 text-primary-700 hover:bg-primary-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Cerrar Sesión</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="btn-primary">
                Acceder
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary-50 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-primary-100 mt-4 pt-4 pb-4"
            >
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="text-primary-700 hover:text-primary-900 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Inicio
                </Link>
                <Link
                  to="/#servicios"
                  className="text-primary-700 hover:text-primary-900 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Servicios
                </Link>
                <Link
                  to="/#contacto"
                  className="text-primary-700 hover:text-primary-900 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contacto
                </Link>
                
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 text-primary-700 hover:text-primary-900 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Mis Capacitaciones</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-primary-700 hover:text-primary-900 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="btn-primary inline-block text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Acceder
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar