'use client';

import { Globe, Instagram, Facebook, Youtube, Video } from 'lucide-react';

interface SocialMediaSectionProps {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
  website?: string;
  onUpdate: (platform: string, value: string) => void;
}

export default function SocialMediaSection({
  instagram,
  facebook,
  youtube,
  tiktok,
  website,
  onUpdate,
}: SocialMediaSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Redes Sociales (Opcional)</h2>
        </div>
        <p className="text-sm text-gray-600">
          Conecta tus redes sociales para que los clientes puedan seguirte
        </p>
      </div>

      <div className="space-y-4">
        {/* Instagram */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Instagram className="w-4 h-4 text-pink-600" />
            Instagram
          </label>
          <input
            type="url"
            value={instagram || ''}
            onChange={(e) => onUpdate('instagram', e.target.value)}
            placeholder="https://instagram.com/tu_usuario"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Facebook */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Facebook className="w-4 h-4 text-blue-600" />
            Facebook
          </label>
          <input
            type="url"
            value={facebook || ''}
            onChange={(e) => onUpdate('facebook', e.target.value)}
            placeholder="https://facebook.com/tu_pagina"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* YouTube */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Youtube className="w-4 h-4 text-red-600" />
            YouTube
          </label>
          <input
            type="url"
            value={youtube || ''}
            onChange={(e) => onUpdate('youtube', e.target.value)}
            placeholder="https://youtube.com/@tu_canal"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* TikTok */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Video className="w-4 h-4 text-gray-900" />
            TikTok
          </label>
          <input
            type="url"
            value={tiktok || ''}
            onChange={(e) => onUpdate('tiktok', e.target.value)}
            placeholder="https://tiktok.com/@tu_usuario"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary-600" />
            Sitio Web
          </label>
          <input
            type="url"
            value={website || ''}
            onChange={(e) => onUpdate('website', e.target.value)}
            placeholder="https://tusitio.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Social Media Tips */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900 font-semibold mb-2">💡 Consejos para redes sociales:</p>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Comparte fotos del proceso detrás de tus productos</li>
          <li>• Publica regularmente para mantener a tus seguidores interesados</li>
          <li>• Responde a comentarios y mensajes rápidamente</li>
          <li>• Usa hashtags relevantes como #PapaloteMarket #Artesanía</li>
        </ul>
      </div>
    </div>
  );
}
