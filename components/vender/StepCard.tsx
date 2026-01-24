/**
 * @fileoverview Step card component for seller onboarding flow.
 * Displays numbered steps with title and description.
 * Shows connecting arrows between steps in the process.
 * @module components/vender/StepCard
 */

import { ArrowRight } from 'lucide-react';

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  showArrow?: boolean;
}

export default function StepCard({ step, title, description, showArrow }: StepCardProps) {
  return (
    <div className="relative">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
          {step}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
      {showArrow && (
        <div className="hidden lg:block absolute top-8 -right-4 text-primary-300 dark:text-primary-500">
          <ArrowRight className="w-8 h-8" />
        </div>
      )}
    </div>
  );
}
