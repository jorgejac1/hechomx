import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Package, Star, Settings } from 'lucide-react';
import Tabs, { TabItem } from '../Tabs';

const basicTabs: TabItem[] = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' },
];

const tabsWithIcons: TabItem[] = [
  { id: 'products', label: 'Products', icon: Package },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const tabsWithCounts: TabItem[] = [
  { id: 'all', label: 'All', count: 42 },
  { id: 'active', label: 'Active', count: 10 },
  { id: 'archived', label: 'Archived', count: 0 },
];

const tabsWithBadges: TabItem[] = [
  { id: 'inbox', label: 'Inbox', badge: 5 },
  { id: 'sent', label: 'Sent', badge: 0 },
  { id: 'drafts', label: 'Drafts', badge: 100 },
];

const tabsWithDisabled: TabItem[] = [
  { id: 'enabled1', label: 'Enabled 1' },
  { id: 'disabled', label: 'Disabled', disabled: true },
  { id: 'enabled2', label: 'Enabled 2' },
];

describe('Tabs', () => {
  describe('Basic Rendering', () => {
    it('renders all tabs', () => {
      render(
        <Tabs defaultTab="tab1">
          <Tabs.List tabs={basicTabs} />
        </Tabs>
      );

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument();
    });

    it('renders tablist with correct role', () => {
      render(
        <Tabs defaultTab="tab1">
          <Tabs.List tabs={basicTabs} />
        </Tabs>
      );

      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('renders tab panels', () => {
      render(
        <Tabs defaultTab="tab1">
          <Tabs.List tabs={basicTabs} />
          <Tabs.Panels>
            <Tabs.Panel tabId="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel tabId="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 1');
    });

    it('applies custom className to container', () => {
      const { container } = render(
        <Tabs defaultTab="tab1" className="custom-tabs">
          <Tabs.List tabs={basicTabs} />
        </Tabs>
      );

      expect(container.firstChild).toHaveClass('custom-tabs');
    });
  });

  describe('Controlled Mode', () => {
    it('respects controlled activeTab', () => {
      render(
        <Tabs activeTab="tab2">
          <Tabs.List tabs={basicTabs} />
          <Tabs.Panels>
            <Tabs.Panel tabId="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel tabId="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 2');
    });

    it('calls onTabChange when tab is clicked', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Tabs activeTab="tab1" onTabChange={handleChange}>
          <Tabs.List tabs={basicTabs} />
        </Tabs>
      );

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
      expect(handleChange).toHaveBeenCalledWith('tab2');
    });

    it('does not change internal state in controlled mode', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Tabs activeTab="tab1" onTabChange={handleChange}>
          <Tabs.List tabs={basicTabs} />
          <Tabs.Panels>
            <Tabs.Panel tabId="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel tabId="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }));

      // Content should still show tab1 because activeTab prop didn't change
      expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 1');
    });
  });

  describe('Uncontrolled Mode', () => {
    it('uses defaultTab for initial state', () => {
      render(
        <Tabs defaultTab="tab2">
          <Tabs.List tabs={basicTabs} />
          <Tabs.Panels>
            <Tabs.Panel tabId="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel tabId="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 2');
    });

    it('changes tab on click in uncontrolled mode', async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultTab="tab1">
          <Tabs.List tabs={basicTabs} />
          <Tabs.Panels>
            <Tabs.Panel tabId="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel tabId="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
      expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 2');
    });

    it('still calls onTabChange in uncontrolled mode', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Tabs defaultTab="tab1" onTabChange={handleChange}>
          <Tabs.List tabs={basicTabs} />
        </Tabs>
      );

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
      expect(handleChange).toHaveBeenCalledWith('tab2');
    });
  });

  describe('Variants', () => {
    it('applies underline variant styles (default)', () => {
      render(
        <Tabs defaultTab="tab1" variant="underline">
          <Tabs.List tabs={basicTabs} />
        </Tabs>
      );

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveClass('border-b', 'border-gray-200');
    });

    it('applies pills variant styles', () => {
      render(
        <Tabs defaultTab="tab1" variant="pills">
          <Tabs.List tabs={basicTabs} />
        </Tabs>
      );

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveClass('bg-gray-100', 'rounded-lg');
    });

    it('applies boxed variant styles', () => {
      render(
        <Tabs defaultTab="tab1" variant="boxed">
          <Tabs.List tabs={basicTabs} />
        </Tabs>
      );

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveClass('border', 'border-gray-200', 'rounded-lg');
    });

    it('applies active styles for underline variant', () => {
      render(
        <Tabs defaultTab="tab1" variant="underline">
          <Tabs.List tabs={basicTabs} />
        </Tabs>
      );

      const activeTab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(activeTab).toHaveClass('border-primary-600', 'text-primary-600');
    });

    it('applies active styles for pills variant', () => {
      render(
        <Tabs defaultTab="tab1" variant="pills">
          <Tabs.List tabs={basicTabs} />
        </Tabs>
      );

      const activeTab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(activeTab).toHaveClass('bg-white', 'text-primary-600');
    });

    it('applies active styles for boxed variant', () => {
      render(
        <Tabs defaultTab="tab1" variant="boxed">
          <Tabs.List tabs={basicTabs} />
        </Tabs>
      );

      const activeTab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(activeTab).toHaveClass('bg-primary-600', 'text-white');
    });
  });

  describe('Sizes', () => {
    it('applies small size styles', () => {
      render(
        <Tabs defaultTab="tab1" size="sm">
          <Tabs.List tabs={basicTabs} />
        </Tabs>
      );

      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab).toHaveClass('px-3', 'py-2', 'text-xs');
    });

    it('applies medium size styles (default)', () => {
      render(
        <Tabs defaultTab="tab1" size="md">
          <Tabs.List tabs={basicTabs} />
        </Tabs>
      );

      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab).toHaveClass('px-4', 'py-3', 'text-sm');
    });

    it('applies large size styles', () => {
      render(
        <Tabs defaultTab="tab1" size="lg">
          <Tabs.List tabs={basicTabs} />
        </Tabs>
      );

      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab).toHaveClass('px-6', 'py-4', 'text-base');
    });
  });

  describe('Icons', () => {
    it('renders icons when provided', () => {
      render(
        <Tabs defaultTab="products">
          <Tabs.List tabs={tabsWithIcons} />
        </Tabs>
      );

      // Icons are rendered with aria-hidden
      const tab = screen.getByRole('tab', { name: 'Products' });
      expect(tab.querySelector('svg')).toBeInTheDocument();
    });

    it('renders all icons for tabs with icons', () => {
      render(
        <Tabs defaultTab="products">
          <Tabs.List tabs={tabsWithIcons} />
        </Tabs>
      );

      const tabs = screen.getAllByRole('tab');
      tabs.forEach((tab) => {
        expect(tab.querySelector('svg')).toBeInTheDocument();
      });
    });
  });

  describe('Counts', () => {
    it('displays count when provided', () => {
      render(
        <Tabs defaultTab="all">
          <Tabs.List tabs={tabsWithCounts} />
        </Tabs>
      );

      expect(screen.getByRole('tab', { name: /All/ })).toHaveTextContent('(42)');
    });

    it('displays zero count', () => {
      render(
        <Tabs defaultTab="all">
          <Tabs.List tabs={tabsWithCounts} />
        </Tabs>
      );

      expect(screen.getByRole('tab', { name: /Archived/ })).toHaveTextContent('(0)');
    });

    it('does not display count when undefined', () => {
      render(
        <Tabs defaultTab="tab1">
          <Tabs.List tabs={basicTabs} />
        </Tabs>
      );

      expect(screen.getByRole('tab', { name: 'Tab 1' })).not.toHaveTextContent('(');
    });
  });

  describe('Badges', () => {
    it('displays badge when greater than zero', () => {
      render(
        <Tabs defaultTab="inbox">
          <Tabs.List tabs={tabsWithBadges} />
        </Tabs>
      );

      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('does not display badge when zero', () => {
      render(
        <Tabs defaultTab="inbox">
          <Tabs.List tabs={tabsWithBadges} />
        </Tabs>
      );

      const sentTab = screen.getByRole('tab', { name: 'Sent' });
      expect(sentTab.querySelector('.animate-pulse')).not.toBeInTheDocument();
    });

    it('shows 99+ for badges over 99', () => {
      render(
        <Tabs defaultTab="inbox">
          <Tabs.List tabs={tabsWithBadges} />
        </Tabs>
      );

      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('applies pulse animation to badges', () => {
      render(
        <Tabs defaultTab="inbox">
          <Tabs.List tabs={tabsWithBadges} />
        </Tabs>
      );

      expect(screen.getByText('5')).toHaveClass('animate-pulse');
    });
  });

  describe('Disabled Tabs', () => {
    it('applies disabled styles', () => {
      render(
        <Tabs defaultTab="enabled1">
          <Tabs.List tabs={tabsWithDisabled} />
        </Tabs>
      );

      const disabledTab = screen.getByRole('tab', { name: 'Disabled' });
      expect(disabledTab).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('sets aria-disabled on disabled tabs', () => {
      render(
        <Tabs defaultTab="enabled1">
          <Tabs.List tabs={tabsWithDisabled} />
        </Tabs>
      );

      const disabledTab = screen.getByRole('tab', { name: 'Disabled' });
      expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
    });

    it('prevents click on disabled tabs', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Tabs defaultTab="enabled1" onTabChange={handleChange}>
          <Tabs.List tabs={tabsWithDisabled} />
        </Tabs>
      );

      await user.click(screen.getByRole('tab', { name: 'Disabled' }));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('has disabled attribute on disabled tabs', () => {
      render(
        <Tabs defaultTab="enabled1">
          <Tabs.List tabs={tabsWithDisabled} />
        </Tabs>
      );

      const disabledTab = screen.getByRole('tab', { name: 'Disabled' });
      expect(disabledTab).toBeDisabled();
    });
  });

  describe('Tab Panels', () => {
    it('only renders active panel by default', () => {
      render(
        <Tabs defaultTab="tab1">
          <Tabs.List tabs={basicTabs} />
          <Tabs.Panels>
            <Tabs.Panel tabId="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel tabId="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });

    it('keeps panel mounted when keepMounted is true', () => {
      render(
        <Tabs defaultTab="tab1">
          <Tabs.List tabs={basicTabs} />
          <Tabs.Panels>
            <Tabs.Panel tabId="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel tabId="tab2" keepMounted>
              Content 2
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByText('Content 1')).toBeVisible();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
      // The panel should be hidden (not visible to users)
      const panel2 = screen.getByText('Content 2').closest('[role="tabpanel"]');
      expect(panel2).toHaveAttribute('hidden');
    });

    it('has correct aria-labelledby on panels', () => {
      render(
        <Tabs defaultTab="tab1">
          <Tabs.List tabs={basicTabs} />
          <Tabs.Panels>
            <Tabs.Panel tabId="tab1">Content 1</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      const panel = screen.getByRole('tabpanel');
      const tabId = screen.getByRole('tab', { name: 'Tab 1' }).id;
      expect(panel).toHaveAttribute('aria-labelledby', tabId);
    });

    it('applies custom className to panel', () => {
      render(
        <Tabs defaultTab="tab1">
          <Tabs.List tabs={basicTabs} />
          <Tabs.Panels>
            <Tabs.Panel tabId="tab1" className="custom-panel">
              Content 1
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByRole('tabpanel')).toHaveClass('custom-panel');
    });
  });

  describe('Full Width', () => {
    it('applies full width styles to tabs', () => {
      render(
        <Tabs defaultTab="tab1">
          <Tabs.List tabs={basicTabs} fullWidth />
        </Tabs>
      );

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveClass('flex', 'w-full');
    });

    it('applies flex-1 to individual tabs when fullWidth', () => {
      render(
        <Tabs defaultTab="tab1">
          <Tabs.List tabs={basicTabs} fullWidth />
        </Tabs>
      );

      const tabs = screen.getAllByRole('tab');
      tabs.forEach((tab) => {
        expect(tab).toHaveClass('flex-1');
      });
    });
  });

  describe('Accessibility', () => {
    it('has correct aria-selected on active tab', () => {
      render(
        <Tabs defaultTab="tab1">
          <Tabs.List tabs={basicTabs} />
        </Tabs>
      );

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'false');
    });

    it('has correct aria-controls on tabs', () => {
      render(
        <Tabs defaultTab="tab1">
          <Tabs.List tabs={basicTabs} />
          <Tabs.Panels>
            <Tabs.Panel tabId="tab1">Content 1</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      const panel = screen.getByRole('tabpanel');
      expect(tab).toHaveAttribute('aria-controls', panel.id);
    });

    it('active tab has tabindex 0, others have -1', () => {
      render(
        <Tabs defaultTab="tab1">
          <Tabs.List tabs={basicTabs} />
        </Tabs>
      );

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('tabIndex', '0');
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('tabIndex', '-1');
    });

    it('panel has tabindex 0 for keyboard navigation', () => {
      render(
        <Tabs defaultTab="tab1">
          <Tabs.List tabs={basicTabs} />
          <Tabs.Panels>
            <Tabs.Panel tabId="tab1">Content 1</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(screen.getByRole('tabpanel')).toHaveAttribute('tabIndex', '0');
    });

    it('activates tab on Enter key', () => {
      render(
        <Tabs defaultTab="tab1">
          <Tabs.List tabs={basicTabs} />
          <Tabs.Panels>
            <Tabs.Panel tabId="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel tabId="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      fireEvent.keyDown(tab2, { key: 'Enter' });

      expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 2');
    });

    it('activates tab on Space key', () => {
      render(
        <Tabs defaultTab="tab1">
          <Tabs.List tabs={basicTabs} />
          <Tabs.Panels>
            <Tabs.Panel tabId="tab1">Content 1</Tabs.Panel>
            <Tabs.Panel tabId="tab2">Content 2</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      fireEvent.keyDown(tab2, { key: ' ' });

      expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 2');
    });

    it('does not activate disabled tab on keyboard', () => {
      const handleChange = vi.fn();

      render(
        <Tabs defaultTab="enabled1" onTabChange={handleChange}>
          <Tabs.List tabs={tabsWithDisabled} />
        </Tabs>
      );

      const disabledTab = screen.getByRole('tab', { name: 'Disabled' });
      fireEvent.keyDown(disabledTab, { key: 'Enter' });

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('TabList className', () => {
    it('applies custom className to tablist', () => {
      render(
        <Tabs defaultTab="tab1">
          <Tabs.List tabs={basicTabs} className="custom-tablist" />
        </Tabs>
      );

      expect(screen.getByRole('tablist')).toHaveClass('custom-tablist');
    });
  });

  describe('TabPanels className', () => {
    it('applies custom className to panels container', () => {
      const { container } = render(
        <Tabs defaultTab="tab1">
          <Tabs.List tabs={basicTabs} />
          <Tabs.Panels className="custom-panels">
            <Tabs.Panel tabId="tab1">Content 1</Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      );

      expect(container.querySelector('.custom-panels')).toBeInTheDocument();
    });
  });

  describe('Context Error', () => {
    it('throws error when Tab is used outside Tabs', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<Tabs.List tabs={basicTabs} />);
      }).toThrow('Tabs compound components must be used within a Tabs component');

      consoleSpy.mockRestore();
    });
  });
});
