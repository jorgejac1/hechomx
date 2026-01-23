/**
 * @fileoverview Stepper component for multi-step processes and wizards.
 * Displays progress through sequential steps with status indicators,
 * supports horizontal/vertical layouts, clickable navigation, and custom icons.
 * @module components/common/Stepper
 */

'use client';

import { ReactNode } from 'react';
import { Check, type LucideIcon } from 'lucide-react';

/**
 * Status of a step in the stepper
 * @typedef {'completed' | 'current' | 'upcoming'} StepStatus
 */
type StepStatus = 'completed' | 'current' | 'upcoming';

/**
 * Available stepper sizes
 * @typedef {'sm' | 'md' | 'lg'} StepperSize
 */
type StepperSize = 'sm' | 'md' | 'lg';

/**
 * Layout orientation for the stepper
 * @typedef {'horizontal' | 'vertical'} StepperOrientation
 */
type StepperOrientation = 'horizontal' | 'vertical';

/**
 * Configuration for a single step
 * @interface Step
 */
interface Step {
  /** Unique identifier for the step */
  id: string;
  /** Display label for the step */
  label: string;
  /** Optional description text */
  description?: string;
  /** Optional custom icon (defaults to step number or check) */
  icon?: LucideIcon;
  /** Whether this step is optional */
  optional?: boolean;
}

interface StepperProps {
  /** Array of step definitions */
  steps: Step[];
  /** Current active step index (0-based) */
  currentStep: number;
  /** Callback when a step is clicked (only for completed steps) */
  onStepClick?: (stepIndex: number) => void;
  /** Size variant */
  size?: StepperSize;
  /** Orientation of the stepper */
  orientation?: StepperOrientation;
  /** Whether completed steps are clickable */
  clickable?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Custom completed icon */
  completedIcon?: ReactNode;
  /** Whether to show step numbers */
  showNumbers?: boolean;
}

// Size configurations
const sizeConfig: Record<
  StepperSize,
  {
    circle: string;
    icon: string;
    label: string;
    description: string;
    connector: string;
    gap: string;
  }
> = {
  sm: {
    circle: 'w-8 h-8',
    icon: 'w-4 h-4',
    label: 'text-sm font-medium',
    description: 'text-xs',
    connector: 'h-0.5',
    gap: 'gap-2',
  },
  md: {
    circle: 'w-10 h-10',
    icon: 'w-5 h-5',
    label: 'text-base font-medium',
    description: 'text-sm',
    connector: 'h-0.5',
    gap: 'gap-3',
  },
  lg: {
    circle: 'w-12 h-12',
    icon: 'w-6 h-6',
    label: 'text-lg font-semibold',
    description: 'text-base',
    connector: 'h-1',
    gap: 'gap-4',
  },
};

// Status styles
const statusStyles: Record<
  StepStatus,
  {
    circle: string;
    text: string;
    connector: string;
  }
> = {
  completed: {
    circle: 'bg-primary-600 text-white border-primary-600',
    text: 'text-primary-600',
    connector: 'bg-primary-600',
  },
  current: {
    circle: 'bg-white text-primary-600 border-primary-600 border-2',
    text: 'text-gray-900',
    connector: 'bg-gray-300',
  },
  upcoming: {
    circle: 'bg-white text-gray-400 border-gray-300 border',
    text: 'text-gray-500',
    connector: 'bg-gray-300',
  },
};

function getStepStatus(stepIndex: number, currentStep: number): StepStatus {
  if (stepIndex < currentStep) return 'completed';
  if (stepIndex === currentStep) return 'current';
  return 'upcoming';
}

// ========== Step Circle Component ==========
interface StepCircleProps {
  step: Step;
  stepIndex: number;
  status: StepStatus;
  size: StepperSize;
  showNumbers: boolean;
  completedIcon?: ReactNode;
}

function StepCircle({
  step,
  stepIndex,
  status,
  size,
  showNumbers,
  completedIcon,
}: StepCircleProps) {
  const sizes = sizeConfig[size];
  const styles = statusStyles[status];
  const Icon = step.icon;

  const renderContent = () => {
    if (status === 'completed') {
      if (completedIcon) return completedIcon;
      return <Check className={sizes.icon} aria-hidden="true" />;
    }
    if (Icon) {
      return <Icon className={sizes.icon} aria-hidden="true" />;
    }
    if (showNumbers) {
      return <span className="font-semibold">{stepIndex + 1}</span>;
    }
    return (
      <span
        className={`rounded-full bg-current ${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-2.5 h-2.5' : 'w-3 h-3'}`}
      />
    );
  };

  return (
    <div
      className={`
        flex items-center justify-center rounded-full shrink-0 transition-all
        ${sizes.circle}
        ${styles.circle}
      `}
      aria-hidden="true"
    >
      {renderContent()}
    </div>
  );
}

// ========== Horizontal Connector ==========
interface ConnectorProps {
  status: StepStatus;
  size: StepperSize;
  orientation: StepperOrientation;
}

function Connector({ status, size, orientation }: ConnectorProps) {
  const sizes = sizeConfig[size];
  const styles = statusStyles[status];

  if (orientation === 'horizontal') {
    return (
      <div
        className={`flex-1 ${sizes.connector} ${styles.connector} transition-colors`}
        aria-hidden="true"
      />
    );
  }

  // Vertical connector
  return (
    <div
      className={`w-0.5 flex-1 min-h-8 ${styles.connector} ml-4 sm:ml-5 transition-colors`}
      aria-hidden="true"
    />
  );
}

// ========== Single Step Component ==========
interface StepItemProps {
  step: Step;
  stepIndex: number;
  status: StepStatus;
  size: StepperSize;
  orientation: StepperOrientation;
  clickable: boolean;
  showNumbers: boolean;
  completedIcon?: ReactNode;
  onClick?: () => void;
  isLast: boolean;
}

function StepItem({
  step,
  stepIndex,
  status,
  size,
  orientation,
  clickable,
  showNumbers,
  completedIcon,
  onClick,
  isLast,
}: StepItemProps) {
  const sizes = sizeConfig[size];
  const styles = statusStyles[status];
  const isClickable = clickable && status === 'completed';

  const stepContent = (
    <>
      <StepCircle
        step={step}
        stepIndex={stepIndex}
        status={status}
        size={size}
        showNumbers={showNumbers}
        completedIcon={completedIcon}
      />
      <div className={orientation === 'horizontal' ? 'mt-2' : ''}>
        <p className={`${sizes.label} ${styles.text}`}>
          {step.label}
          {step.optional && <span className="font-normal text-gray-400 ml-1">(Opcional)</span>}
        </p>
        {step.description && (
          <p className={`${sizes.description} text-gray-500 mt-0.5`}>{step.description}</p>
        )}
      </div>
    </>
  );

  const containerClasses = `
    flex ${orientation === 'horizontal' ? 'flex-col items-center' : `items-start ${sizes.gap}`}
    ${isClickable ? 'cursor-pointer group' : ''}
  `;

  if (orientation === 'horizontal') {
    return (
      <>
        {isClickable ? (
          <button
            type="button"
            onClick={onClick}
            className={containerClasses}
            aria-label={`Ir al paso ${stepIndex + 1}: ${step.label}`}
          >
            {stepContent}
          </button>
        ) : (
          <div
            className={containerClasses}
            aria-current={status === 'current' ? 'step' : undefined}
          >
            {stepContent}
          </div>
        )}
        {!isLast && (
          <Connector
            status={status === 'completed' ? 'completed' : 'upcoming'}
            size={size}
            orientation={orientation}
          />
        )}
      </>
    );
  }

  // Vertical layout
  return (
    <div className="flex flex-col">
      {isClickable ? (
        <button
          type="button"
          onClick={onClick}
          className={containerClasses}
          aria-label={`Ir al paso ${stepIndex + 1}: ${step.label}`}
        >
          {stepContent}
        </button>
      ) : (
        <div className={containerClasses} aria-current={status === 'current' ? 'step' : undefined}>
          {stepContent}
        </div>
      )}
      {!isLast && (
        <Connector
          status={status === 'completed' ? 'completed' : 'upcoming'}
          size={size}
          orientation={orientation}
        />
      )}
    </div>
  );
}

// ========== Main Stepper Component ==========
export default function Stepper({
  steps,
  currentStep,
  onStepClick,
  size = 'md',
  orientation = 'horizontal',
  clickable = false,
  className = '',
  completedIcon,
  showNumbers = true,
}: StepperProps) {
  if (steps.length === 0) {
    return null;
  }

  const handleStepClick = (stepIndex: number) => {
    if (clickable && stepIndex < currentStep && onStepClick) {
      onStepClick(stepIndex);
    }
  };

  return (
    <nav
      aria-label="Progreso"
      className={`
        ${orientation === 'horizontal' ? 'flex items-center' : 'flex flex-col'}
        ${className}
      `}
    >
      {steps.map((step, index) => (
        <StepItem
          key={step.id}
          step={step}
          stepIndex={index}
          status={getStepStatus(index, currentStep)}
          size={size}
          orientation={orientation}
          clickable={clickable}
          showNumbers={showNumbers}
          completedIcon={completedIcon}
          onClick={() => handleStepClick(index)}
          isLast={index === steps.length - 1}
        />
      ))}
    </nav>
  );
}

export type { Step, StepperProps, StepperSize, StepperOrientation, StepStatus };
