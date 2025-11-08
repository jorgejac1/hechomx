import type { ArtisanStory } from '@/lib/types/artisan-story';

export async function getArtisanStory(userEmail: string): Promise<ArtisanStory | null> {
  try {
    const response = await fetch('/data/artisan-stories.json');
    const data = await response.json();
    return data[userEmail] || null;
  } catch (error) {
    console.error('Error loading artisan story:', error);
    return null;
  }
}

export async function saveArtisanStory(
  userEmail: string,
  story: Partial<ArtisanStory>
): Promise<boolean> {
  try {
    // In production, this would POST to your API
    console.log('Saving artisan story for:', userEmail, story);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return true;
  } catch (error) {
    console.error('Error saving artisan story:', error);
    return false;
  }
}
