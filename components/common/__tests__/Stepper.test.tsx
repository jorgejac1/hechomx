import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Stepper, { type Step } from '../Stepper';
import { User, CreditCard, Package } from 'lucide-react';

const basicSteps: Step[] = [
  { id: 'step1', label: 'Paso 1' },
  { id: 'step2', label: 'Paso 2' },
  { id: 'step3', label: 'Paso 3' },
];

const detailedSteps: Step[] = [
  { id: 'info', label: 'Información', description: 'Datos personales' },
  { id: 'payment', label: 'Pago', description: 'Método de pago' },
  { id: 'confirm', label: 'Confirmación', description: 'Revisar pedido' },
];

const stepsWithIcons: Step[] = [
  { id: 'user', label: 'Usuario', icon: User },
  { id: 'payment', label: 'Pago', icon: CreditCard },
  { id: 'delivery', label: 'Entrega', icon: Package },
];

describe('Stepper', () => {
  describe('Rendering', () => {
    it('should render navigation element', () => {
      render(<Stepper steps={basicSteps} currentStep={0} />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should have Progreso aria-label', () => {
      render(<Stepper steps={basicSteps} currentStep={0} />);
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Progreso');
    });

    it('should render all step labels', () => {
      render(<Stepper steps={basicSteps} currentStep={0} />);
      expect(screen.getByText('Paso 1')).toBeInTheDocument();
      expect(screen.getByText('Paso 2')).toBeInTheDocument();
      expect(screen.getByText('Paso 3')).toBeInTheDocument();
    });

    it('should render step descriptions', () => {
      render(<Stepper steps={detailedSteps} currentStep={0} />);
      expect(screen.getByText('Datos personales')).toBeInTheDocument();
      expect(screen.getByText('Método de pago')).toBeInTheDocument();
      expect(screen.getByText('Revisar pedido')).toBeInTheDocument();
    });

    it('should render nothing when steps array is empty', () => {
      const { container } = render(<Stepper steps={[]} currentStep={0} />);
      expect(container.querySelector('nav')).not.toBeInTheDocument();
    });
  });

  describe('Step Numbers', () => {
    it('should show step numbers by default', () => {
      render(<Stepper steps={basicSteps} currentStep={1} />);
      // Step 1 is completed (shows check), step 2 is current (shows 2), step 3 shows 3
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('should hide step numbers when showNumbers is false', () => {
      render(<Stepper steps={basicSteps} currentStep={1} showNumbers={false} />);
      expect(screen.queryByText('2')).not.toBeInTheDocument();
      expect(screen.queryByText('3')).not.toBeInTheDocument();
    });
  });

  describe('Step Status', () => {
    it('should mark steps before currentStep as completed', () => {
      const { container } = render(<Stepper steps={basicSteps} currentStep={2} />);
      // Completed steps have check icons (SVG)
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThanOrEqual(2); // At least 2 check marks
    });

    it('should mark current step with aria-current', () => {
      const { container } = render(<Stepper steps={basicSteps} currentStep={1} />);
      const currentStep = container.querySelector('[aria-current="step"]');
      expect(currentStep).toBeInTheDocument();
      expect(currentStep?.textContent).toContain('Paso 2');
    });

    it('should style completed steps differently', () => {
      const { container } = render(<Stepper steps={basicSteps} currentStep={2} />);
      const circles = container.querySelectorAll('.bg-primary-600');
      expect(circles.length).toBeGreaterThanOrEqual(2); // Completed steps have primary bg
    });
  });

  describe('Clickable Steps', () => {
    it('should not render buttons when clickable is false', () => {
      render(<Stepper steps={basicSteps} currentStep={1} clickable={false} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should render buttons for completed steps when clickable', () => {
      render(<Stepper steps={basicSteps} currentStep={2} clickable={true} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(2); // First 2 steps are completed and clickable
    });

    it('should not render button for current step when clickable', () => {
      render(<Stepper steps={basicSteps} currentStep={1} clickable={true} />);
      const buttons = screen.getAllByRole('button');
      // Only step 0 is completed and clickable
      expect(buttons.length).toBe(1);
    });

    it('should not render button for upcoming steps when clickable', () => {
      render(<Stepper steps={basicSteps} currentStep={0} clickable={true} />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should call onStepClick when completed step is clicked', () => {
      const handleClick = vi.fn();
      render(
        <Stepper steps={basicSteps} currentStep={2} clickable={true} onStepClick={handleClick} />
      );
      const firstStepButton = screen.getAllByRole('button')[0];
      fireEvent.click(firstStepButton);
      expect(handleClick).toHaveBeenCalledWith(0);
    });

    it('should have correct aria-label on clickable steps', () => {
      render(<Stepper steps={basicSteps} currentStep={2} clickable={true} />);
      const button = screen.getAllByRole('button')[0];
      expect(button).toHaveAttribute('aria-label', 'Ir al paso 1: Paso 1');
    });
  });

  describe('Icons', () => {
    it('should render custom icons for steps', () => {
      const { container } = render(
        <Stepper steps={stepsWithIcons} currentStep={0} showNumbers={false} />
      );
      // Icons are rendered as SVG elements
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThanOrEqual(3);
    });

    it('should render check icon for completed steps', () => {
      const { container } = render(<Stepper steps={basicSteps} currentStep={1} />);
      // First step is completed - should have check SVG
      const checkIcon = container.querySelector('svg');
      expect(checkIcon).toBeInTheDocument();
    });
  });

  describe('Optional Steps', () => {
    it('should show optional indicator', () => {
      const stepsWithOptional: Step[] = [
        { id: 'step1', label: 'Paso 1' },
        { id: 'step2', label: 'Paso 2', optional: true },
        { id: 'step3', label: 'Paso 3' },
      ];
      render(<Stepper steps={stepsWithOptional} currentStep={0} />);
      expect(screen.getByText('(Opcional)')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should render small size', () => {
      const { container } = render(<Stepper steps={basicSteps} currentStep={0} size="sm" />);
      expect(container.querySelector('.w-8')).toBeInTheDocument(); // Small circle
    });

    it('should render medium size by default', () => {
      const { container } = render(<Stepper steps={basicSteps} currentStep={0} />);
      expect(container.querySelector('.w-10')).toBeInTheDocument(); // Medium circle
    });

    it('should render large size', () => {
      const { container } = render(<Stepper steps={basicSteps} currentStep={0} size="lg" />);
      expect(container.querySelector('.w-12')).toBeInTheDocument(); // Large circle
    });
  });

  describe('Orientation', () => {
    it('should render horizontal layout by default', () => {
      const { container } = render(<Stepper steps={basicSteps} currentStep={0} />);
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('flex', 'items-center');
    });

    it('should render vertical layout', () => {
      const { container } = render(
        <Stepper steps={basicSteps} currentStep={0} orientation="vertical" />
      );
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('flex', 'flex-col');
    });
  });

  describe('Connectors', () => {
    it('should render connectors between steps in horizontal layout', () => {
      const { container } = render(<Stepper steps={basicSteps} currentStep={0} />);
      // Connectors have flex-1 class in horizontal
      const connectors = container.querySelectorAll('.flex-1.h-0\\.5');
      expect(connectors.length).toBe(2); // 2 connectors for 3 steps
    });

    it('should render vertical connectors in vertical layout', () => {
      const { container } = render(
        <Stepper steps={basicSteps} currentStep={0} orientation="vertical" />
      );
      const connectors = container.querySelectorAll('.w-0\\.5');
      expect(connectors.length).toBe(2); // 2 connectors for 3 steps
    });

    it('should style completed connectors differently', () => {
      const { container } = render(<Stepper steps={basicSteps} currentStep={2} />);
      // Completed connectors have primary color
      const completedConnectors = container.querySelectorAll('.bg-primary-600.flex-1');
      expect(completedConnectors.length).toBe(2);
    });
  });

  describe('Custom Completed Icon', () => {
    it('should render custom completed icon', () => {
      render(
        <Stepper
          steps={basicSteps}
          currentStep={1}
          completedIcon={<span data-testid="custom-check">✓</span>}
        />
      );
      expect(screen.getByTestId('custom-check')).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <Stepper steps={basicSteps} currentStep={0} className="custom-class" />
      );
      expect(container.querySelector('nav')).toHaveClass('custom-class');
    });
  });

  describe('Single Step', () => {
    it('should render single step without connector', () => {
      const { container } = render(
        <Stepper steps={[{ id: 'only', label: 'Solo Paso' }]} currentStep={0} />
      );
      expect(screen.getByText('Solo Paso')).toBeInTheDocument();
      // No connectors for single step
      const connectors = container.querySelectorAll('.flex-1.h-0\\.5');
      expect(connectors.length).toBe(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle currentStep at first position', () => {
      const { container } = render(<Stepper steps={basicSteps} currentStep={0} />);
      const currentStep = container.querySelector('[aria-current="step"]');
      expect(currentStep?.textContent).toContain('Paso 1');
    });

    it('should handle currentStep at last position', () => {
      const { container } = render(<Stepper steps={basicSteps} currentStep={2} />);
      const currentStep = container.querySelector('[aria-current="step"]');
      expect(currentStep?.textContent).toContain('Paso 3');
    });

    it('should handle currentStep beyond array length', () => {
      const { container } = render(<Stepper steps={basicSteps} currentStep={5} />);
      // All steps should be completed when currentStep > last index
      const completedCircles = container.querySelectorAll('.bg-primary-600.text-white');
      expect(completedCircles.length).toBe(3);
    });
  });

  describe('Spanish Localization', () => {
    it('should use Spanish for optional text', () => {
      const stepsWithOptional: Step[] = [{ id: 'step1', label: 'Paso', optional: true }];
      render(<Stepper steps={stepsWithOptional} currentStep={0} />);
      expect(screen.getByText('(Opcional)')).toBeInTheDocument();
    });

    it('should use Spanish for step navigation aria-label', () => {
      render(<Stepper steps={basicSteps} currentStep={2} clickable={true} />);
      const button = screen.getAllByRole('button')[0];
      expect(button.getAttribute('aria-label')).toContain('Ir al paso');
    });
  });
});
