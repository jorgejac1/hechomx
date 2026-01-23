/**
 * @fileoverview Site footer component with navigation, social links, and legal information
 * Provides a comprehensive footer including shop navigation, about links, help resources,
 * legal pages, social media links, app download button, and contact information.
 * Displays copyright, locale, and currency information in the bottom bar.
 * @module components/layout/Footer
 */

import Link from 'next/link';
import { footerNavigation } from '@/config/navigation';
import { siteConfig, SITE_NAME } from '@/config/site';
import { ROUTES } from '@/lib/constants/routes';

/**
 * Footer component displaying site-wide navigation and information
 * Renders navigation sections, social media links, legal links, and contact details.
 * @returns {JSX.Element} The rendered footer with all navigation and information sections
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Shop Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{footerNavigation.shop.title}</h3>
            <ul className="space-y-2 text-sm">
              {footerNavigation.shop.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{footerNavigation.about.title}</h3>
            <ul className="space-y-2 text-sm">
              {footerNavigation.about.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{footerNavigation.help.title}</h3>
            <ul className="space-y-2 text-sm">
              {footerNavigation.help.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{footerNavigation.legal.title}</h3>
            <ul className="space-y-2 text-sm">
              {footerNavigation.legal.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & App Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex gap-4 mb-6">
              {/* Instagram */}
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition"
                aria-label="YouTube"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href={siteConfig.social.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition"
                aria-label="Pinterest"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0a12 12 0 0 0-4.37 23.17c-.05-.89-.1-2.26.02-3.24l.81-3.45s-.2-.4-.2-1c0-.92.54-1.61 1.21-1.61.57 0 .85.43.85.94 0 .57-.37 1.43-.56 2.22-.16.67.34 1.22 1 1.22 1.2 0 2.13-1.27 2.13-3.1 0-1.62-1.16-2.75-2.82-2.75-1.92 0-3.05 1.44-3.05 2.93 0 .58.22 1.2.5 1.54.05.06.06.12.04.18l-.19.78c-.03.11-.1.14-.22.08-.82-.38-1.33-1.58-1.33-2.54 0-2.13 1.55-4.09 4.47-4.09 2.35 0 4.17 1.67 4.17 3.91 0 2.33-1.47 4.21-3.51 4.21-.69 0-1.33-.36-1.55-.78l-.42 1.61c-.15.59-.56 1.33-.84 1.78a12 12 0 1 0 0-24z" />
                </svg>
              </a>
            </div>

            <Link
              href={ROUTES.APP_DOWNLOAD}
              className="inline-block px-6 py-3 bg-primary-600 rounded-full text-sm font-semibold hover:bg-primary-700 transition"
            >
              Descargar la App
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇲🇽</span>
                <span>{siteConfig.business.address.country}</span>
              </div>
              <span>|</span>
              <span>Español ({siteConfig.locale})</span>
              <span>|</span>
              <span>$ ({siteConfig.currency})</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <span>
                © {currentYear} {SITE_NAME}
              </span>
              <Link href={ROUTES.TERMS} className="hover:text-white transition">
                Términos de Uso
              </Link>
              <Link href={ROUTES.PRIVACY} className="hover:text-white transition">
                Privacidad
              </Link>
              <Link href={ROUTES.COOKIES} className="hover:text-white transition">
                Cookies
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 text-center text-sm text-gray-400">
            <p>
              Contacto:{' '}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-white transition"
              >
                {siteConfig.contact.email}
              </a>
              {' | '}
              <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition">
                {siteConfig.contact.phone}
              </a>
            </p>
            <p className="mt-2 text-xs">{siteConfig.business.legalName}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
