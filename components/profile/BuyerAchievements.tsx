/**
 * @fileoverview Buyer achievements page component.
 * Shows buyer's achievement progress, unlocked achievements, and all available achievements.
 * @module components/profile/BuyerAchievements
 */

'use client';

import { useState, useEffect } from 'react';
import { Loader2, Trophy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Achievement, UserAchievements } from '@/lib/types/achievements';
import { BUYER_ACHIEVEMENTS } from '@/lib/constants/achievements';
import {
  AchievementProgress,
  AchievementGrid,
  AchievementUnlockModal,
  RewardsPanel,
} from '@/components/achievements';
import { ROUTES } from '@/lib/constants/routes';

interface BuyerAchievementsProps {
  userEmail: string;
}

export default function BuyerAchievements({ userEmail }: BuyerAchievementsProps) {
  const [data, setData] = useState<UserAchievements | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  useEffect(() => {
    async function loadAchievements() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/buyer/achievements');
        const result = await response.json();

        if (result.success && result.data) {
          // Get user-specific data or create empty state
          const userData = result.data[userEmail];

          if (userData) {
            // Merge achievement definitions with user progress
            const mergedAchievements: Achievement[] = BUYER_ACHIEVEMENTS.map((def) => {
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
              userType: 'buyer',
              achievements: mergedAchievements,
              totalUnlocked: userData.totalUnlocked,
              totalAvailable: BUYER_ACHIEVEMENTS.length,
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
            const emptyAchievements: Achievement[] = BUYER_ACHIEVEMENTS.map((def) => ({
              ...def,
              status: 'locked' as const,
              currentValue: 0,
              progress: 0,
            }));

            setData({
              userId: userEmail,
              userType: 'buyer',
              achievements: emptyAchievements,
              totalUnlocked: 0,
              totalAvailable: BUYER_ACHIEVEMENTS.length,
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
        console.error('[BuyerAchievements] Error loading achievements:', error);
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              No se pudieron cargar los logros
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Por favor, intenta de nuevo más tarde.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with back link */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href={ROUTES.IMPACT}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Mis Logros</h1>
        </div>

        {/* Progress summary */}
        <AchievementProgress data={data} onAchievementClick={handleAchievementClick} />

        {/* Rewards panel */}
        {data.rewardsEarned && data.rewardsEarned.length > 0 && (
          <div className="mt-8">
            <RewardsPanel rewards={data.rewardsEarned} />
          </div>
        )}

        {/* All achievements */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Todos los Logros
          </h2>
          <AchievementGrid
            achievements={data.achievements}
            userType="buyer"
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
    </div>
  );
}
