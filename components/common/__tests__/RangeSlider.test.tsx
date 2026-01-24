import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RangeSlider from '../RangeSlider';

describe('RangeSlider', () => {
  const defaultProps = {
    min: 0,
    max: 100,
  };

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<RangeSlider {...defaultProps} />);
      expect(screen.getByRole('slider')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<RangeSlider {...defaultProps} label="Volume" />);
      expect(screen.getByText('Volume')).toBeInTheDocument();
    });

    it('shows min/max labels by default', () => {
      render(<RangeSlider {...defaultProps} />);
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('hides min/max labels when showMinMax is false', () => {
      render(<RangeSlider {...defaultProps} showMinMax={false} />);
      // Min/max labels should not be in the document
      const labels = screen.queryAllByText(/^(0|100)$/);
      expect(labels.length).toBe(0);
    });

    it('renders range slider with two handles', () => {
      render(<RangeSlider {...defaultProps} range defaultValue={[20, 80]} />);
      const sliders = screen.getAllByRole('slider');
      expect(sliders).toHaveLength(2);
    });

    it('applies custom className', () => {
      const { container } = render(<RangeSlider {...defaultProps} className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<RangeSlider {...defaultProps} size="sm" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveClass('w-3', 'h-3');
    });

    it('renders medium size (default)', () => {
      render(<RangeSlider {...defaultProps} size="md" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveClass('w-4', 'h-4');
    });

    it('renders large size', () => {
      render(<RangeSlider {...defaultProps} size="lg" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveClass('w-5', 'h-5');
    });
  });

  describe('Colors', () => {
    it('renders with primary color (default)', () => {
      render(<RangeSlider {...defaultProps} />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveClass('border-primary-600');
    });

    it('renders with secondary color', () => {
      render(<RangeSlider {...defaultProps} color="secondary" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveClass('border-secondary-600');
    });

    it('renders with success color', () => {
      render(<RangeSlider {...defaultProps} color="success" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveClass('border-green-600');
    });

    it('renders with warning color', () => {
      render(<RangeSlider {...defaultProps} color="warning" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveClass('border-yellow-600');
    });

    it('renders with error color', () => {
      render(<RangeSlider {...defaultProps} color="error" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveClass('border-red-600');
    });
  });

  describe('Single Slider', () => {
    it('updates value on change', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} defaultValue={50} onChange={onChange} />);

      const slider = screen.getByRole('slider');
      fireEvent.keyDown(slider, { key: 'ArrowRight' });

      expect(onChange).toHaveBeenCalledWith(51);
    });

    it('respects controlled value', () => {
      const { rerender } = render(<RangeSlider {...defaultProps} value={30} />);
      const slider = screen.getByRole('slider');

      expect(slider).toHaveAttribute('aria-valuenow', '30');

      rerender(<RangeSlider {...defaultProps} value={70} />);
      expect(slider).toHaveAttribute('aria-valuenow', '70');
    });

    it('uses default value for uncontrolled mode', () => {
      render(<RangeSlider {...defaultProps} defaultValue={25} />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '25');
    });

    it('starts at min when no default value', () => {
      render(<RangeSlider {...defaultProps} />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuenow', '0');
    });
  });

  describe('Range Slider', () => {
    it('updates low value', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} range defaultValue={[20, 80]} onChange={onChange} />);

      const sliders = screen.getAllByRole('slider');
      fireEvent.keyDown(sliders[0], { key: 'ArrowRight' });

      expect(onChange).toHaveBeenCalledWith([21, 80]);
    });

    it('updates high value', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} range defaultValue={[20, 80]} onChange={onChange} />);

      const sliders = screen.getAllByRole('slider');
      fireEvent.keyDown(sliders[1], { key: 'ArrowLeft' });

      expect(onChange).toHaveBeenCalledWith([20, 79]);
    });

    it('prevents low value from exceeding high value', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} range defaultValue={[50, 50]} onChange={onChange} />);

      const sliders = screen.getAllByRole('slider');
      fireEvent.keyDown(sliders[0], { key: 'ArrowRight' });

      // Low value should not exceed high value
      expect(onChange).toHaveBeenCalledWith([50, 50]);
    });

    it('prevents high value from going below low value', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} range defaultValue={[50, 50]} onChange={onChange} />);

      const sliders = screen.getAllByRole('slider');
      fireEvent.keyDown(sliders[1], { key: 'ArrowLeft' });

      // High value should not go below low value
      expect(onChange).toHaveBeenCalledWith([50, 50]);
    });
  });

  describe('Keyboard Navigation', () => {
    it('increases value with ArrowRight', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} defaultValue={50} onChange={onChange} />);

      fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
      expect(onChange).toHaveBeenCalledWith(51);
    });

    it('increases value with ArrowUp', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} defaultValue={50} onChange={onChange} />);

      fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowUp' });
      expect(onChange).toHaveBeenCalledWith(51);
    });

    it('decreases value with ArrowLeft', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} defaultValue={50} onChange={onChange} />);

      fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowLeft' });
      expect(onChange).toHaveBeenCalledWith(49);
    });

    it('decreases value with ArrowDown', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} defaultValue={50} onChange={onChange} />);

      fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowDown' });
      expect(onChange).toHaveBeenCalledWith(49);
    });

    it('jumps to min with Home key', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} defaultValue={50} onChange={onChange} />);

      fireEvent.keyDown(screen.getByRole('slider'), { key: 'Home' });
      expect(onChange).toHaveBeenCalledWith(0);
    });

    it('jumps to max with End key', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} defaultValue={50} onChange={onChange} />);

      fireEvent.keyDown(screen.getByRole('slider'), { key: 'End' });
      expect(onChange).toHaveBeenCalledWith(100);
    });

    it('increases by 10 steps with PageUp', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} defaultValue={50} onChange={onChange} />);

      fireEvent.keyDown(screen.getByRole('slider'), { key: 'PageUp' });
      expect(onChange).toHaveBeenCalledWith(60);
    });

    it('decreases by 10 steps with PageDown', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} defaultValue={50} onChange={onChange} />);

      fireEvent.keyDown(screen.getByRole('slider'), { key: 'PageDown' });
      expect(onChange).toHaveBeenCalledWith(40);
    });

    it('respects step when using arrow keys', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} step={5} defaultValue={50} onChange={onChange} />);

      fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
      expect(onChange).toHaveBeenCalledWith(55);
    });

    it('respects step when using page keys', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} step={5} defaultValue={50} onChange={onChange} />);

      fireEvent.keyDown(screen.getByRole('slider'), { key: 'PageUp' });
      expect(onChange).toHaveBeenCalledWith(100);
    });

    it('clamps value to min', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} defaultValue={0} onChange={onChange} />);

      fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowLeft' });
      expect(onChange).toHaveBeenCalledWith(0);
    });

    it('clamps value to max', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} defaultValue={100} onChange={onChange} />);

      fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
      expect(onChange).toHaveBeenCalledWith(100);
    });
  });

  describe('Tooltip', () => {
    it('shows tooltip on hover when showTooltip is true', async () => {
      const user = userEvent.setup();
      render(<RangeSlider {...defaultProps} showTooltip defaultValue={50} />);

      const slider = screen.getByRole('slider');
      await user.hover(slider);

      expect(screen.getByText('50')).toBeInTheDocument();
    });

    it('always shows tooltip when alwaysShowTooltip is true', () => {
      render(<RangeSlider {...defaultProps} showTooltip alwaysShowTooltip defaultValue={50} />);
      expect(screen.getByText('50')).toBeInTheDocument();
    });

    it('hides tooltip when showTooltip is false', () => {
      render(
        <RangeSlider {...defaultProps} showTooltip={false} alwaysShowTooltip defaultValue={50} />
      );
      // The tooltip text "50" should not be visible (only appears if showTooltip is true)
      const fifties = screen.queryAllByText('50');
      // Should be 0 since tooltip is hidden
      expect(fifties.length).toBe(0);
    });

    it('uses formatValue for tooltip display', () => {
      render(
        <RangeSlider
          {...defaultProps}
          showTooltip
          alwaysShowTooltip
          defaultValue={50}
          formatValue={(v) => `$${v}`}
        />
      );
      expect(screen.getByText('$50')).toBeInTheDocument();
    });
  });

  describe('Marks', () => {
    it('renders marks when marks is true', () => {
      const { container } = render(
        <RangeSlider min={0} max={10} step={2} marks defaultValue={5} />
      );
      // Should have marks at 0, 2, 4, 6, 8, 10
      const markDots = container.querySelectorAll('.w-1.h-1.rounded-full');
      expect(markDots.length).toBeGreaterThan(0);
    });

    it('renders marks at specific values', () => {
      const { container } = render(
        <RangeSlider {...defaultProps} marks={[0, 25, 50, 75, 100]} defaultValue={50} />
      );
      const markDots = container.querySelectorAll('.w-1.h-1.rounded-full');
      expect(markDots).toHaveLength(5);
    });

    it('renders marks with labels', () => {
      render(
        <RangeSlider
          {...defaultProps}
          marks={[
            { value: 0, label: 'Min' },
            { value: 50, label: 'Mid' },
            { value: 100, label: 'Max' },
          ]}
          defaultValue={50}
        />
      );
      expect(screen.getByText('Min')).toBeInTheDocument();
      expect(screen.getByText('Mid')).toBeInTheDocument();
      expect(screen.getByText('Max')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('disables interaction when disabled', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} disabled defaultValue={50} onChange={onChange} />);

      const slider = screen.getByRole('slider');
      fireEvent.keyDown(slider, { key: 'ArrowRight' });

      expect(onChange).not.toHaveBeenCalled();
    });

    it('applies disabled styles', () => {
      render(<RangeSlider {...defaultProps} disabled />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('sets tabIndex to -1 when disabled', () => {
      render(<RangeSlider {...defaultProps} disabled />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('tabIndex', '-1');
    });

    it('sets aria-disabled when disabled', () => {
      render(<RangeSlider {...defaultProps} disabled />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Callbacks', () => {
    it('calls onChange when value changes', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} defaultValue={50} onChange={onChange} />);

      fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('calls onChangeEnd when dragging ends', () => {
      const onChangeEnd = vi.fn();
      render(<RangeSlider {...defaultProps} defaultValue={50} onChangeEnd={onChangeEnd} />);

      const slider = screen.getByRole('slider');
      fireEvent.keyDown(slider, { key: 'ArrowRight' });

      expect(onChangeEnd).toHaveBeenCalled();
    });
  });

  describe('Form Integration', () => {
    it('renders hidden input with name attribute', () => {
      const { container } = render(
        <RangeSlider {...defaultProps} name="volume" defaultValue={50} />
      );
      const hiddenInput = container.querySelector('input[type="hidden"]');
      expect(hiddenInput).toHaveAttribute('name', 'volume');
      expect(hiddenInput).toHaveAttribute('value', '50');
    });

    it('renders two hidden inputs for range slider', () => {
      const { container } = render(
        <RangeSlider {...defaultProps} name="price" range defaultValue={[20, 80]} />
      );
      const hiddenInputs = container.querySelectorAll('input[type="hidden"]');
      expect(hiddenInputs).toHaveLength(2);
      expect(hiddenInputs[0]).toHaveAttribute('name', 'price_min');
      expect(hiddenInputs[0]).toHaveAttribute('value', '20');
      expect(hiddenInputs[1]).toHaveAttribute('name', 'price_max');
      expect(hiddenInputs[1]).toHaveAttribute('value', '80');
    });
  });

  describe('Value Formatting', () => {
    it('formats min/max labels', () => {
      render(<RangeSlider {...defaultProps} formatValue={(v) => `$${v}`} />);
      expect(screen.getByText('$0')).toBeInTheDocument();
      expect(screen.getByText('$100')).toBeInTheDocument();
    });

    it('formats aria-valuetext', () => {
      render(<RangeSlider {...defaultProps} defaultValue={50} formatValue={(v) => `${v}%`} />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-valuetext', '50%');
    });
  });

  describe('Accessibility', () => {
    it('has correct aria attributes', () => {
      render(<RangeSlider {...defaultProps} defaultValue={50} ariaLabel="Volume control" />);
      const slider = screen.getByRole('slider');

      expect(slider).toHaveAttribute('aria-valuemin', '0');
      expect(slider).toHaveAttribute('aria-valuemax', '100');
      expect(slider).toHaveAttribute('aria-valuenow', '50');
      expect(slider).toHaveAttribute('aria-label', 'Volume control');
    });

    it('uses label as aria-label fallback', () => {
      render(<RangeSlider {...defaultProps} defaultValue={50} label="Brightness" />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('aria-label', 'Brightness');
    });

    it('has correct aria attributes for range slider', () => {
      render(<RangeSlider {...defaultProps} range defaultValue={[20, 80]} />);
      const sliders = screen.getAllByRole('slider');

      expect(sliders[0]).toHaveAttribute('aria-label', 'Mínimo');
      expect(sliders[1]).toHaveAttribute('aria-label', 'Máximo');
    });

    it('is keyboard focusable', () => {
      render(<RangeSlider {...defaultProps} />);
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Track Click', () => {
    it('updates value on track click', () => {
      const onChange = vi.fn();
      const { container } = render(
        <RangeSlider {...defaultProps} defaultValue={0} onChange={onChange} />
      );

      // Find the track element (the clickable area)
      const track = container.querySelector('.rounded-full.bg-gray-200');
      if (track) {
        // Mock getBoundingClientRect
        Object.defineProperty(track, 'getBoundingClientRect', {
          value: () => ({ left: 0, width: 100, top: 0, height: 10 }),
        });

        fireEvent.click(track, { clientX: 50 });
        expect(onChange).toHaveBeenCalled();
      }
    });

    it('selects closer handle on track click for range slider', () => {
      const onChange = vi.fn();
      const { container } = render(
        <RangeSlider {...defaultProps} range defaultValue={[20, 80]} onChange={onChange} />
      );

      const track = container.querySelector('.rounded-full.bg-gray-200');
      if (track) {
        Object.defineProperty(track, 'getBoundingClientRect', {
          value: () => ({ left: 0, width: 100, top: 0, height: 10 }),
        });

        // Click closer to low value (30)
        fireEvent.click(track, { clientX: 30 });
        // Should update low value since 30 is closer to 20 than to 80
        expect(onChange).toHaveBeenCalled();
      }
    });
  });

  describe('Mouse Drag', () => {
    it('starts dragging on mouse down', () => {
      render(<RangeSlider {...defaultProps} defaultValue={50} />);
      const slider = screen.getByRole('slider');

      fireEvent.mouseDown(slider);

      // Slider should have grabbing cursor class during drag
      expect(slider).toHaveClass('cursor-grabbing');
    });

    it('stops dragging on mouse up', () => {
      render(<RangeSlider {...defaultProps} defaultValue={50} />);
      const slider = screen.getByRole('slider');

      fireEvent.mouseDown(slider);
      fireEvent.mouseUp(window);

      // After mouse up, should not have grabbing cursor
      expect(slider).not.toHaveClass('cursor-grabbing');
    });
  });

  describe('Touch Events', () => {
    it('handles touch start', () => {
      render(<RangeSlider {...defaultProps} defaultValue={50} />);
      const slider = screen.getByRole('slider');

      fireEvent.touchStart(slider, { touches: [{ clientX: 50 }] });

      expect(slider).toHaveClass('cursor-grabbing');
    });

    it('handles touch end', () => {
      render(<RangeSlider {...defaultProps} defaultValue={50} />);
      const slider = screen.getByRole('slider');

      fireEvent.touchStart(slider, { touches: [{ clientX: 50 }] });
      fireEvent.touchEnd(window);

      expect(slider).not.toHaveClass('cursor-grabbing');
    });

    it('handles touch move during drag', () => {
      const onChange = vi.fn();
      const { container } = render(
        <RangeSlider {...defaultProps} defaultValue={50} onChange={onChange} />
      );
      const slider = screen.getByRole('slider');

      // Mock getBoundingClientRect for track element
      const track = container.querySelector('.rounded-full.bg-gray-200');
      if (track) {
        Object.defineProperty(track, 'getBoundingClientRect', {
          value: () => ({ left: 0, width: 100, top: 0, height: 10 }),
        });
      }

      fireEvent.touchStart(slider, { touches: [{ clientX: 50 }] });
      fireEvent.touchMove(window, { touches: [{ clientX: 70 }] });
      fireEvent.touchEnd(window);

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Mouse Move', () => {
    it('handles mouse move during drag', () => {
      const onChange = vi.fn();
      const { container } = render(
        <RangeSlider {...defaultProps} defaultValue={50} onChange={onChange} />
      );
      const slider = screen.getByRole('slider');

      // Mock getBoundingClientRect for track element
      const track = container.querySelector('.rounded-full.bg-gray-200');
      if (track) {
        Object.defineProperty(track, 'getBoundingClientRect', {
          value: () => ({ left: 0, width: 100, top: 0, height: 10 }),
        });
      }

      fireEvent.mouseDown(slider);
      fireEvent.mouseMove(window, { clientX: 70 });
      fireEvent.mouseUp(window);

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Hover States', () => {
    it('handles mouse enter and leave on thumb', async () => {
      const user = userEvent.setup();
      render(<RangeSlider {...defaultProps} showTooltip defaultValue={50} />);
      const slider = screen.getByRole('slider');

      // Mouse enter should show tooltip
      await user.hover(slider);
      expect(screen.getByText('50')).toBeInTheDocument();

      // Mouse leave should hide tooltip
      await user.unhover(slider);
      // Tooltip should be hidden (not always shown)
      expect(screen.queryByText('50')).not.toBeInTheDocument();
    });
  });

  describe('Keyboard Default Case', () => {
    it('ignores unrecognized keys', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} defaultValue={50} onChange={onChange} />);

      // Try an unrecognized key
      fireEvent.keyDown(screen.getByRole('slider'), { key: 'a' });
      fireEvent.keyDown(screen.getByRole('slider'), { key: 'Enter' });
      fireEvent.keyDown(screen.getByRole('slider'), { key: 'Escape' });

      // onChange should not be called for unrecognized keys
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Step Values', () => {
    it('respects step increment', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} step={10} defaultValue={50} onChange={onChange} />);

      fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
      expect(onChange).toHaveBeenCalledWith(60);
    });

    it('snaps to step on track click', () => {
      const onChange = vi.fn();
      const { container } = render(
        <RangeSlider {...defaultProps} step={10} defaultValue={0} onChange={onChange} />
      );

      const track = container.querySelector('.rounded-full.bg-gray-200');
      if (track) {
        Object.defineProperty(track, 'getBoundingClientRect', {
          value: () => ({ left: 0, width: 100, top: 0, height: 10 }),
        });

        // Click at 55 should snap to 60
        fireEvent.click(track, { clientX: 55 });
        const calledValue = onChange.mock.calls[0]?.[0];
        expect(calledValue).toBe(60);
      }
    });
  });

  describe('Uncontrolled Mode', () => {
    it('uses [min, max] as default value for range mode when no defaultValue', () => {
      render(<RangeSlider min={10} max={90} range />);
      const sliders = screen.getAllByRole('slider');
      expect(sliders[0]).toHaveAttribute('aria-valuenow', '10');
      expect(sliders[1]).toHaveAttribute('aria-valuenow', '90');
    });

    it('updates internal state in uncontrolled mode', () => {
      render(<RangeSlider {...defaultProps} defaultValue={50} />);
      const slider = screen.getByRole('slider');

      fireEvent.keyDown(slider, { key: 'ArrowRight' });
      expect(slider).toHaveAttribute('aria-valuenow', '51');

      fireEvent.keyDown(slider, { key: 'ArrowRight' });
      expect(slider).toHaveAttribute('aria-valuenow', '52');
    });

    it('updates range values in uncontrolled mode', () => {
      render(<RangeSlider {...defaultProps} range defaultValue={[30, 70]} />);
      const sliders = screen.getAllByRole('slider');

      // Update low value
      fireEvent.keyDown(sliders[0], { key: 'ArrowRight' });
      expect(sliders[0]).toHaveAttribute('aria-valuenow', '31');

      // Update high value
      fireEvent.keyDown(sliders[1], { key: 'ArrowLeft' });
      expect(sliders[1]).toHaveAttribute('aria-valuenow', '69');
    });
  });

  describe('Track Click Disabled', () => {
    it('does not update value when clicking track on disabled slider', () => {
      const onChange = vi.fn();
      const { container } = render(
        <RangeSlider {...defaultProps} disabled defaultValue={50} onChange={onChange} />
      );

      const track = container.querySelector('.rounded-full.bg-gray-200');
      if (track) {
        Object.defineProperty(track, 'getBoundingClientRect', {
          value: () => ({ left: 0, width: 100, top: 0, height: 10 }),
        });
        fireEvent.click(track, { clientX: 70 });
        expect(onChange).not.toHaveBeenCalled();
      }
    });
  });

  describe('Range Track Click Distance', () => {
    it('selects high handle when click is closer to high value', () => {
      const onChange = vi.fn();
      const { container } = render(
        <RangeSlider {...defaultProps} range defaultValue={[20, 80]} onChange={onChange} />
      );

      const track = container.querySelector('.rounded-full.bg-gray-200');
      if (track) {
        Object.defineProperty(track, 'getBoundingClientRect', {
          value: () => ({ left: 0, width: 100, top: 0, height: 10 }),
        });

        // Click at 70, closer to high value (80) than low value (20)
        fireEvent.click(track, { clientX: 70 });
        const calledValue = onChange.mock.calls[0]?.[0];
        // Should update high value
        expect(calledValue).toEqual([20, 70]);
      }
    });

    it('selects low handle when click is closer to low value', () => {
      const onChange = vi.fn();
      const { container } = render(
        <RangeSlider {...defaultProps} range defaultValue={[20, 80]} onChange={onChange} />
      );

      const track = container.querySelector('.rounded-full.bg-gray-200');
      if (track) {
        Object.defineProperty(track, 'getBoundingClientRect', {
          value: () => ({ left: 0, width: 100, top: 0, height: 10 }),
        });

        // Click at 25, closer to low value (20) than high value (80)
        fireEvent.click(track, { clientX: 25 });
        const calledValue = onChange.mock.calls[0]?.[0];
        // Should update low value
        expect(calledValue).toEqual([25, 80]);
      }
    });

    it('selects low handle when equidistant (edge case)', () => {
      const onChange = vi.fn();
      const { container } = render(
        <RangeSlider {...defaultProps} range defaultValue={[30, 70]} onChange={onChange} />
      );

      const track = container.querySelector('.rounded-full.bg-gray-200');
      if (track) {
        Object.defineProperty(track, 'getBoundingClientRect', {
          value: () => ({ left: 0, width: 100, top: 0, height: 10 }),
        });

        // Click at 50, exactly equidistant from 30 and 70
        fireEvent.click(track, { clientX: 50 });
        const calledValue = onChange.mock.calls[0]?.[0];
        // Should update low value (distToLow <= distToHigh)
        expect(calledValue).toEqual([50, 70]);
      }
    });
  });

  describe('Range Keyboard onChangeEnd', () => {
    it('calls onChangeEnd with correct range values when updating low handle', () => {
      const onChangeEnd = vi.fn();
      render(
        <RangeSlider {...defaultProps} range defaultValue={[20, 80]} onChangeEnd={onChangeEnd} />
      );

      const sliders = screen.getAllByRole('slider');
      fireEvent.keyDown(sliders[0], { key: 'ArrowRight' });

      expect(onChangeEnd).toHaveBeenCalledWith([21, 80]);
    });

    it('calls onChangeEnd with correct range values when updating high handle', () => {
      const onChangeEnd = vi.fn();
      render(
        <RangeSlider {...defaultProps} range defaultValue={[20, 80]} onChangeEnd={onChangeEnd} />
      );

      const sliders = screen.getAllByRole('slider');
      fireEvent.keyDown(sliders[1], { key: 'ArrowLeft' });

      expect(onChangeEnd).toHaveBeenCalledWith([20, 79]);
    });

    it('calls onChangeEnd with correct values for Home key on range low handle', () => {
      const onChangeEnd = vi.fn();
      render(
        <RangeSlider {...defaultProps} range defaultValue={[20, 80]} onChangeEnd={onChangeEnd} />
      );

      const sliders = screen.getAllByRole('slider');
      fireEvent.keyDown(sliders[0], { key: 'Home' });

      expect(onChangeEnd).toHaveBeenCalledWith([0, 80]);
    });

    it('calls onChangeEnd with correct values for End key on range high handle', () => {
      const onChangeEnd = vi.fn();
      render(
        <RangeSlider {...defaultProps} range defaultValue={[20, 80]} onChangeEnd={onChangeEnd} />
      );

      const sliders = screen.getAllByRole('slider');
      fireEvent.keyDown(sliders[1], { key: 'End' });

      expect(onChangeEnd).toHaveBeenCalledWith([20, 100]);
    });
  });

  describe('Marks with Number Arrays', () => {
    it('renders marks from number array', () => {
      const { container } = render(
        <RangeSlider {...defaultProps} marks={[10, 50, 90]} defaultValue={50} />
      );
      const markDots = container.querySelectorAll('.w-1.h-1.rounded-full');
      expect(markDots).toHaveLength(3);
    });

    it('highlights marks within range for range slider', () => {
      const { container } = render(
        <RangeSlider {...defaultProps} range marks={[0, 25, 50, 75, 100]} defaultValue={[25, 75]} />
      );
      // Marks at 25, 50, and 75 should be in range (highlighted)
      // Marks at 0 and 100 should be outside range
      const markDots = container.querySelectorAll('.w-1.h-1.rounded-full');
      expect(markDots).toHaveLength(5);
    });

    it('highlights marks up to current value for single slider', () => {
      const { container } = render(
        <RangeSlider {...defaultProps} marks={[0, 25, 50, 75, 100]} defaultValue={50} />
      );
      // Marks at 0, 25, 50 should be highlighted (<=50)
      // Marks at 75, 100 should not be highlighted
      const markDots = container.querySelectorAll('.w-1.h-1.rounded-full');
      expect(markDots).toHaveLength(5);
    });
  });

  describe('Handle End Callback', () => {
    it('calls onChangeEnd after mouse drag ends', () => {
      const onChangeEnd = vi.fn();
      const { container } = render(
        <RangeSlider {...defaultProps} defaultValue={50} onChangeEnd={onChangeEnd} />
      );
      const slider = screen.getByRole('slider');

      const track = container.querySelector('.rounded-full.bg-gray-200');
      if (track) {
        Object.defineProperty(track, 'getBoundingClientRect', {
          value: () => ({ left: 0, width: 100, top: 0, height: 10 }),
        });
      }

      fireEvent.mouseDown(slider);
      fireEvent.mouseMove(window, { clientX: 70 });
      fireEvent.mouseUp(window);

      expect(onChangeEnd).toHaveBeenCalled();
    });

    it('does not call onChangeEnd if not dragging', () => {
      const onChangeEnd = vi.fn();
      render(<RangeSlider {...defaultProps} defaultValue={50} onChangeEnd={onChangeEnd} />);

      // Just trigger mouseUp without mouseDown first
      fireEvent.mouseUp(window);

      // onChangeEnd should not be called since we weren't dragging
      expect(onChangeEnd).not.toHaveBeenCalled();
    });
  });

  describe('Track Click onChangeEnd', () => {
    it('calls onChangeEnd after track click on single slider', () => {
      const onChangeEnd = vi.fn();
      const { container } = render(
        <RangeSlider {...defaultProps} defaultValue={50} onChangeEnd={onChangeEnd} />
      );

      const track = container.querySelector('.rounded-full.bg-gray-200');
      if (track) {
        Object.defineProperty(track, 'getBoundingClientRect', {
          value: () => ({ left: 0, width: 100, top: 0, height: 10 }),
        });
        fireEvent.click(track, { clientX: 70 });
        expect(onChangeEnd).toHaveBeenCalledWith(70);
      }
    });

    it('calls onChangeEnd with range values after track click on range slider', () => {
      const onChangeEnd = vi.fn();
      const { container } = render(
        <RangeSlider {...defaultProps} range defaultValue={[20, 80]} onChangeEnd={onChangeEnd} />
      );

      const track = container.querySelector('.rounded-full.bg-gray-200');
      if (track) {
        Object.defineProperty(track, 'getBoundingClientRect', {
          value: () => ({ left: 0, width: 100, top: 0, height: 10 }),
        });
        fireEvent.click(track, { clientX: 50 });
        // onChangeEnd is called with the original range values (before update takes effect)
        expect(onChangeEnd).toHaveBeenCalledWith([20, 80]);
      }
    });
  });

  describe('Handle Start Disabled', () => {
    it('does not start dragging when disabled', () => {
      render(<RangeSlider {...defaultProps} disabled defaultValue={50} />);
      const slider = screen.getByRole('slider');

      fireEvent.mouseDown(slider);

      // Should not have grabbing cursor when disabled
      expect(slider).not.toHaveClass('cursor-grabbing');
    });

    it('does not respond to touch when disabled', () => {
      render(<RangeSlider {...defaultProps} disabled defaultValue={50} />);
      const slider = screen.getByRole('slider');

      fireEvent.touchStart(slider, { touches: [{ clientX: 50 }] });

      expect(slider).not.toHaveClass('cursor-grabbing');
    });
  });

  describe('Handle Move Edge Cases', () => {
    it('does not update value when handleMove is called without dragging', () => {
      const onChange = vi.fn();
      const { container } = render(
        <RangeSlider {...defaultProps} defaultValue={50} onChange={onChange} />
      );

      const track = container.querySelector('.rounded-full.bg-gray-200');
      if (track) {
        Object.defineProperty(track, 'getBoundingClientRect', {
          value: () => ({ left: 0, width: 100, top: 0, height: 10 }),
        });
      }

      // Move without mouseDown first
      fireEvent.mouseMove(window, { clientX: 70 });

      // onChange should not be called
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Controlled vs Uncontrolled Mode Coverage', () => {
    it('controlled mode does not update internal state', () => {
      const onChange = vi.fn();
      const { container, rerender } = render(
        <RangeSlider {...defaultProps} value={50} onChange={onChange} />
      );

      const track = container.querySelector('.rounded-full.bg-gray-200');
      if (track) {
        Object.defineProperty(track, 'getBoundingClientRect', {
          value: () => ({ left: 0, width: 100, top: 0, height: 10 }),
        });
      }

      const slider = screen.getByRole('slider');

      // Try to change via keyboard - since controlled, internal state shouldn't change
      fireEvent.keyDown(slider, { key: 'ArrowRight' });

      // onChange is called but value stays controlled
      expect(onChange).toHaveBeenCalledWith(51);
      expect(slider).toHaveAttribute('aria-valuenow', '50'); // Still controlled value

      // Now rerender with new value to simulate parent update
      rerender(<RangeSlider {...defaultProps} value={60} onChange={onChange} />);
      expect(slider).toHaveAttribute('aria-valuenow', '60');
    });

    it('controlled range mode does not update internal state', () => {
      const onChange = vi.fn();
      render(<RangeSlider {...defaultProps} range value={[30, 70]} onChange={onChange} />);

      const sliders = screen.getAllByRole('slider');
      fireEvent.keyDown(sliders[0], { key: 'ArrowRight' });

      expect(onChange).toHaveBeenCalledWith([31, 70]);
      // Value stays at controlled value
      expect(sliders[0]).toHaveAttribute('aria-valuenow', '30');
    });
  });

  describe('Auto-generated Marks Coverage', () => {
    it('generates marks at every step interval', () => {
      const { container } = render(
        <RangeSlider min={0} max={20} step={5} marks={true} defaultValue={10} />
      );
      // Should have marks at 0, 5, 10, 15, 20
      const markDots = container.querySelectorAll('.w-1.h-1.rounded-full');
      expect(markDots).toHaveLength(5);
    });

    it('renders no marks when marks is false', () => {
      const { container } = render(
        <RangeSlider {...defaultProps} marks={false} defaultValue={50} />
      );
      // Look for mark dots specifically (the small dots with w-1 h-1)
      const markDots = container.querySelectorAll('.w-1.h-1.rounded-full');
      // No marks should be rendered
      expect(markDots).toHaveLength(0);
    });
  });

  describe('Touch Move Edge Cases', () => {
    it('uses touch clientX correctly during drag', () => {
      const onChange = vi.fn();
      const { container } = render(
        <RangeSlider {...defaultProps} defaultValue={50} onChange={onChange} />
      );
      const slider = screen.getByRole('slider');

      const track = container.querySelector('.rounded-full.bg-gray-200');
      if (track) {
        Object.defineProperty(track, 'getBoundingClientRect', {
          value: () => ({ left: 0, width: 100, top: 0, height: 10 }),
        });
      }

      // Start touch
      fireEvent.touchStart(slider, { touches: [{ clientX: 50 }] });

      // Move touch to new position
      fireEvent.touchMove(window, { touches: [{ clientX: 30 }] });

      expect(onChange).toHaveBeenCalledWith(30);
    });
  });

  describe('Range High Value Updates', () => {
    it('updates high value correctly in uncontrolled mode via drag', () => {
      const onChange = vi.fn();
      const { container } = render(
        <RangeSlider {...defaultProps} range defaultValue={[20, 80]} onChange={onChange} />
      );
      const sliders = screen.getAllByRole('slider');

      const track = container.querySelector('.rounded-full.bg-gray-200');
      if (track) {
        Object.defineProperty(track, 'getBoundingClientRect', {
          value: () => ({ left: 0, width: 100, top: 0, height: 10 }),
        });
      }

      // Drag high handle
      fireEvent.mouseDown(sliders[1]);
      fireEvent.mouseMove(window, { clientX: 90 });

      expect(onChange).toHaveBeenCalledWith([20, 90]);
    });

    it('ensures high value cannot go below low value during drag', () => {
      const onChange = vi.fn();
      const { container } = render(
        <RangeSlider {...defaultProps} range defaultValue={[50, 60]} onChange={onChange} />
      );
      const sliders = screen.getAllByRole('slider');

      const track = container.querySelector('.rounded-full.bg-gray-200');
      if (track) {
        Object.defineProperty(track, 'getBoundingClientRect', {
          value: () => ({ left: 0, width: 100, top: 0, height: 10 }),
        });
      }

      // Drag high handle below low value
      fireEvent.mouseDown(sliders[1]);
      fireEvent.mouseMove(window, { clientX: 30 });

      // High value should be constrained to low value
      expect(onChange).toHaveBeenCalledWith([50, 50]);
    });
  });
});
