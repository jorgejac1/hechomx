/**
 * @fileoverview Rewards panel for displaying and redeeming achievement rewards.
 * Shows available rewards earned from achievements with redemption functionality.
 * @module components/achievements/RewardsPanel
 */

'use client';

import { useState } from 'react';
import { Gift, Clock, Check, Copy, Sparkles, Tag, CreditCard, Award, Zap } from 'lucide-react';
import type { AchievementReward, RewardType } from '@/lib/types/achievements';

interface RewardsPanelProps {
  /** List of rewards earned */
  rewards: AchievementReward[];
  /** Callback when a reward is redeemed */
  onRedeem?: (reward: AchievementReward) => void;
}

const rewardIcons: Record<RewardType, typeof Gift> = {
  discount: Tag,
  credit: CreditCard,
  badge: Award,
  feature: Zap,
};

const rewardColors: Record<RewardType, { bg: string; text: string; border: string }> = {
  discount: {
    bg: 'bg-green-50 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
  },
  credit: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
  },
  badge: {
    bg: 'bg-purple-50 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
  },
  feature: {
    bg: 'bg-orange-50 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800',
  },
};

function RewardCard({
  reward,
  onRedeem,
}: {
  reward: AchievementReward;
  onRedeem?: (reward: AchievementReward) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [redeemed, setRedeemed] = useState(false);

  const Icon = rewardIcons[reward.type];
  const colors = rewardColors[reward.type];

  const handleCopyCode = async () => {
    if (reward.code) {
      try {
        await navigator.clipboard.writeText(reward.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Clipboard not available
      }
    }
  };

  const handleRedeem = () => {
    setRedeemed(true);
    onRedeem?.(reward);
  };

  // Calculate expiry status
  const isExpired = false; // In production, calculate from actual dates
  const daysRemaining = reward.expiresInDays || null;

  return (
    <div
      className={`relative rounded-xl border-2 ${colors.border} ${colors.bg} p-4 transition-all hover:shadow-md`}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${colors.bg} ${colors.text}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">{reward.description}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {reward.type === 'discount' && reward.value && (
              <span className="font-bold text-green-600">{reward.value}% de descuento</span>
            )}
            {reward.type === 'credit' && reward.value && (
              <span className="font-bold text-blue-600">${reward.value} MXN de crédito</span>
            )}
            {reward.type === 'badge' && (
              <span className="font-bold text-purple-600">Insignia exclusiva</span>
            )}
            {reward.type === 'feature' && (
              <span className="font-bold text-orange-600">Función especial</span>
            )}
          </p>
        </div>
      </div>

      {/* Expiry warning */}
      {daysRemaining && !isExpired && (
        <div className="flex items-center gap-1.5 mt-3 text-xs text-amber-600 dark:text-amber-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Válido por {daysRemaining} días</span>
        </div>
      )}

      {isExpired && (
        <div className="flex items-center gap-1.5 mt-3 text-xs text-red-600 dark:text-red-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Expirado</span>
        </div>
      )}

      {/* Code section (for discount/credit rewards) */}
      {reward.code && !redeemed && (
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 font-mono text-sm text-center">
              {reward.code}
            </div>
            <button
              onClick={handleCopyCode}
              className={`p-2 rounded-lg transition-colors ${
                copied
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              title={copied ? '¡Copiado!' : 'Copiar código'}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Usa este código en tu próxima compra
          </p>
        </div>
      )}

      {/* Action button for non-code rewards */}
      {!reward.code && !redeemed && (
        <button
          onClick={handleRedeem}
          disabled={isExpired}
          className={`w-full mt-4 px-4 py-2 rounded-lg font-medium transition-colors ${
            isExpired
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          {reward.type === 'badge' ? 'Activar Insignia' : 'Activar Función'}
        </button>
      )}

      {/* Redeemed state */}
      {redeemed && (
        <div className="mt-4 flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
          <Check className="w-5 h-5" />
          <span className="font-medium">¡Recompensa activada!</span>
        </div>
      )}
    </div>
  );
}

export default function RewardsPanel({ rewards, onRedeem }: RewardsPanelProps) {
  if (rewards.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <Gift className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
          Sin recompensas aún
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
          Desbloquea logros de niveles Oro y Platino para ganar recompensas exclusivas.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-accent-50 to-primary-50 dark:from-accent-900/30 dark:to-primary-900/30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <Sparkles className="w-5 h-5 text-accent-600 dark:text-accent-400" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100">Mis Recompensas</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {rewards.length} recompensa{rewards.length !== 1 ? 's' : ''} disponible
              {rewards.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Rewards grid */}
      <div className="p-4 grid gap-4 sm:grid-cols-2">
        {rewards.map((reward, index) => (
          <RewardCard key={`${reward.type}-${index}`} reward={reward} onRedeem={onRedeem} />
        ))}
      </div>
    </div>
  );
}
