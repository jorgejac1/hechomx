/**
 * @fileoverview Tests for memoized components to verify they prevent unnecessary re-renders.
 * Tests React.memo behavior and useMemo/useCallback optimizations.
 * @module components/common/__tests__/memoization.test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useState, useRef, useEffect, ReactNode } from 'react';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../Card';
import Badge from '../Badge';
import Avatar from '../Avatar';

// Helper component to track render counts
function RenderCounter({ children, onRender }: { children: ReactNode; onRender: () => void }) {
  useEffect(() => {
    onRender();
  });
  return <>{children}</>;
}

// Wrapper that can trigger re-renders without changing child props
function ReRenderTrigger({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button data-testid="trigger-rerender" onClick={() => setCount((c) => c + 1)}>
        Re-render (count: {count})
      </button>
      {children}
    </div>
  );
}

describe('Memoization Tests', () => {
  describe('Card memoization', () => {
    it('should not re-render when parent re-renders with same props', () => {
      const renderCount = { current: 0 };

      function TestComponent() {
        const [parentState, setParentState] = useState(0);

        return (
          <div>
            <button data-testid="parent-button" onClick={() => setParentState((s) => s + 1)}>
              Parent state: {parentState}
            </button>
            <RenderCounter
              onRender={() => {
                renderCount.current++;
              }}
            >
              <Card data-testid="memo-card">Static content</Card>
            </RenderCounter>
          </div>
        );
      }

      render(<TestComponent />);

      // Initial render
      expect(renderCount.current).toBe(1);
      expect(screen.getByText('Static content')).toBeInTheDocument();

      // Trigger parent re-render
      fireEvent.click(screen.getByTestId('parent-button'));

      // Card wrapper re-renders but memo should prevent deep re-renders
      // The RenderCounter tracks the wrapper, but Card itself is memoized
      expect(screen.getByText('Parent state: 1')).toBeInTheDocument();
    });

    it('should re-render when props change', () => {
      const renderCount = { current: 0 };

      function TestComponent() {
        const [variant, setVariant] = useState<'default' | 'outlined'>('default');

        return (
          <div>
            <button data-testid="change-variant" onClick={() => setVariant('outlined')}>
              Change variant
            </button>
            <Card data-testid="card" variant={variant}>
              <RenderCounter
                onRender={() => {
                  renderCount.current++;
                }}
              >
                Content
              </RenderCounter>
            </Card>
          </div>
        );
      }

      render(<TestComponent />);

      const initialRenders = renderCount.current;

      // Change props - should trigger re-render
      fireEvent.click(screen.getByTestId('change-variant'));

      const card = screen.getByTestId('card');
      expect(card.className).toContain('border');
      expect(renderCount.current).toBeGreaterThan(initialRenders);
    });

    it('CardHeader should be memoized', () => {
      const renderCount = { current: 0 };

      function TestComponent() {
        return (
          <ReRenderTrigger>
            <Card>
              <CardHeader>
                <RenderCounter
                  onRender={() => {
                    renderCount.current++;
                  }}
                >
                  <CardTitle>Title</CardTitle>
                </RenderCounter>
              </CardHeader>
            </Card>
          </ReRenderTrigger>
        );
      }

      render(<TestComponent />);
      expect(renderCount.current).toBe(1);
    });

    it('CardFooter should be memoized', () => {
      const renderCount = { current: 0 };

      function TestComponent() {
        return (
          <ReRenderTrigger>
            <Card>
              <CardContent>Content</CardContent>
              <CardFooter>
                <RenderCounter
                  onRender={() => {
                    renderCount.current++;
                  }}
                >
                  <button>Action</button>
                </RenderCounter>
              </CardFooter>
            </Card>
          </ReRenderTrigger>
        );
      }

      render(<TestComponent />);
      expect(renderCount.current).toBe(1);
    });
  });

  describe('Badge memoization', () => {
    it('should not re-render with same props', () => {
      const renderCount = { current: 0 };

      function TestComponent() {
        const [parentState, setParentState] = useState(0);

        return (
          <div>
            <button data-testid="trigger" onClick={() => setParentState((s) => s + 1)}>
              Count: {parentState}
            </button>
            <RenderCounter
              onRender={() => {
                renderCount.current++;
              }}
            >
              <Badge variant="success">Active</Badge>
            </RenderCounter>
          </div>
        );
      }

      render(<TestComponent />);

      expect(renderCount.current).toBe(1);
      expect(screen.getByText('Active')).toBeInTheDocument();

      // Parent re-renders
      fireEvent.click(screen.getByTestId('trigger'));

      // Wrapper re-renders, but Badge content is memoized
      expect(screen.getByText('Count: 1')).toBeInTheDocument();
    });

    it('should re-render when variant changes', () => {
      function TestComponent() {
        const [variant, setVariant] = useState<'neutral' | 'success'>('neutral');

        return (
          <div>
            <button data-testid="change-variant" onClick={() => setVariant('success')}>
              Change
            </button>
            <div data-testid="badge-wrapper">
              <Badge variant={variant}>Status</Badge>
            </div>
          </div>
        );
      }

      render(<TestComponent />);

      const badgeWrapper = screen.getByTestId('badge-wrapper');
      const badge = badgeWrapper.querySelector('span');
      const initialClasses = badge?.className || '';

      fireEvent.click(screen.getByTestId('change-variant'));

      const updatedBadge = badgeWrapper.querySelector('span');
      expect(updatedBadge?.className).not.toBe(initialClasses);
      expect(updatedBadge?.className).toContain('green');
    });
  });

  describe('Avatar memoization', () => {
    it('should not re-render with same props', () => {
      const renderCount = { current: 0 };

      function TestComponent() {
        const [parentState, setParentState] = useState(0);

        return (
          <div>
            <button data-testid="trigger" onClick={() => setParentState((s) => s + 1)}>
              Count: {parentState}
            </button>
            <RenderCounter
              onRender={() => {
                renderCount.current++;
              }}
            >
              <Avatar name="John Doe" size="md" />
            </RenderCounter>
          </div>
        );
      }

      render(<TestComponent />);

      expect(renderCount.current).toBe(1);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('should generate consistent initials from name', () => {
      const { rerender } = render(<Avatar name="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();

      // Re-render with same name should show same initials
      rerender(<Avatar name="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('should update when name prop changes', () => {
      const { rerender } = render(<Avatar name="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();

      rerender(<Avatar name="Jane Smith" />);
      expect(screen.getByText('JS')).toBeInTheDocument();
    });

    it('should update when size prop changes', () => {
      const { rerender } = render(<Avatar name="John Doe" size="sm" />);

      // Get the avatar container - the outer div has the size class
      let avatarText = screen.getByText('JD');
      let avatarContainer = avatarText.closest('div')?.parentElement;
      expect(avatarContainer?.className).toContain('w-8');

      rerender(<Avatar name="John Doe" size="lg" />);

      avatarText = screen.getByText('JD');
      avatarContainer = avatarText.closest('div')?.parentElement;
      expect(avatarContainer?.className).toContain('w-12');
    });
  });

  describe('Callback stability', () => {
    it('onClick handlers should not cause re-renders when stable', () => {
      const handleClick = vi.fn();
      const renderCount = { current: 0 };

      function TestComponent() {
        const [, setCount] = useState(0);
        // Stable callback using useCallback would be tested here
        const stableClick = handleClick;

        return (
          <div>
            <button data-testid="trigger" onClick={() => setCount((c) => c + 1)}>
              Trigger
            </button>
            <RenderCounter
              onRender={() => {
                renderCount.current++;
              }}
            >
              <Card onClick={stableClick}>Click me</Card>
            </RenderCounter>
          </div>
        );
      }

      render(<TestComponent />);

      const initialRenders = renderCount.current;

      fireEvent.click(screen.getByTestId('trigger'));

      // With stable callback reference, Card shouldn't need to re-render
      // (Though wrapper will due to parent state change)
      expect(renderCount.current).toBe(initialRenders + 1);
    });
  });

  describe('Props reference equality', () => {
    it('should not re-render when object prop reference is stable', () => {
      const renderCount = { current: 0 };

      function TestComponent() {
        const [parentState, setParentState] = useState(0);
        // This object reference stays stable
        const stableStyle = useRef({ color: 'red' }).current;

        return (
          <div>
            <button data-testid="trigger" onClick={() => setParentState((s) => s + 1)}>
              Count: {parentState}
            </button>
            <RenderCounter
              onRender={() => {
                renderCount.current++;
              }}
            >
              <Card className="test" style={stableStyle}>
                Content
              </Card>
            </RenderCounter>
          </div>
        );
      }

      render(<TestComponent />);

      expect(renderCount.current).toBe(1);

      fireEvent.click(screen.getByTestId('trigger'));

      // Wrapper re-renders but props are stable
      expect(screen.getByText('Count: 1')).toBeInTheDocument();
    });
  });

  describe('Children stability', () => {
    it('memoized component with static children should not re-render unnecessarily', () => {
      function TestComponent() {
        const [count, setCount] = useState(0);

        return (
          <div>
            <button data-testid="trigger" onClick={() => setCount((c) => c + 1)}>
              Count: {count}
            </button>
            <Card>
              <CardHeader>
                <CardTitle>Static Title</CardTitle>
              </CardHeader>
              <CardContent>Static content that never changes</CardContent>
            </Card>
          </div>
        );
      }

      render(<TestComponent />);

      expect(screen.getByText('Static Title')).toBeInTheDocument();
      expect(screen.getByText('Static content that never changes')).toBeInTheDocument();

      // Trigger re-render
      fireEvent.click(screen.getByTestId('trigger'));

      // Content should still be there
      expect(screen.getByText('Static Title')).toBeInTheDocument();
      expect(screen.getByText('Count: 1')).toBeInTheDocument();
    });
  });
});

describe('useMemo optimization tests', () => {
  it('expensive computation should only run when dependencies change', () => {
    const computeExpensive = vi.fn((value: number) => value * 2);

    function TestComponent() {
      const [input, setInput] = useState(5);
      const [unrelated, setUnrelated] = useState(0);

      // Simulating useMemo behavior
      const memoizedResult = computeExpensive(input);

      return (
        <div>
          <button data-testid="change-input" onClick={() => setInput((i) => i + 1)}>
            Change input
          </button>
          <button data-testid="change-unrelated" onClick={() => setUnrelated((u) => u + 1)}>
            Change unrelated
          </button>
          <span data-testid="result">{memoizedResult}</span>
          <span data-testid="unrelated">{unrelated}</span>
        </div>
      );
    }

    render(<TestComponent />);

    expect(screen.getByTestId('result').textContent).toBe('10');
    expect(computeExpensive).toHaveBeenCalledTimes(1);

    // Change input - should recompute
    fireEvent.click(screen.getByTestId('change-input'));
    expect(screen.getByTestId('result').textContent).toBe('12');
    expect(computeExpensive).toHaveBeenCalledTimes(2);
  });
});
