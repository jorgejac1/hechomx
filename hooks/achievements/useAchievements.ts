/**
 * @fileoverview Custom hook for managing achievements state and operations.
 * Provides achievement data, progress tracking, unlock notifications, and localStorage persistence.
 * @module hooks/achievements/useAchievements
 */

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type {
  Achievement,
  UserAchievements,
  AchievementUnlockEvent,
  UserAchievementData,
  AchievementStorageData,
  AchievementTier,
} from '@/lib/types/achievements';
import { BUYER_ACHIEVEMENTS, SELLER_ACHIEVEMENTS } from '@/lib/constants/achievements';
import { achievementService } from '@/lib/services/achievementService';

interface UseAchievementsOptions {
  /** User email/ID for data storage */
  userId: string;
  /** Type of user (buyer or seller) */
  userType: 'buyer' | 'seller';
  /** Whether to auto-fetch on mount */
  autoFetch?: boolean;
  /** Callback when an achievement is unlocked */
  onUnlock?: (event: AchievementUnlockEvent) => void;
}

interface UseAchievementsReturn {
  /** All achievements with user progress */
  achievements: Achievement[];
  /** Computed user achievements data */
  data: UserAchievements | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: string | null;
  /** Recently unlocked achievements (unseen) */
  newUnlocks: Achievement[];
  /** Count of unseen achievements */
  unseenCount: number;
  /** Fetch/refresh achievements */
  refresh: () => Promise<void>;
  /** Mark an achievement as seen */
  markAsSeen: (achievementId: string) => void;
  /** Mark all achievements as seen */
  markAllAsSeen: () => void;
  /** Record a share event for an achievement */
  recordShare: (achievementId: string) => void;
  /** Get achievements by category */
  getByCategory: (category: string) => Achievement[];
  /** Get achievements by tier */
  getByTier: (tier: AchievementTier) => Achievement[];
  /** Get a specific achievement by ID */
  getById: (id: string) => Achievement | undefined;
  /** Check if an achievement is unlocked */
  isUnlocked: (id: string) => boolean;
  /** Get progress for a specific achievement */
  getProgress: (id: string) => number;
}

/**
 * Hook for managing achievements state and operations.
 * Handles fetching, caching, and localStorage persistence.
 */
export function useAchievements({
  userId,
  userType,
  autoFetch = true,
  onUnlock,
}: UseAchievementsOptions): UseAchievementsReturn {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [storageData, setStorageData] = useState<AchievementStorageData | null>(null);

  // Get base achievement definitions
  const definitions = useMemo(
    () => (userType === 'buyer' ? BUYER_ACHIEVEMENTS : SELLER_ACHIEVEMENTS),
    [userType]
  );

  // Merge definitions with user progress data
  const mergeWithProgress = useCallback(
    (defs: typeof definitions, userData: Record<string, UserAchievementData>): Achievement[] => {
      return defs.map((def) => {
        const userProgress = userData[def.id];
        return {
          ...def,
          status: userProgress?.status || 'locked',
          currentValue: userProgress?.currentValue || 0,
          progress: userProgress?.progress || 0,
          unlockedAt: userProgress?.unlockedAt,
        };
      });
    },
    []
  );

  // Fetch achievements from API and merge with local storage
  const fetchAchievements = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint =
        userType === 'buyer' ? '/api/buyer/achievements' : '/api/seller/achievements';
      const response = await fetch(endpoint);
      const result = await response.json();

      if (result.success && result.data) {
        // Get user-specific data from API response
        const apiUserData = result.data[userId];

        // Get local storage data
        const localData = achievementService.getStorageData(userId, userType);
        setStorageData(localData);

        // Merge API data with local seen/shared status
        let userData: Record<string, UserAchievementData> = {};

        if (apiUserData?.achievements) {
          // Convert array to record and merge with local data
          apiUserData.achievements.forEach((a: UserAchievementData) => {
            const localAchievement = localData?.achievements[a.id];
            userData[a.id] = {
              ...a,
              seen: localAchievement?.seen ?? false,
              sharedAt: localAchievement?.sharedAt,
              shareCount: localAchievement?.shareCount ?? 0,
            };
          });
        } else if (localData?.achievements) {
          userData = localData.achievements;
        }

        const merged = mergeWithProgress(definitions, userData);
        setAchievements(merged);

        // Check for new unlocks
        const previousUnlocks = localData?.achievements
          ? Object.values(localData.achievements)
              .filter((a) => a.status === 'unlocked')
              .map((a) => a.id)
          : [];

        const currentUnlocks = merged.filter((a) => a.status === 'unlocked').map((a) => a.id);

        const newUnlockIds = currentUnlocks.filter((id) => !previousUnlocks.includes(id));

        // Trigger unlock callbacks for new achievements
        if (onUnlock && newUnlockIds.length > 0) {
          newUnlockIds.forEach((id) => {
            const achievement = merged.find((a) => a.id === id);
            if (achievement) {
              const celebrationType =
                achievement.tier === 'gold' || achievement.tier === 'platinum' ? 'modal' : 'toast';
              onUnlock({
                achievement,
                unlockedAt: achievement.unlockedAt || new Date().toISOString(),
                celebrationType,
              });
            }
          });
        }

        // Save updated data to localStorage
        achievementService.saveStorageData(userId, userType, userData);
      } else {
        // No API data, use local storage or empty state
        const localData = achievementService.getStorageData(userId, userType);
        setStorageData(localData);
        const merged = mergeWithProgress(definitions, localData?.achievements || {});
        setAchievements(merged);
      }
    } catch (err) {
      console.error('[useAchievements] Error fetching achievements:', err);
      setError('Error al cargar los logros');

      // Fall back to local storage on error
      const localData = achievementService.getStorageData(userId, userType);
      setStorageData(localData);
      const merged = mergeWithProgress(definitions, localData?.achievements || {});
      setAchievements(merged);
    } finally {
      setIsLoading(false);
    }
  }, [userId, userType, definitions, mergeWithProgress, onUnlock]);

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch && userId) {
      fetchAchievements();
    }
  }, [autoFetch, userId, fetchAchievements]);

  // Compute user achievements data
  const data = useMemo((): UserAchievements | null => {
    if (achievements.length === 0) return null;

    const unlocked = achievements.filter((a) => a.status === 'unlocked');
    const inProgress = achievements.filter((a) => a.status === 'in_progress');
    const unseenAchievements = achievements.filter(
      (a) => a.status === 'unlocked' && storageData?.achievements[a.id]?.seen === false
    );

    const tierStats: Record<AchievementTier, { unlocked: number; total: number }> = {
      bronze: { unlocked: 0, total: 0 },
      silver: { unlocked: 0, total: 0 },
      gold: { unlocked: 0, total: 0 },
      platinum: { unlocked: 0, total: 0 },
    };

    const categoryStats: Record<string, { unlocked: number; total: number }> = {};

    achievements.forEach((a) => {
      // Tier stats
      tierStats[a.tier].total++;
      if (a.status === 'unlocked') {
        tierStats[a.tier].unlocked++;
      }

      // Category stats
      if (!categoryStats[a.category]) {
        categoryStats[a.category] = { unlocked: 0, total: 0 };
      }
      categoryStats[a.category].total++;
      if (a.status === 'unlocked') {
        categoryStats[a.category].unlocked++;
      }
    });

    // Collect rewards from unlocked achievements
    const rewardsEarned = unlocked.filter((a) => a.reward).map((a) => a.reward!);

    return {
      userId,
      userType,
      achievements,
      totalUnlocked: unlocked.length,
      totalAvailable: achievements.length,
      recentUnlocks: unlocked
        .sort(
          (a, b) => new Date(b.unlockedAt || 0).getTime() - new Date(a.unlockedAt || 0).getTime()
        )
        .slice(0, 5),
      nextToUnlock: [...inProgress, ...achievements.filter((a) => a.status === 'locked')]
        .sort((a, b) => b.progress - a.progress)
        .slice(0, 3),
      tierStats,
      categoryStats,
      unseenCount: unseenAchievements.length,
      rewardsEarned,
    };
  }, [achievements, storageData, userId, userType]);

  // Get new/unseen unlocks
  const newUnlocks = useMemo(() => {
    return achievements.filter(
      (a) => a.status === 'unlocked' && storageData?.achievements[a.id]?.seen === false
    );
  }, [achievements, storageData]);

  // Mark achievement as seen
  const markAsSeen = useCallback(
    (achievementId: string) => {
      achievementService.markAsSeen(userId, userType, achievementId);
      setStorageData(achievementService.getStorageData(userId, userType));
    },
    [userId, userType]
  );

  // Mark all achievements as seen
  const markAllAsSeen = useCallback(() => {
    achievementService.markAllAsSeen(userId, userType);
    setStorageData(achievementService.getStorageData(userId, userType));
  }, [userId, userType]);

  // Record share event
  const recordShare = useCallback(
    (achievementId: string) => {
      achievementService.recordShare(userId, userType, achievementId);
      setStorageData(achievementService.getStorageData(userId, userType));
    },
    [userId, userType]
  );

  // Helper functions
  const getByCategory = useCallback(
    (category: string) => achievements.filter((a) => a.category === category),
    [achievements]
  );

  const getByTier = useCallback(
    (tier: AchievementTier) => achievements.filter((a) => a.tier === tier),
    [achievements]
  );

  const getById = useCallback(
    (id: string) => achievements.find((a) => a.id === id),
    [achievements]
  );

  const isUnlocked = useCallback(
    (id: string) => achievements.find((a) => a.id === id)?.status === 'unlocked',
    [achievements]
  );

  const getProgress = useCallback(
    (id: string) => achievements.find((a) => a.id === id)?.progress ?? 0,
    [achievements]
  );

  return {
    achievements,
    data,
    isLoading,
    error,
    newUnlocks,
    unseenCount: data?.unseenCount ?? 0,
    refresh: fetchAchievements,
    markAsSeen,
    markAllAsSeen,
    recordShare,
    getByCategory,
    getByTier,
    getById,
    isUnlocked,
    getProgress,
  };
}
