/**
 * @fileoverview Maintenance mode page displayed when the platform is under maintenance.
 * Shows a friendly message to users while admins can still access the site.
 * @module app/mantenimiento/page
 */

import { Wrench, Clock, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'En Mantenimiento | Papalote Market',
  description: 'Estamos realizando mejoras en nuestra plataforma. Volvemos pronto.',
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* Animated Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4 animate-pulse">
            <Wrench className="w-12 h-12 text-primary-600 dark:text-primary-400" />
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Estamos en Mantenimiento
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Estamos realizando mejoras para brindarte una mejor experiencia. Volveremos muy pronto.
        </p>

        {/* Status Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-300 mb-4">
            <Clock className="w-5 h-5 text-primary-500" />
            <span className="font-medium">Tiempo estimado de vuelta</span>
          </div>
          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">Muy pronto</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Estamos trabajando lo más rápido posible
          </p>
        </div>

        {/* What we're doing */}
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
            ¿Qué estamos haciendo?
          </h2>
          <ul className="text-left text-gray-600 dark:text-gray-400 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">•</span>
              <span>Mejorando el rendimiento de la plataforma</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">•</span>
              <span>Actualizando sistemas de seguridad</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-1">•</span>
              <span>Agregando nuevas funcionalidades</span>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:soporte@papalote.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
          >
            <Mail className="w-5 h-5" />
            Contactar Soporte
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium border border-gray-200 dark:border-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
            Intentar de nuevo
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-12 text-sm text-gray-500 dark:text-gray-500">
          Gracias por tu paciencia. — El equipo de Papalote Market
        </p>
      </div>
    </div>
  );
}
