/**
 * @fileoverview Achievement progress summary component.
 * Shows overall progress with tier breakdown and next achievements to unlock.
 * @module components/achievements/AchievementProgress
 */

'use client';

import { useMemo } from 'react';
import { Trophy, Target, Flame, Star } from 'lucide-react';
import type { Achievement, AchievementTier, UserAchievements } from '@/lib/types/achievements';
import { TIER_CONFIG } from '@/lib/types/achievements';
import AchievementCard from './AchievementCard';

interface AchievementProgressProps {
  /** User achievements data */
  data: UserAchievements;
  /** Callback when achievement is clicked */
  onAchievementClick?: (achievement: Achievement) => void;
}

export default function AchievementProgress({
  data,
  onAchievementClick,
}: AchievementProgressProps) {
  const { achievements, totalUnlocked, totalAvailable } = data;

  // Calculate tier stats
  const tierStats = useMemo(() => {
    const stats: Record<AchievementTier, { unlocked: number; total: number }> = {
      bronze: { unlocked: 0, total: 0 },
      silver: { unlocked: 0, total: 0 },
      gold: { unlocked: 0, total: 0 },
      platinum: { unlocked: 0, total: 0 },
    };

    achievements.forEach((a) => {
      stats[a.tier].total++;
      if (a.status === 'unlocked') {
        stats[a.tier].unlocked++;
      }
    });

    return stats;
  }, [achievements]);

  // Get next achievements to unlock (closest to completion)
  const nextToUnlock = useMemo(() => {
    return achievements
      .filter((a) => a.status !== 'unlocked')
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 3);
  }, [achievements]);

  // Get recently unlocked
  const recentlyUnlocked = useMemo(() => {
    return achievements
      .filter((a) => a.status === 'unlocked' && a.unlockedAt)
      .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
      .slice(0, 3);
  }, [achievements]);

  const overallProgress = Math.round((totalUnlocked / totalAvailable) * 100);

  return (
    <div className="space-y-6">
      {/* Overall progress */}
      <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/20 rounded-full">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Tus Logros</h2>
            <p className="text-primary-100">
              {totalUnlocked} de {totalAvailable} desbloqueados
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-primary-100">Progreso total</span>
            <span className="font-bold">{overallProgress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Tier breakdown */}
        <div className="grid grid-cols-4 gap-2">
          {(Object.keys(tierStats) as AchievementTier[]).map((tier) => {
            const stats = tierStats[tier];
            const config = TIER_CONFIG[tier];
            const percent = stats.total > 0 ? Math.round((stats.unlocked / stats.total) * 100) : 0;

            return (
              <div key={tier} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <div className="text-xs text-primary-100 mb-1">{config.label}</div>
                <div className="text-lg font-bold">
                  {stats.unlocked}/{stats.total}
                </div>
                <div className="text-xs text-primary-200">{percent}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next to unlock */}
      {nextToUnlock.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <h3 className="font-bold text-gray-900 dark:text-gray-100">Próximos a desbloquear</h3>
          </div>
          <div className="space-y-3">
            {nextToUnlock.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                compact
                onClick={onAchievementClick ? () => onAchievementClick(achievement) : undefined}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recently unlocked */}
      {recentlyUnlocked.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-gray-900 dark:text-gray-100">Logros recientes</h3>
          </div>
          <div className="space-y-3">
            {recentlyUnlocked.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                compact
                onClick={onAchievementClick ? () => onAchievementClick(achievement) : undefined}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {totalUnlocked === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
            Comienza tu colección
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Realiza acciones en la plataforma para desbloquear logros y ganar insignias
          </p>
        </div>
      )}
    </div>
  );
}
