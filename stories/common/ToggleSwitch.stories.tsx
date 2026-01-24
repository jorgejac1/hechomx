import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import ToggleSwitch from '@/components/common/ToggleSwitch';

/**
 * ToggleSwitch component for binary on/off settings.
 * Displays a switch control with label and optional description text.
 */
const meta: Meta<typeof ToggleSwitch> = {
  title: 'Inputs/ToggleSwitch',
  component: ToggleSwitch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A toggle switch component for on/off settings. Supports multiple sizes, labels, descriptions, and disabled states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    enabled: {
      control: 'boolean',
      description: 'Whether the toggle is on',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  render: function DefaultToggle() {
    const [enabled, setEnabled] = useState(false);
    return (
      <div className="w-80">
        <ToggleSwitch enabled={enabled} onChange={setEnabled} label="Notificaciones" />
      </div>
    );
  },
};

// Enabled
export const Enabled: Story = {
  render: function EnabledToggle() {
    const [enabled, setEnabled] = useState(true);
    return (
      <div className="w-80">
        <ToggleSwitch enabled={enabled} onChange={setEnabled} label="Notificaciones" />
      </div>
    );
  },
};

// With description
export const WithDescription: Story = {
  render: function WithDescToggle() {
    const [enabled, setEnabled] = useState(true);
    return (
      <div className="w-80">
        <ToggleSwitch
          enabled={enabled}
          onChange={setEnabled}
          label="Notificaciones por email"
          description="Recibe actualizaciones sobre tus pedidos y ofertas especiales."
        />
      </div>
    );
  },
};

// Sizes
export const SizeSmall: Story = {
  render: function SmallToggle() {
    const [enabled, setEnabled] = useState(true);
    return (
      <div className="w-80">
        <ToggleSwitch enabled={enabled} onChange={setEnabled} label="Toggle pequeño" size="sm" />
      </div>
    );
  },
};

export const SizeMedium: Story = {
  render: function MediumToggle() {
    const [enabled, setEnabled] = useState(true);
    return (
      <div className="w-80">
        <ToggleSwitch enabled={enabled} onChange={setEnabled} label="Toggle mediano" size="md" />
      </div>
    );
  },
};

export const SizeLarge: Story = {
  render: function LargeToggle() {
    const [enabled, setEnabled] = useState(true);
    return (
      <div className="w-80">
        <ToggleSwitch enabled={enabled} onChange={setEnabled} label="Toggle grande" size="lg" />
      </div>
    );
  },
};

// Disabled off
export const DisabledOff: Story = {
  render: () => (
    <div className="w-80">
      <ToggleSwitch enabled={false} onChange={() => {}} label="Opción deshabilitada" disabled />
    </div>
  ),
};

// Disabled on
export const DisabledOn: Story = {
  render: () => (
    <div className="w-80">
      <ToggleSwitch enabled={true} onChange={() => {}} label="Opción deshabilitada" disabled />
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: function AllSizesToggle() {
    const [sm, setSm] = useState(true);
    const [md, setMd] = useState(true);
    const [lg, setLg] = useState(true);

    return (
      <div className="w-80">
        <ToggleSwitch enabled={sm} onChange={setSm} label="Pequeño" size="sm" />
        <ToggleSwitch enabled={md} onChange={setMd} label="Mediano" size="md" />
        <ToggleSwitch enabled={lg} onChange={setLg} label="Grande" size="lg" />
      </div>
    );
  },
};

// Settings panel example
export const SettingsPanel: Story = {
  render: function SettingsExample() {
    const [notifications, setNotifications] = useState(true);
    const [emails, setEmails] = useState(true);
    const [sms, setSms] = useState(false);
    const [marketing, setMarketing] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    return (
      <div className="w-96 p-4 border rounded-lg bg-white">
        <h3 className="font-semibold text-gray-900 mb-4">Configuración</h3>

        <ToggleSwitch
          enabled={notifications}
          onChange={setNotifications}
          label="Notificaciones push"
          description="Recibe alertas en tiempo real sobre tus pedidos."
        />

        <ToggleSwitch
          enabled={emails}
          onChange={setEmails}
          label="Notificaciones por email"
          description="Actualizaciones de pedidos y confirmaciones."
        />

        <ToggleSwitch
          enabled={sms}
          onChange={setSms}
          label="Notificaciones SMS"
          description="Alertas de envío directamente a tu teléfono."
        />

        <ToggleSwitch
          enabled={marketing}
          onChange={setMarketing}
          label="Ofertas y promociones"
          description="Descuentos exclusivos y novedades de artesanos."
        />

        <ToggleSwitch
          enabled={darkMode}
          onChange={setDarkMode}
          label="Modo oscuro"
          description="Cambia la apariencia de la aplicación."
        />
      </div>
    );
  },
};

// Privacy settings example
export const PrivacySettings: Story = {
  render: function PrivacyExample() {
    const [profilePublic, setProfilePublic] = useState(true);
    const [showActivity, setShowActivity] = useState(false);
    const [allowMessages, setAllowMessages] = useState(true);

    return (
      <div className="w-96 p-4 border rounded-lg bg-white">
        <h3 className="font-semibold text-gray-900 mb-4">Privacidad</h3>

        <ToggleSwitch
          enabled={profilePublic}
          onChange={setProfilePublic}
          label="Perfil público"
          description="Permite que otros usuarios vean tu perfil."
        />

        <ToggleSwitch
          enabled={showActivity}
          onChange={setShowActivity}
          label="Mostrar actividad"
          description="Muestra tus compras y reseñas recientes."
        />

        <ToggleSwitch
          enabled={allowMessages}
          onChange={setAllowMessages}
          label="Permitir mensajes"
          description="Recibe mensajes de artesanos y compradores."
        />
      </div>
    );
  },
};

// Seller dashboard example
export const SellerDashboard: Story = {
  render: function SellerExample() {
    const [shopOpen, setShopOpen] = useState(true);
    const [instantMessages, setInstantMessages] = useState(true);
    const [orderAlerts, setOrderAlerts] = useState(true);
    const [vacationMode, setVacationMode] = useState(false);

    return (
      <div className="w-96 p-4 border rounded-lg bg-white">
        <h3 className="font-semibold text-gray-900 mb-4">Panel de vendedor</h3>

        <ToggleSwitch
          enabled={shopOpen}
          onChange={setShopOpen}
          label="Tienda abierta"
          description="Los clientes pueden realizar compras."
        />

        <ToggleSwitch
          enabled={instantMessages}
          onChange={setInstantMessages}
          label="Mensajes instantáneos"
          description="Recibe notificaciones de mensajes en tiempo real."
        />

        <ToggleSwitch
          enabled={orderAlerts}
          onChange={setOrderAlerts}
          label="Alertas de pedidos"
          description="Notificación inmediata de nuevos pedidos."
        />

        <ToggleSwitch
          enabled={vacationMode}
          onChange={setVacationMode}
          label="Modo vacaciones"
          description="Pausar temporalmente la recepción de pedidos."
        />
      </div>
    );
  },
};

// Compact list example
export const CompactList: Story = {
  render: function CompactExample() {
    const [opt1, setOpt1] = useState(true);
    const [opt2, setOpt2] = useState(false);
    const [opt3, setOpt3] = useState(true);
    const [opt4, setOpt4] = useState(false);

    return (
      <div className="w-72">
        <ToggleSwitch enabled={opt1} onChange={setOpt1} label="Opción 1" size="sm" />
        <ToggleSwitch enabled={opt2} onChange={setOpt2} label="Opción 2" size="sm" />
        <ToggleSwitch enabled={opt3} onChange={setOpt3} label="Opción 3" size="sm" />
        <ToggleSwitch enabled={opt4} onChange={setOpt4} label="Opción 4" size="sm" />
      </div>
    );
  },
};
