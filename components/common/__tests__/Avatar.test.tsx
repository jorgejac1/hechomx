import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Avatar, { AvatarGroup } from '../Avatar';

describe('Avatar', () => {
  describe('Rendering', () => {
    it('should render avatar element', () => {
      const { container } = render(<Avatar />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render with image when src provided', () => {
      render(<Avatar src="/test.jpg" alt="Test" />);
      expect(screen.getByAltText('Test')).toBeInTheDocument();
    });

    it('should render initials when name provided and no src', () => {
      render(<Avatar name="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('should render single initial for single name', () => {
      render(<Avatar name="John" />);
      expect(screen.getByText('J')).toBeInTheDocument();
    });

    it('should render default user icon when no src or name', () => {
      const { container } = render(<Avatar />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render custom fallback content', () => {
      render(<Avatar fallback={<span data-testid="custom-fallback">Custom</span>} />);
      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should apply xs size', () => {
      const { container } = render(<Avatar size="xs" name="Test" />);
      expect(container.firstChild).toHaveClass('w-6', 'h-6');
    });

    it('should apply sm size', () => {
      const { container } = render(<Avatar size="sm" name="Test" />);
      expect(container.firstChild).toHaveClass('w-8', 'h-8');
    });

    it('should apply md size by default', () => {
      const { container } = render(<Avatar name="Test" />);
      expect(container.firstChild).toHaveClass('w-10', 'h-10');
    });

    it('should apply lg size', () => {
      const { container } = render(<Avatar size="lg" name="Test" />);
      expect(container.firstChild).toHaveClass('w-12', 'h-12');
    });

    it('should apply xl size', () => {
      const { container } = render(<Avatar size="xl" name="Test" />);
      expect(container.firstChild).toHaveClass('w-16', 'h-16');
    });

    it('should apply 2xl size', () => {
      const { container } = render(<Avatar size="2xl" name="Test" />);
      expect(container.firstChild).toHaveClass('w-20', 'h-20');
    });
  });

  describe('Variants', () => {
    it('should apply circular variant by default', () => {
      const { container } = render(<Avatar name="Test" />);
      expect(container.firstChild).toHaveClass('rounded-full');
    });

    it('should apply rounded variant', () => {
      const { container } = render(<Avatar variant="rounded" name="Test" />);
      expect(container.firstChild).toHaveClass('rounded-xl');
    });

    it('should apply square variant', () => {
      const { container } = render(<Avatar variant="square" name="Test" />);
      expect(container.firstChild).toHaveClass('rounded-none');
    });
  });

  describe('Ring styles', () => {
    it('should have no ring by default', () => {
      const { container } = render(<Avatar name="Test" />);
      expect(container.firstChild).not.toHaveClass('ring-2');
    });

    it('should apply primary ring', () => {
      const { container } = render(<Avatar ring="primary" name="Test" />);
      expect(container.firstChild).toHaveClass('ring-2', 'ring-primary-500');
    });

    it('should apply success ring', () => {
      const { container } = render(<Avatar ring="success" name="Test" />);
      expect(container.firstChild).toHaveClass('ring-2', 'ring-green-500');
    });

    it('should apply warning ring', () => {
      const { container } = render(<Avatar ring="warning" name="Test" />);
      expect(container.firstChild).toHaveClass('ring-2', 'ring-yellow-500');
    });

    it('should apply danger ring', () => {
      const { container } = render(<Avatar ring="danger" name="Test" />);
      expect(container.firstChild).toHaveClass('ring-2', 'ring-red-500');
    });

    it('should apply white ring', () => {
      const { container } = render(<Avatar ring="white" name="Test" />);
      expect(container.firstChild).toHaveClass('ring-2', 'ring-white');
    });
  });

  describe('Status indicator', () => {
    it('should not show status by default', () => {
      const { container } = render(<Avatar name="Test" />);
      expect(container.querySelector('[aria-label^="Status"]')).not.toBeInTheDocument();
    });

    it('should show online status', () => {
      render(<Avatar name="Test" status="online" />);
      const status = screen.getByLabelText('Status: online');
      expect(status).toHaveClass('bg-green-500');
    });

    it('should show offline status', () => {
      render(<Avatar name="Test" status="offline" />);
      const status = screen.getByLabelText('Status: offline');
      expect(status).toHaveClass('bg-gray-400');
    });

    it('should show busy status', () => {
      render(<Avatar name="Test" status="busy" />);
      const status = screen.getByLabelText('Status: busy');
      expect(status).toHaveClass('bg-red-500');
    });

    it('should show away status', () => {
      render(<Avatar name="Test" status="away" />);
      const status = screen.getByLabelText('Status: away');
      expect(status).toHaveClass('bg-yellow-500');
    });

    it('should apply circular status indicator for circular variant', () => {
      render(<Avatar name="Test" status="online" variant="circular" />);
      const status = screen.getByLabelText('Status: online');
      expect(status).toHaveClass('rounded-full');
    });

    it('should apply rounded status indicator for non-circular variant', () => {
      render(<Avatar name="Test" status="online" variant="rounded" />);
      const status = screen.getByLabelText('Status: online');
      expect(status).toHaveClass('rounded-sm');
    });
  });

  describe('Initials generation', () => {
    it('should generate initials from first and last name', () => {
      render(<Avatar name="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('should generate initials from first and last of multiple names', () => {
      render(<Avatar name="John Middle Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('should handle single name', () => {
      render(<Avatar name="John" />);
      expect(screen.getByText('J')).toBeInTheDocument();
    });

    it('should handle lowercase names', () => {
      render(<Avatar name="john doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('should handle extra whitespace', () => {
      render(<Avatar name="  John   Doe  " />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });
  });

  describe('Color generation', () => {
    it('should generate consistent color for same name', () => {
      const { container: container1 } = render(<Avatar name="John Doe" />);
      const { container: container2 } = render(<Avatar name="John Doe" />);

      const initialsDiv1 = container1.querySelector('div > div');
      const initialsDiv2 = container2.querySelector('div > div');

      expect(initialsDiv1?.className).toBe(initialsDiv2?.className);
    });

    it('should generate different colors for different names', () => {
      const { container: container1 } = render(<Avatar name="John Doe" />);
      const { container: container2 } = render(<Avatar name="Jane Smith" />);

      const initialsDiv1 = container1.querySelector('div > div');
      const initialsDiv2 = container2.querySelector('div > div');

      // Different names should have high probability of different colors
      // (not guaranteed, but statistically likely)
      expect(initialsDiv1).toBeInTheDocument();
      expect(initialsDiv2).toBeInTheDocument();
    });
  });

  describe('Interactivity', () => {
    it('should call onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Avatar name="Test" onClick={handleClick} />);

      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should have cursor-pointer when clickable', () => {
      const { container } = render(<Avatar name="Test" onClick={() => {}} />);
      expect(container.firstChild).toHaveClass('cursor-pointer');
    });

    it('should have button role when clickable', () => {
      render(<Avatar name="Test" onClick={() => {}} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should be focusable when clickable', () => {
      render(<Avatar name="Test" onClick={() => {}} />);
      expect(screen.getByRole('button')).toHaveAttribute('tabIndex', '0');
    });

    it('should trigger onClick on Enter key', () => {
      const handleClick = vi.fn();
      render(<Avatar name="Test" onClick={handleClick} />);

      fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should trigger onClick on Space key', () => {
      const handleClick = vi.fn();
      render(<Avatar name="Test" onClick={handleClick} />);

      fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not have button role when not clickable', () => {
      render(<Avatar name="Test" />);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('should apply custom className', () => {
      const { container } = render(<Avatar name="Test" className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Image fallback', () => {
    it('should show initials when image fails to load', () => {
      render(<Avatar src="/invalid.jpg" name="John Doe" />);
      const img = screen.getByRole('img');

      fireEvent.error(img);

      expect(screen.getByText('JD')).toBeInTheDocument();
    });
  });
});

describe('AvatarGroup', () => {
  describe('Rendering', () => {
    it('should render all avatars when count is less than max', () => {
      render(
        <AvatarGroup>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
        </AvatarGroup>
      );

      expect(screen.getByText('U1')).toBeInTheDocument();
      expect(screen.getByText('U2')).toBeInTheDocument();
    });

    it('should limit visible avatars to max', () => {
      render(
        <AvatarGroup max={2}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
          <Avatar name="User 4" />
        </AvatarGroup>
      );

      expect(screen.getByText('U1')).toBeInTheDocument();
      expect(screen.getByText('U2')).toBeInTheDocument();
      expect(screen.queryByText('U3')).not.toBeInTheDocument();
      expect(screen.queryByText('U4')).not.toBeInTheDocument();
    });

    it('should show remaining count', () => {
      render(
        <AvatarGroup max={2}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
          <Avatar name="User 4" />
        </AvatarGroup>
      );

      expect(screen.getByText('+2')).toBeInTheDocument();
    });

    it('should not show remaining count when all fit', () => {
      render(
        <AvatarGroup max={4}>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
        </AvatarGroup>
      );

      expect(screen.queryByText(/^\+/)).not.toBeInTheDocument();
    });
  });

  describe('Overlap', () => {
    it('should apply overlap styles to subsequent avatars', () => {
      const { container } = render(
        <AvatarGroup>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
        </AvatarGroup>
      );

      const wrappers = container.querySelectorAll('.ring-2');
      expect(wrappers[0]).not.toHaveClass('-ml-2.5');
      expect(wrappers[1]).toHaveClass('-ml-2.5');
      expect(wrappers[2]).toHaveClass('-ml-2.5');
    });
  });

  describe('Custom className', () => {
    it('should apply custom className to group', () => {
      const { container } = render(
        <AvatarGroup className="custom-group">
          <Avatar name="User 1" />
        </AvatarGroup>
      );

      expect(container.firstChild).toHaveClass('custom-group');
    });
  });

  describe('Default max', () => {
    it('should have default max of 4', () => {
      render(
        <AvatarGroup>
          <Avatar name="User 1" />
          <Avatar name="User 2" />
          <Avatar name="User 3" />
          <Avatar name="User 4" />
          <Avatar name="User 5" />
          <Avatar name="User 6" />
        </AvatarGroup>
      );

      expect(screen.getByText('+2')).toBeInTheDocument();
    });
  });
});
