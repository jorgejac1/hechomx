import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Comprar */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Comprar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/regalos" className="text-blue-200 hover:text-white transition">
                  Tarjetas de regalo
                </Link>
              </li>
              <li>
                <Link href="/productos" className="text-blue-200 hover:text-white transition">
                  Todos los productos
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-blue-200 hover:text-white transition">
                  Mapa del sitio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-blue-200 hover:text-white transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Vender */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Vender</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/vender" className="text-blue-200 hover:text-white transition">
                  Vender en Hecho en Mexico
                </Link>
              </li>
              <li>
                <Link href="/equipos" className="text-blue-200 hover:text-white transition">
                  Equipos
                </Link>
              </li>
              <li>
                <Link href="/foros" className="text-blue-200 hover:text-white transition">
                  Foros
                </Link>
              </li>
              <li>
                <Link href="/afiliados" className="text-blue-200 hover:text-white transition">
                  Afiliados y Creadores
                </Link>
              </li>
            </ul>
          </div>

          {/* Acerca de */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Acerca de</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/nosotros" className="text-blue-200 hover:text-white transition">
                  Hecho en Mexico Inc
                </Link>
              </li>
              <li>
                <Link href="/politicas" className="text-blue-200 hover:text-white transition">
                  Politicas
                </Link>
              </li>
              <li>
                <Link href="/inversionistas" className="text-blue-200 hover:text-white transition">
                  Inversionistas
                </Link>
              </li>
              <li>
                <Link href="/carreras" className="text-blue-200 hover:text-white transition">
                  Carreras
                </Link>
              </li>
              <li>
                <Link href="/prensa" className="text-blue-200 hover:text-white transition">
                  Prensa
                </Link>
              </li>
              <li>
                <Link href="/impacto" className="text-blue-200 hover:text-white transition">
                  Impacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ayuda" className="text-blue-200 hover:text-white transition">
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-blue-200 hover:text-white transition">
                  Configuracion de privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Siguenos</h3>
            <div className="flex gap-4 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
            
            <Link
              href="/app"
              className="inline-block px-6 py-3 bg-indigo-800 rounded-full text-sm font-semibold hover:bg-indigo-900 transition"
            >
              Descargar la App
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-indigo-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-200">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇲🇽</span>
                <span>Mexico</span>
              </div>
              <span>|</span>
              <span>Espanol (MX)</span>
              <span>|</span>
              <span>$ (MXN)</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <span>2024 Hecho en Mexico Inc</span>
              <Link href="/terminos" className="hover:text-white transition">
                Terminos de Uso
              </Link>
              <Link href="/privacidad" className="hover:text-white transition">
                Privacidad
              </Link>
              <Link href="/regiones" className="hover:text-white transition">
                Regiones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}