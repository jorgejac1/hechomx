/**
 * @fileoverview Artisan story form management hook
 * Manages artisan profile form state, validation, and persistence for seller storytelling features
 * @module hooks/artisan-story/useArtisanStory
 */

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/contexts/ToastContext';
import type { User } from '@/contexts/AuthContext';
import type { ArtisanStory, Material, Tool, ProcessStep } from '@/lib/types/artisan-story';
import type { SellerType, CraftCategory, IndigenousConnection } from '@/lib/types/seller-types';

export interface ArtisanStoryFormState {
  // Seller Classification
  sellerType: SellerType;
  craftCategory: CraftCategory | undefined;
  indigenousConnection: IndigenousConnection;

  // Basic Info
  specialty: string;
  yearsOfExperience: number;
  generationsOfCraft: number;
  apprentices: number;
  teamSize: number;
  foundingYear: number;
  city: string;
  state: string;
  region: string;

  // Stories
  personalStory: string;
  heritageStory: string;
  craftTechnique: string;
  productionProcess: string;
  dailyLife: string;
  culturalSignificance: string;
  missionStatement: string;

  // Arrays
  traditionalTechniques: string[];
  sustainabilityPractices: string[];
  indigenousLanguageTerms: Array<{ term: string; meaning: string; language: string }>;

  // Media
  videoIntro: string;
  workshopPhotos: string[];
  processPhotos: string[];
  familyPhotos: string[];
  teamPhotos: string[];

  // Behind the Craft
  processVideo: string;
  totalCraftTime: string;
  materials: Material[];
  tools: Tool[];
  processSteps: ProcessStep[];

  // Recognition
  awards: Array<{ title: string; year: number; organization: string }>;
  certifications: Array<{ name: string; issuer: string; date: string }>;
  communityProjects: string[];

  // Social Media
  instagram: string;
  facebook: string;
  youtube: string;
  tiktok: string;
  website: string;
}

const initialState: ArtisanStoryFormState = {
  sellerType: 'artisan_individual',
  craftCategory: undefined,
  indigenousConnection: 'none',
  specialty: '',
  yearsOfExperience: 0,
  generationsOfCraft: 1,
  apprentices: 0,
  teamSize: 0,
  foundingYear: new Date().getFullYear(),
  city: '',
  state: '',
  region: '',
  personalStory: '',
  heritageStory: '',
  craftTechnique: '',
  productionProcess: '',
  dailyLife: '',
  culturalSignificance: '',
  missionStatement: '',
  traditionalTechniques: [],
  sustainabilityPractices: [],
  indigenousLanguageTerms: [],
  videoIntro: '',
  workshopPhotos: [],
  processPhotos: [],
  familyPhotos: [],
  teamPhotos: [],
  processVideo: '',
  totalCraftTime: '',
  materials: [],
  tools: [],
  processSteps: [],
  awards: [],
  certifications: [],
  communityProjects: [],
  instagram: '',
  facebook: '',
  youtube: '',
  tiktok: '',
  website: '',
};

export function useArtisanStory(user: User) {
  const { showToast } = useToast();
  const [formState, setFormState] = useState<ArtisanStoryFormState>(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const artisanId = user.email.split('@')[0];

  // Load existing story
  useEffect(() => {
    async function loadStory() {
      setIsLoading(true);
      try {
        // Check localStorage first
        const savedStory = localStorage.getItem(`artisan_story_${artisanId}`);
        if (savedStory) {
          const story: ArtisanStory = JSON.parse(savedStory);
          populateFromStory(story);
          setIsLoading(false);
          return;
        }

        // Load from API
        const response = await fetch('/api/artisan-stories');
        const data: Record<string, ArtisanStory> = await response.json();
        const story = data[artisanId];

        if (story) {
          populateFromStory(story);
        }
      } catch (error) {
        console.error('Error loading story:', error);
        showToast('No se pudo cargar la historia', 'error');
      }
      setIsLoading(false);
    }

    loadStory();
  }, [artisanId, showToast]);

  const populateFromStory = (story: ArtisanStory) => {
    setFormState({
      sellerType: story.sellerType || 'artisan_individual',
      craftCategory: story.craftCategory,
      indigenousConnection: story.indigenousConnection || 'none',
      specialty: story.specialty || '',
      yearsOfExperience: story.yearsOfExperience || 0,
      generationsOfCraft: story.generationsOfCraft || 1,
      apprentices: story.apprentices || 0,
      teamSize: story.teamSize || 0,
      foundingYear: story.foundingYear || new Date().getFullYear(),
      city: story.location?.city || '',
      state: story.location?.state || '',
      region: story.location?.region || '',
      personalStory: story.personalStory || '',
      heritageStory: story.heritageStory || '',
      craftTechnique: story.craftTechnique || '',
      productionProcess: story.productionProcess || '',
      dailyLife: story.dailyLife || '',
      culturalSignificance: story.culturalSignificance || '',
      missionStatement: story.missionStatement || '',
      traditionalTechniques: story.traditionalTechniques || [],
      sustainabilityPractices: story.sustainabilityPractices || [],
      indigenousLanguageTerms: story.indigenousLanguageTerms || [],
      videoIntro: story.videoIntro || '',
      workshopPhotos: story.workshopPhotos || [],
      processPhotos: story.processPhotos || [],
      familyPhotos: story.familyPhotos || [],
      teamPhotos: story.teamPhotos || [],
      processVideo: story.processVideo || '',
      totalCraftTime: story.totalCraftTime || '',
      materials: story.materials || [],
      tools: story.tools || [],
      processSteps: story.processSteps || [],
      awards: story.awards || [],
      certifications: story.certifications || [],
      communityProjects: story.communityProjects || [],
      instagram: story.socialMedia?.instagram || '',
      facebook: story.socialMedia?.facebook || '',
      youtube: story.socialMedia?.youtube || '',
      tiktok: story.socialMedia?.tiktok || '',
      website: story.socialMedia?.website || '',
    });
  };

  // Update a single field
  const updateField = useCallback(
    <K extends keyof ArtisanStoryFormState>(field: K, value: ArtisanStoryFormState[K]) => {
      setFormState((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  // Update multiple fields at once
  const updateFields = useCallback((updates: Partial<ArtisanStoryFormState>) => {
    setFormState((prev) => ({ ...prev, ...updates }));
  }, []);

  // Save story
  const save = useCallback(async (): Promise<boolean> => {
    // Validate required fields
    if (!formState.specialty || !formState.city || !formState.state) {
      showToast('Por favor completa los campos requeridos', 'error');
      return false;
    }

    if (!formState.personalStory) {
      showToast('Por favor escribe tu historia', 'error');
      return false;
    }

    setIsSaving(true);

    try {
      const storyData: ArtisanStory = {
        id: `story-${artisanId}`,
        artisanId,
        artisanName: user.name,
        shopName: user.makerProfile?.shopName || user.name,
        avatar: user.avatar || `https://i.pravatar.cc/150?u=${user.email}`,
        coverImage: formState.workshopPhotos[0] || formState.processPhotos[0] || '',

        sellerType: formState.sellerType,
        craftCategory: formState.craftCategory,
        craftStyle: 'traditional',
        indigenousConnection: formState.indigenousConnection,
        speaksIndigenousLanguage: formState.indigenousLanguageTerms.length > 0,
        indigenousLanguage:
          formState.indigenousLanguageTerms.length > 0
            ? formState.indigenousLanguageTerms[0].language
            : undefined,

        location: {
          city: formState.city,
          state: formState.state,
          region: formState.region || formState.state,
        },
        specialty: formState.specialty,
        yearsOfExperience: formState.yearsOfExperience,
        generationsOfCraft: formState.generationsOfCraft,
        apprentices: formState.apprentices,
        teamSize: formState.teamSize,
        foundingYear: formState.foundingYear,

        personalStory: formState.personalStory,
        heritageStory: formState.heritageStory,
        craftTechnique: formState.craftTechnique,
        productionProcess: formState.productionProcess,
        dailyLife: formState.dailyLife,
        culturalSignificance: formState.culturalSignificance,
        missionStatement: formState.missionStatement,

        traditionalTechniques: formState.traditionalTechniques,
        sustainabilityPractices: formState.sustainabilityPractices,
        indigenousLanguageTerms: formState.indigenousLanguageTerms,

        videoIntro: formState.videoIntro,
        workshopPhotos: formState.workshopPhotos,
        processPhotos: formState.processPhotos,
        familyPhotos: formState.familyPhotos,
        teamPhotos: formState.teamPhotos,

        processVideo: formState.processVideo,
        totalCraftTime: formState.totalCraftTime,
        materials: formState.materials,
        tools: formState.tools,
        processSteps: formState.processSteps,

        awards: formState.awards,
        certifications: formState.certifications,
        communityProjects: formState.communityProjects,

        socialMedia: {
          instagram: formState.instagram,
          facebook: formState.facebook,
          youtube: formState.youtube,
          tiktok: formState.tiktok,
          website: formState.website,
        },

        lastUpdated: new Date().toISOString(),
        isPublished: true,
      };

      localStorage.setItem(`artisan_story_${artisanId}`, JSON.stringify(storyData));

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      showToast('Historia guardada exitosamente', 'success');
      setIsSaving(false);
      return true;
    } catch (error) {
      console.error('Error saving story:', error);
      showToast('Error al guardar la historia', 'error');
      setIsSaving(false);
      return false;
    }
  }, [formState, artisanId, user, showToast]);

  return {
    // State
    ...formState,
    isLoading,
    isSaving,
    artisanId,

    // Actions
    updateField,
    updateFields,
    save,

    // Convenience setters for complex fields
    setSellerType: (v: SellerType) => updateField('sellerType', v),
    setCraftCategory: (v: CraftCategory | undefined) => updateField('craftCategory', v),
    setIndigenousConnection: (v: IndigenousConnection) => updateField('indigenousConnection', v),
    setTraditionalTechniques: (v: string[]) => updateField('traditionalTechniques', v),
    setSustainabilityPractices: (v: string[]) => updateField('sustainabilityPractices', v),
    setIndigenousLanguageTerms: (v: Array<{ term: string; meaning: string; language: string }>) =>
      updateField('indigenousLanguageTerms', v),
    setAwards: (v: Array<{ title: string; year: number; organization: string }>) =>
      updateField('awards', v),
    setCertifications: (v: Array<{ name: string; issuer: string; date: string }>) =>
      updateField('certifications', v),
    setCommunityProjects: (v: string[]) => updateField('communityProjects', v),
    setMaterials: (v: Material[]) => updateField('materials', v),
    setTools: (v: Tool[]) => updateField('tools', v),
    setProcessSteps: (v: ProcessStep[]) => updateField('processSteps', v),
  };
}
