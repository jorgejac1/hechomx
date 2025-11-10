'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import { useToast } from '@/contexts/ToastContext';
import {
  StoryFormSelector,
  BasicInfoSection,
  HobbyMakerStorySection,
  ArtisanStorySection,
  WorkshopStorySection,
  CompanyStorySection,
  MediaSection,
  RecognitionSection,
  SocialMediaSection,
} from '@/components/artisan-story';
import { Save, Eye, BookOpen } from 'lucide-react';
import { SellerType, CraftCategory, IndigenousConnection } from '@/lib/types/seller-types';
import { SELLER_TYPE_CONFIG } from '@/lib/types/seller-types';

export default function MiHistoriaPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { showToast } = useToast();

  // Seller Classification
  const [sellerType, setSellerType] = useState<SellerType>('artisan_individual');
  const [craftCategory, setCraftCategory] = useState<CraftCategory | undefined>();
  const [indigenousConnection, setIndigenousConnection] = useState<IndigenousConnection>('none');

  // Basic Info
  const [specialty, setSpecialty] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [generationsOfCraft, setGenerationsOfCraft] = useState(1);
  const [apprentices, setApprentices] = useState(0);
  const [teamSize, setTeamSize] = useState(0);
  const [foundingYear, setFoundingYear] = useState(new Date().getFullYear());
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [region, setRegion] = useState('');

  // Stories
  const [personalStory, setPersonalStory] = useState('');
  const [heritageStory, setHeritageStory] = useState('');
  const [craftTechnique, setCraftTechnique] = useState('');
  const [productionProcess, setProductionProcess] = useState('');
  const [dailyLife, setDailyLife] = useState('');
  const [culturalSignificance, setCulturalSignificance] = useState('');
  const [missionStatement, setMissionStatement] = useState('');

  // Arrays
  const [traditionalTechniques, setTraditionalTechniques] = useState<string[]>([]);
  const [sustainabilityPractices, setSustainabilityPractices] = useState<string[]>([]);
  const [indigenousLanguageTerms, setIndigenousLanguageTerms] = useState<
    Array<{ term: string; meaning: string; language: string }>
  >([]);

  // Media
  const [videoIntro, setVideoIntro] = useState('');
  const [workshopPhotos, setWorkshopPhotos] = useState<string[]>([]);
  const [processPhotos, setProcessPhotos] = useState<string[]>([]);
  const [familyPhotos, setFamilyPhotos] = useState<string[]>([]);
  const [teamPhotos, setTeamPhotos] = useState<string[]>([]);

  // Recognition
  const [awards, setAwards] = useState<
    Array<{ title: string; year: number; organization: string }>
  >([]);
  const [certifications, setCertifications] = useState<
    Array<{ name: string; issuer: string; date: string }>
  >([]);
  const [communityProjects, setCommunityProjects] = useState<string[]>([]);

  // Social Media
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [youtubeChannel, setYoutubeChannel] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [website, setWebsite] = useState('');

  // UI State
  const [activeSection, setActiveSection] = useState<
    'classification' | 'basic' | 'story' | 'media' | 'recognition' | 'social'
  >('classification');
  const [isSaving, setIsSaving] = useState(false);

  // Redirect if not authenticated
  if (!isAuthenticated && !isLoading) {
    router.push(ROUTES.LOGIN);
    return null;
  }

  if (isLoading || !user) {
    return <LoadingSpinner size="lg" fullScreen text="Cargando..." />;
  }

  if (!user.makerProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sin Tienda Activa</h2>
          <p className="text-gray-600 mb-6">Necesitas activar tu tienda para crear tu historia.</p>
          <button
            onClick={() => router.push(ROUTES.PROFILE)}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
          >
            Activar Mi Tienda
          </button>
        </div>
      </div>
    );
  }

  const handleUpdateField = (field: string, value: string | number) => {
    switch (field) {
      case 'specialty':
        setSpecialty(value as string);
        break;
      case 'yearsOfExperience':
        setYearsOfExperience(value as number);
        break;
      case 'generationsOfCraft':
        setGenerationsOfCraft(value as number);
        break;
      case 'apprentices':
        setApprentices(value as number);
        break;
      case 'teamSize':
        setTeamSize(value as number);
        break;
      case 'foundingYear':
        setFoundingYear(value as number);
        break;
      case 'city':
        setCity(value as string);
        break;
      case 'state':
        setState(value as string);
        break;
      case 'region':
        setRegion(value as string);
        break;
      case 'personalStory':
        setPersonalStory(value as string);
        break;
      case 'heritageStory':
        setHeritageStory(value as string);
        break;
      case 'craftTechnique':
        setCraftTechnique(value as string);
        break;
      case 'productionProcess':
        setProductionProcess(value as string);
        break;
      case 'dailyLife':
        setDailyLife(value as string);
        break;
      case 'culturalSignificance':
        setCulturalSignificance(value as string);
        break;
      case 'missionStatement':
        setMissionStatement(value as string);
        break;
      case 'videoIntro':
        setVideoIntro(value as string);
        break;
    }
  };

  const handleUpdateArray = (field: string, value: string[]) => {
    switch (field) {
      case 'traditionalTechniques':
        setTraditionalTechniques(value);
        break;
      case 'sustainabilityPractices':
        setSustainabilityPractices(value);
        break;
      case 'communityProjects':
        setCommunityProjects(value);
        break;
    }
  };

  const handleUpdatePhotos = (field: string, photos: string[]) => {
    switch (field) {
      case 'workshopPhotos':
        setWorkshopPhotos(photos);
        break;
      case 'processPhotos':
        setProcessPhotos(photos);
        break;
      case 'familyPhotos':
        setFamilyPhotos(photos);
        break;
      case 'teamPhotos':
        setTeamPhotos(photos);
        break;
    }
  };

  const handleUpdateSocial = (platform: string, value: string) => {
    switch (platform) {
      case 'instagram':
        setInstagram(value);
        break;
      case 'facebook':
        setFacebook(value);
        break;
      case 'youtube':
        setYoutubeChannel(value);
        break;
      case 'tiktok':
        setTiktok(value);
        break;
      case 'website':
        setWebsite(value);
        break;
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Validate required fields
    if (!specialty || !city || !state) {
      showToast('Por favor completa los campos requeridos', 'error');
      setIsSaving(false);
      return;
    }

    if (!personalStory) {
      showToast('Por favor escribe tu historia', 'error');
      setIsSaving(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      showToast('Historia guardada exitosamente', 'success');
      setIsSaving(false);
    }, 1500);
  };

  const config = SELLER_TYPE_CONFIG[sellerType];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push(ROUTES.DASHBOARD)}
            className="text-primary-600 hover:text-primary-700 mb-4 flex items-center gap-2"
          >
            ← Volver al Dashboard
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{config.storyTitle}</h1>
          <p className="text-gray-600 mt-1">{config.storySubtitle}</p>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex items-center justify-between text-sm overflow-x-auto gap-1">
            <button
              onClick={() => setActiveSection('classification')}
              className={`flex-1 py-2 px-2 text-center rounded-lg transition whitespace-nowrap ${
                activeSection === 'classification'
                  ? 'bg-primary-100 text-primary-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              1. Tipo
            </button>
            <button
              onClick={() => setActiveSection('basic')}
              className={`flex-1 py-2 px-2 text-center rounded-lg transition whitespace-nowrap ${
                activeSection === 'basic'
                  ? 'bg-primary-100 text-primary-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              2. Básico
            </button>
            <button
              onClick={() => setActiveSection('story')}
              className={`flex-1 py-2 px-2 text-center rounded-lg transition whitespace-nowrap ${
                activeSection === 'story'
                  ? 'bg-primary-100 text-primary-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              3. Historia
            </button>
            <button
              onClick={() => setActiveSection('media')}
              className={`flex-1 py-2 px-2 text-center rounded-lg transition whitespace-nowrap ${
                activeSection === 'media'
                  ? 'bg-primary-100 text-primary-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              4. Fotos
            </button>
            {sellerType !== 'hobby_maker' && (
              <>
                <button
                  onClick={() => setActiveSection('recognition')}
                  className={`flex-1 py-2 px-2 text-center rounded-lg transition whitespace-nowrap ${
                    activeSection === 'recognition'
                      ? 'bg-primary-100 text-primary-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  5. Premios
                </button>
                <button
                  onClick={() => setActiveSection('social')}
                  className={`flex-1 py-2 px-2 text-center rounded-lg transition whitespace-nowrap ${
                    activeSection === 'social'
                      ? 'bg-primary-100 text-primary-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  6. Redes
                </button>
              </>
            )}
          </div>
        </div>

        {/* Form Sections */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          {activeSection === 'classification' && (
            <StoryFormSelector
              sellerType={sellerType}
              craftCategory={craftCategory}
              indigenousConnection={indigenousConnection}
              onSellerTypeChange={setSellerType}
              onCategoryChange={setCraftCategory}
              onConnectionChange={setIndigenousConnection}
            />
          )}

          {activeSection === 'basic' && (
            <BasicInfoSection
              sellerType={sellerType}
              craftCategory={craftCategory}
              specialty={specialty}
              yearsOfExperience={yearsOfExperience}
              generationsOfCraft={generationsOfCraft}
              apprentices={apprentices}
              teamSize={teamSize}
              foundingYear={foundingYear}
              city={city}
              state={state}
              region={region}
              onUpdate={handleUpdateField}
            />
          )}

          {activeSection === 'story' && (
            <>
              {sellerType === 'hobby_maker' && (
                <HobbyMakerStorySection
                  personalStory={personalStory}
                  productionProcess={productionProcess}
                  dailyLife={dailyLife}
                  onUpdate={handleUpdateField}
                />
              )}

              {sellerType === 'artisan_individual' && (
                <ArtisanStorySection
                  craftCategory={craftCategory}
                  indigenousConnection={indigenousConnection}
                  personalStory={personalStory}
                  heritageStory={heritageStory}
                  craftTechnique={craftTechnique}
                  dailyLife={dailyLife}
                  culturalSignificance={culturalSignificance}
                  traditionalTechniques={traditionalTechniques}
                  indigenousLanguageTerms={indigenousLanguageTerms}
                  onUpdate={handleUpdateField}
                  onUpdateArray={handleUpdateArray}
                  onUpdateTerms={setIndigenousLanguageTerms}
                />
              )}

              {sellerType === 'workshop' && (
                <WorkshopStorySection
                  personalStory={personalStory}
                  productionProcess={productionProcess}
                  dailyLife={dailyLife}
                  missionStatement={missionStatement}
                  onUpdate={handleUpdateField}
                />
              )}

              {sellerType === 'company' && (
                <CompanyStorySection
                  personalStory={personalStory}
                  productionProcess={productionProcess}
                  missionStatement={missionStatement}
                  sustainabilityPractices={sustainabilityPractices}
                  onUpdate={handleUpdateField}
                  onUpdateArray={handleUpdateArray}
                />
              )}
            </>
          )}

          {activeSection === 'media' && (
            <MediaSection
              sellerType={sellerType}
              videoIntro={videoIntro}
              workshopPhotos={workshopPhotos}
              processPhotos={processPhotos}
              familyPhotos={familyPhotos}
              teamPhotos={teamPhotos}
              onUpdate={handleUpdateField}
              onUpdatePhotos={handleUpdatePhotos}
            />
          )}

          {activeSection === 'recognition' && (
            <RecognitionSection
              sellerType={sellerType}
              awards={awards}
              certifications={certifications}
              communityProjects={communityProjects}
              onUpdateAwards={setAwards}
              onUpdateCertifications={setCertifications}
              onUpdateProjects={setCommunityProjects}
            />
          )}

          {activeSection === 'social' && (
            <SocialMediaSection
              instagram={instagram}
              facebook={facebook}
              youtube={youtubeChannel}
              tiktok={tiktok}
              website={website}
              onUpdate={handleUpdateSocial}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <LoadingSpinner size="sm" color="white" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Guardar Historia
              </>
            )}
          </button>

          <Link
            href={`/artesano/${user.email.split('@')[0]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
          >
            <Eye className="w-5 h-5" />
            Vista Previa
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {sellerType === 'hobby_maker'
              ? '💡 Tómate tu tiempo. Una buena historia puede aumentar tus ventas hasta un 40%'
              : '💡 Una historia completa y auténtica puede aumentar tus ventas hasta un 80%'}
          </p>
        </div>
      </div>
    </div>
  );
}
