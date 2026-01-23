/**
 * @fileoverview Grid component for displaying achievements organized by category.
 * Supports filtering by tier and category, with collapsible sections.
 * @module components/achievements/AchievementGrid
 */

'use client';

import { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import type { Achievement, AchievementTier, CategoryInfo } from '@/lib/types/achievements';
import { TIER_CONFIG } from '@/lib/types/achievements';
import { BUYER_CATEGORIES, SELLER_CATEGORIES } from '@/lib/constants/achievements';
import AchievementCard from './AchievementCard';

interface AchievementGridProps {
  /** Achievements to display */
  achievements: Achievement[];
  /** User type for category labels */
  userType: 'buyer' | 'seller';
  /** Whether to show filters */
  showFilters?: boolean;
  /** Callback when achievement is clicked */
  onAchievementClick?: (achievement: Achievement) => void;
  /** Whether to show hidden achievements as mysteries */
  showHiddenAsMystery?: boolean;
}

type FilterTier = AchievementTier | 'all';
type FilterStatus = 'all' | 'unlocked' | 'in_progress' | 'locked';

/**
 * Get Lucide icon component by name
 */
function getIconComponent(iconName: string): LucideIcons.LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>;
  return icons[iconName] || LucideIcons.Award;
}

export default function AchievementGrid({
  achievements,
  userType,
  showFilters = true,
  onAchievementClick,
  showHiddenAsMystery = true,
}: AchievementGridProps) {
  const [tierFilter, setTierFilter] = useState<FilterTier>('all');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const categories = userType === 'buyer' ? BUYER_CATEGORIES : SELLER_CATEGORIES;

  // Filter achievements
  const filteredAchievements = useMemo(() => {
    return achievements.filter((achievement) => {
      if (tierFilter !== 'all' && achievement.tier !== tierFilter) return false;
      if (statusFilter !== 'all' && achievement.status !== statusFilter) return false;
      return true;
    });
  }, [achievements, tierFilter, statusFilter]);

  // Group by category
  const groupedAchievements = useMemo(() => {
    const groups: Record<string, Achievement[]> = {};
    filteredAchievements.forEach((achievement) => {
      const category = achievement.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(achievement);
    });
    return groups;
  }, [filteredAchievements]);

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  // Get category stats
  const getCategoryStats = (category: string) => {
    const categoryAchievements = achievements.filter((a) => a.category === category);
    const unlocked = categoryAchievements.filter((a) => a.status === 'unlocked').length;
    return { unlocked, total: categoryAchievements.length };
  };

  // Reset filters
  const resetFilters = () => {
    setTierFilter('all');
    setStatusFilter('all');
  };

  const hasActiveFilters = tierFilter !== 'all' || statusFilter !== 'all';

  return (
    <div className="space-y-6">
      {/* Filters */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <button
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-900 dark:text-gray-100">Filtros</span>
              {hasActiveFilters && (
                <span className="px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs rounded-full">
                  Activos
                </span>
              )}
            </div>
            {showFilterPanel ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {showFilterPanel && (
            <div className="mt-4 space-y-4">
              {/* Tier filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nivel
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setTierFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      tierFilter === 'all'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    Todos
                  </button>
                  {(Object.keys(TIER_CONFIG) as AchievementTier[]).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setTierFilter(tier)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        tierFilter === tier
                          ? `${TIER_CONFIG[tier].bgColor} ${TIER_CONFIG[tier].color} ${TIER_CONFIG[tier].borderColor} border-2`
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {TIER_CONFIG[tier].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estado
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'all', label: 'Todos' },
                    { value: 'unlocked', label: 'Desbloqueados' },
                    { value: 'in_progress', label: 'En progreso' },
                    { value: 'locked', label: 'Bloqueados' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setStatusFilter(option.value as FilterStatus)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        statusFilter === option.value
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Results count */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Mostrando {filteredAchievements.length} de {achievements.length} logros
      </div>

      {/* Category sections */}
      {Object.entries(groupedAchievements).length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">
            No hay logros que coincidan con los filtros seleccionados
          </p>
        </div>
      ) : (
        Object.entries(groupedAchievements).map(([category, categoryAchievements]) => {
          const categoryInfo = (categories as Record<string, CategoryInfo>)[category];
          if (!categoryInfo) return null;

          const stats = getCategoryStats(category);
          const isExpanded = !expandedCategories.has(category);
          const CategoryIcon = getIconComponent(categoryInfo.icon);

          return (
            <div
              key={category}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Category header */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <CategoryIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100">
                      {categoryInfo.label}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {categoryInfo.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stats.unlocked}/{stats.total}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Achievements grid */}
              {isExpanded && (
                <div className="p-4 pt-0 border-t border-gray-100 dark:border-gray-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {categoryAchievements
                      .sort((a, b) => (a.order || 0) - (b.order || 0))
                      .map((achievement) => {
                        // Show hidden achievements as mysteries unless unlocked
                        const shouldShowAsHidden =
                          showHiddenAsMystery &&
                          achievement.hidden &&
                          achievement.status !== 'unlocked';

                        return (
                          <AchievementCard
                            key={achievement.id}
                            achievement={achievement}
                            showAsHidden={shouldShowAsHidden}
                            onClick={
                              onAchievementClick && !shouldShowAsHidden
                                ? () => onAchievementClick(achievement)
                                : undefined
                            }
                          />
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
