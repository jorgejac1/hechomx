import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Progress, { CircularProgress, MultiProgress } from '../Progress';

describe('Progress', () => {
  describe('Rendering', () => {
    it('should render a progress bar', () => {
      render(<Progress value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should have correct aria attributes', () => {
      render(<Progress value={50} max={100} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '50');
      expect(progressbar).toHaveAttribute('aria-valuemin', '0');
      expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    });

    it('should have aria-label with percentage', () => {
      render(<Progress value={75} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Progress: 75%');
    });
  });

  describe('Value calculation', () => {
    it('should calculate percentage correctly', () => {
      const { container } = render(<Progress value={50} />);
      const bar = container.querySelector('[style*="width"]');
      expect(bar).toHaveStyle({ width: '50%' });
    });

    it('should calculate percentage with custom max', () => {
      const { container } = render(<Progress value={25} max={50} />);
      const bar = container.querySelector('[style*="width"]');
      expect(bar).toHaveStyle({ width: '50%' });
    });

    it('should clamp value to 0', () => {
      const { container } = render(<Progress value={-10} />);
      const bar = container.querySelector('[style*="width"]');
      expect(bar).toHaveStyle({ width: '0%' });
    });

    it('should clamp value to 100', () => {
      const { container } = render(<Progress value={150} />);
      const bar = container.querySelector('[style*="width"]');
      expect(bar).toHaveStyle({ width: '100%' });
    });

    it('should handle zero value', () => {
      const { container } = render(<Progress value={0} />);
      const bar = container.querySelector('[style*="width"]');
      expect(bar).toHaveStyle({ width: '0%' });
    });

    it('should handle 100% value', () => {
      const { container } = render(<Progress value={100} />);
      const bar = container.querySelector('[style*="width"]');
      expect(bar).toHaveStyle({ width: '100%' });
    });
  });

  describe('Sizes', () => {
    it('should apply xs size', () => {
      const { container } = render(<Progress value={50} size="xs" />);
      const track = container.querySelector('[role="progressbar"]');
      expect(track).toHaveClass('h-1');
    });

    it('should apply sm size', () => {
      const { container } = render(<Progress value={50} size="sm" />);
      const track = container.querySelector('[role="progressbar"]');
      expect(track).toHaveClass('h-1.5');
    });

    it('should apply md size by default', () => {
      const { container } = render(<Progress value={50} />);
      const track = container.querySelector('[role="progressbar"]');
      expect(track).toHaveClass('h-2');
    });

    it('should apply lg size', () => {
      const { container } = render(<Progress value={50} size="lg" />);
      const track = container.querySelector('[role="progressbar"]');
      expect(track).toHaveClass('h-3');
    });
  });

  describe('Variants', () => {
    it('should apply primary variant by default', () => {
      const { container } = render(<Progress value={50} />);
      const bar = container.querySelector('[style*="width"]');
      expect(bar).toHaveClass('bg-primary-600');
    });

    it('should apply success variant', () => {
      const { container } = render(<Progress value={50} variant="success" />);
      const bar = container.querySelector('[style*="width"]');
      expect(bar).toHaveClass('bg-green-500');
    });

    it('should apply warning variant', () => {
      const { container } = render(<Progress value={50} variant="warning" />);
      const bar = container.querySelector('[style*="width"]');
      expect(bar).toHaveClass('bg-yellow-500');
    });

    it('should apply danger variant', () => {
      const { container } = render(<Progress value={50} variant="danger" />);
      const bar = container.querySelector('[style*="width"]');
      expect(bar).toHaveClass('bg-red-500');
    });

    it('should apply info variant', () => {
      const { container } = render(<Progress value={50} variant="info" />);
      const bar = container.querySelector('[style*="width"]');
      expect(bar).toHaveClass('bg-blue-500');
    });

    it('should apply neutral variant', () => {
      const { container } = render(<Progress value={50} variant="neutral" />);
      const bar = container.querySelector('[style*="width"]');
      expect(bar).toHaveClass('bg-gray-500');
    });
  });

  describe('Labels', () => {
    it('should not show label by default', () => {
      render(<Progress value={50} />);
      expect(screen.queryByText('50%')).not.toBeInTheDocument();
    });

    it('should show label when showLabel is true', () => {
      render(<Progress value={50} showLabel />);
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('should show custom label', () => {
      render(<Progress value={50} label="Custom Label" />);
      expect(screen.getByText('Custom Label')).toBeInTheDocument();
    });

    it('should round percentage in label', () => {
      render(<Progress value={33.33} showLabel />);
      expect(screen.getByText('33%')).toBeInTheDocument();
    });

    it('should show label on right by default', () => {
      render(<Progress value={50} showLabel />);
      const label = screen.getByText('50%');
      expect(label).toBeInTheDocument();
    });

    it('should show label on top when labelPosition is top', () => {
      render(<Progress value={50} showLabel labelPosition="top" />);
      const label = screen.getByText('50%');
      expect(label).toBeInTheDocument();
    });

    it('should show label inside bar when labelPosition is inside and size is md or lg', () => {
      render(<Progress value={50} showLabel labelPosition="inside" size="md" />);
      const label = screen.getByText('50%');
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass('text-white');
    });

    it('should show label inside bar when labelPosition is inside and size is lg', () => {
      render(<Progress value={50} showLabel labelPosition="inside" size="lg" />);
      const label = screen.getByText('50%');
      expect(label).toBeInTheDocument();
    });
  });

  describe('Animation', () => {
    it('should not have transition by default', () => {
      const { container } = render(<Progress value={50} />);
      const bar = container.querySelector('[style*="width"]');
      expect(bar).not.toHaveClass('transition-all');
    });

    it('should have transition when animated', () => {
      const { container } = render(<Progress value={50} animated />);
      const bar = container.querySelector('[style*="width"]');
      expect(bar).toHaveClass('transition-all', 'duration-500');
    });
  });

  describe('Striped', () => {
    it('should not have striped pattern by default', () => {
      const { container } = render(<Progress value={50} />);
      const bar = container.querySelector('[style*="width"]') as HTMLElement;
      // When not striped, backgroundSize should not be set
      expect(bar?.style.backgroundSize).toBe('');
    });

    it('should have striped pattern when striped is true', () => {
      const { container } = render(<Progress value={50} striped />);
      const bar = container.querySelector('[style*="width"]');
      expect(bar).toHaveStyle({ backgroundSize: '1rem 1rem' });
    });
  });

  describe('Custom className', () => {
    it('should apply custom className', () => {
      const { container } = render(<Progress value={50} className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should apply custom trackClassName', () => {
      const { container } = render(<Progress value={50} trackClassName="custom-track" />);
      const track = container.querySelector('[role="progressbar"]');
      expect(track).toHaveClass('custom-track');
    });

    it('should apply custom barClassName', () => {
      const { container } = render(<Progress value={50} barClassName="custom-bar" />);
      const bar = container.querySelector('[style*="width"]');
      expect(bar).toHaveClass('custom-bar');
    });
  });
});

describe('CircularProgress', () => {
  describe('Rendering', () => {
    it('should render a circular progress', () => {
      render(<CircularProgress value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should have correct aria attributes', () => {
      render(<CircularProgress value={50} max={100} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '50');
      expect(progressbar).toHaveAttribute('aria-valuemin', '0');
      expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    });

    it('should render SVG with correct size', () => {
      const { container } = render(<CircularProgress value={50} size={64} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '64');
      expect(svg).toHaveAttribute('height', '64');
    });
  });

  describe('Value calculation', () => {
    it('should clamp value to 0', () => {
      render(<CircularProgress value={-10} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Progress: 0%');
    });

    it('should clamp value to 100', () => {
      render(<CircularProgress value={150} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Progress: 100%');
    });
  });

  describe('Labels', () => {
    it('should not show label by default', () => {
      render(<CircularProgress value={50} />);
      expect(screen.queryByText('50%')).not.toBeInTheDocument();
    });

    it('should show label when showLabel is true', () => {
      render(<CircularProgress value={50} showLabel />);
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('should show custom label', () => {
      render(<CircularProgress value={50} label="Custom" />);
      expect(screen.getByText('Custom')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should apply primary variant by default', () => {
      const { container } = render(<CircularProgress value={50} />);
      const circles = container.querySelectorAll('circle');
      expect(circles[1]).toHaveClass('stroke-primary-600');
    });

    it('should apply success variant', () => {
      const { container } = render(<CircularProgress value={50} variant="success" />);
      const circles = container.querySelectorAll('circle');
      expect(circles[1]).toHaveClass('stroke-green-500');
    });

    it('should apply warning variant', () => {
      const { container } = render(<CircularProgress value={50} variant="warning" />);
      const circles = container.querySelectorAll('circle');
      expect(circles[1]).toHaveClass('stroke-yellow-500');
    });

    it('should apply danger variant', () => {
      const { container } = render(<CircularProgress value={50} variant="danger" />);
      const circles = container.querySelectorAll('circle');
      expect(circles[1]).toHaveClass('stroke-red-500');
    });
  });

  describe('Custom className', () => {
    it('should apply custom className', () => {
      const { container } = render(<CircularProgress value={50} className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});

describe('MultiProgress', () => {
  describe('Rendering', () => {
    it('should render multi-segment progress bar', () => {
      render(
        <MultiProgress
          segments={[
            { value: 30, variant: 'success' },
            { value: 20, variant: 'warning' },
          ]}
        />
      );
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should render correct number of segments', () => {
      const { container } = render(
        <MultiProgress segments={[{ value: 30 }, { value: 20 }, { value: 50 }]} />
      );
      const segments = container.querySelectorAll('[style*="width"]');
      expect(segments).toHaveLength(3);
    });
  });

  describe('Segment widths', () => {
    it('should calculate segment widths correctly', () => {
      const { container } = render(<MultiProgress segments={[{ value: 50 }, { value: 50 }]} />);
      const segments = container.querySelectorAll('[style*="width"]');
      expect(segments[0]).toHaveStyle({ width: '50%' });
      expect(segments[1]).toHaveStyle({ width: '50%' });
    });

    it('should handle uneven segments', () => {
      const { container } = render(<MultiProgress segments={[{ value: 25 }, { value: 75 }]} />);
      const segments = container.querySelectorAll('[style*="width"]');
      expect(segments[0]).toHaveStyle({ width: '25%' });
      expect(segments[1]).toHaveStyle({ width: '75%' });
    });

    it('should handle zero total', () => {
      const { container } = render(<MultiProgress segments={[{ value: 0 }, { value: 0 }]} />);
      const segments = container.querySelectorAll('[style*="width"]');
      expect(segments[0]).toHaveStyle({ width: '0%' });
      expect(segments[1]).toHaveStyle({ width: '0%' });
    });
  });

  describe('Segment variants', () => {
    it('should apply different variants to segments', () => {
      const { container } = render(
        <MultiProgress
          segments={[
            { value: 30, variant: 'success' },
            { value: 30, variant: 'warning' },
            { value: 40, variant: 'danger' },
          ]}
        />
      );
      const segments = container.querySelectorAll('[style*="width"]');
      expect(segments[0]).toHaveClass('bg-green-500');
      expect(segments[1]).toHaveClass('bg-yellow-500');
      expect(segments[2]).toHaveClass('bg-red-500');
    });

    it('should apply primary variant by default', () => {
      const { container } = render(<MultiProgress segments={[{ value: 50 }]} />);
      const segments = container.querySelectorAll('[style*="width"]');
      expect(segments[0]).toHaveClass('bg-primary-600');
    });
  });

  describe('Segment labels', () => {
    it('should have title attribute with label', () => {
      const { container } = render(
        <MultiProgress segments={[{ value: 50, label: 'Completed' }]} />
      );
      const segment = container.querySelector('[style*="width"]');
      expect(segment).toHaveAttribute('title', 'Completed');
    });

    it('should have title with percentage when no label', () => {
      const { container } = render(<MultiProgress segments={[{ value: 50 }, { value: 50 }]} />);
      const segments = container.querySelectorAll('[style*="width"]');
      expect(segments[0]).toHaveAttribute('title', '50%');
    });
  });

  describe('Sizes', () => {
    it('should apply md size by default', () => {
      const { container } = render(<MultiProgress segments={[{ value: 50 }]} />);
      const track = container.querySelector('[role="progressbar"]');
      expect(track).toHaveClass('h-2');
    });

    it('should apply lg size', () => {
      const { container } = render(<MultiProgress segments={[{ value: 50 }]} size="lg" />);
      const track = container.querySelector('[role="progressbar"]');
      expect(track).toHaveClass('h-3');
    });
  });

  describe('Custom className', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <MultiProgress segments={[{ value: 50 }]} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });
});
