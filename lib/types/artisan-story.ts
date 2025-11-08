export interface ArtisanStory {
  id: string;
  artisanId: string;
  artisanName: string;
  shopName: string;
  avatar: string;
  coverImage: string;
  location: {
    city: string;
    state: string;
    region: string;
  };
  specialty: string;
  yearsOfExperience: number;
  generationsOfCraft: number;

  // Story sections
  personalStory: string;
  heritageStory: string;
  craftTechnique: string;
  dailyLife: string;

  // Media
  videoIntro?: string;
  workshopPhotos: string[];
  processPhotos: string[];
  familyPhotos: string[];

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

  // Cultural context
  culturalSignificance: string;
  traditionalTechniques: string[];
  indigenousLanguageTerms?: Array<{
    term: string;
    meaning: string;
    language: string;
  }>;

  // Community impact
  apprentices: number;
  communityProjects: string[];

  // Social
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };

  lastUpdated: string;
  isPublished: boolean;
}
