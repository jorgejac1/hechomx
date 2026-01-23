/**
 * @fileoverview Compact achievement badge display for profiles and cards.
 * Shows a user's top achievements in a horizontal badge format.
 * @module components/achievements/AchievementBadge
 */

'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { Trophy } from 'lucide-react';
import type { Achievement } from '@/lib/types/achievements';
import { TIER_CONFIG } from '@/lib/types/achievements';
import { ROUTES } from '@/lib/constants/routes';

interface AchievementBadgeProps {
  /** Achievements to display (will show top unlocked) */
  achievements: Achievement[];
  /** Maximum number of badges to show */
  maxDisplay?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show a "view all" link */
  showViewAll?: boolean;
  /** Link destination for view all */
  viewAllHref?: string;
  /** User type for determining the view all link */
  userType?: 'buyer' | 'seller';
}

/**
 * Get Lucide icon component by name
 */
function getIconComponent(iconName: string): LucideIcons.LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>;
  return icons[iconName] || LucideIcons.Award;
}

const sizeClasses = {
  sm: {
    container: 'gap-1',
    badge: 'w-6 h-6',
    icon: 'w-3 h-3',
    text: 'text-xs',
    viewAll: 'text-xs px-2 py-0.5',
  },
  md: {
    container: 'gap-1.5',
    badge: 'w-8 h-8',
    icon: 'w-4 h-4',
    text: 'text-sm',
    viewAll: 'text-xs px-2 py-1',
  },
  lg: {
    container: 'gap-2',
    badge: 'w-10 h-10',
    icon: 'w-5 h-5',
    text: 'text-base',
    viewAll: 'text-sm px-3 py-1',
  },
};

export default function AchievementBadge({
  achievements,
  maxDisplay = 5,
  size = 'md',
  showViewAll = true,
  viewAllHref,
  userType = 'buyer',
}: AchievementBadgeProps) {
  // Get top unlocked achievements, prioritizing higher tiers
  const topAchievements = useMemo(() => {
    const tierOrder = ['platinum', 'gold', 'silver', 'bronze'];

    return achievements
      .filter((a) => a.status === 'unlocked')
      .sort((a, b) => {
        const aIndex = tierOrder.indexOf(a.tier);
        const bIndex = tierOrder.indexOf(b.tier);
        if (aIndex !== bIndex) return aIndex - bIndex;
        // If same tier, sort by unlock date (most recent first)
        const aDate = a.unlockedAt ? new Date(a.unlockedAt).getTime() : 0;
        const bDate = b.unlockedAt ? new Date(b.unlockedAt).getTime() : 0;
        return bDate - aDate;
      })
      .slice(0, maxDisplay);
  }, [achievements, maxDisplay]);

  const totalUnlocked = achievements.filter((a) => a.status === 'unlocked').length;
  const remaining = totalUnlocked - topAchievements.length;
  const classes = sizeClasses[size];
  const href = viewAllHref || (userType === 'buyer' ? ROUTES.ACHIEVEMENTS : ROUTES.DASHBOARD);

  if (topAchievements.length === 0) {
    return null;
  }

  return (
    <div className={`flex items-center flex-wrap ${classes.container}`}>
      {topAchievements.map((achievement) => {
        const IconComponent = getIconComponent(achievement.icon);
        const tierConfig = TIER_CONFIG[achievement.tier];

        return (
          <div
            key={achievement.id}
            className={`${classes.badge} rounded-full flex items-center justify-center ${tierConfig.bgColor} border-2 ${tierConfig.borderColor}`}
            title={`${achievement.name}: ${achievement.description}`}
          >
            <IconComponent className={`${classes.icon} ${tierConfig.color}`} />
          </div>
        );
      })}

      {remaining > 0 && (
        <div
          className={`${classes.badge} rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600`}
          title={`${remaining} logros más`}
        >
          <span className={`${classes.text} font-bold text-gray-600 dark:text-gray-400`}>
            +{remaining}
          </span>
        </div>
      )}

      {showViewAll && (
        <Link
          href={href}
          className={`${classes.viewAll} flex items-center gap-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors font-medium`}
        >
          <Trophy className={classes.icon} />
          <span>Ver todos</span>
        </Link>
      )}
    </div>
  );
}
