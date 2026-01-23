import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelpCircle, Settings, Package } from 'lucide-react';
import Accordion from '../Accordion';

describe('Accordion', () => {
  describe('Basic Rendering', () => {
    it('renders accordion items', () => {
      render(
        <Accordion>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
          <Accordion.Item itemId="2" title="Item 2">
            Content 2
          </Accordion.Item>
        </Accordion>
      );

      expect(screen.getByRole('button', { name: /Item 1/ })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Item 2/ })).toBeInTheDocument();
    });

    it('renders with ReactNode title', () => {
      render(
        <Accordion>
          <Accordion.Item itemId="1" title={<span data-testid="custom-title">Custom Title</span>}>
            Content
          </Accordion.Item>
        </Accordion>
      );

      expect(screen.getByTestId('custom-title')).toBeInTheDocument();
    });

    it('applies custom className to container', () => {
      const { container } = render(
        <Accordion className="custom-accordion">
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      expect(container.firstChild).toHaveClass('custom-accordion');
    });

    it('applies custom className to item', () => {
      render(
        <Accordion>
          <Accordion.Item itemId="1" title="Item 1" className="custom-item">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      const item = screen.getByRole('button', { name: /Item 1/ }).closest('[data-state]');
      expect(item).toHaveClass('custom-item');
    });
  });

  describe('Expand/Collapse Behavior', () => {
    it('starts collapsed by default', () => {
      render(
        <Accordion>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      expect(screen.getByRole('button', { name: /Item 1/ })).toHaveAttribute(
        'aria-expanded',
        'false'
      );
      expect(screen.getByRole('region', { hidden: true })).toHaveAttribute('hidden');
    });

    it('expands item on click', async () => {
      const user = userEvent.setup();

      render(
        <Accordion>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      await user.click(screen.getByRole('button', { name: /Item 1/ }));

      expect(screen.getByRole('button', { name: /Item 1/ })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(screen.getByRole('region')).not.toHaveAttribute('hidden');
    });

    it('collapses item on second click', async () => {
      const user = userEvent.setup();

      render(
        <Accordion>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      const trigger = screen.getByRole('button', { name: /Item 1/ });

      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');

      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('closes other items when not allowMultiple (single mode)', async () => {
      const user = userEvent.setup();

      render(
        <Accordion>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
          <Accordion.Item itemId="2" title="Item 2">
            Content 2
          </Accordion.Item>
        </Accordion>
      );

      const trigger1 = screen.getByRole('button', { name: /Item 1/ });
      const trigger2 = screen.getByRole('button', { name: /Item 2/ });

      await user.click(trigger1);
      expect(trigger1).toHaveAttribute('aria-expanded', 'true');

      await user.click(trigger2);
      expect(trigger1).toHaveAttribute('aria-expanded', 'false');
      expect(trigger2).toHaveAttribute('aria-expanded', 'true');
    });

    it('keeps multiple items open when allowMultiple is true', async () => {
      const user = userEvent.setup();

      render(
        <Accordion allowMultiple>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
          <Accordion.Item itemId="2" title="Item 2">
            Content 2
          </Accordion.Item>
        </Accordion>
      );

      const trigger1 = screen.getByRole('button', { name: /Item 1/ });
      const trigger2 = screen.getByRole('button', { name: /Item 2/ });

      await user.click(trigger1);
      await user.click(trigger2);

      expect(trigger1).toHaveAttribute('aria-expanded', 'true');
      expect(trigger2).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Default Expanded', () => {
    it('respects defaultExpanded with single item', () => {
      render(
        <Accordion defaultExpanded={['1']}>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
          <Accordion.Item itemId="2" title="Item 2">
            Content 2
          </Accordion.Item>
        </Accordion>
      );

      expect(screen.getByRole('button', { name: /Item 1/ })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(screen.getByRole('button', { name: /Item 2/ })).toHaveAttribute(
        'aria-expanded',
        'false'
      );
    });

    it('respects defaultExpanded with multiple items when allowMultiple', () => {
      render(
        <Accordion defaultExpanded={['1', '2']} allowMultiple>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
          <Accordion.Item itemId="2" title="Item 2">
            Content 2
          </Accordion.Item>
        </Accordion>
      );

      expect(screen.getByRole('button', { name: /Item 1/ })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(screen.getByRole('button', { name: /Item 2/ })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });
  });

  describe('Controlled Mode', () => {
    it('respects controlled expanded state', () => {
      render(
        <Accordion expanded={['2']}>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
          <Accordion.Item itemId="2" title="Item 2">
            Content 2
          </Accordion.Item>
        </Accordion>
      );

      expect(screen.getByRole('button', { name: /Item 1/ })).toHaveAttribute(
        'aria-expanded',
        'false'
      );
      expect(screen.getByRole('button', { name: /Item 2/ })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });

    it('calls onExpandedChange when item is clicked', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Accordion expanded={[]} onExpandedChange={handleChange}>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      await user.click(screen.getByRole('button', { name: /Item 1/ }));

      expect(handleChange).toHaveBeenCalledWith(['1']);
    });

    it('calls onExpandedChange with empty array when closing', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Accordion expanded={['1']} onExpandedChange={handleChange}>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      await user.click(screen.getByRole('button', { name: /Item 1/ }));

      expect(handleChange).toHaveBeenCalledWith([]);
    });

    it('does not change internal state in controlled mode', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Accordion expanded={['1']} onExpandedChange={handleChange}>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      await user.click(screen.getByRole('button', { name: /Item 1/ }));

      // Should still be expanded because controlled prop didn't change
      expect(screen.getByRole('button', { name: /Item 1/ })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });
  });

  describe('Variants', () => {
    it('applies default variant styles', () => {
      const { container } = render(
        <Accordion variant="default">
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      expect(container.firstChild).toHaveClass('divide-y', 'divide-gray-200');
    });

    it('applies bordered variant styles', () => {
      const { container } = render(
        <Accordion variant="bordered">
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      expect(container.firstChild).toHaveClass('space-y-2');
      const item = screen.getByRole('button', { name: /Item 1/ }).closest('[data-state]');
      expect(item).toHaveClass('border', 'border-gray-200', 'rounded-lg');
    });

    it('applies separated variant styles', () => {
      const { container } = render(
        <Accordion variant="separated">
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      expect(container.firstChild).toHaveClass('space-y-4');
      const item = screen.getByRole('button', { name: /Item 1/ }).closest('[data-state]');
      expect(item).toHaveClass('bg-white', 'rounded-xl', 'shadow-md');
    });
  });

  describe('Icons', () => {
    it('renders icon when provided', () => {
      render(
        <Accordion>
          <Accordion.Item itemId="1" title="Help" icon={HelpCircle}>
            Help content
          </Accordion.Item>
        </Accordion>
      );

      const trigger = screen.getByRole('button', { name: /Help/ });
      expect(trigger.querySelector('svg')).toBeInTheDocument();
    });

    it('renders different icons for different items', () => {
      render(
        <Accordion>
          <Accordion.Item itemId="1" title="Settings" icon={Settings}>
            Settings content
          </Accordion.Item>
          <Accordion.Item itemId="2" title="Packages" icon={Package}>
            Packages content
          </Accordion.Item>
        </Accordion>
      );

      const triggers = screen.getAllByRole('button');
      triggers.forEach((trigger) => {
        expect(trigger.querySelector('svg')).toBeInTheDocument();
      });
    });
  });

  describe('Disabled Items', () => {
    it('applies disabled styles', () => {
      render(
        <Accordion>
          <Accordion.Item itemId="1" title="Disabled Item" disabled>
            Content
          </Accordion.Item>
        </Accordion>
      );

      const trigger = screen.getByRole('button', { name: /Disabled Item/ });
      expect(trigger).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('sets aria-disabled on disabled items', () => {
      render(
        <Accordion>
          <Accordion.Item itemId="1" title="Disabled Item" disabled>
            Content
          </Accordion.Item>
        </Accordion>
      );

      expect(screen.getByRole('button', { name: /Disabled Item/ })).toHaveAttribute(
        'aria-disabled',
        'true'
      );
    });

    it('prevents click on disabled items', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Accordion onExpandedChange={handleChange}>
          <Accordion.Item itemId="1" title="Disabled Item" disabled>
            Content
          </Accordion.Item>
        </Accordion>
      );

      await user.click(screen.getByRole('button', { name: /Disabled Item/ }));

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('has disabled attribute on disabled items', () => {
      render(
        <Accordion>
          <Accordion.Item itemId="1" title="Disabled Item" disabled>
            Content
          </Accordion.Item>
        </Accordion>
      );

      expect(screen.getByRole('button', { name: /Disabled Item/ })).toBeDisabled();
    });
  });

  describe('Chevron Animation', () => {
    it('rotates chevron when expanded', async () => {
      const user = userEvent.setup();

      render(
        <Accordion>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      const trigger = screen.getByRole('button', { name: /Item 1/ });
      const chevron = trigger.querySelector('svg:last-child');

      expect(chevron).not.toHaveClass('rotate-180');

      await user.click(trigger);

      expect(chevron).toHaveClass('rotate-180');
    });
  });

  describe('Data State Attribute', () => {
    it('has data-state="closed" when collapsed', () => {
      render(
        <Accordion>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      const item = screen.getByRole('button', { name: /Item 1/ }).closest('[data-state]');
      expect(item).toHaveAttribute('data-state', 'closed');
    });

    it('has data-state="open" when expanded', async () => {
      const user = userEvent.setup();

      render(
        <Accordion>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      await user.click(screen.getByRole('button', { name: /Item 1/ }));

      const item = screen.getByRole('button', { name: /Item 1/ }).closest('[data-state]');
      expect(item).toHaveAttribute('data-state', 'open');
    });
  });

  describe('Accessibility', () => {
    it('has correct aria-expanded attribute', () => {
      render(
        <Accordion defaultExpanded={['1']}>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
          <Accordion.Item itemId="2" title="Item 2">
            Content 2
          </Accordion.Item>
        </Accordion>
      );

      expect(screen.getByRole('button', { name: /Item 1/ })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(screen.getByRole('button', { name: /Item 2/ })).toHaveAttribute(
        'aria-expanded',
        'false'
      );
    });

    it('has correct aria-controls linking trigger to panel', () => {
      render(
        <Accordion defaultExpanded={['1']}>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      const trigger = screen.getByRole('button', { name: /Item 1/ });
      const panel = screen.getByRole('region');
      expect(trigger).toHaveAttribute('aria-controls', panel.id);
    });

    it('has correct aria-labelledby on panel', () => {
      render(
        <Accordion defaultExpanded={['1']}>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      const trigger = screen.getByRole('button', { name: /Item 1/ });
      const panel = screen.getByRole('region');
      expect(panel).toHaveAttribute('aria-labelledby', trigger.id);
    });

    it('expands on Enter key', () => {
      render(
        <Accordion>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      const trigger = screen.getByRole('button', { name: /Item 1/ });
      fireEvent.keyDown(trigger, { key: 'Enter' });

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('expands on Space key', () => {
      render(
        <Accordion>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      const trigger = screen.getByRole('button', { name: /Item 1/ });
      fireEvent.keyDown(trigger, { key: ' ' });

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('does not expand disabled item on keyboard', () => {
      const handleChange = vi.fn();

      render(
        <Accordion onExpandedChange={handleChange}>
          <Accordion.Item itemId="1" title="Disabled Item" disabled>
            Content
          </Accordion.Item>
        </Accordion>
      );

      const trigger = screen.getByRole('button', { name: /Disabled Item/ });
      fireEvent.keyDown(trigger, { key: 'Enter' });

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Uncontrolled Mode', () => {
    it('manages state internally in uncontrolled mode', async () => {
      const user = userEvent.setup();

      render(
        <Accordion>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      const trigger = screen.getByRole('button', { name: /Item 1/ });

      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');

      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('still calls onExpandedChange in uncontrolled mode', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Accordion onExpandedChange={handleChange}>
          <Accordion.Item itemId="1" title="Item 1">
            Content 1
          </Accordion.Item>
        </Accordion>
      );

      await user.click(screen.getByRole('button', { name: /Item 1/ }));

      expect(handleChange).toHaveBeenCalledWith(['1']);
    });
  });

  describe('Context Error', () => {
    it('throws error when AccordionItem is used outside Accordion', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(
          <Accordion.Item itemId="1" title="Orphan">
            Content
          </Accordion.Item>
        );
      }).toThrow('Accordion compound components must be used within an Accordion component');

      consoleSpy.mockRestore();
    });
  });

  describe('Content Visibility', () => {
    it('shows content when expanded', async () => {
      const user = userEvent.setup();

      render(
        <Accordion>
          <Accordion.Item itemId="1" title="Item 1">
            <p data-testid="content">This is the content</p>
          </Accordion.Item>
        </Accordion>
      );

      // Initially content should be hidden
      expect(screen.getByTestId('content')).toBeInTheDocument();
      const region = screen.getByRole('region', { hidden: true });
      expect(region).toHaveAttribute('hidden');

      // After clicking, content should be visible
      await user.click(screen.getByRole('button', { name: /Item 1/ }));

      expect(screen.getByRole('region')).not.toHaveAttribute('hidden');
    });
  });
});
