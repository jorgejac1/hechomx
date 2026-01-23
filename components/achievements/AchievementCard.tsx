/**
 * @fileoverview Achievement card component for displaying individual achievements.
 * Shows locked/unlocked states, progress bars, tier badges, and unlock dates.
 * @module components/achievements/AchievementCard
 */

'use client';

import { useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { Lock, CheckCircle2, HelpCircle, Gift } from 'lucide-react';
import type { Achievement, AchievementTier } from '@/lib/types/achievements';
import { TIER_CONFIG, RARITY_CONFIG, TIER_TO_RARITY } from '@/lib/types/achievements';
import { formatRelativeTime } from '@/lib';

interface AchievementCardProps {
  /** Achievement data with progress */
  achievement: Achievement;
  /** Whether to show compact version */
  compact?: boolean;
  /** Click handler for card */
  onClick?: () => void;
  /** Whether to show as hidden (mystery) achievement */
  showAsHidden?: boolean;
}

/**
 * Get Lucide icon component by name
 */
function getIconComponent(iconName: string): LucideIcons.LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>;
  return icons[iconName] || LucideIcons.Award;
}

/**
 * Get tier badge styles
 */
function getTierStyles(tier: AchievementTier, status: 'locked' | 'in_progress' | 'unlocked') {
  if (status === 'locked') {
    return {
      card: 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-70',
      iconBg: 'bg-gray-300 dark:bg-gray-600',
      iconColor: 'text-gray-500 dark:text-gray-400',
      badge: 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400',
    };
  }

  const config = TIER_CONFIG[tier];

  if (status === 'in_progress') {
    return {
      card: `${config.bgColor} dark:bg-gray-800 ${config.borderColor} dark:border-gray-700`,
      iconBg: 'bg-gray-400 dark:bg-gray-600',
      iconColor: 'text-white',
      badge: `${config.bgColor} dark:bg-gray-700 ${config.color}`,
    };
  }

  // Unlocked
  const tierBgColors: Record<AchievementTier, string> = {
    bronze: 'bg-amber-500',
    silver: 'bg-gray-500',
    gold: 'bg-accent-500',
    platinum: 'bg-gradient-to-r from-primary-500 to-primary-700',
  };

  return {
    card: `${config.bgColor} dark:bg-gray-800 ${config.borderColor} dark:border-gray-600`,
    iconBg: tierBgColors[tier],
    iconColor: 'text-white',
    badge: `${config.bgColor} dark:bg-gray-700 ${config.color}`,
  };
}

export default function AchievementCard({
  achievement,
  compact = false,
  onClick,
  showAsHidden,
}: AchievementCardProps) {
  const { status, tier, progress, unlockedAt, hidden, hint, reward, rarity } = achievement;

  // Determine if we should show as hidden mystery achievement
  const isHiddenAchievement = showAsHidden ?? (hidden && status !== 'unlocked');

  const styles = useMemo(() => getTierStyles(tier, status), [tier, status]);
  const IconComponent = useMemo(() => getIconComponent(achievement.icon), [achievement.icon]);
  const tierConfig = TIER_CONFIG[tier];

  // Get rarity config - use provided rarity or derive from tier
  const rarityLevel = rarity || TIER_TO_RARITY[tier];
  const rarityConfig = RARITY_CONFIG[rarityLevel];

  if (compact) {
    return (
      <button
        onClick={onClick}
        className={`
          flex items-center gap-3 p-3 rounded-xl border-2 transition-all w-full text-left
          ${isHiddenAchievement ? 'bg-gray-100 dark:bg-gray-800 border-dashed border-gray-300 dark:border-gray-600' : styles.card}
          ${onClick ? 'hover:scale-[1.02] cursor-pointer' : ''}
        `}
      >
        <div
          className={`p-2 rounded-full ${isHiddenAchievement ? 'bg-gray-400 dark:bg-gray-600' : styles.iconBg} shrink-0`}
        >
          {isHiddenAchievement ? (
            <HelpCircle className="w-4 h-4 text-white" />
          ) : status === 'locked' ? (
            <Lock className="w-4 h-4 text-white" />
          ) : (
            <IconComponent className={`w-4 h-4 ${styles.iconColor}`} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
            {isHiddenAchievement ? '???' : achievement.name}
          </p>
          {isHiddenAchievement && hint && (
            <p className="text-xs text-gray-500 dark:text-gray-400 italic truncate">{hint}</p>
          )}
          {!isHiddenAchievement && status === 'in_progress' && (
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
              <div
                className="bg-primary-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
        {status === 'unlocked' && !isHiddenAchievement && (
          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
        )}
      </button>
    );
  }

  // Hidden achievement - mystery card
  if (isHiddenAchievement) {
    return (
      <button
        onClick={onClick}
        className={`
          flex flex-col p-4 rounded-xl border-2 border-dashed transition-all w-full text-left
          bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600
          ${onClick ? 'hover:scale-[1.02] hover:shadow-md cursor-pointer' : ''}
        `}
      >
        {/* Header with mystery icon and tier badge */}
        <div className="flex items-start justify-between mb-3">
          <div className="p-3 rounded-full bg-gray-400 dark:bg-gray-600">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
            ???
          </span>
        </div>

        {/* Mystery title */}
        <h3 className="font-bold text-gray-500 dark:text-gray-400 mb-1">Logro Secreto</h3>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-3 italic">
          {hint || 'Descubre cómo desbloquear este logro...'}
        </p>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col p-4 rounded-xl border-2 transition-all w-full text-left
        ${styles.card}
        ${onClick ? 'hover:scale-[1.02] hover:shadow-md cursor-pointer' : ''}
        ${status === 'unlocked' ? 'animate-achievement-unlock' : ''}
      `}
    >
      {/* Header with icon and tier/rarity badges */}
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-full ${styles.iconBg}`}>
          {status === 'locked' ? (
            <Lock className="w-6 h-6 text-white" />
          ) : (
            <IconComponent className={`w-6 h-6 ${styles.iconColor}`} />
          )}
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${styles.badge}`}>
            {tierConfig.label}
          </span>
          {rarityLevel !== TIER_TO_RARITY[tier] && (
            <span className={`text-xs font-medium ${rarityConfig.color}`}>
              {rarityConfig.label}
            </span>
          )}
        </div>
      </div>

      {/* Title and description */}
      <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{achievement.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{achievement.description}</p>

      {/* Reward indicator */}
      {reward && status !== 'unlocked' && (
        <div className="flex items-center gap-1.5 text-xs text-accent-600 dark:text-accent-400 mb-2">
          <Gift className="w-3.5 h-3.5" />
          <span className="font-medium">Recompensa: {reward.description}</span>
        </div>
      )}

      {/* Progress or unlock status */}
      {status === 'locked' && (
        <div className="mt-auto">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Progreso</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gray-400 dark:bg-gray-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {status === 'in_progress' && (
        <div className="mt-auto">
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
            <span>Progreso</span>
            <span className="font-semibold text-primary-600 dark:text-primary-400">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {status === 'unlocked' && (
        <div className="mt-auto space-y-2">
          {unlockedAt && (
            <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Logrado {formatRelativeTime(unlockedAt)}</span>
            </div>
          )}
          {reward && (
            <div className="flex items-center gap-1.5 text-xs text-accent-600 dark:text-accent-400 bg-accent-50 dark:bg-accent-900/20 px-2 py-1 rounded-lg">
              <Gift className="w-3.5 h-3.5" />
              <span className="font-medium">{reward.description}</span>
            </div>
          )}
        </div>
      )}
    </button>
  );
}
