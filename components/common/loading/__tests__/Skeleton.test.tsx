import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Skeleton from '../Skeleton';

describe('Skeleton', () => {
  describe('Rendering', () => {
    it('should render a skeleton element', () => {
      render(<Skeleton data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    });

    it('should have base gray background', () => {
      render(<Skeleton data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('bg-gray-200');
    });
  });

  describe('Variants', () => {
    it('should apply text variant (rounded-sm)', () => {
      render(<Skeleton variant="text" data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('rounded-sm');
    });

    it('should apply circular variant (rounded-full)', () => {
      render(<Skeleton variant="circular" data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('rounded-full');
    });

    it('should apply rectangular variant by default (rounded-lg)', () => {
      render(<Skeleton data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('rounded-lg');
    });

    it('should apply rectangular variant explicitly', () => {
      render(<Skeleton variant="rectangular" data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('rounded-lg');
    });
  });

  describe('Animation', () => {
    it('should apply pulse animation by default', () => {
      render(<Skeleton data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('animate-pulse');
    });

    it('should apply pulse animation explicitly', () => {
      render(<Skeleton animation="pulse" data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('animate-pulse');
    });

    it('should apply wave animation', () => {
      render(<Skeleton animation="wave" data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('animate-shimmer');
    });

    it('should have no animation class when animation is none', () => {
      render(<Skeleton animation="none" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).not.toHaveClass('animate-pulse');
      expect(skeleton).not.toHaveClass('animate-shimmer');
    });
  });

  describe('Dimensions', () => {
    it('should apply width as string', () => {
      render(<Skeleton width="100px" data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveStyle({ width: '100px' });
    });

    it('should apply width as number', () => {
      render(<Skeleton width={200} data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveStyle({ width: '200px' });
    });

    it('should apply height as string', () => {
      render(<Skeleton height="50px" data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveStyle({ height: '50px' });
    });

    it('should apply height as number', () => {
      render(<Skeleton height={100} data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveStyle({ height: '100px' });
    });

    it('should apply both width and height', () => {
      render(<Skeleton width="200px" height="100px" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveStyle({ width: '200px', height: '100px' });
    });

    it('should not apply inline width/height styles when dimensions not provided', () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      // When no dimensions are provided, width and height should be undefined (not set in style)
      expect(skeleton.style.width).toBe('');
      expect(skeleton.style.height).toBe('');
    });

    it('should apply percentage width', () => {
      render(<Skeleton width="50%" data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveStyle({ width: '50%' });
    });
  });

  describe('Custom className', () => {
    it('should apply custom className', () => {
      render(<Skeleton className="custom-class" data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveClass('custom-class');
    });

    it('should merge custom className with default styles', () => {
      render(<Skeleton className="h-10 w-full" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('h-10', 'w-full', 'bg-gray-200');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-busy attribute', () => {
      render(<Skeleton data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-busy', 'true');
    });

    it('should have aria-live attribute', () => {
      render(<Skeleton data-testid="skeleton" />);
      expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Common use cases', () => {
    it('should work as text skeleton', () => {
      render(<Skeleton variant="text" className="h-4 w-3/4" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded-sm', 'h-4', 'w-3/4');
    });

    it('should work as avatar skeleton', () => {
      render(<Skeleton variant="circular" className="w-12 h-12" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded-full', 'w-12', 'h-12');
    });

    it('should work as card skeleton', () => {
      render(<Skeleton variant="rectangular" className="w-full h-48" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('rounded-lg', 'w-full', 'h-48');
    });

    it('should work as button skeleton', () => {
      render(<Skeleton className="h-10 w-24" data-testid="skeleton" />);
      const skeleton = screen.getByTestId('skeleton');
      expect(skeleton).toHaveClass('h-10', 'w-24');
    });
  });

  describe('Composition', () => {
    it('should render multiple skeletons in a group', () => {
      render(
        <div data-testid="skeleton-group">
          <Skeleton variant="circular" className="w-10 h-10" data-testid="avatar-skeleton" />
          <Skeleton variant="text" className="h-4 w-32" data-testid="title-skeleton" />
          <Skeleton variant="text" className="h-3 w-24" data-testid="subtitle-skeleton" />
        </div>
      );
      expect(screen.getByTestId('avatar-skeleton')).toBeInTheDocument();
      expect(screen.getByTestId('title-skeleton')).toBeInTheDocument();
      expect(screen.getByTestId('subtitle-skeleton')).toBeInTheDocument();
    });
  });
});
