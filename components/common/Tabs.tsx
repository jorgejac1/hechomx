/**
 * @fileoverview Tabs component system for organizing content into switchable panels.
 * Supports multiple visual variants (underline, pills, boxed), icons, badges, and counts.
 * Provides compound components: Tabs, Tabs.List, Tabs.Panel, Tabs.Panels.
 * @module components/common/Tabs
 */

'use client';

import { ReactNode, createContext, useContext, useState, useCallback, useId } from 'react';
import { type LucideIcon } from 'lucide-react';

/**
 * Available tabs visual variants
 * @typedef {'underline' | 'pills' | 'boxed'} TabsVariant
 */
type TabsVariant = 'underline' | 'pills' | 'boxed';

/**
 * Available tabs sizes
 * @typedef {'sm' | 'md' | 'lg'} TabsSize
 */
type TabsSize = 'sm' | 'md' | 'lg';

/**
 * Configuration for a single tab item
 * @interface TabItem
 */
interface TabItem {
  /** Unique identifier for the tab */
  id: string;
  /** Display label text */
  label: string;
  /** Optional Lucide icon component to display */
  icon?: LucideIcon;
  /** Optional count number displayed in parentheses */
  count?: number;
  /** Optional notification badge (displayed as pill, different from count) */
  badge?: number;
  /** Whether this tab is disabled and non-interactive */
  disabled?: boolean;
}

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
  variant: TabsVariant;
  size: TabsSize;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within a Tabs component');
  }
  return context;
}

// Variant styles with dark mode support
const variantStyles: Record<
  TabsVariant,
  {
    container: string;
    tab: string;
    activeTab: string;
    inactiveTab: string;
  }
> = {
  underline: {
    container: 'border-b border-gray-200 dark:border-gray-700',
    tab: 'px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 -mb-px transition-colors',
    activeTab: 'border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-400',
    inactiveTab:
      'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600',
  },
  pills: {
    container: 'bg-gray-100 dark:bg-gray-800 rounded-lg p-1 inline-flex',
    tab: 'px-4 py-2 font-medium text-sm whitespace-nowrap rounded-md transition-all',
    activeTab: 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm',
    inactiveTab: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200',
  },
  boxed: {
    container: 'border border-gray-200 dark:border-gray-700 rounded-lg p-1 inline-flex',
    tab: 'px-4 py-2 font-medium text-sm whitespace-nowrap rounded-md transition-all',
    activeTab: 'bg-primary-600 text-white',
    inactiveTab:
      'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800',
  },
};

// Size styles
const sizeStyles: Record<TabsSize, { tab: string; icon: string; badge: string }> = {
  sm: { tab: 'px-3 py-2 text-xs', icon: 'w-3.5 h-3.5', badge: 'text-[10px] min-w-4 h-4 px-1' },
  md: { tab: 'px-4 py-3 text-sm', icon: 'w-4 h-4', badge: 'text-xs min-w-5 h-5 px-1.5' },
  lg: { tab: 'px-6 py-4 text-base', icon: 'w-5 h-5', badge: 'text-sm min-w-6 h-6 px-2' },
};

// ========== Tab Component ==========
interface TabProps {
  /** Tab configuration */
  tab: TabItem;
  /** Additional CSS classes */
  className?: string;
}

function Tab({ tab, className = '' }: TabProps) {
  const { activeTab, setActiveTab, variant, size, baseId } = useTabsContext();
  const isActive = activeTab === tab.id;
  const styles = variantStyles[variant];
  const sizes = sizeStyles[size];
  const Icon = tab.icon;

  const handleClick = useCallback(() => {
    if (!tab.disabled) {
      setActiveTab(tab.id);
    }
  }, [tab.id, tab.disabled, setActiveTab]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!tab.disabled) {
          setActiveTab(tab.id);
        }
      }
    },
    [tab.id, tab.disabled, setActiveTab]
  );

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${tab.id}`}
      aria-selected={isActive}
      aria-controls={`${baseId}-panel-${tab.id}`}
      aria-disabled={tab.disabled}
      tabIndex={isActive ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={tab.disabled}
      className={`
        ${styles.tab}
        ${sizes.tab}
        ${isActive ? styles.activeTab : styles.inactiveTab}
        ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      <span className="flex items-center gap-2">
        {Icon && <Icon className={sizes.icon} aria-hidden="true" />}
        <span>{tab.label}</span>
        {tab.count !== undefined && tab.count !== null && (
          <span className="text-current opacity-70">({tab.count})</span>
        )}
        {tab.badge !== undefined && tab.badge !== null && tab.badge > 0 && (
          <span
            className={`
              inline-flex items-center justify-center font-bold text-white bg-green-500 rounded-full animate-pulse
              ${sizes.badge}
            `}
          >
            {tab.badge > 99 ? '99+' : tab.badge}
          </span>
        )}
      </span>
    </button>
  );
}

// ========== TabList Component ==========
interface TabListProps {
  /** Array of tab items */
  tabs: TabItem[];
  /** Additional CSS classes for the container */
  className?: string;
  /** Whether tabs should stretch to fill available space */
  fullWidth?: boolean;
}

function TabList({ tabs, className = '', fullWidth = false }: TabListProps) {
  const { variant, baseId } = useTabsContext();
  const styles = variantStyles[variant];

  return (
    <div
      role="tablist"
      aria-label="Tabs"
      id={`${baseId}-tablist`}
      className={`
        ${styles.container}
        ${fullWidth ? 'flex w-full' : 'inline-flex'}
        overflow-x-auto
        ${className}
      `}
    >
      {tabs.map((tab) => (
        <Tab key={tab.id} tab={tab} className={fullWidth ? 'flex-1 justify-center' : ''} />
      ))}
    </div>
  );
}

// ========== TabPanel Component ==========
interface TabPanelProps {
  /** Tab ID this panel corresponds to */
  tabId: string;
  /** Panel content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether to keep panel mounted when not active (default: false) */
  keepMounted?: boolean;
}

function TabPanel({ tabId, children, className = '', keepMounted = false }: TabPanelProps) {
  const { activeTab, baseId } = useTabsContext();
  const isActive = activeTab === tabId;

  if (!isActive && !keepMounted) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${tabId}`}
      aria-labelledby={`${baseId}-tab-${tabId}`}
      hidden={!isActive}
      tabIndex={0}
      className={className}
    >
      {children}
    </div>
  );
}

// ========== TabPanels Component ==========
interface TabPanelsProps {
  /** Tab panel content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

function TabPanels({ children, className = '' }: TabPanelsProps) {
  return <div className={className}>{children}</div>;
}

// ========== Main Tabs Component ==========
interface TabsProps {
  /** Currently active tab ID */
  activeTab?: string;
  /** Default active tab (uncontrolled mode) */
  defaultTab?: string;
  /** Callback when active tab changes */
  onTabChange?: (tabId: string) => void;
  /** Visual variant */
  variant?: TabsVariant;
  /** Size variant */
  size?: TabsSize;
  /** Children (TabList and TabPanels) */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

function Tabs({
  activeTab: controlledActiveTab,
  defaultTab,
  onTabChange,
  variant = 'underline',
  size = 'md',
  children,
  className = '',
}: TabsProps) {
  const baseId = useId();
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab || '');

  // Determine if controlled or uncontrolled
  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

  const setActiveTab = useCallback(
    (tabId: string) => {
      if (!isControlled) {
        setInternalActiveTab(tabId);
      }
      onTabChange?.(tabId);
    },
    [isControlled, onTabChange]
  );

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, variant, size, baseId }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

// Attach compound components
Tabs.List = TabList;
Tabs.Panel = TabPanel;
Tabs.Panels = TabPanels;

export default Tabs;
export type { TabItem, TabsVariant, TabsSize, TabsProps, TabListProps, TabPanelProps };
