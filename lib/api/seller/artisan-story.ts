import { ArtisanStory } from '@/lib/types/artisan-story';

export async function getArtisanStoryByEmail(email: string): Promise<ArtisanStory | null> {
  try {
    const response = await fetch('/api/artisan-stories');
    const data = await response.json();

    // Extract artisanId from email (sofia@ejemplo.com -> sofia)
    const artisanId = email.split('@')[0];

    return data[artisanId] || null;
  } catch (error) {
    console.error('Error loading artisan story:', error);
    return null;
  }
}

export async function getArtisanStoryById(artisanId: string): Promise<ArtisanStory | null> {
  try {
    const response = await fetch('/api/artisan-stories');
    const data = await response.json();
    return data[artisanId] || null;
  } catch (error) {
    console.error('Error loading artisan story:', error);
    return null;
  }
}

export async function getAllArtisanStories(): Promise<Record<string, ArtisanStory>> {
  try {
    const response = await fetch('/api/artisan-stories');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading artisan stories:', error);
    return {};
  }
}
