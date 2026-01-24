/**
 * @fileoverview Common components barrel export.
 * Re-exports all common/shared components for cleaner imports.
 * Usage: import { Button, Card, Modal } from '@/components/common';
 * @module components/common
 */

// =============================================================================
// Common Components - Barrel Export
// =============================================================================
// This file exports all common components for cleaner imports.
// Usage: import { Button, Card, Modal } from '@/components/common';
// =============================================================================

// -----------------------------------------------------------------------------
// Form Components
// -----------------------------------------------------------------------------
export { default as Button } from './Button';
export { default as LoadingButton } from './LoadingButton';
export type { LoadingButtonProps, ButtonVariant, ButtonSize } from './LoadingButton';

export { default as TextInput } from './TextInput';
export { default as Textarea } from './Textarea';
export { default as Select } from './Select';
export { default as Checkbox } from './Checkbox';
export type { CheckboxSize, CheckboxProps } from './Checkbox';

export { default as Radio } from './Radio';
export type { RadioSize, RadioProps } from './Radio';

export { default as RadioGroup } from './RadioGroup';
export type {
  RadioGroupOption,
  RadioGroupSize,
  RadioGroupVariant,
  RadioGroupOrientation,
  RadioGroupProps,
} from './RadioGroup';

export { default as ToggleSwitch } from './ToggleSwitch';

// -----------------------------------------------------------------------------
// Display Components
// -----------------------------------------------------------------------------
export { default as Card } from './Card';
export { default as Badge } from './Badge';
export { default as VerificationBadge } from './VerificationBadge';
export { default as Avatar } from './Avatar';
export type {
  AvatarSize,
  AvatarVariant,
  AvatarStatus,
  AvatarProps,
  AvatarGroupProps,
} from './Avatar';

export { default as Alert } from './Alert';
export type { AlertVariant, AlertLayout, AlertProps } from './Alert';

export { default as Tooltip } from './Tooltip';
export type { TooltipPlacement, TooltipVariant, TooltipSize, TooltipProps } from './Tooltip';

export { default as Popover } from './Popover';
export type { PopoverProps, PopoverPlacement, PopoverTrigger } from './Popover';

export { default as Progress } from './Progress';
export type {
  ProgressSize,
  ProgressVariant,
  ProgressProps,
  CircularProgressProps,
  ProgressSegment,
  MultiProgressProps,
} from './Progress';

export { default as StarRating } from './StarRating';
export { default as Divider } from './Divider';
export type { DividerProps, DividerOrientation, DividerVariant, DividerSize } from './Divider';

export { default as Timeline } from './Timeline';
export type {
  TimelineProps,
  TimelineItem,
  TimelineVariant,
  TimelineSize,
  TimelineItemStatus,
} from './Timeline';

// -----------------------------------------------------------------------------
// Navigation Components
// -----------------------------------------------------------------------------
export { default as Tabs } from './Tabs';
export type {
  TabItem,
  TabsVariant,
  TabsSize,
  TabsProps,
  TabListProps,
  TabPanelProps,
} from './Tabs';

export { default as Breadcrumbs } from './Breadcrumbs';
export { default as Pagination } from './Pagination';
export { default as Stepper } from './Stepper';
export type { Step, StepperProps, StepperSize, StepperOrientation, StepStatus } from './Stepper';

export { default as ScrollToTop } from './ScrollToTop';

// -----------------------------------------------------------------------------
// Overlay Components
// -----------------------------------------------------------------------------
export { default as Modal } from './Modal';
export { default as Drawer } from './Drawer';
export type { DrawerProps, DrawerPosition, DrawerSize } from './Drawer';

export { default as Dropdown } from './Dropdown';
export type {
  DropdownPlacement,
  DropdownVariant,
  DropdownSize,
  DropdownProps,
  DropdownTriggerProps,
  DropdownMenuProps,
  DropdownItemProps,
} from './Dropdown';

export { default as ConfirmActionModal } from './ConfirmActionModal';
export { default as ShareModal } from './ShareModal';

// -----------------------------------------------------------------------------
// Data Components
// -----------------------------------------------------------------------------
export { default as Table } from './Table';
export type { TableColumn, TableProps, TableSize, TableVariant, SortDirection } from './Table';

export { default as DataList } from './DataList';
export type { DataListLayout, DataListSize, DataListProps, DataListItemProps } from './DataList';

export { default as Accordion } from './Accordion';
export type { AccordionVariant, AccordionProps, AccordionItemProps } from './Accordion';

// -----------------------------------------------------------------------------
// Feedback Components
// -----------------------------------------------------------------------------
export { default as EmptyState } from './EmptyState';
export type { EmptyStateProps, EmptyStateAction, EmptyStateSize } from './EmptyState';

// From feedback subdirectory
export { default as LoadingSpinner } from './feedback/LoadingSpinner';
export { default as ErrorState } from './feedback/ErrorState';
export { default as ErrorBoundary } from './feedback/ErrorBoundary';
export { default as Toast } from './feedback/Toast';
export type { ToastType } from './feedback/Toast';

// -----------------------------------------------------------------------------
// Loading Components
// -----------------------------------------------------------------------------
export { default as Skeleton } from './loading/Skeleton';
export { default as CardSkeleton } from './loading/CardSkeleton';
export { default as ImageSkeleton } from './loading/ImageSkeleton';

// -----------------------------------------------------------------------------
// Media Components
// -----------------------------------------------------------------------------
export { default as Carousel } from './media/Carousel';
export { default as MediaViewer } from './media/MediaViewer';
export { default as ThumbnailStrip } from './media/ThumbnailStrip';
export { default as ZoomControls } from './media/ZoomControls';

// Hooks
export { useFocusTrap } from './media/ImageModal';
export type { UseFocusTrapOptions } from './media/ImageModal';

// -----------------------------------------------------------------------------
// File Upload Components
// -----------------------------------------------------------------------------
export { default as FileUpload } from './FileUpload';
export type { FileUploadProps, UploadedFile, FileUploadVariant } from './FileUpload';

// -----------------------------------------------------------------------------
// Virtualized Components (for large datasets)
// -----------------------------------------------------------------------------
export { default as VirtualTable } from './VirtualTable';
export type { VirtualTableProps, TableColumn as VirtualTableColumn } from './VirtualTable';

export { default as VirtualList } from './VirtualList';
export type {
  VirtualListLayout,
  VirtualListSize,
  VirtualListProps,
  VirtualListItemProps,
} from './VirtualList';

// -----------------------------------------------------------------------------
// Performance Components
// -----------------------------------------------------------------------------
export {
  default as LazyLoad,
  createLazyComponent,
  useViewportLazy,
  withLazyLoad,
} from './LazyLoad';
