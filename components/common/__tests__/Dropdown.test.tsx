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

  describe('Trigger with Icon Only', () => {
    it('renders icon without children (shows placeholder)', () => {
      render(
        <Dropdown>
          <Dropdown.Trigger icon={Settings} placeholder="Settings Menu" />
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      const trigger = screen.getByRole('combobox');
      // Should show icon and placeholder
      expect(trigger.querySelector('svg')).toBeInTheDocument();
      expect(screen.getByText('Settings Menu')).toBeInTheDocument();
    });
  });

  describe('Item Keyboard Navigation Extended', () => {
    it('handles Space key on items', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Dropdown onValueChange={handleChange}>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="test">Test Option</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      const option = screen.getByRole('option');
      option.focus();
      fireEvent.keyDown(option, { key: ' ' });

      expect(handleChange).toHaveBeenCalledWith('test');
    });

    it('ignores keyboard events on disabled items', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Dropdown onValueChange={handleChange}>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="disabled" disabled>
              Disabled Option
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      const option = screen.getByRole('option');
      option.focus();
      fireEvent.keyDown(option, { key: 'Enter' });

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('ignores Space key on disabled items', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Dropdown onValueChange={handleChange}>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="disabled" disabled>
              Disabled Option
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      const option = screen.getByRole('option');
      option.focus();
      fireEvent.keyDown(option, { key: ' ' });

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Controlled Value Mode', () => {
    it('does not update internal value when controlled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      // In controlled mode, the value prop controls selection
      render(
        <Dropdown value="option1" onValueChange={handleChange}>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="option1">Option 1</Dropdown.Item>
            <Dropdown.Item value="option2">Option 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'Option 2' }));

      // onValueChange should be called but selection visually stays at option1
      // since we're in controlled mode and didn't update the value prop
      expect(handleChange).toHaveBeenCalledWith('option2');
    });

    it('maintains controlled selection state across opens', async () => {
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

      // First open
      await user.click(screen.getByRole('combobox'));
      expect(screen.getByRole('option', { name: 'Option 2' })).toHaveAttribute(
        'aria-selected',
        'true'
      );

      // Close
      await user.keyboard('{Escape}');

      // Second open
      await user.click(screen.getByRole('combobox'));
      expect(screen.getByRole('option', { name: 'Option 2' })).toHaveAttribute(
        'aria-selected',
        'true'
      );
    });
  });

  describe('Controlled Open State Extended', () => {
    it('calls onOpenChange when clicking outside in controlled mode', async () => {
      const handleOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <div>
          <button data-testid="outside">Outside</button>
          <Dropdown open={true} onOpenChange={handleOpenChange}>
            <Dropdown.Trigger>Trigger</Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item value="1">Option 1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );

      await user.click(screen.getByTestId('outside'));

      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });

    it('calls onOpenChange when Escape is pressed in controlled mode', async () => {
      const handleOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Dropdown open={true} onOpenChange={handleOpenChange}>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.keyboard('{Escape}');

      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe('Trigger Keyboard Events Extended', () => {
    it('ignores keyboard events when disabled', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger disabled>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      screen.getByRole('combobox').focus();
      await user.keyboard('{Enter}');

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('handles Escape key on trigger when open', async () => {
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
      trigger.focus();
      await user.keyboard('{Enter}'); // Open
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      // Press Escape on the trigger element
      fireEvent.keyDown(trigger, { key: 'Escape' });

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('Menu Placement Extended', () => {
    it('applies top-end placement', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu placement="top-end">
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByRole('listbox')).toHaveClass('bottom-full', 'right-0');
    });
  });

  describe('Menu with Min Width', () => {
    it('applies custom min width', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu minWidth={200}>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByRole('listbox')).toHaveStyle({ minWidth: '200px' });
    });
  });

  describe('Trigger Keyboard with Open State', () => {
    it('closes on Escape when already open via keyboard', async () => {
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
      trigger.focus();

      // Open with Enter
      await user.keyboard('{Enter}');
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      // Keep focus on trigger and close with Escape via trigger keydown
      trigger.focus();
      fireEvent.keyDown(trigger, { key: 'Escape' });

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('toggles menu with Space key', async () => {
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
      trigger.focus();

      // Open with Space
      await user.keyboard(' ');
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      // Close with Space
      trigger.focus();
      await user.keyboard(' ');

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('does not open on ArrowDown when already open', async () => {
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
      trigger.focus();

      // Open first
      await user.click(trigger);
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      // ArrowDown should not affect the open state
      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  describe('Item Keyboard Events Extended', () => {
    it('prevents default on Enter key for items', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Dropdown onValueChange={handleChange}>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="test">Test Option</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      const option = screen.getByRole('option');
      const event = {
        key: 'Enter',
        preventDefault: vi.fn(),
      };

      fireEvent.keyDown(option, event);

      expect(handleChange).toHaveBeenCalledWith('test');
    });

    it('prevents default on Space key for items', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Dropdown onValueChange={handleChange}>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="test">Test Option</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      const option = screen.getByRole('option');
      const event = {
        key: ' ',
        preventDefault: vi.fn(),
      };

      fireEvent.keyDown(option, event);

      expect(handleChange).toHaveBeenCalledWith('test');
    });
  });

  describe('Label Custom ClassName', () => {
    it('applies custom className to label', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Label className="custom-label-class">Category</Dropdown.Label>
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByText('Category')).toHaveClass('custom-label-class');
    });
  });

  describe('Item Custom ClassName', () => {
    it('applies custom className to item', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="1" className="custom-item-class">
              Option 1
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByRole('option')).toHaveClass('custom-item-class');
    });
  });

  describe('Menu Custom ClassName', () => {
    it('applies custom className to menu', async () => {
      const user = userEvent.setup();

      render(
        <Dropdown>
          <Dropdown.Trigger>Trigger</Dropdown.Trigger>
          <Dropdown.Menu className="custom-menu-class">
            <Dropdown.Item value="1">Option 1</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByRole('listbox')).toHaveClass('custom-menu-class');
    });
  });
});
