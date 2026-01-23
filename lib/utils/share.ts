/**
 * @fileoverview Share utility functions for social sharing.
 * Provides functions to share content to various platforms.
 * @module lib/utils/share
 */

import type { Achievement } from '@/lib/types/achievements';
import { TIER_CONFIG } from '@/lib/types/achievements';

export interface ShareData {
  title: string;
  text: string;
  url?: string;
}

/**
 * Check if Web Share API is available
 */
export function canUseWebShare(): boolean {
  return typeof navigator !== 'undefined' && 'share' in navigator;
}

/**
 * Share content using Web Share API or fallback to clipboard
 */
export async function shareContent(data: ShareData): Promise<boolean> {
  if (canUseWebShare()) {
    try {
      await navigator.share(data);
      return true;
    } catch (error) {
      // User cancelled or share failed
      if ((error as Error).name !== 'AbortError') {
        console.error('[share] Web Share API error:', error);
      }
      return false;
    }
  }

  // Fallback: copy to clipboard
  try {
    const text = `${data.title}\n${data.text}${data.url ? `\n${data.url}` : ''}`;
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('[share] Clipboard error:', error);
    return false;
  }
}

/**
 * Generate share data for an achievement
 */
export function getAchievementShareData(achievement: Achievement, siteUrl: string = ''): ShareData {
  const tierConfig = TIER_CONFIG[achievement.tier];
  const emoji =
    achievement.tier === 'platinum'
      ? '🏆'
      : achievement.tier === 'gold'
        ? '🥇'
        : achievement.tier === 'silver'
          ? '🥈'
          : '🥉';

  return {
    title: `${emoji} ¡Desbloqueé un logro!`,
    text: `Acabo de desbloquear "${achievement.name}" (${tierConfig.label}) en Papalote Market. ${achievement.description}`,
    url: siteUrl ? `${siteUrl}/mi-impacto/logros` : undefined,
  };
}

/**
 * Share to Twitter/X
 */
export function shareToTwitter(data: ShareData): void {
  const text = encodeURIComponent(`${data.title}\n${data.text}`);
  const url = data.url ? encodeURIComponent(data.url) : '';
  const twitterUrl = `https://twitter.com/intent/tweet?text=${text}${url ? `&url=${url}` : ''}`;
  window.open(twitterUrl, '_blank', 'width=550,height=420');
}

/**
 * Share to Facebook
 */
export function shareToFacebook(data: ShareData): void {
  const url = data.url ? encodeURIComponent(data.url) : '';
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(data.title + '\n' + data.text)}`;
  window.open(facebookUrl, '_blank', 'width=550,height=420');
}

/**
 * Share to WhatsApp
 */
export function shareToWhatsApp(data: ShareData): void {
  const text = encodeURIComponent(`${data.title}\n${data.text}${data.url ? `\n${data.url}` : ''}`);
  const whatsappUrl = `https://wa.me/?text=${text}`;
  window.open(whatsappUrl, '_blank');
}

/**
 * Copy achievement share text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('[share] Clipboard error:', error);
    return false;
  }
}
