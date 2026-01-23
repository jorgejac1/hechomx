/**
 * @fileoverview Achievement system type definitions for gamification.
 * Includes types for achievement tiers, categories, criteria, and user achievement data
 * for both buyers and sellers.
 * @module lib/types/achievements
 */

// ============================================================================
// ACHIEVEMENT TIER TYPES
// ============================================================================

/**
 * Achievement tier levels with increasing difficulty
 * - bronze: Easy achievements (1-3 actions)
 * - silver: Medium achievements (5-15 actions)
 * - gold: Hard achievements (25-50 actions)
 * - platinum: Epic achievements (100+ actions)
 */
export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum';

/**
 * Achievement rarity levels (maps to tiers for display purposes)
 * - common: Bronze tier achievements
 * - uncommon: Silver tier achievements
 * - rare: Gold tier achievements
 * - epic: Platinum tier achievements
 * - legendary: Special platinum achievements
 */
export type AchievementRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

/**
 * Map tier to rarity for display
 */
export const TIER_TO_RARITY: Record<AchievementTier, AchievementRarity> = {
  bronze: 'common',
  silver: 'uncommon',
  gold: 'rare',
  platinum: 'epic',
};

/**
 * Rarity configuration with Spanish labels
 */
export const RARITY_CONFIG: Record<AchievementRarity, { label: string; color: string }> = {
  common: { label: 'Común', color: 'text-gray-500' },
  uncommon: { label: 'Poco Común', color: 'text-green-500' },
  rare: { label: 'Raro', color: 'text-blue-500' },
  epic: { label: 'Épico', color: 'text-purple-500' },
  legendary: { label: 'Legendario', color: 'text-accent-500' },
};

/**
 * Visual configuration for each achievement tier
 */
export interface TierConfig {
  /** Text/icon color class */
  color: string;
  /** Background color class */
  bgColor: string;
  /** Border color class */
  borderColor: string;
  /** Gradient for premium tiers (optional) */
  gradient?: string;
}

/**
 * Tier configurations with Spanish labels and colors
 */
export const TIER_CONFIG: Record<AchievementTier, TierConfig & { label: string }> = {
  bronze: {
    label: 'Bronce',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  silver: {
    label: 'Plata',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-300',
  },
  gold: {
    label: 'Oro',
    color: 'text-accent-700',
    bgColor: 'bg-accent-50',
    borderColor: 'border-accent-200',
  },
  platinum: {
    label: 'Platino',
    color: 'text-primary-700',
    bgColor: 'bg-gradient-to-r from-primary-50 to-primary-100',
    borderColor: 'border-primary-300',
    gradient: 'bg-gradient-to-r from-primary-500 to-primary-700',
  },
};

// ============================================================================
// ACHIEVEMENT CATEGORY TYPES
// ============================================================================

/**
 * Buyer achievement categories
 */
export type BuyerAchievementCategory =
  | 'getting_started'
  | 'cultural_explorer'
  | 'artisan_support'
  | 'environmental'
  | 'shopping'
  | 'categories'
  | 'reviews'
  | 'social'
  | 'special';

/**
 * Seller achievement categories
 */
export type SellerAchievementCategory =
  | 'getting_started'
  | 'sales'
  | 'revenue'
  | 'quality'
  | 'service'
  | 'speed'
  | 'catalog'
  | 'community'
  | 'growth';

/**
 * All achievement categories (union type)
 */
export type AchievementCategory = BuyerAchievementCategory | SellerAchievementCategory;

/**
 * Category metadata with Spanish labels and icons
 */
export interface CategoryInfo {
  id: AchievementCategory;
  label: string;
  icon: string;
  description: string;
}

// ============================================================================
// ACHIEVEMENT CRITERIA TYPES
// ============================================================================

/**
 * Types of criteria for unlocking achievements
 */
export type CriteriaType = 'count' | 'threshold' | 'percentage' | 'date' | 'status' | 'streak';

/**
 * Metrics that can be tracked for buyer achievements
 */
export type BuyerMetric =
  | 'orders_count'
  | 'reviews_count'
  | 'reviews_with_photos'
  | 'helpful_reviews'
  | 'favorites_count'
  | 'states_count'
  | 'artisans_count'
  | 'categories_count'
  | 'co2_saved'
  | 'total_spent'
  | 'repeat_purchases'
  | 'referrals_count'
  | 'gifts_sent'
  | 'gifts_received'
  | 'wishlist_count'
  | 'join_date'
  | 'order_date';

/**
 * Metrics that can be tracked for seller achievements
 */
export type SellerMetric =
  | 'sales_count'
  | 'revenue_total'
  | 'reviews_count'
  | 'rating_average'
  | 'response_rate'
  | 'response_time_hours'
  | 'shipping_time_hours'
  | 'products_count'
  | 'products_with_video'
  | 'repeat_customers'
  | 'verification_status'
  | 'profile_completion'
  | 'story_published'
  | 'bestseller_count'
  | 'days_active'
  | 'consecutive_sales_days'
  | 'month_growth'
  | 'return_rate'
  | 'orders_same_day_shipped';

/**
 * Achievement unlock criteria definition
 */
export interface AchievementCriteria {
  /** Type of criteria check */
  type: CriteriaType;
  /** Metric to evaluate */
  metric: BuyerMetric | SellerMetric;
  /** Target value to reach */
  targetValue: number | string | boolean;
  /** Time period for the metric (optional) */
  period?: 'lifetime' | 'monthly' | 'yearly' | 'weekly';
  /** Additional conditions (optional) */
  conditions?: Record<string, unknown>;
}

// ============================================================================
// REWARDS TYPES
// ============================================================================

/**
 * Types of rewards that can be granted for achievements
 */
export type RewardType = 'discount' | 'credit' | 'badge' | 'feature';

/**
 * Reward definition for an achievement
 */
export interface AchievementReward {
  /** Type of reward */
  type: RewardType;
  /** Reward value (percentage for discount, amount for credit, badge ID, feature ID) */
  value: number | string;
  /** Human-readable description */
  description: string;
  /** Expiration in days (null for no expiration) */
  expiresInDays?: number | null;
  /** Promo code for discount/credit rewards */
  code?: string;
}

// ============================================================================
// ACHIEVEMENT TYPES
// ============================================================================

/**
 * Achievement unlock status
 */
export type AchievementStatus = 'locked' | 'in_progress' | 'unlocked';

/**
 * Base achievement definition (without user-specific data)
 */
export interface AchievementDefinition {
  /** Unique identifier */
  id: string;
  /** Achievement name in Spanish */
  name: string;
  /** Achievement description in Spanish */
  description: string;
  /** Lucide icon name */
  icon: string;
  /** Achievement tier */
  tier: AchievementTier;
  /** Achievement rarity (defaults based on tier) */
  rarity?: AchievementRarity;
  /** Achievement category */
  category: AchievementCategory;
  /** Unlock criteria */
  criteria: AchievementCriteria;
  /** User type this achievement applies to */
  userType: 'buyer' | 'seller';
  /** Sort order within category */
  order?: number;
  /** Whether this achievement is hidden until unlocked */
  hidden?: boolean;
  /** Hint text shown for hidden achievements */
  hint?: string;
  /** Reward granted upon unlock */
  reward?: AchievementReward;
}

/**
 * Achievement with user-specific progress data
 */
export interface Achievement extends AchievementDefinition {
  /** Current unlock status */
  status: AchievementStatus;
  /** Current value of the tracked metric */
  currentValue?: number;
  /** Progress percentage (0-100) */
  progress: number;
  /** ISO timestamp when unlocked */
  unlockedAt?: string;
}

/**
 * User-specific achievement data stored in localStorage
 */
export interface UserAchievementData {
  /** Achievement ID */
  id: string;
  /** Current unlock status */
  status: AchievementStatus;
  /** Current value of the tracked metric */
  currentValue: number;
  /** Progress percentage (0-100) */
  progress: number;
  /** ISO timestamp when unlocked */
  unlockedAt?: string;
  /** Whether the user has seen/acknowledged this achievement */
  seen: boolean;
  /** ISO timestamp when the user shared this achievement */
  sharedAt?: string;
  /** Number of times shared */
  shareCount: number;
}

// ============================================================================
// USER ACHIEVEMENTS DATA
// ============================================================================

/**
 * User's complete achievements data
 */
export interface UserAchievements {
  /** User identifier */
  userId: string;
  /** User type (buyer or seller) */
  userType: 'buyer' | 'seller';
  /** All achievements with progress */
  achievements: Achievement[];
  /** Count of unlocked achievements */
  totalUnlocked: number;
  /** Total available achievements */
  totalAvailable: number;
  /** Recently unlocked achievements (last 5) */
  recentUnlocks: Achievement[];
  /** Next achievements close to unlocking (top 3 by progress) */
  nextToUnlock: Achievement[];
  /** Achievement stats by tier */
  tierStats: Record<AchievementTier, { unlocked: number; total: number }>;
  /** Achievement stats by category */
  categoryStats: Record<string, { unlocked: number; total: number }>;
  /** Count of unseen (new) achievements */
  unseenCount: number;
  /** Total rewards earned */
  rewardsEarned: AchievementReward[];
}

/**
 * Achievement storage data for localStorage persistence
 */
export interface AchievementStorageData {
  /** User identifier */
  userId: string;
  /** User type */
  userType: 'buyer' | 'seller';
  /** Map of achievement ID to user-specific data */
  achievements: Record<string, UserAchievementData>;
  /** Last sync timestamp */
  lastSynced: string;
  /** Version for migration purposes */
  version: number;
}

/**
 * Achievement unlock event data (for notifications)
 */
export interface AchievementUnlockEvent {
  /** The unlocked achievement */
  achievement: Achievement;
  /** ISO timestamp of unlock */
  unlockedAt: string;
  /** Whether to show celebration (Gold/Platinum = modal, Bronze/Silver = toast) */
  celebrationType: 'toast' | 'modal';
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

/**
 * Response from achievements API endpoint
 */
export interface AchievementsApiResponse {
  success: boolean;
  data?: UserAchievements;
  error?: string;
}
