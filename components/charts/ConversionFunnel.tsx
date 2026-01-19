export interface FunnelStep {
  /** Label for this step */
  label: string;
  /** Value/count for this step */
  value: number;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Background color variant */
  variant?: 'gray' | 'blue' | 'purple' | 'green' | 'amber' | 'red';
}

export interface ConversionFunnelProps {
  /** Funnel steps data */
  steps: FunnelStep[];
  /** Show percentage relative to first step */
  showPercentage?: boolean;
  /** Show conversion rate between steps */
  showConversionRate?: boolean;
  /** Format function for values */
  formatValue?: (value: number) => string;
  /** Additional CSS classes */
  className?: string;
}

const variantStyles = {
  gray: 'bg-gray-50 text-gray-500',
  blue: 'bg-blue-50 text-blue-600',
  purple: 'bg-purple-50 text-purple-600',
  green: 'bg-green-50 text-green-600',
  amber: 'bg-amber-50 text-amber-600',
  red: 'bg-red-50 text-red-600',
};

const iconVariantStyles = {
  gray: 'text-gray-400',
  blue: 'text-blue-500',
  purple: 'text-purple-500',
  green: 'text-green-500',
  amber: 'text-amber-500',
  red: 'text-red-500',
};

const percentageVariantStyles = {
  gray: 'text-gray-500',
  blue: 'text-blue-600',
  purple: 'text-purple-600',
  green: 'text-green-600',
  amber: 'text-amber-600',
  red: 'text-red-600',
};

export default function ConversionFunnel({
  steps,
  showPercentage = true,
  showConversionRate = false,
  formatValue = (v) => v.toLocaleString(),
  className = '',
}: ConversionFunnelProps) {
  const firstValue = steps[0]?.value || 1;

  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {steps.map((step, index) => {
          const percentage = ((step.value / firstValue) * 100).toFixed(1);
          const variant = step.variant || 'gray';
          const prevStep = steps[index - 1];
          const conversionRate = prevStep ? ((step.value / prevStep.value) * 100).toFixed(1) : null;

          return (
            <div key={index} className="relative">
              <div className={`text-center p-4 rounded-lg ${variantStyles[variant]}`}>
                {step.icon && (
                  <div className={`w-8 h-8 mx-auto mb-2 ${iconVariantStyles[variant]}`}>
                    {step.icon}
                  </div>
                )}
                <p className="text-2xl font-bold text-gray-900">{formatValue(step.value)}</p>
                <p className="text-sm text-gray-600">{step.label}</p>
                {showPercentage && (
                  <p className={`text-xs mt-1 ${percentageVariantStyles[variant]}`}>
                    {percentage}%
                  </p>
                )}
              </div>
              {showConversionRate && conversionRate && (
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 hidden md:block">
                  <span className="text-xs text-gray-400 bg-white px-1">→ {conversionRate}%</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
