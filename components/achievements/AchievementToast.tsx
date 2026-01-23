/**
 * @fileoverview Achievement toast notification for Bronze/Silver tier unlocks.
 * Displays a small, animated notification when a lower-tier achievement is unlocked.
 * @module components/achievements/AchievementToast
 */

'use client';

import { useEffect, useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { X, Trophy } from 'lucide-react';
import type { Achievement } from '@/lib/types/achievements';
import { TIER_CONFIG } from '@/lib/types/achievements';

interface AchievementToastProps {
  /** Achievement that was unlocked */
  achievement: Achievement;
  /** Whether toast is visible */
  isVisible: boolean;
  /** Close handler */
  onClose: () => void;
  /** Auto-dismiss duration in ms (default: 5000) */
  duration?: number;
  /** Position on screen */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

/**
 * Get Lucide icon component by name
 */
function getIconComponent(iconName: string): LucideIcons.LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>;
  return icons[iconName] || LucideIcons.Award;
}

const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
};

export default function AchievementToast({
  achievement,
  isVisible,
  onClose,
  duration = 5000,
  position = 'top-right',
}: AchievementToastProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const tierConfig = TIER_CONFIG[achievement.tier];
  const IconComponent = useMemo(() => getIconComponent(achievement.icon), [achievement.icon]);

  // Handle auto-dismiss
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  // Handle animation states
  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    }
  }, [isVisible]);

  if (!isVisible && !isAnimating) return null;

  const tierBgColors: Record<string, string> = {
    bronze: 'from-amber-500 to-amber-600',
    silver: 'from-gray-400 to-gray-500',
    gold: 'from-yellow-400 to-accent-500',
    platinum: 'from-primary-500 to-primary-700',
  };

  return (
    <div
      className={`
        fixed ${positionClasses[position]} z-50
        ${isVisible ? 'animate-toast-in' : 'animate-toast-out'}
      `}
      onAnimationEnd={() => {
        if (!isVisible) setIsAnimating(false);
      }}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 min-w-[300px] max-w-[400px]">
        {/* Icon with tier gradient background */}
        <div
          className={`
            p-2.5 rounded-full bg-gradient-to-br ${tierBgColors[achievement.tier]}
            animate-bounce-subtle
          `}
        >
          <IconComponent className="w-5 h-5 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <Trophy className="w-3.5 h-3.5 text-accent-500" />
            <span className="text-xs font-semibold text-accent-600 dark:text-accent-400 uppercase tracking-wide">
              Logro Desbloqueado
            </span>
          </div>
          <p className="font-bold text-gray-900 dark:text-gray-100 truncate">{achievement.name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-xs font-medium ${tierConfig.color}`}>{tierConfig.label}</span>
            {achievement.reward && (
              <span className="text-xs text-accent-600 dark:text-accent-400">+Recompensa</span>
            )}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors shrink-0"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}

/**
 * Hook for managing achievement toast queue
 */
export function useAchievementToast() {
  const [queue, setQueue] = useState<Achievement[]>([]);
  const [current, setCurrent] = useState<Achievement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Process queue
  useEffect(() => {
    if (!current && queue.length > 0) {
      const [next, ...rest] = queue;
      setCurrent(next);
      setQueue(rest);
      setIsVisible(true);
    }
  }, [current, queue]);

  const showToast = (achievement: Achievement) => {
    // Only show toast for Bronze/Silver (Gold/Platinum use modal)
    if (achievement.tier === 'bronze' || achievement.tier === 'silver') {
      setQueue((prev) => [...prev, achievement]);
    }
  };

  const hideToast = () => {
    setIsVisible(false);
    // Wait for animation before clearing current
    setTimeout(() => {
      setCurrent(null);
    }, 300);
  };

  return {
    current,
    isVisible,
    showToast,
    hideToast,
    queueLength: queue.length,
  };
}
