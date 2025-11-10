import type { ArtisanStory } from '@/lib/types/artisan-story';

/**
 * Maps product maker names to artisan IDs
 * This allows us to connect products to their artisan story pages
 */

// Manual mapping for exact matches or known aliases
const MAKER_TO_ARTISAN_MAP: Record<string, string> = {
  // Exact shop name matches
  'Textiles Sofía': 'sofia',
  'Alebrijes Don Pedro': 'pedro',

  // Common maker names that should map to artisans
  'Taller de Barro Negro': 'sofia', // Sofia also works with barro negro
  'Alfarería San Bartolo': 'sofia',
  'Plata Oaxaqueña': 'sofia',
  'Bordados Tradicionales': 'sofia',
  'Textiles Oaxaqueños': 'sofia',
  'Bordados Oaxaqueños': 'sofia',

  'Arte Popular Mexicano': 'pedro',
  'Artesanos de Pátzcuaro': 'pedro',

  // Add more mappings as you add more artisans
  // 'Other Maker Name': 'artisanId',
};

/**
 * Get artisan ID from product maker name
 * @param makerName - The maker name from the product
 * @returns artisanId or null if no match found
 */
export function getArtisanIdFromMaker(makerName: string): string | null {
  // Check exact match first
  if (MAKER_TO_ARTISAN_MAP[makerName]) {
    return MAKER_TO_ARTISAN_MAP[makerName];
  }

  // Check for partial matches (case-insensitive)
  const lowerMaker = makerName.toLowerCase();

  for (const [key, value] of Object.entries(MAKER_TO_ARTISAN_MAP)) {
    if (lowerMaker.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerMaker)) {
      return value;
    }
  }

  return null;
}

/**
 * Get artisan story by ID from the JSON data
 * @param artisanId - The artisan's unique ID
 * @returns ArtisanStory or null
 */
export async function getArtisanStoryById(artisanId: string): Promise<ArtisanStory | null> {
  try {
    const response = await fetch('/data/artisan-stories.json');
    const data: Record<string, ArtisanStory> = await response.json();
    return data[artisanId] || null;
  } catch (error) {
    console.error('Error loading artisan story:', error);
    return null;
  }
}

/**
 * Check if a maker has an artisan story
 * @param makerName - The maker name from the product
 * @returns boolean
 */
export function hasArtisanStory(makerName: string): boolean {
  return getArtisanIdFromMaker(makerName) !== null;
}

/**
 * Get artisan story URL from maker name
 * @param makerName - The maker name from the product
 * @returns URL path or null
 */
export function getArtisanStoryUrl(makerName: string): string | null {
  const artisanId = getArtisanIdFromMaker(makerName);
  return artisanId ? `/artesano/${artisanId}` : null;
}
