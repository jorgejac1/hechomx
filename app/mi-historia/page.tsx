'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getArtisanStory, saveArtisanStory } from '@/lib/api/sellerApi';
import type { ArtisanStory } from '@/lib/types/artisan-story';
import { ROUTES } from '@/lib';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import {
  ArrowLeft,
  Save,
  Eye,
  Upload,
  Plus,
  Globe,
  BookOpen,
  Award,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
} from 'lucide-react';

export default function ArtisanStoryPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [story, setStory] = useState<ArtisanStory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<'basic' | 'story' | 'media' | 'recognition'>(
    'basic'
  );
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      router.push(ROUTES.LOGIN);
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    async function loadStory() {
      if (user) {
        setIsLoading(true);
        const data = await getArtisanStory(user.email);
        setStory(data);
        setIsLoading(false);
      }
    }
    loadStory();
  }, [user]);

  if (authLoading || isLoading) {
    return <LoadingSpinner size="lg" fullScreen text="Cargando tu historia..." />;
  }

  if (!isAuthenticated || !user || !user.makerProfile) {
    return null;
  }

  const handleSave = async () => {
    if (!story) return;

    setIsSaving(true);
    const success = await saveArtisanStory(user.email, story);
    setIsSaving(false);

    if (success) {
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  };

  const updateStory = <K extends keyof ArtisanStory>(field: K, value: ArtisanStory[K]) => {
    if (!story) return;
    setStory({ ...story, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push(ROUTES.DASHBOARD)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Dashboard
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-primary-600" />
                Mi Historia Artesanal
              </h1>
              <p className="text-gray-600 mt-1">
                Comparte tu historia, herencia y proceso creativo con el mundo
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push(`/artesano/${story?.artisanId || 'preview'}`)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-sm"
              >
                <Eye className="w-4 h-4" />
                Vista Previa
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm disabled:bg-gray-400"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>

        {/* Success Toast */}
        {showSuccessToast && (
          <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">Historia guardada exitosamente</span>
          </div>
        )}

        {story === null ? (
          /* Empty State */
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Crea Tu Historia</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Comparte tu historia artesanal con el mundo. Conecta emocionalmente con tus clientes y
              muestra la autenticidad detrás de cada creación.
            </p>
            <button
              onClick={() =>
                setStory({
                  id: `story-${Date.now()}`,
                  artisanId: user.email.split('@')[0],
                  artisanName: user.name,
                  shopName: user.makerProfile?.shopName || '',
                  avatar: user.avatar || '',
                  coverImage: '',
                  location: {
                    city: user.makerProfile?.location?.split(',')[0]?.trim() || '',
                    state: user.makerProfile?.location?.split(',')[1]?.trim() || '',
                    region: '',
                  },
                  specialty: '',
                  yearsOfExperience: 0,
                  generationsOfCraft: 1,
                  personalStory: '',
                  heritageStory: '',
                  craftTechnique: '',
                  dailyLife: '',
                  workshopPhotos: [],
                  processPhotos: [],
                  familyPhotos: [],
                  awards: [],
                  certifications: [],
                  culturalSignificance: '',
                  traditionalTechniques: [],
                  apprentices: 0,
                  communityProjects: [],
                  lastUpdated: new Date().toISOString(),
                  isPublished: false,
                })
              }
              className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Comenzar Mi Historia
            </button>
          </div>
        ) : (
          /* Story Builder */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-4 sticky top-4">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveSection('basic')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      activeSection === 'basic'
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Globe className="w-5 h-5" />
                    <span className="font-medium">Información Básica</span>
                  </button>
                  <button
                    onClick={() => setActiveSection('story')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      activeSection === 'story'
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <BookOpen className="w-5 h-5" />
                    <span className="font-medium">Tu Historia</span>
                  </button>
                  <button
                    onClick={() => setActiveSection('media')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      activeSection === 'media'
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <ImageIcon className="w-5 h-5" />
                    <span className="font-medium">Fotos y Videos</span>
                  </button>
                  <button
                    onClick={() => setActiveSection('recognition')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      activeSection === 'recognition'
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Award className="w-5 h-5" />
                    <span className="font-medium">Reconocimientos</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-md p-6">
                {/* Basic Information Section */}
                {activeSection === 'basic' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Información Básica</h2>
                      <p className="text-sm text-gray-600 mb-6">
                        Esta información aparecerá en tu perfil público y ayudará a los clientes a
                        conocerte mejor.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Especialidad *
                        </label>
                        <input
                          type="text"
                          value={story.specialty}
                          onChange={(e) => updateStory('specialty', e.target.value)}
                          placeholder="Ej: Textiles Tejidos a Mano"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Años de Experiencia *
                        </label>
                        <input
                          type="number"
                          value={story.yearsOfExperience}
                          onChange={(e) =>
                            updateStory('yearsOfExperience', parseInt(e.target.value) || 0)
                          }
                          min="0"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Generaciones de Artesanos *
                        </label>
                        <input
                          type="number"
                          value={story.generationsOfCraft}
                          onChange={(e) =>
                            updateStory('generationsOfCraft', parseInt(e.target.value) || 1)
                          }
                          min="1"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Aprendices
                        </label>
                        <input
                          type="number"
                          value={story.apprentices}
                          onChange={(e) =>
                            updateStory('apprentices', parseInt(e.target.value) || 0)
                          }
                          min="0"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        value={story.location.city}
                        onChange={(e) =>
                          updateStory('location', { ...story.location, city: e.target.value })
                        }
                        placeholder="Ej: Teotitlán del Valle"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Estado *
                      </label>
                      <input
                        type="text"
                        value={story.location.state}
                        onChange={(e) =>
                          updateStory('location', { ...story.location, state: e.target.value })
                        }
                        placeholder="Ej: Oaxaca"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Región
                      </label>
                      <input
                        type="text"
                        value={story.location.region}
                        onChange={(e) =>
                          updateStory('location', { ...story.location, region: e.target.value })
                        }
                        placeholder="Ej: Valles Centrales"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                )}

                {/* Story Section */}
                {activeSection === 'story' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Tu Historia</h2>
                      <p className="text-sm text-gray-600 mb-6">
                        Comparte tu historia personal, herencia familiar y el significado cultural
                        de tu artesanía.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tu Historia Personal *
                        <span className="text-gray-500 font-normal ml-2">
                          (¿Cómo comenzaste? ¿Qué te inspiró?)
                        </span>
                      </label>
                      <textarea
                        value={story.personalStory}
                        onChange={(e) => updateStory('personalStory', e.target.value)}
                        rows={6}
                        placeholder="Cuéntanos tu historia: ¿Cómo aprendiste este oficio? ¿Qué te inspiró a dedicarte a este arte?..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {story.personalStory.length} caracteres
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Historia de tu Herencia
                        <span className="text-gray-500 font-normal ml-2">
                          (Tu familia, tradición, ancestros)
                        </span>
                      </label>
                      <textarea
                        value={story.heritageStory}
                        onChange={(e) => updateStory('heritageStory', e.target.value)}
                        rows={6}
                        placeholder="Comparte la historia de tu familia, las generaciones previas, cómo se ha transmitido este conocimiento..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Técnica y Proceso *
                        <span className="text-gray-500 font-normal ml-2">
                          (¿Cómo creas tus piezas?)
                        </span>
                      </label>
                      <textarea
                        value={story.craftTechnique}
                        onChange={(e) => updateStory('craftTechnique', e.target.value)}
                        rows={6}
                        placeholder="Describe tu proceso creativo, materiales que usas, técnicas tradicionales, tiempo que tomas..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tu Vida Diaria
                        <span className="text-gray-500 font-normal ml-2">
                          (Un día típico en tu taller)
                        </span>
                      </label>
                      <textarea
                        value={story.dailyLife}
                        onChange={(e) => updateStory('dailyLife', e.target.value)}
                        rows={5}
                        placeholder="Describe un día típico en tu vida como artesano, tu rutina, tu espacio de trabajo..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Significado Cultural
                        <span className="text-gray-500 font-normal ml-2">
                          (¿Por qué es importante tu arte?)
                        </span>
                      </label>
                      <textarea
                        value={story.culturalSignificance}
                        onChange={(e) => updateStory('culturalSignificance', e.target.value)}
                        rows={5}
                        placeholder="Explica el significado cultural y la importancia de tu artesanía para tu comunidad y cultura..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Media Section */}
                {activeSection === 'media' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Fotos y Videos</h2>
                      <p className="text-sm text-gray-600 mb-6">
                        Las imágenes ayudan a los clientes a conectar con tu historia y ver tu
                        proceso creativo.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Video de Introducción
                        <span className="text-gray-500 font-normal ml-2">
                          (URL de YouTube o Vimeo)
                        </span>
                      </label>
                      <input
                        type="url"
                        value={story.videoIntro || ''}
                        onChange={(e) => updateStory('videoIntro', e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        💡 Un video de 1-2 minutos presentándote y mostrando tu trabajo
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-4">
                        Fotos de tu Taller
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-600 mb-2">
                          Arrastra fotos aquí o haz clic para seleccionar
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG hasta 10MB</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {story.workshopPhotos.length} fotos agregadas
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-4">
                        Fotos del Proceso Creativo
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-600 mb-2">
                          Muestra cómo creas tus piezas paso a paso
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG hasta 10MB</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {story.processPhotos.length} fotos agregadas
                      </p>
                    </div>
                  </div>
                )}

                {/* Recognition Section */}
                {activeSection === 'recognition' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Reconocimientos</h2>
                      <p className="text-sm text-gray-600 mb-6">
                        Comparte tus premios, certificaciones y proyectos comunitarios.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-semibold text-gray-700">
                          Premios y Reconocimientos
                        </label>
                        <button className="flex items-center gap-2 px-3 py-1 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
                          <Plus className="w-4 h-4" />
                          Agregar
                        </button>
                      </div>
                      {story.awards.length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Award className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">No hay premios agregados</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {story.awards.map((award, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                            >
                              <Award className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">{award.title}</p>
                                <p className="text-sm text-gray-600">{award.organization}</p>
                                <p className="text-xs text-gray-500">{award.year}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-semibold text-gray-700">
                          Certificaciones
                        </label>
                        <button className="flex items-center gap-2 px-3 py-1 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
                          <Plus className="w-4 h-4" />
                          Agregar
                        </button>
                      </div>
                      {story.certifications.length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <CheckCircle2 className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">No hay certificaciones agregadas</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {story.certifications.map((cert, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                            >
                              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">{cert.name}</p>
                                <p className="text-sm text-gray-600">{cert.issuer}</p>
                                <p className="text-xs text-gray-500">
                                  {new Date(cert.date).toLocaleDateString('es-MX')}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Proyectos Comunitarios
                        <span className="text-gray-500 font-normal ml-2">
                          (Talleres, cooperativas, etc.)
                        </span>
                      </label>
                      <textarea
                        value={story.communityProjects.join('\n')}
                        onChange={(e) =>
                          updateStory(
                            'communityProjects',
                            e.target.value.split('\n').filter((line) => line.trim())
                          )
                        }
                        rows={5}
                        placeholder="Escribe cada proyecto en una línea nueva..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
