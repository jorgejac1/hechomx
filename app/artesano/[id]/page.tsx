'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { ArtisanStory } from '@/lib/types/artisan-story';
import { getShopSlug } from '@/lib/utils/shop-utils';
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
  Clock,
  Hammer,
  Leaf,
  Play,
  ChevronRight,
} from 'lucide-react';

export default function ArtisanProfilePage() {
  const params = useParams();
  const [story, setStory] = useState<ArtisanStory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<'story' | 'process' | 'recognition'>('story');
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md text-center">
          <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Historia No Encontrada
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Esta historia artesanal aún no está disponible.
          </p>
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Cover Image */}
      <div className="relative h-[400px] bg-linear-to-br from-primary-600 to-primary-800">
        {story.coverImage && (
          <Image
            src={story.coverImage}
            alt={story.artisanName}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-xs rounded-lg hover:bg-white transition text-gray-900 font-medium"
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

              {/* Social Media */}
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
                      className="p-3 bg-white/20 backdrop-blur-xs rounded-lg hover:bg-white/30 transition group"
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
                      className="p-3 bg-white/20 backdrop-blur-xs rounded-lg hover:bg-white/30 transition group"
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
                      className="p-3 bg-white/20 backdrop-blur-xs rounded-lg hover:bg-white/30 transition group"
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center">
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {story.yearsOfExperience}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Años</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center">
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {story.generationsOfCraft}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Generaciones</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center">
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {story.apprentices || 0}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Aprendices</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center">
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {story.awards?.length || 0}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Premios</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex overflow-x-auto">
              <button
                onClick={() => setActiveSection('story')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                  activeSection === 'story'
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                Mi Historia
              </button>
              <button
                onClick={() => setActiveSection('process')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                  activeSection === 'process'
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                Detrás del Arte
              </button>
              <button
                onClick={() => setActiveSection('recognition')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                  activeSection === 'recognition'
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
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
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      Mi Historia
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {story.personalStory}
                    </p>
                  </div>
                )}

                {/* Heritage Story */}
                {story.heritageStory && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      Herencia Familiar
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {story.heritageStory}
                    </p>
                  </div>
                )}

                {/* Daily Life */}
                {story.dailyLife && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      Un Día en Mi Taller
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {story.dailyLife}
                    </p>
                  </div>
                )}

                {/* Workshop Photos */}
                {story.workshopPhotos && story.workshopPhotos.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      Mi Taller
                    </h2>
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
                  <div className="bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border-2 border-amber-200 dark:border-amber-800">
                    <div className="flex items-start gap-3 mb-4">
                      <Globe className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-1" />
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                          Significado Cultural
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                          {story.culturalSignificance}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Indigenous Language Terms */}
                {story.indigenousLanguageTerms && story.indigenousLanguageTerms.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      Términos en Lengua Indígena
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {story.indigenousLanguageTerms.map((term, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800"
                        >
                          <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                            {term.term}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                            {term.meaning}
                          </p>
                          <p className="text-xs text-green-700 dark:text-green-400 font-semibold">
                            {term.language}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Process Tab - ENHANCED "Behind the Craft" */}
            {activeSection === 'process' && (
              <div className="space-y-10">
                {/* Time Investment Badge */}
                {story.totalCraftTime && (
                  <div className="flex items-center justify-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 rounded-full border-2 border-primary-200 dark:border-primary-700">
                      <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      <div>
                        <p className="text-xs text-primary-600 dark:text-primary-400 font-medium uppercase tracking-wide">
                          Tiempo de Creación
                        </p>
                        <p className="text-lg font-bold text-primary-800 dark:text-primary-300">
                          {story.totalCraftTime}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Process Video */}
                {story.processVideo && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                        <Play className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Video del Proceso
                      </h2>
                    </div>
                    <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                      <iframe
                        src={story.processVideo.replace('watch?v=', 'embed/')}
                        title="Video del proceso creativo"
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                {/* Craft Technique Description */}
                {story.craftTechnique && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      Técnica y Proceso
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {story.craftTechnique}
                    </p>
                  </div>
                )}

                {/* Materials Section */}
                {story.materials && story.materials.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <Leaf className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Materiales
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {story.materials.map((material, idx) => (
                        <div
                          key={idx}
                          className="flex gap-4 p-4 bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-md transition"
                        >
                          {material.image && (
                            <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={material.image}
                                alt={material.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                              {material.name}
                            </h3>
                            <p className="text-sm text-green-700 dark:text-green-400 font-medium mb-2 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {material.source}
                            </p>
                            {material.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                {material.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tools Section */}
                {story.tools && story.tools.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                        <Hammer className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Herramientas
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {story.tools.map((tool, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800 hover:shadow-md transition"
                        >
                          {tool.image && (
                            <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3">
                              <Image
                                src={tool.image}
                                alt={tool.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                            {tool.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step-by-Step Process Timeline */}
                {story.processSteps && story.processSteps.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Paso a Paso
                      </h2>
                    </div>
                    <div className="space-y-4">
                      {story.processSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className={`border-2 rounded-xl overflow-hidden transition-all ${
                            expandedStep === idx
                              ? 'border-primary-300 dark:border-primary-600 shadow-lg'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <button
                            onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                            className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                          >
                            <div className="shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                              {step.step}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 dark:text-gray-100">
                                {step.title}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {step.duration}
                                </span>
                              </div>
                            </div>
                            <ChevronRight
                              className={`w-5 h-5 text-gray-400 transition-transform ${
                                expandedStep === idx ? 'rotate-90' : ''
                              }`}
                            />
                          </button>
                          {expandedStep === idx && (
                            <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700">
                              <div className="pt-4 flex flex-col md:flex-row gap-4">
                                {step.image && (
                                  <div className="relative w-full md:w-64 aspect-video md:aspect-square rounded-lg overflow-hidden shrink-0">
                                    <Image
                                      src={step.image}
                                      alt={step.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {step.description}
                                  </p>
                                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 rounded-full">
                                    <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                                    <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                                      Duración: {step.duration}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Traditional Techniques */}
                {story.traditionalTechniques && story.traditionalTechniques.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      Técnicas Tradicionales
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {story.traditionalTechniques.map((technique, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
                          <span className="text-gray-900 dark:text-gray-100">{technique}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Process Photos (legacy) */}
                {story.processPhotos && story.processPhotos.length > 0 && !story.processSteps && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      Galería del Proceso
                    </h2>
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
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      Premios y Reconocimientos
                    </h2>
                    <div className="space-y-4">
                      {story.awards.map((award, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-4 bg-linear-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg border-2 border-yellow-200 dark:border-yellow-800"
                        >
                          <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400 shrink-0 mt-1" />
                          <div className="flex-1">
                            <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                              {award.title}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">{award.organization}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {award.year}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {story.certifications && story.certifications.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      Certificaciones
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {story.certifications.map((cert, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-1" />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 dark:text-gray-100">
                              {cert.name}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {cert.issuer}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
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
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      Proyectos Comunitarios
                    </h2>
                    <div className="space-y-3">
                      {story.communityProjects.map((project, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                        >
                          <Heart className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
                          <p className="text-gray-900 dark:text-gray-100">{project}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-linear-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg p-8 text-center text-white">
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
