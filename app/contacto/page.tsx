import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react';
import { ROUTES } from '@/lib';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contacto | Papalote Market',
  description: 'Contáctanos para cualquier duda o comentario sobre nuestros productos artesanales',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al inicio
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contáctanos</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un Mensaje</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="telefono"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+52 55 1234 5678"
                  />
                </div>

                <div>
                  <label
                    htmlFor="asunto"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Asunto *
                  </label>
                  <select
                    id="asunto"
                    name="asunto"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="consulta-producto">Consulta sobre producto</option>
                    <option value="estado-pedido">Estado de mi pedido</option>
                    <option value="devolucion">Devolución o cambio</option>
                    <option value="problema-tecnico">Problema técnico</option>
                    <option value="quiero-vender">Quiero vender mis productos</option>
                    <option value="colaboracion">Propuesta de colaboración</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="mensaje"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="acepto"
                    name="acepto"
                    required
                    className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded-sm focus:ring-primary-500"
                  />
                  <label htmlFor="acepto" className="text-sm text-gray-600">
                    Acepto la{' '}
                    <Link href={ROUTES.PRIVACY} className="text-primary-600 hover:underline">
                      Política de Privacidad
                    </Link>{' '}
                    y autorizo el tratamiento de mis datos personales
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary-600 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Email</p>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-primary-600 hover:underline text-sm"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary-600 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Teléfono</p>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-primary-600 hover:underline text-sm"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-primary-600 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">WhatsApp</p>
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline text-sm"
                    >
                      {siteConfig.contact.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-600 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Dirección</p>
                    <p className="text-gray-600 text-sm">
                      {siteConfig.business.address.street}
                      <br />
                      {siteConfig.business.address.city}, {siteConfig.business.address.postalCode}
                      <br />
                      {siteConfig.business.address.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary-600 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Horario de Atención</p>
                    <p className="text-gray-600 text-sm">
                      Lunes a Viernes: 9:00 AM - 6:00 PM
                      <br />
                      Sábados: 10:00 AM - 2:00 PM
                      <br />
                      <span className="text-gray-500">Hora de México (GMT-6)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-linear-to-r from-primary-600 to-primary-700 text-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Síguenos</h3>
              <p className="text-primary-100 text-sm mb-4">
                Mantente al día con nuestras novedades y descubre historias de artesanos
              </p>
              <div className="flex gap-3">
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Enlaces Rápidos</h3>
              <div className="space-y-2">
                <Link
                  href={ROUTES.FAQ}
                  className="block text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  → Preguntas Frecuentes
                </Link>
                <Link
                  href={ROUTES.SHIPPING_INFO}
                  className="block text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  → Información de Envíos
                </Link>
                <Link
                  href={ROUTES.RETURNS_POLICY}
                  className="block text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  → Política de Devoluciones
                </Link>
                <Link
                  href={ROUTES.SELL}
                  className="block text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  → Vender en Papalote Market
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section - Full Width */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Preguntas Frecuentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">¿Cuánto tardan en responder?</h3>
                <p className="text-gray-600 text-sm">
                  Respondemos todos los mensajes en menos de 24 horas hábiles. Los mensajes urgentes
                  suelen ser respondidos en menos de 2 horas.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">¿Puedo visitar sus oficinas?</h3>
                <p className="text-gray-600 text-sm">
                  Sí, pero recomendamos agendar una cita previa para asegurar que alguien esté
                  disponible para atenderte. Contáctanos para coordinar tu visita.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">¿Cómo puedo rastrear mi pedido?</h3>
                <p className="text-gray-600 text-sm">
                  Una vez enviado tu pedido, recibirás un email con el número de rastreo. También
                  puedes consultar el estado en la sección "Mis Pedidos" de tu cuenta.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">¿Atienden fines de semana?</h3>
                <p className="text-gray-600 text-sm">
                  Atendemos sábados por la mañana. Los mensajes recibidos después del horario o
                  domingos serán respondidos el siguiente día hábil.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">¿Tienen chat en vivo?</h3>
                <p className="text-gray-600 text-sm">
                  Próximamente habilitaremos chat en vivo durante horario de oficina. Por ahora,
                  WhatsApp es nuestra opción de respuesta más rápida.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">¿Puedo cambiar mi pedido?</h3>
                <p className="text-gray-600 text-sm">
                  Puedes modificar tu pedido dentro de las primeras 2 horas. Después, el artesano ya
                  habrá comenzado a prepararlo. Contáctanos lo antes posible.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Encuéntranos</h2>
          <div className="aspect-video w-full bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.5991478729245!2d-99.16512368509292!3d19.426472686887586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2de02ff7!2sAv.%20Paseo%20de%20la%20Reforma%2C%20Ju%C3%A1rez%2C%20Cuauht%C3%A9moc%2C%2006600%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX%2C%20Mexico!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Papalote Market"
            />
          </div>
          <p className="text-center text-gray-600 text-sm mt-4">
            {siteConfig.business.address.street}, {siteConfig.business.address.city},{' '}
            {siteConfig.business.address.postalCode}, {siteConfig.business.address.country}
          </p>
        </div>
      </div>
    </div>
  );
}
