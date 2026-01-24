/**
 * @fileoverview Robots.txt generator for Papalote Market
 * Defines crawling rules for search engine bots.
 * @module app/robots
 */

import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/checkout/',
          '/carrito/',
          '/perfil/',
          '/configuracion/',
          '/mensajes/',
          '/pedidos/',
          '/pedidos-gestion/',
          '/resenas-gestion/',
          '/productos/crear/',
          '/productos/editar/',
          '/productos/gestionar/',
          '/verificacion/',
          '/mi-historia/',
          '/centro-tareas/',
          '/calculadora-precios/',
          '/mantenimiento/',
          '/iniciar-sesion/',
          '/registro/',
          '/_next/',
          '/static/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/dashboard/', '/checkout/', '/carrito/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
