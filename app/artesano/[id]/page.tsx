'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { ArtisanStory } from '@/lib/types/artisan-story';
import { getShopSlug } from '@/lib/utils/shop';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import {
  MapPin,
  Award,
  Users,
  Calendar,
  Heart,
  Instagram,
  Facebook,
  Video,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Globe,
} from 'lucide-react';

export default function ArtisanProfilePage() {
  const params = useParams();
  const [story, setStory] = useState<ArtisanStory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<'story' | 'process' | 'recognition'>('story');

  useEffect(() => {
    async function loadStory() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/artisan-stories');
        const data: Record<string, ArtisanStory> = await response.json();

        const foundStory = data[params.id as string] || null;

        setStory(foundStory);
      } catch (error) {
        console.error('Error loading artisan story:', error);
        setStory(null);
      }
      setIsLoading(false);
    }
    loadStory();
  }, [params.id]);

  if (isLoading) {
    return <LoadingSpinner size="lg" fullScreen text="Cargando historia..." />;
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Historia No Encontrada</h2>
          <p className="text-gray-600 mb-6">Esta historia artesanal aún no está disponible.</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Cover Image */}
      <div className="relative h-[400px] bg-gradient-to-br from-primary-600 to-primary-800">
        {story.coverImage && (
          <Image
            src={story.coverImage}
            alt={story.artisanName}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Back Button - Fixed */}
        <Link
          href="/"
          className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition text-gray-900 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Link>

        {/* Artisan Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                  {story.avatar ? (
                    <Image
                      src={story.avatar}
                      alt={story.artisanName}
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-600">
                        {story.artisanName.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 p-2 bg-primary-600 rounded-full">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-white">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">{story.artisanName}</h1>
                <p className="text-xl text-gray-200 mb-3">{story.specialty}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {story.location.city}, {story.location.state}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {story.yearsOfExperience} años de experiencia
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {story.generationsOfCraft} generaciones
                  </span>
                </div>
              </div>

              {/* Social Media - Fixed Icons */}
              {story.socialMedia && (
                <div className="flex gap-3">
                  {story.socialMedia.instagram && (
                    <a
                      href={
                        story.socialMedia.instagram.startsWith('http')
                          ? story.socialMedia.instagram
                          : `https://instagram.com/${story.socialMedia.instagram.replace('@', '')}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition group"
                      title="Instagram"
                    >
                      <Instagram className="w-5 h-5 text-white" />
                    </a>
                  )}
                  {story.socialMedia.facebook && (
                    <a
                      href={
                        story.socialMedia.facebook.startsWith('http')
                          ? story.socialMedia.facebook
                          : `https://facebook.com/${story.socialMedia.facebook}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition group"
                      title="Facebook"
                    >
                      <Facebook className="w-5 h-5 text-white" />
                    </a>
                  )}
                  {story.socialMedia.youtube && (
                    <a
                      href={
                        story.socialMedia.youtube.startsWith('http')
                          ? story.socialMedia.youtube
                          : `https://youtube.com/${story.socialMedia.youtube}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition group"
                      title="YouTube"
                    >
                      <Video className="w-5 h-5 text-white" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <p className="text-3xl font-bold text-primary-600">{story.yearsOfExperience}</p>
            <p className="text-sm text-gray-600">Años</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <p className="text-3xl font-bold text-primary-600">{story.generationsOfCraft}</p>
            <p className="text-sm text-gray-600">Generaciones</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <p className="text-3xl font-bold text-primary-600">{story.apprentices || 0}</p>
            <p className="text-sm text-gray-600">Aprendices</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <p className="text-3xl font-bold text-primary-600">{story.awards?.length || 0}</p>
            <p className="text-sm text-gray-600">Premios</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              <button
                onClick={() => setActiveSection('story')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                  activeSection === 'story'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Mi Historia
              </button>
              <button
                onClick={() => setActiveSection('process')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                  activeSection === 'process'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Proceso Creativo
              </button>
              <button
                onClick={() => setActiveSection('recognition')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                  activeSection === 'recognition'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Reconocimientos
              </button>
            </nav>
          </div>

          <div className="p-6 sm:p-8">
            {/* Story Tab */}
            {activeSection === 'story' && (
              <div className="space-y-8">
                {/* Video Introduction */}
                {story.videoIntro && (
                  <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      src={story.videoIntro.replace('watch?v=', 'embed/')}
                      title="Video de introducción"
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                )}

                {/* Personal Story */}
                {story.personalStory && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Mi Historia</h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {story.personalStory}
                    </p>
                  </div>
                )}

                {/* Heritage Story */}
                {story.heritageStory && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Herencia Familiar</h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {story.heritageStory}
                    </p>
                  </div>
                )}

                {/* Daily Life */}
                {story.dailyLife && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Un Día en Mi Taller</h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {story.dailyLife}
                    </p>
                  </div>
                )}

                {/* Workshop Photos */}
                {story.workshopPhotos && story.workshopPhotos.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Mi Taller</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {story.workshopPhotos.map((photo, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
                        >
                          <Image
                            src={photo}
                            alt={`Taller ${idx + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cultural Significance */}
                {story.culturalSignificance && (
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
                    <div className="flex items-start gap-3 mb-4">
                      <Globe className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          Significado Cultural
                        </h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {story.culturalSignificance}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Indigenous Language Terms */}
                {story.indigenousLanguageTerms && story.indigenousLanguageTerms.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Términos en Lengua Indígena
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {story.indigenousLanguageTerms.map((term, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200"
                        >
                          <p className="text-lg font-bold text-gray-900 mb-1">{term.term}</p>
                          <p className="text-sm text-gray-700 mb-2">{term.meaning}</p>
                          <p className="text-xs text-green-700 font-semibold">{term.language}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Process Tab */}
            {activeSection === 'process' && (
              <div className="space-y-8">
                {/* Craft Technique */}
                {story.craftTechnique && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Técnica y Proceso</h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
                      {story.craftTechnique}
                    </p>
                  </div>
                )}

                {/* Traditional Techniques */}
                {story.traditionalTechniques && story.traditionalTechniques.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Técnicas Tradicionales
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {story.traditionalTechniques.map((technique, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-900">{technique}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Process Photos */}
                {story.processPhotos && story.processPhotos.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Proceso Creativo</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {story.processPhotos.map((photo, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
                        >
                          <Image
                            src={photo}
                            alt={`Proceso ${idx + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Recognition Tab */}
            {activeSection === 'recognition' && (
              <div className="space-y-8">
                {/* Awards */}
                {story.awards && story.awards.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Premios y Reconocimientos
                    </h2>
                    <div className="space-y-4">
                      {story.awards.map((award, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border-2 border-yellow-200"
                        >
                          <Award className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <p className="font-bold text-gray-900 text-lg">{award.title}</p>
                            <p className="text-gray-700">{award.organization}</p>
                            <p className="text-sm text-gray-600 mt-1">{award.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {story.certifications && story.certifications.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Certificaciones</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {story.certifications.map((cert, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{cert.name}</p>
                            <p className="text-sm text-gray-700">{cert.issuer}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              {new Date(cert.date).toLocaleDateString('es-MX', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Community Projects */}
                {story.communityProjects && story.communityProjects.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Proyectos Comunitarios
                    </h2>
                    <div className="space-y-3">
                      {story.communityProjects.map((project, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                          <Heart className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                          <p className="text-gray-900">{project}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* CTA Section - Fixed to use shop slug */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Descubre Mis Creaciones</h2>
          <p className="text-primary-100 mb-6">
            Explora mi tienda y encuentra piezas únicas hechas a mano
          </p>
          <Link
            href={`/tienda/${getShopSlug(story.shopName)}`}
            className="inline-block px-8 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition font-bold"
          >
            Ver Mi Tienda
          </Link>
        </div>
      </div>
    </div>
  );
}
