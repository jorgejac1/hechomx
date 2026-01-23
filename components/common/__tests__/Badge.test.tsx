import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Badge from '../Badge';
import { Check } from 'lucide-react';

describe('Badge', () => {
  // Helper to get the badge container (outer element)
  const getBadgeContainer = (text: string) => {
    const textElement = screen.getByText(text);
    // The text is wrapped in a span inside the badge container
    // Structure: <span|button className={styles}><span>{text}</span></span|button>
    return textElement.parentElement as HTMLElement;
  };

  describe('Rendering', () => {
    it('should render children text', () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('should render as span by default', () => {
      const { container } = render(<Badge>Badge</Badge>);
      expect(container.firstChild?.nodeName).toBe('SPAN');
    });

    it('should render as button when onClick is provided', () => {
      render(<Badge onClick={() => {}}>Clickable</Badge>);
      const badge = screen.getByRole('button');
      expect(badge).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should apply primary variant styles', () => {
      render(<Badge variant="primary">Primary</Badge>);
      const badge = getBadgeContainer('Primary');
      expect(badge).toHaveClass('bg-primary-600', 'text-white');
    });

    it('should apply success variant styles', () => {
      render(<Badge variant="success">Success</Badge>);
      const badge = getBadgeContainer('Success');
      expect(badge).toHaveClass('bg-green-100', 'text-green-800');
    });

    it('should apply warning variant styles', () => {
      render(<Badge variant="warning">Warning</Badge>);
      const badge = getBadgeContainer('Warning');
      expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800');
    });

    it('should apply danger variant styles', () => {
      render(<Badge variant="danger">Danger</Badge>);
      const badge = getBadgeContainer('Danger');
      expect(badge).toHaveClass('bg-red-100', 'text-red-800');
    });

    it('should apply info variant styles', () => {
      render(<Badge variant="info">Info</Badge>);
      const badge = getBadgeContainer('Info');
      expect(badge).toHaveClass('bg-blue-100', 'text-blue-800');
    });

    it('should apply neutral variant styles by default', () => {
      render(<Badge>Neutral</Badge>);
      const badge = getBadgeContainer('Neutral');
      expect(badge).toHaveClass('bg-gray-100', 'text-gray-800');
    });

    it('should apply category variant styles', () => {
      render(<Badge variant="category">Category</Badge>);
      const badge = getBadgeContainer('Category');
      expect(badge).toHaveClass('bg-purple-100', 'text-purple-800');
    });
  });

  describe('Sizes', () => {
    it('should apply small size styles', () => {
      render(<Badge size="sm">Small</Badge>);
      const badge = getBadgeContainer('Small');
      expect(badge).toHaveClass('px-2', 'text-xs');
    });

    it('should apply medium size styles by default', () => {
      render(<Badge>Medium</Badge>);
      const badge = getBadgeContainer('Medium');
      expect(badge).toHaveClass('px-3', 'py-1', 'text-sm');
    });

    it('should apply large size styles', () => {
      render(<Badge size="lg">Large</Badge>);
      const badge = getBadgeContainer('Large');
      expect(badge).toHaveClass('px-4', 'text-base');
    });
  });

  describe('Rounded', () => {
    it('should apply full rounded styles by default', () => {
      render(<Badge>Full</Badge>);
      const badge = getBadgeContainer('Full');
      expect(badge).toHaveClass('rounded-full');
    });

    it('should apply default rounded styles', () => {
      render(<Badge rounded="default">Default</Badge>);
      const badge = getBadgeContainer('Default');
      expect(badge).toHaveClass('rounded-lg');
    });

    it('should apply no rounded styles', () => {
      render(<Badge rounded="none">None</Badge>);
      const badge = getBadgeContainer('None');
      expect(badge).toHaveClass('rounded-none');
    });
  });

  describe('Icons', () => {
    it('should render icon on the left by default', () => {
      render(<Badge icon={<Check data-testid="icon" />}>With Icon</Badge>);
      const icon = screen.getByTestId('icon');
      const text = screen.getByText('With Icon');
      expect(icon.parentElement?.nextSibling).toBe(text);
    });

    it('should render icon on the right when iconPosition is right', () => {
      render(
        <Badge icon={<Check data-testid="icon" />} iconPosition="right">
          With Icon
        </Badge>
      );
      const icon = screen.getByTestId('icon');
      const text = screen.getByText('With Icon');
      expect(text.nextSibling?.firstChild).toBe(icon);
    });

    it('should apply correct icon size for small badge', () => {
      render(
        <Badge size="sm" icon={<Check data-testid="icon" />}>
          Small
        </Badge>
      );
      const iconWrapper = screen.getByTestId('icon').parentElement;
      expect(iconWrapper).toHaveClass('w-3', 'h-3');
    });

    it('should apply correct icon size for medium badge', () => {
      render(
        <Badge size="md" icon={<Check data-testid="icon" />}>
          Medium
        </Badge>
      );
      const iconWrapper = screen.getByTestId('icon').parentElement;
      expect(iconWrapper).toHaveClass('w-4', 'h-4');
    });

    it('should apply correct icon size for large badge', () => {
      render(
        <Badge size="lg" icon={<Check data-testid="icon" />}>
          Large
        </Badge>
      );
      const iconWrapper = screen.getByTestId('icon').parentElement;
      expect(iconWrapper).toHaveClass('w-5', 'h-5');
    });
  });

  describe('Interactivity', () => {
    it('should call onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Badge onClick={handleClick}>Clickable</Badge>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should apply hover styles when clickable', () => {
      render(<Badge onClick={() => {}}>Clickable</Badge>);
      const badge = screen.getByRole('button');
      expect(badge).toHaveClass('cursor-pointer');
    });

    it('should not apply hover styles when not clickable', () => {
      render(<Badge>Not Clickable</Badge>);
      const badge = getBadgeContainer('Not Clickable');
      expect(badge).not.toHaveClass('cursor-pointer');
    });
  });

  describe('Removable', () => {
    it('should not show remove button by default', () => {
      render(<Badge>Badge</Badge>);
      expect(screen.queryByRole('button', { name: /eliminar/i })).not.toBeInTheDocument();
    });

    it('should show remove button when removable and onRemove provided', () => {
      render(
        <Badge removable onRemove={() => {}}>
          Removable
        </Badge>
      );
      expect(screen.getByRole('button', { name: /eliminar/i })).toBeInTheDocument();
    });

    it('should not show remove button when only removable is true', () => {
      render(<Badge removable>Removable</Badge>);
      expect(screen.queryByRole('button', { name: /eliminar/i })).not.toBeInTheDocument();
    });

    it('should call onRemove when remove button is clicked', () => {
      const handleRemove = vi.fn();
      render(
        <Badge removable onRemove={handleRemove}>
          Removable
        </Badge>
      );
      fireEvent.click(screen.getByRole('button', { name: /eliminar/i }));
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });

    it('should stop propagation when remove button is clicked', () => {
      const handleClick = vi.fn();
      const handleRemove = vi.fn();
      render(
        <Badge onClick={handleClick} removable onRemove={handleRemove}>
          Removable
        </Badge>
      );
      fireEvent.click(screen.getByRole('button', { name: /eliminar/i }));
      expect(handleRemove).toHaveBeenCalledTimes(1);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should call onRemove when Enter key is pressed on remove button', () => {
      const handleRemove = vi.fn();
      render(
        <Badge removable onRemove={handleRemove}>
          Removable
        </Badge>
      );
      const removeButton = screen.getByRole('button', { name: /eliminar/i });
      fireEvent.keyDown(removeButton, { key: 'Enter' });
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });

    it('should call onRemove when Space key is pressed on remove button', () => {
      const handleRemove = vi.fn();
      render(
        <Badge removable onRemove={handleRemove}>
          Removable
        </Badge>
      );
      const removeButton = screen.getByRole('button', { name: /eliminar/i });
      fireEvent.keyDown(removeButton, { key: ' ' });
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });

    it('should not call onRemove for other keys on remove button', () => {
      const handleRemove = vi.fn();
      render(
        <Badge removable onRemove={handleRemove}>
          Removable
        </Badge>
      );
      const removeButton = screen.getByRole('button', { name: /eliminar/i });
      fireEvent.keyDown(removeButton, { key: 'Escape' });
      fireEvent.keyDown(removeButton, { key: 'Tab' });
      expect(handleRemove).not.toHaveBeenCalled();
    });

    it('should stop propagation on keyboard events', () => {
      const handleClick = vi.fn();
      const handleRemove = vi.fn();
      render(
        <Badge onClick={handleClick} removable onRemove={handleRemove}>
          Removable
        </Badge>
      );
      const removeButton = screen.getByRole('button', { name: /eliminar/i });
      fireEvent.keyDown(removeButton, { key: 'Enter' });
      expect(handleRemove).toHaveBeenCalledTimes(1);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Custom className', () => {
    it('should apply custom className', () => {
      render(<Badge className="custom-class">Custom</Badge>);
      const badge = getBadgeContainer('Custom');
      expect(badge).toHaveClass('custom-class');
    });

    it('should merge custom className with default styles', () => {
      render(
        <Badge className="custom-class" variant="success">
          Custom
        </Badge>
      );
      const badge = getBadgeContainer('Custom');
      expect(badge).toHaveClass('custom-class', 'bg-green-100');
    });
  });

  describe('Accessibility', () => {
    it('should have correct role when clickable', () => {
      render(<Badge onClick={() => {}}>Clickable</Badge>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should have aria-label on remove button', () => {
      render(
        <Badge removable onRemove={() => {}}>
          Badge
        </Badge>
      );
      expect(screen.getByRole('button', { name: /eliminar/i })).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('should have inline-flex display', () => {
      render(<Badge>Badge</Badge>);
      const badge = getBadgeContainer('Badge');
      expect(badge).toHaveClass('inline-flex');
    });

    it('should center items', () => {
      render(<Badge>Badge</Badge>);
      const badge = getBadgeContainer('Badge');
      expect(badge).toHaveClass('items-center', 'justify-center');
    });

    it('should have font-medium', () => {
      render(<Badge>Badge</Badge>);
      const badge = getBadgeContainer('Badge');
      expect(badge).toHaveClass('font-medium');
    });
  });
});
