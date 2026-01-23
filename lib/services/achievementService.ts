/**
 * @fileoverview Achievement service for localStorage persistence and achievement operations.
 * Handles storing/retrieving user achievement progress, seen status, and share tracking.
 * @module lib/services/achievementService
 */

import type {
  AchievementStorageData,
  UserAchievementData,
  AchievementStatus,
} from '@/lib/types/achievements';

const STORAGE_KEY_PREFIX = 'papalote_achievements_';
const STORAGE_VERSION = 1;

/**
 * Get the localStorage key for a user's achievements
 */
function getStorageKey(userId: string, userType: 'buyer' | 'seller'): string {
  return `${STORAGE_KEY_PREFIX}${userType}_${userId}`;
}

/**
 * Achievement service for managing achievement data persistence.
 * All methods are safe to call on server (they return null/empty values).
 */
export const achievementService = {
  /**
   * Get achievement storage data from localStorage
   */
  getStorageData(userId: string, userType: 'buyer' | 'seller'): AchievementStorageData | null {
    if (typeof window === 'undefined') return null;

    try {
      const key = getStorageKey(userId, userType);
      const stored = localStorage.getItem(key);

      if (!stored) return null;

      const data = JSON.parse(stored) as AchievementStorageData;

      // Check version and migrate if needed
      if (data.version !== STORAGE_VERSION) {
        return this.migrateData(data);
      }

      return data;
    } catch (error) {
      console.error('[achievementService] Error reading storage:', error);
      return null;
    }
  },

  /**
   * Save achievement storage data to localStorage
   */
  saveStorageData(
    userId: string,
    userType: 'buyer' | 'seller',
    achievements: Record<string, UserAchievementData>
  ): void {
    if (typeof window === 'undefined') return;

    try {
      const key = getStorageKey(userId, userType);
      const data: AchievementStorageData = {
        userId,
        userType,
        achievements,
        lastSynced: new Date().toISOString(),
        version: STORAGE_VERSION,
      };

      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('[achievementService] Error saving storage:', error);
    }
  },

  /**
   * Update a single achievement's data
   */
  updateAchievement(
    userId: string,
    userType: 'buyer' | 'seller',
    achievementId: string,
    updates: Partial<UserAchievementData>
  ): void {
    const data = this.getStorageData(userId, userType);
    const achievements = data?.achievements || {};

    const existing = achievements[achievementId] || {
      id: achievementId,
      status: 'locked' as AchievementStatus,
      currentValue: 0,
      progress: 0,
      seen: false,
      shareCount: 0,
    };

    achievements[achievementId] = {
      ...existing,
      ...updates,
    };

    this.saveStorageData(userId, userType, achievements);
  },

  /**
   * Mark an achievement as seen
   */
  markAsSeen(userId: string, userType: 'buyer' | 'seller', achievementId: string): void {
    this.updateAchievement(userId, userType, achievementId, { seen: true });
  },

  /**
   * Mark all achievements as seen
   */
  markAllAsSeen(userId: string, userType: 'buyer' | 'seller'): void {
    const data = this.getStorageData(userId, userType);
    if (!data) return;

    const achievements = { ...data.achievements };
    Object.keys(achievements).forEach((id) => {
      achievements[id] = { ...achievements[id], seen: true };
    });

    this.saveStorageData(userId, userType, achievements);
  },

  /**
   * Record a share event for an achievement
   */
  recordShare(userId: string, userType: 'buyer' | 'seller', achievementId: string): void {
    const data = this.getStorageData(userId, userType);
    const existing = data?.achievements[achievementId];

    this.updateAchievement(userId, userType, achievementId, {
      sharedAt: new Date().toISOString(),
      shareCount: (existing?.shareCount || 0) + 1,
    });
  },

  /**
   * Get unseen unlocked achievements count
   */
  getUnseenCount(userId: string, userType: 'buyer' | 'seller'): number {
    const data = this.getStorageData(userId, userType);
    if (!data) return 0;

    return Object.values(data.achievements).filter((a) => a.status === 'unlocked' && !a.seen)
      .length;
  },

  /**
   * Check if an achievement has been unlocked
   */
  isUnlocked(userId: string, userType: 'buyer' | 'seller', achievementId: string): boolean {
    const data = this.getStorageData(userId, userType);
    return data?.achievements[achievementId]?.status === 'unlocked';
  },

  /**
   * Get all achievements IDs that have been unlocked
   */
  getUnlockedIds(userId: string, userType: 'buyer' | 'seller'): string[] {
    const data = this.getStorageData(userId, userType);
    if (!data) return [];

    return Object.values(data.achievements)
      .filter((a) => a.status === 'unlocked')
      .map((a) => a.id);
  },

  /**
   * Unlock an achievement (called when criteria are met)
   */
  unlockAchievement(userId: string, userType: 'buyer' | 'seller', achievementId: string): void {
    this.updateAchievement(userId, userType, achievementId, {
      status: 'unlocked',
      progress: 100,
      unlockedAt: new Date().toISOString(),
      seen: false, // New unlock = unseen
    });
  },

  /**
   * Update progress for an achievement
   */
  updateProgress(
    userId: string,
    userType: 'buyer' | 'seller',
    achievementId: string,
    currentValue: number,
    targetValue: number
  ): void {
    const progress = Math.min(100, Math.round((currentValue / targetValue) * 100));
    const status: AchievementStatus =
      progress >= 100 ? 'unlocked' : progress > 0 ? 'in_progress' : 'locked';

    const updates: Partial<UserAchievementData> = {
      currentValue,
      progress,
      status,
    };

    if (status === 'unlocked') {
      updates.unlockedAt = new Date().toISOString();
      updates.seen = false;
    }

    this.updateAchievement(userId, userType, achievementId, updates);
  },

  /**
   * Clear all achievement data for a user (for testing/reset)
   */
  clearData(userId: string, userType: 'buyer' | 'seller'): void {
    if (typeof window === 'undefined') return;

    const key = getStorageKey(userId, userType);
    localStorage.removeItem(key);
  },

  /**
   * Migrate data from older versions
   */
  migrateData(oldData: AchievementStorageData): AchievementStorageData {
    // Currently no migrations needed, just update version
    return {
      ...oldData,
      version: STORAGE_VERSION,
    };
  },

  /**
   * Export achievement data (for backup/transfer)
   */
  exportData(userId: string, userType: 'buyer' | 'seller'): string | null {
    const data = this.getStorageData(userId, userType);
    if (!data) return null;

    return JSON.stringify(data);
  },

  /**
   * Import achievement data (for restore)
   */
  importData(userId: string, userType: 'buyer' | 'seller', jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData) as AchievementStorageData;

      // Validate structure
      if (!data.achievements || typeof data.achievements !== 'object') {
        throw new Error('Invalid data structure');
      }

      // Update userId and userType to match current user
      const achievements = data.achievements;
      this.saveStorageData(userId, userType, achievements);

      return true;
    } catch (error) {
      console.error('[achievementService] Error importing data:', error);
      return false;
    }
  },
};
