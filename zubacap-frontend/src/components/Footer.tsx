import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="container-max section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-white to-accent-400 rounded-lg flex items-center justify-center">
                <span className="text-primary-900 font-bold text-sm">Z</span>
              </div>
              <span className="text-xl font-bold">Zubacap</span>
            </div>
            <p className="text-primary-300 text-sm leading-relaxed">
              Transformamos el aprendizaje empresarial a través de capacitaciones innovadoras y personalizadas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Enlaces Rápidos</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-primary-300 hover:text-white transition-colors text-sm">
                Inicio
              </Link>
              <Link to="/#servicios" className="block text-primary-300 hover:text-white transition-colors text-sm">
                Servicios
              </Link>
              <Link to="/#contacto" className="block text-primary-300 hover:text-white transition-colors text-sm">
                Contacto
              </Link>
              <Link to="/login" className="block text-primary-300 hover:text-white transition-colors text-sm">
                Acceder
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Servicios</h3>
            <div className="space-y-2">
              <p className="text-primary-300 text-sm">Capacitaciones Corporativas</p>
              <p className="text-primary-300 text-sm">Formación Online</p>
              <p className="text-primary-300 text-sm">Certificaciones</p>
              <p className="text-primary-300 text-sm">Consultoría</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent-400" />
                <span className="text-primary-300 text-sm">info@zubacap.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-accent-400" />
                <span className="text-primary-300 text-sm">+56 9 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-accent-400" />
                <span className="text-primary-300 text-sm">Santiago, Chile</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-400 text-sm">
              © 2024 Zubacap. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-primary-400 hover:text-white transition-colors text-sm">
                Política de Privacidad
              </a>
              <a href="#" className="text-primary-400 hover:text-white transition-colors text-sm">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer