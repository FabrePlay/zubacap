import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Users, Award, Target, CheckCircle, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="gradient-text">Zubacap</span>
                  <br />
                  <span className="text-primary-900">Capacitaciones</span>
                  <br />
                  <span className="text-primary-700">Empresariales</span>
                </h1>
                <p className="text-xl text-primary-600 leading-relaxed max-w-lg">
                  Transformamos el potencial de tu equipo con capacitaciones personalizadas, 
                  innovadoras y orientadas a resultados.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login" className="btn-primary flex items-center justify-center space-x-2">
                  <span>Comenzar Ahora</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="#servicios" className="btn-secondary flex items-center justify-center space-x-2">
                  <span>Conocer Más</span>
                </a>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-900">500+</div>
                  <div className="text-sm text-primary-600">Empresas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-900">10K+</div>
                  <div className="text-sm text-primary-600">Profesionales</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-900">95%</div>
                  <div className="text-sm text-primary-600">Satisfacción</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Capacitación empresarial"
                  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-accent-200 to-accent-300 rounded-2xl -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-gradient-to-br from-primary-200 to-primary-300 rounded-2xl -z-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl font-bold text-primary-900">
              ¿Por qué elegir Zubacap?
            </h2>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto">
              Ofrecemos soluciones integrales de capacitación que se adaptan a las necesidades específicas de tu empresa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Contenido Personalizado",
                description: "Capacitaciones diseñadas específicamente para tu industria y objetivos empresariales"
              },
              {
                icon: Users,
                title: "Instructores Expertos",
                description: "Profesionales certificados con amplia experiencia en formación corporativa"
              },
              {
                icon: Award,
                title: "Certificaciones",
                description: "Certificados oficiales que validan las competencias adquiridas por tu equipo"
              },
              {
                icon: Target,
                title: "Resultados Medibles",
                description: "Seguimiento detallado del progreso y métricas de impacto en tu organización"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-8 text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-primary-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-primary-50">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl font-bold text-primary-900">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto">
              Soluciones completas de capacitación para impulsar el crecimiento de tu empresa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                {[
                  "Capacitaciones síncronas y asíncronas",
                  "Plataforma de aprendizaje personalizada",
                  "Seguimiento de progreso en tiempo real",
                  "Certificaciones oficiales",
                  "Soporte técnico especializado",
                  "Reportes detallados de desempeño"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4"
                  >
                    <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0" />
                    <span className="text-primary-700 text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>
              
              <Link to="/login" className="btn-accent inline-flex items-center space-x-2">
                <span>Solicitar Demo</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Servicios de capacitación"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl font-bold text-primary-900">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto">
              Empresas líderes confían en Zubacap para el desarrollo de su talento humano
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                position: "Gerente de RRHH",
                company: "TechCorp",
                content: "Zubacap transformó completamente nuestro programa de capacitación. Los resultados han sido excepcionales.",
                rating: 5
              },
              {
                name: "Carlos Rodríguez",
                position: "Director de Operaciones",
                company: "InnovateSA",
                content: "La plataforma es intuitiva y el contenido de alta calidad. Nuestro equipo está más preparado que nunca.",
                rating: 5
              },
              {
                name: "Ana Martínez",
                position: "CEO",
                company: "GrowthLab",
                content: "El seguimiento personalizado y los reportes detallados nos permiten medir el impacto real de las capacitaciones.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-8 space-y-6"
              >
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-primary-700 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="space-y-1">
                  <div className="font-semibold text-primary-900">{testimonial.name}</div>
                  <div className="text-sm text-primary-600">{testimonial.position}</div>
                  <div className="text-sm text-accent-600 font-medium">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900 to-accent-800">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-4xl font-bold text-white">
              ¿Listo para transformar tu empresa?
            </h2>
            <p className="text-xl text-primary-200 max-w-3xl mx-auto">
              Únete a las empresas que ya están potenciando su talento humano con Zubacap
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors shadow-lg">
                Comenzar Ahora
              </Link>
              <a 
                href="#contacto" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-900 transition-colors"
              >
                Contactar Ventas
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-primary-50">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl font-bold text-primary-900">
              Contáctanos
            </h2>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto">
              Estamos aquí para ayudarte a diseñar la solución perfecta para tu empresa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-primary-900">
                  Hablemos de tu proyecto
                </h3>
                <p className="text-primary-600 leading-relaxed">
                  Nuestro equipo de expertos está listo para ayudarte a diseñar un programa de capacitación 
                  que se adapte perfectamente a las necesidades de tu empresa.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary-900">Email</div>
                    <div className="text-primary-600">info@zubacap.com</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary-900">Teléfono</div>
                    <div className="text-primary-600">+56 9 1234 5678</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                      placeholder="Nombre de la empresa"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors"
                    placeholder="tu@empresa.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Cuéntanos sobre tu proyecto..."
                  ></textarea>
                </div>
                <button type="submit" className="btn-accent w-full">
                  Enviar Mensaje
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage