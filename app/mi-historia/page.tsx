'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthPageWrapper from '@/components/auth/AuthPageWrapper';
import { ROUTES } from '@/lib';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import type { User } from '@/contexts/AuthContext';
import { useArtisanStory, type ArtisanStoryFormState } from '@/hooks/artisan-story';
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
  ProcessSection,
} from '@/components/artisan-story';
import { Save, Eye } from 'lucide-react';
import { SELLER_TYPE_CONFIG } from '@/lib/types/seller-types';

type ActiveSection =
  | 'classification'
  | 'basic'
  | 'story'
  | 'media'
  | 'process'
  | 'recognition'
  | 'social';

export default function MiHistoriaPage() {
  return (
    <AuthPageWrapper requireSeller loadingText="Cargando tu historia...">
      {(user) => <MiHistoriaContent user={user} />}
    </AuthPageWrapper>
  );
}

function MiHistoriaContent({ user }: { user: User }) {
  const [activeSection, setActiveSection] = useState<ActiveSection>('classification');

  const story = useArtisanStory(user);
  const config = SELLER_TYPE_CONFIG[story.sellerType];
  const showProcessStep =
    story.sellerType === 'artisan_individual' || story.sellerType === 'workshop';

  if (story.isLoading) {
    return <LoadingSpinner size="lg" fullScreen text="Cargando tu historia..." />;
  }

  // Type-safe update handler
  const handleFieldUpdate = <K extends keyof ArtisanStoryFormState>(
    field: K,
    value: ArtisanStoryFormState[K]
  ) => {
    story.updateField(field, value);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={ROUTES.DASHBOARD}
            className="text-primary-600 hover:text-primary-700 mb-4 flex items-center gap-2"
          >
            ← Volver al Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            {config.storyTitle}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{config.storySubtitle}</p>
        </div>

        {/* Progress Tabs */}
        <ProgressTabs
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          sellerType={story.sellerType}
          showProcessStep={showProcessStep}
        />

        {/* Form Sections */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
          {activeSection === 'classification' && (
            <StoryFormSelector
              sellerType={story.sellerType}
              craftCategory={story.craftCategory}
              indigenousConnection={story.indigenousConnection}
              onSellerTypeChange={story.setSellerType}
              onCategoryChange={story.setCraftCategory}
              onConnectionChange={story.setIndigenousConnection}
            />
          )}

          {activeSection === 'basic' && (
            <BasicInfoSection
              sellerType={story.sellerType}
              craftCategory={story.craftCategory}
              specialty={story.specialty}
              yearsOfExperience={story.yearsOfExperience}
              generationsOfCraft={story.generationsOfCraft}
              apprentices={story.apprentices}
              teamSize={story.teamSize}
              foundingYear={story.foundingYear}
              city={story.city}
              state={story.state}
              region={story.region}
              onUpdate={(field, value) => {
                handleFieldUpdate(
                  field as keyof ArtisanStoryFormState,
                  value as ArtisanStoryFormState[keyof ArtisanStoryFormState]
                );
              }}
            />
          )}

          {activeSection === 'story' && <StorySection story={story} onUpdate={handleFieldUpdate} />}

          {activeSection === 'media' && (
            <MediaSection
              sellerType={story.sellerType}
              videoIntro={story.videoIntro}
              workshopPhotos={story.workshopPhotos}
              processPhotos={story.processPhotos}
              familyPhotos={story.familyPhotos}
              teamPhotos={story.teamPhotos}
              onUpdate={(field, value) => {
                handleFieldUpdate(
                  field as keyof ArtisanStoryFormState,
                  value as ArtisanStoryFormState[keyof ArtisanStoryFormState]
                );
              }}
              onUpdatePhotos={(field, photos) => {
                handleFieldUpdate(
                  field as keyof ArtisanStoryFormState,
                  photos as ArtisanStoryFormState[keyof ArtisanStoryFormState]
                );
              }}
            />
          )}

          {activeSection === 'process' && showProcessStep && (
            <ProcessSection
              processVideo={story.processVideo}
              totalCraftTime={story.totalCraftTime}
              materials={story.materials}
              tools={story.tools}
              processSteps={story.processSteps}
              onUpdateField={(field, value) => {
                handleFieldUpdate(
                  field as keyof ArtisanStoryFormState,
                  value as ArtisanStoryFormState[keyof ArtisanStoryFormState]
                );
              }}
              onUpdateMaterials={story.setMaterials}
              onUpdateTools={story.setTools}
              onUpdateSteps={story.setProcessSteps}
            />
          )}

          {activeSection === 'recognition' && (
            <RecognitionSection
              sellerType={story.sellerType}
              awards={story.awards}
              certifications={story.certifications}
              communityProjects={story.communityProjects}
              onUpdateAwards={story.setAwards}
              onUpdateCertifications={story.setCertifications}
              onUpdateProjects={story.setCommunityProjects}
            />
          )}

          {activeSection === 'social' && (
            <SocialMediaSection
              instagram={story.instagram}
              facebook={story.facebook}
              youtube={story.youtube}
              tiktok={story.tiktok}
              website={story.website}
              onUpdate={(platform, value) => {
                handleFieldUpdate(
                  platform as keyof ArtisanStoryFormState,
                  value as ArtisanStoryFormState[keyof ArtisanStoryFormState]
                );
              }}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={story.save}
            disabled={story.isSaving}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:opacity-50"
          >
            {story.isSaving ? (
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
            href={`/artesano/${story.artisanId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition font-medium"
          >
            <Eye className="w-5 h-5" />
            Vista Previa
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {story.sellerType === 'hobby_maker'
              ? 'Tómate tu tiempo. Una buena historia puede aumentar tus ventas hasta un 40%'
              : 'Una historia completa y auténtica puede aumentar tus ventas hasta un 80%'}
          </p>
        </div>
      </div>
    </div>
  );
}

// === Sub-components ===

interface ProgressTabsProps {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  sellerType: string;
  showProcessStep: boolean;
}

function ProgressTabs({
  activeSection,
  setActiveSection,
  sellerType,
  showProcessStep,
}: ProgressTabsProps) {
  const tabs: { key: ActiveSection; label: string; show: boolean }[] = [
    { key: 'classification', label: '1. Tipo', show: true },
    { key: 'basic', label: '2. Básico', show: true },
    { key: 'story', label: '3. Historia', show: true },
    { key: 'media', label: '4. Fotos', show: true },
    { key: 'process', label: '5. Proceso', show: showProcessStep && sellerType !== 'hobby_maker' },
    {
      key: 'recognition',
      label: `${showProcessStep ? '6' : '5'}. Premios`,
      show: sellerType !== 'hobby_maker',
    },
    {
      key: 'social',
      label: `${showProcessStep ? '7' : '6'}. Redes`,
      show: sellerType !== 'hobby_maker',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6">
      <div className="flex items-center justify-between text-sm overflow-x-auto gap-1">
        {tabs
          .filter((t) => t.show)
          .map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveSection(tab.key)}
              className={`flex-1 py-2 px-2 text-center rounded-lg transition whitespace-nowrap ${
                activeSection === tab.key
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
      </div>
    </div>
  );
}

interface StorySectionProps {
  story: ReturnType<typeof useArtisanStory>;
  onUpdate: <K extends keyof ArtisanStoryFormState>(
    field: K,
    value: ArtisanStoryFormState[K]
  ) => void;
}

function StorySection({ story, onUpdate }: StorySectionProps) {
  const handleUpdate = (field: string, value: string | number) => {
    onUpdate(
      field as keyof ArtisanStoryFormState,
      value as ArtisanStoryFormState[keyof ArtisanStoryFormState]
    );
  };

  const handleUpdateArray = (field: string, value: string[]) => {
    onUpdate(
      field as keyof ArtisanStoryFormState,
      value as ArtisanStoryFormState[keyof ArtisanStoryFormState]
    );
  };

  switch (story.sellerType) {
    case 'hobby_maker':
      return (
        <HobbyMakerStorySection
          personalStory={story.personalStory}
          productionProcess={story.productionProcess}
          dailyLife={story.dailyLife}
          onUpdate={handleUpdate}
        />
      );

    case 'artisan_individual':
      return (
        <ArtisanStorySection
          craftCategory={story.craftCategory}
          indigenousConnection={story.indigenousConnection}
          personalStory={story.personalStory}
          heritageStory={story.heritageStory}
          craftTechnique={story.craftTechnique}
          dailyLife={story.dailyLife}
          culturalSignificance={story.culturalSignificance}
          traditionalTechniques={story.traditionalTechniques}
          indigenousLanguageTerms={story.indigenousLanguageTerms}
          onUpdate={handleUpdate}
          onUpdateArray={handleUpdateArray}
          onUpdateTerms={story.setIndigenousLanguageTerms}
        />
      );

    case 'workshop':
      return (
        <WorkshopStorySection
          personalStory={story.personalStory}
          productionProcess={story.productionProcess}
          dailyLife={story.dailyLife}
          missionStatement={story.missionStatement}
          onUpdate={handleUpdate}
        />
      );

    case 'company':
      return (
        <CompanyStorySection
          personalStory={story.personalStory}
          productionProcess={story.productionProcess}
          missionStatement={story.missionStatement}
          sustainabilityPractices={story.sustainabilityPractices}
          onUpdate={handleUpdate}
          onUpdateArray={handleUpdateArray}
        />
      );

    default:
      return null;
  }
}
