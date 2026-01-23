import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Settings, User, LogOut } from 'lucide-react';
import Dropdown from '../Dropdown';

describe('Dropdown', () => {
  describe('Basic Rendering', () => {
    it('renders dropdown trigger', () => {
      render(
        <Dropdown>
          <Dropdown.Trigger>Select Option</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByText('Select Option')).toBeInTheDocument();
    });

    it('renders placeholder when no content', () => {
      render(
        <Dropdown>
          <Dropdown.Trigger placeholder="Choose..." />
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      expect(screen.getByText('Choose...')).toBeInTheDocument();
    });

    it('applies custom className to container', () => {
      const { container } = render(
        <Dropdown className="custom-dropdown">
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      expect(container.firstChild).toHaveClass('custom-dropdown');
    });

    it('menu is hidden by default', () => {
      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('Open/Close Behavior', () => {
    it('opens menu on trigger click', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('closes menu when clicking outside', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <button data-testid="outside">Outside</button>
          <Dropdown>
            <Dropdown.Trigger>Trigger</Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item value="1">Option 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.click(screen.getByTestId('outside'));

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('closes menu on Escape key', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('closes menu when item is selected', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option'));

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('toggles menu on repeated clicks', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      const trigger = screen.getByRole('combobox');

      await user.click(trigger);
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.click(trigger);
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('Selection', () => {
    it('calls onValueChange when item is selected', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Dropdown onValueChange={handleChange}>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="option1">Option 1</Dropdown.Item>
            <Dropdown.Item value="option2">Option 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Option 1' }));

      expect(handleChange).toHaveBeenCalledWith('option1');
    });

    it('shows check mark on selected item', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown defaultValue="option1">
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="option1">Option 1</Dropdown.Item>
            <Dropdown.Item value="option2">Option 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      const selectedOption = screen.getByRole('option', { name: 'Option 1' });
      expect(selectedOption).toHaveAttribute('aria-selected', 'true');
      expect(selectedOption.querySelector('svg')).toBeInTheDocument(); // Check icon
    });

    it('respects defaultValue', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown defaultValue="option2">
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="option1">Option 1</Dropdown.Item>
            <Dropdown.Item value="option2">Option 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByRole('option', { name: 'Option 2' })).toHaveAttribute(
        'aria-selected',
        'true'
      );
    });
  });

  describe('Controlled Mode', () => {
    it('respects controlled value', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown value="option2">
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="option1">Option 1</Dropdown.Item>
            <Dropdown.Item value="option2">Option 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByRole('option', { name: 'Option 2' })).toHaveAttribute(
        'aria-selected',
        'true'
      );
    });

    it('respects controlled open state', () => {
      render(
        <Dropdown open={true}>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('calls onOpenChange when open state changes', async () => {
      const handleOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Dropdown onOpenChange={handleOpenChange}>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      expect(handleOpenChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Variants', () => {
    it('applies default variant styles', () => {
      render(
        <Dropdown variant="default">
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      expect(screen.getByRole('combobox')).toHaveClass('bg-white', 'border', 'border-gray-300');
    });

    it('applies outline variant styles', () => {
      render(
        <Dropdown variant="outline">
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      expect(screen.getByRole('combobox')).toHaveClass('bg-transparent', 'border');
    });

    it('applies ghost variant styles', () => {
      render(
        <Dropdown variant="ghost">
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      expect(screen.getByRole('combobox')).toHaveClass('bg-transparent', 'hover:bg-gray-100');
    });
  });

  describe('Sizes', () => {
    it('applies small size styles', () => {
      render(
        <Dropdown size="sm">
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      expect(screen.getByRole('combobox')).toHaveClass('px-3', 'py-1.5', 'text-sm');
    });

    it('applies medium size styles (default)', () => {
      render(
        <Dropdown size="md">
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      expect(screen.getByRole('combobox')).toHaveClass('px-4', 'py-2', 'text-sm');
    });

    it('applies large size styles', () => {
      render(
        <Dropdown size="lg">
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      expect(screen.getByRole('combobox')).toHaveClass('px-5', 'py-2.5', 'text-base');
    });
  });

  describe('Icons', () => {
    it('renders icon in trigger when provided', () => {
      render(
        <Dropdown>
          <Dropdown.Trigger icon={Settings}>Settings</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      expect(screen.getByRole('combobox').querySelector('svg')).toBeInTheDocument();
    });

    it('renders icon in menu item when provided', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="profile" icon={User}>
              Profile
            </Dropdown.Item>
            <Dropdown.Item value="logout" icon={LogOut}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      const items = screen.getAllByRole('option');
      items.forEach((item) => {
        expect(item.querySelector('svg')).toBeInTheDocument();
      });
    });

    it('hides chevron when showChevron is false', () => {
      render(
        <Dropdown>
          <Dropdown.Trigger showChevron={false}>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      // Only should have no chevron (SVG at the end)
      const trigger = screen.getByRole('combobox');
      const svgs = trigger.querySelectorAll('svg');
      expect(svgs.length).toBe(0);
    });
  });

  describe('Chevron Animation', () => {
    it('rotates chevron when open', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      const chevron = screen.getByRole('combobox').querySelector('svg');
      expect(chevron).not.toHaveClass('rotate-180');

      await user.click(screen.getByRole('combobox'));

      expect(chevron).toHaveClass('rotate-180');
    });
  });

  describe('Disabled State', () => {
    it('applies disabled styles to trigger', () => {
      render(
        <Dropdown>
          <Dropdown.Trigger disabled>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeDisabled();
      expect(trigger).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('prevents opening when trigger is disabled', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger disabled>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('applies disabled styles to menu item', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1" disabled>
              Disabled Option
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      const option = screen.getByRole('option');
      expect(option).toHaveAttribute('aria-disabled', 'true');
      expect(option).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('prevents selection of disabled items', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Dropdown onValueChange={handleChange}>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1" disabled>
              Disabled Option
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option'));

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Menu Placement', () => {
    it('applies bottom-start placement (default)', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu placement="bottom-start">
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByRole('listbox')).toHaveClass('top-full', 'left-0');
    });

    it('applies bottom-end placement', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu placement="bottom-end">
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByRole('listbox')).toHaveClass('top-full', 'right-0');
    });

    it('applies top-start placement', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu placement="top-start">
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByRole('listbox')).toHaveClass('bottom-full', 'left-0');
    });
  });

  describe('Divider and Label', () => {
    it('renders divider', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item value="2">Option 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('renders label', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Label>Category</Dropdown.Label>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByText('Category')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has correct aria attributes on trigger', () => {
      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
    });

    it('updates aria-expanded when open', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('has aria-controls linking trigger to menu', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      const trigger = screen.getByRole('combobox');
      const menu = screen.getByRole('listbox');
      expect(trigger).toHaveAttribute('aria-controls', menu.id);
    });

    it('opens menu on Enter key', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      screen.getByRole('combobox').focus();
      await user.keyboard('{Enter}');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('opens menu on Space key', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      screen.getByRole('combobox').focus();
      await user.keyboard(' ');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('opens menu on ArrowDown key', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      screen.getByRole('combobox').focus();
      await user.keyboard('{ArrowDown}');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('selects item on Enter key', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Dropdown onValueChange={handleChange}>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      const option = screen.getByRole('option');
      option.focus();
      fireEvent.keyDown(option, { key: 'Enter' });

      expect(handleChange).toHaveBeenCalledWith('1');
    });
  });

  describe('Item onClick Handler', () => {
    it('calls onClick handler in addition to selection', async () => {
      const handleClick = vi.fn();
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Dropdown onValueChange={handleChange}>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1" onClick={handleClick}>
              Option 1
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option'));

      expect(handleClick).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledWith('1');
    });
  });

  describe('Context Error', () => {
    it('throws error when components used outside Dropdown', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<Dropdown.Trigger>Orphan</Dropdown.Trigger>);
      }).toThrow('Dropdown compound components must be used within a Dropdown component');

      consoleSpy.mockRestore();
    });
  });
});
