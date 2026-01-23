/**
 * @fileoverview Seller achievements tab for the dashboard.
 * Shows seller's achievement progress, unlocked achievements, and all available achievements.
 * @module components/dashboard/tabs/AchievementsTab
 */

'use client';

import { useState, useEffect } from 'react';
import { Loader2, Trophy } from 'lucide-react';
import type { Achievement, UserAchievements } from '@/lib/types/achievements';
import { SELLER_ACHIEVEMENTS } from '@/lib/constants/achievements';
import {
  AchievementProgress,
  AchievementGrid,
  AchievementUnlockModal,
} from '@/components/achievements';

interface AchievementsTabProps {
  userEmail: string;
}

export default function AchievementsTab({ userEmail }: AchievementsTabProps) {
  const [data, setData] = useState<UserAchievements | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  useEffect(() => {
    async function loadAchievements() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/seller/achievements');
        const result = await response.json();

        if (result.success && result.data) {
          // Get user-specific data or create empty state
          const userData = result.data[userEmail];

          if (userData) {
            // Merge achievement definitions with user progress
            const mergedAchievements: Achievement[] = SELLER_ACHIEVEMENTS.map((def) => {
              const userProgress = userData.achievements.find(
                (a: { id: string }) => a.id === def.id
              );
              return {
                ...def,
                status: userProgress?.status || 'locked',
                currentValue: userProgress?.currentValue || 0,
                progress: userProgress?.progress || 0,
                unlockedAt: userProgress?.unlockedAt,
              };
            });

            // Calculate rewards from unlocked achievements
            const unlockedAchievements = mergedAchievements.filter((a) => a.status === 'unlocked');
            const rewardsEarned = unlockedAchievements
              .filter((a) => a.reward)
              .map((a) => a.reward!);

            setData({
              userId: userEmail,
              userType: 'seller',
              achievements: mergedAchievements,
              totalUnlocked: userData.totalUnlocked,
              totalAvailable: SELLER_ACHIEVEMENTS.length,
              recentUnlocks: unlockedAchievements.slice(0, 5),
              nextToUnlock: mergedAchievements
                .filter((a) => a.status !== 'unlocked')
                .sort((a, b) => b.progress - a.progress)
                .slice(0, 3),
              tierStats: {
                bronze: {
                  unlocked: mergedAchievements.filter(
                    (a) => a.tier === 'bronze' && a.status === 'unlocked'
                  ).length,
                  total: mergedAchievements.filter((a) => a.tier === 'bronze').length,
                },
                silver: {
                  unlocked: mergedAchievements.filter(
                    (a) => a.tier === 'silver' && a.status === 'unlocked'
                  ).length,
                  total: mergedAchievements.filter((a) => a.tier === 'silver').length,
                },
                gold: {
                  unlocked: mergedAchievements.filter(
                    (a) => a.tier === 'gold' && a.status === 'unlocked'
                  ).length,
                  total: mergedAchievements.filter((a) => a.tier === 'gold').length,
                },
                platinum: {
                  unlocked: mergedAchievements.filter(
                    (a) => a.tier === 'platinum' && a.status === 'unlocked'
                  ).length,
                  total: mergedAchievements.filter((a) => a.tier === 'platinum').length,
                },
              },
              categoryStats: {},
              unseenCount: 0,
              rewardsEarned,
            });
          } else {
            // No user data - create empty state with all achievements locked
            const emptyAchievements: Achievement[] = SELLER_ACHIEVEMENTS.map((def) => ({
              ...def,
              status: 'locked' as const,
              currentValue: 0,
              progress: 0,
            }));

            setData({
              userId: userEmail,
              userType: 'seller',
              achievements: emptyAchievements,
              totalUnlocked: 0,
              totalAvailable: SELLER_ACHIEVEMENTS.length,
              recentUnlocks: [],
              nextToUnlock: emptyAchievements.slice(0, 3),
              tierStats: {
                bronze: {
                  unlocked: 0,
                  total: emptyAchievements.filter((a) => a.tier === 'bronze').length,
                },
                silver: {
                  unlocked: 0,
                  total: emptyAchievements.filter((a) => a.tier === 'silver').length,
                },
                gold: {
                  unlocked: 0,
                  total: emptyAchievements.filter((a) => a.tier === 'gold').length,
                },
                platinum: {
                  unlocked: 0,
                  total: emptyAchievements.filter((a) => a.tier === 'platinum').length,
                },
              },
              categoryStats: {},
              unseenCount: 0,
              rewardsEarned: [],
            });
          }
        }
      } catch (error) {
        console.error('[AchievementsTab] Error loading achievements:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadAchievements();
  }, [userEmail]);

  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    // Show modal only for unlocked Gold/Platinum achievements (for demo purposes)
    if (
      achievement.status === 'unlocked' &&
      (achievement.tier === 'gold' || achievement.tier === 'platinum')
    ) {
      setShowUnlockModal(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
        <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          No se pudieron cargar los logros
        </h2>
        <p className="text-gray-600 dark:text-gray-400">Por favor, intenta de nuevo más tarde.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress summary */}
      <AchievementProgress data={data} onAchievementClick={handleAchievementClick} />

      {/* All achievements */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Todos los Logros
        </h2>
        <AchievementGrid
          achievements={data.achievements}
          userType="seller"
          onAchievementClick={handleAchievementClick}
        />
      </div>

      {/* Unlock modal */}
      {selectedAchievement && showUnlockModal && (
        <AchievementUnlockModal
          achievement={selectedAchievement}
          isOpen={showUnlockModal}
          onClose={() => {
            setShowUnlockModal(false);
            setSelectedAchievement(null);
          }}
        />
      )}
    </div>
  );
}
