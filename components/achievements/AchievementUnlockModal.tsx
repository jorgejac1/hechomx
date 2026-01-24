/**
 * @fileoverview Achievement unlock celebration modal with confetti.
 * Used for Gold and Platinum tier achievements.
 * @module components/achievements/AchievementUnlockModal
 */

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { X, Share2, Trophy, Gift, Copy, Check } from 'lucide-react';
import type { Achievement } from '@/lib/types/achievements';
import { TIER_CONFIG, RARITY_CONFIG, TIER_TO_RARITY } from '@/lib/types/achievements';
import {
  shareContent,
  getAchievementShareData,
  shareToTwitter,
  shareToWhatsApp,
  canUseWebShare,
} from '@/lib/utils/share';

interface AchievementUnlockModalProps {
  /** Achievement that was unlocked */
  achievement: Achievement;
  /** Whether modal is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Share handler */
  onShare?: () => void;
}

/**
 * Get Lucide icon component by name
 */
function getIconComponent(iconName: string): LucideIcons.LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>;
  return icons[iconName] || LucideIcons.Award;
}

/**
 * Trigger confetti animation
 */
async function triggerConfetti() {
  try {
    const confetti = (await import('canvas-confetti')).default;

    // First burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D9534F', '#FBBC04', '#5BC0DE', '#F48FB1'],
    });

    // Second burst after short delay
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#D9534F', '#FBBC04', '#5BC0DE'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#D9534F', '#FBBC04', '#5BC0DE'],
      });
    }, 200);
  } catch {
    // Confetti library not available, continue without it
  }
}

export default function AchievementUnlockModal({
  achievement,
  isOpen,
  onClose,
  onShare,
}: AchievementUnlockModalProps) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const tierConfig = TIER_CONFIG[achievement.tier];
  const IconComponent = useMemo(() => getIconComponent(achievement.icon), [achievement.icon]);
  const rarityLevel = achievement.rarity || TIER_TO_RARITY[achievement.tier];
  const rarityConfig = RARITY_CONFIG[rarityLevel];
  const hasReward = !!achievement.reward;

  const shareData = useMemo(
    () =>
      getAchievementShareData(
        achievement,
        typeof window !== 'undefined' ? window.location.origin : ''
      ),
    [achievement]
  );

  const handleShare = async () => {
    if (canUseWebShare()) {
      const success = await shareContent(shareData);
      if (success) {
        onShare?.();
        onClose();
      }
    } else {
      setShowShareOptions(true);
    }
  };

  const handleCopyLink = async () => {
    const text = `${shareData.title}\n${shareData.text}${shareData.url ? `\n${shareData.url}` : ''}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback - do nothing
    }
  };

  const handleShareToTwitter = () => {
    shareToTwitter(shareData);
    onShare?.();
  };

  const handleShareToWhatsApp = () => {
    shareToWhatsApp(shareData);
    onShare?.();
  };

  // Trigger confetti on open
  useEffect(() => {
    if (isOpen) {
      triggerConfetti();
    }
  }, [isOpen]);

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
    return undefined;
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const tierBgGradients: Record<string, string> = {
    bronze: 'from-amber-400 via-amber-500 to-amber-600',
    silver: 'from-gray-300 via-gray-400 to-gray-500',
    gold: 'from-yellow-400 via-accent-500 to-orange-500',
    platinum: 'from-primary-400 via-primary-500 to-primary-700',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal container */}
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Modal panel */}
        <div
          role="dialog"
          aria-modal="true"
          className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md animate-achievement-unlock overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header with gradient */}
          <div
            className={`bg-gradient-to-br ${tierBgGradients[achievement.tier]} px-6 py-10 text-center text-white`}
          >
            {/* Celebration text */}
            <div className="mb-4">
              <span className="text-sm font-semibold uppercase tracking-wider opacity-90">
                Logro Desbloqueado
              </span>
            </div>

            {/* Icon with glow */}
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-white/30 rounded-full blur-xl animate-glow-pulse" />
              <div className="relative p-5 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30">
                <IconComponent className="w-12 h-12" />
              </div>
            </div>

            {/* Achievement name */}
            <h2 className="text-2xl font-bold mb-2">{achievement.name}</h2>

            {/* Tier badge */}
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
              {tierConfig.label}
            </span>
          </div>

          {/* Content */}
          <div className="p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-6">{achievement.description}</p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="text-center">
                <Trophy className="w-6 h-6 text-accent-500 mx-auto mb-1" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Logro</span>
              </div>
              <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />
              <div className="text-center">
                <span
                  className={`text-2xl font-bold ${
                    achievement.tier === 'platinum'
                      ? 'text-primary-600'
                      : achievement.tier === 'gold'
                        ? 'text-accent-600'
                        : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {tierConfig.label}
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400">Nivel</p>
              </div>
              {rarityLevel !== TIER_TO_RARITY[achievement.tier] && (
                <>
                  <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />
                  <div className="text-center">
                    <span className={`text-lg font-bold ${rarityConfig.color}`}>
                      {rarityConfig.label}
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Rareza</p>
                  </div>
                </>
              )}
            </div>

            {/* Reward section */}
            {hasReward && (
              <div className="mb-6 p-4 bg-gradient-to-r from-accent-50 to-primary-50 dark:from-accent-900/30 dark:to-primary-900/30 rounded-xl border border-accent-200 dark:border-accent-800">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Gift className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                  <span className="font-semibold text-accent-700 dark:text-accent-300">
                    ¡Ganaste una Recompensa!
                  </span>
                </div>
                <p className="text-sm text-accent-600 dark:text-accent-400">
                  {achievement.reward!.description}
                </p>
                {achievement.reward!.expiresInDays && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Válido por {achievement.reward!.expiresInDays} días
                  </p>
                )}
              </div>
            )}

            {/* Actions */}
            {!showShareOptions ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors"
                >
                  {hasReward ? 'Reclamar y Continuar' : 'Continuar'}
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors text-gray-700 dark:text-gray-300 font-medium"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Compartir</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Compartir en:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={handleShareToTwitter}
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>X</span>
                  </button>
                  <button
                    onClick={handleShareToWhatsApp}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
                <button
                  onClick={() => setShowShareOptions(false)}
                  className="w-full px-4 py-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  Volver
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
