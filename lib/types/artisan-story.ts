/**
 * @fileoverview Type definitions for artisan story pages.
 * Includes interfaces for artisan stories with personal narratives, craft processes,
 * materials, tools, awards, certifications, social media, and location information.
 * @module lib/types/artisan-story
 */

import { SellerType, CraftCategory, CraftStyle, IndigenousConnection } from './seller-types';

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration: string; // "2-3 horas", "1 semana"
  image?: string;
}

export interface Material {
  name: string;
  source: string;
  description?: string;
  image?: string;
}

export interface Tool {
  name: string;
  description: string;
  image?: string;
}

export interface ArtisanStory {
  id: string;
  artisanId: string;
  artisanName: string;
  shopName: string;
  avatar: string;
  coverImage?: string;

  // Seller Classification
  sellerType: SellerType;
  craftCategory?: CraftCategory;
  craftStyle?: CraftStyle;
  indigenousConnection?: IndigenousConnection;
  speaksIndigenousLanguage?: boolean;
  indigenousLanguage?: string;

  // Location
  location: {
    city: string;
    state: string;
    region?: string;
  };

  // Basic Info
  specialty: string;
  yearsOfExperience: number;

  // Type-specific fields
  generationsOfCraft?: number; // artisan_individual, workshop
  apprentices?: number; // artisan_individual
  teamSize?: number; // workshop, company
  foundingYear?: number; // company

  // Stories (conditional based on seller type)
  personalStory?: string; // all types
  heritageStory?: string; // artisan_individual, workshop
  craftTechnique?: string; // artisan_individual
  productionProcess?: string; // hobby_maker, workshop, company
  dailyLife?: string; // hobby_maker, artisan_individual, workshop
  culturalSignificance?: string; // artisan_individual (if indigenous)
  missionStatement?: string; // workshop, company

  // Media
  videoIntro?: string;
  workshopPhotos: string[];
  processPhotos: string[];
  familyPhotos?: string[];
  teamPhotos?: string[];

  // === BEHIND THE CRAFT (New Fields) ===
  processVideo?: string; // Dedicated craft process video (separate from intro)
  totalCraftTime?: string; // "2-3 meses para una pieza grande"

  materials?: Material[]; // Raw materials with sourcing info
  tools?: Tool[]; // Tools used in the craft
  processSteps?: ProcessStep[]; // Step-by-step breakdown with durations

  // Recognition
  awards: Array<{
    title: string;
    year: number;
    organization: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
  communityProjects: string[];

  // Artisan-specific
  traditionalTechniques?: string[];
  indigenousLanguageTerms?: Array<{
    term: string;
    meaning: string;
    language: string;
  }>;

  // Company-specific
  sustainabilityPractices?: string[];

  // Metadata
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
    website?: string;
  };
  lastUpdated: string;
  isPublished: boolean;
}
