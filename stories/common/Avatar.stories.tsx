import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Avatar, { AvatarGroup } from '@/components/common/Avatar';
import { User } from 'lucide-react';

/**
 * Avatar component for displaying user profile images and initials.
 * Supports multiple sizes, shapes, online status indicators, and fallback initials.
 */
const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile avatar component supporting images, initials fallback, status indicators, and colored rings. Includes AvatarGroup for stacked displays.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size of the avatar',
    },
    variant: {
      control: 'select',
      options: ['circular', 'rounded', 'square'],
      description: 'Shape variant',
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'busy', 'away', undefined],
      description: 'Online status indicator',
    },
    ring: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'white', 'none'],
      description: 'Border ring color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// With image
export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    name: 'Juan García',
    size: 'lg',
  },
};

// With initials
export const WithInitials: Story = {
  args: {
    name: 'María López',
    size: 'lg',
  },
};

// Default fallback
export const DefaultFallback: Story = {
  args: {
    size: 'lg',
  },
};

// Custom fallback
export const CustomFallback: Story = {
  args: {
    size: 'lg',
    fallback: <User className="w-1/2 h-1/2 text-gray-500" />,
  },
};

// Sizes
export const ExtraSmall: Story = {
  args: { name: 'Ana Martínez', size: 'xs' },
};

export const Small: Story = {
  args: { name: 'Ana Martínez', size: 'sm' },
};

export const Medium: Story = {
  args: { name: 'Ana Martínez', size: 'md' },
};

export const Large: Story = {
  args: { name: 'Ana Martínez', size: 'lg' },
};

export const ExtraLarge: Story = {
  args: { name: 'Ana Martínez', size: 'xl' },
};

export const DoubleExtraLarge: Story = {
  args: { name: 'Ana Martínez', size: '2xl' },
};

// Variants
export const Circular: Story = {
  args: {
    name: 'Pedro Sánchez',
    size: 'lg',
    variant: 'circular',
  },
};

export const Rounded: Story = {
  args: {
    name: 'Pedro Sánchez',
    size: 'lg',
    variant: 'rounded',
  },
};

export const Square: Story = {
  args: {
    name: 'Pedro Sánchez',
    size: 'lg',
    variant: 'square',
  },
};

// Status indicators
export const StatusOnline: Story = {
  args: {
    name: 'Sofía Ruiz',
    size: 'lg',
    status: 'online',
  },
};

export const StatusOffline: Story = {
  args: {
    name: 'Sofía Ruiz',
    size: 'lg',
    status: 'offline',
  },
};

export const StatusBusy: Story = {
  args: {
    name: 'Sofía Ruiz',
    size: 'lg',
    status: 'busy',
  },
};

export const StatusAway: Story = {
  args: {
    name: 'Sofía Ruiz',
    size: 'lg',
    status: 'away',
  },
};

// Ring colors
export const RingPrimary: Story = {
  args: {
    name: 'Carlos Hernández',
    size: 'lg',
    ring: 'primary',
  },
};

export const RingSuccess: Story = {
  args: {
    name: 'Carlos Hernández',
    size: 'lg',
    ring: 'success',
  },
};

export const RingWarning: Story = {
  args: {
    name: 'Carlos Hernández',
    size: 'lg',
    ring: 'warning',
  },
};

export const RingDanger: Story = {
  args: {
    name: 'Carlos Hernández',
    size: 'lg',
    ring: 'danger',
  },
};

// Clickable
export const Clickable: Story = {
  args: {
    name: 'Elena Torres',
    size: 'lg',
    onClick: () => alert('Avatar clicked!'),
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar name="Usuario" size="xs" />
      <Avatar name="Usuario" size="sm" />
      <Avatar name="Usuario" size="md" />
      <Avatar name="Usuario" size="lg" />
      <Avatar name="Usuario" size="xl" />
      <Avatar name="Usuario" size="2xl" />
    </div>
  ),
};

// All status indicators
export const AllStatuses: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Online" size="lg" status="online" />
      <Avatar name="Offline" size="lg" status="offline" />
      <Avatar name="Busy" size="lg" status="busy" />
      <Avatar name="Away" size="lg" status="away" />
    </div>
  ),
};

// Avatar Group
export const Group: Story = {
  render: () => (
    <AvatarGroup max={4} size="md">
      <Avatar name="Ana García" />
      <Avatar name="Juan Pérez" />
      <Avatar name="María López" />
      <Avatar name="Carlos Ruiz" />
      <Avatar name="Elena Torres" />
      <Avatar name="Pedro Sánchez" />
    </AvatarGroup>
  ),
};

export const GroupSmall: Story = {
  render: () => (
    <AvatarGroup max={3} size="sm">
      <Avatar name="Ana García" />
      <Avatar name="Juan Pérez" />
      <Avatar name="María López" />
      <Avatar name="Carlos Ruiz" />
      <Avatar name="Elena Torres" />
    </AvatarGroup>
  ),
};

export const GroupLarge: Story = {
  render: () => (
    <AvatarGroup max={5} size="lg">
      <Avatar name="Ana García" />
      <Avatar name="Juan Pérez" />
      <Avatar name="María López" />
      <Avatar name="Carlos Ruiz" />
      <Avatar name="Elena Torres" />
      <Avatar name="Pedro Sánchez" />
      <Avatar name="Sofía Hernández" />
    </AvatarGroup>
  ),
};

// Real-world: Artisan profile
export const ArtisanProfile: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop',
    name: 'Artesanías Don Pedro',
    size: 'xl',
    ring: 'success',
    status: 'online',
  },
};

// Different initials colors
export const InitialsColors: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Ana García" size="lg" />
      <Avatar name="Bernardo Cruz" size="lg" />
      <Avatar name="Carmen Díaz" size="lg" />
      <Avatar name="Diana Estrada" size="lg" />
      <Avatar name="Eduardo Flores" size="lg" />
      <Avatar name="Felipe González" size="lg" />
    </div>
  ),
};
