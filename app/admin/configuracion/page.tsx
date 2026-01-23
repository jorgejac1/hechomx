'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Settings,
  ArrowLeft,
  Store,
  CreditCard,
  Bell,
  Shield,
  Mail,
  Palette,
  Save,
  Loader2,
  ChevronRight,
  RotateCcw,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants/routes';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import ConfirmActionModal from '@/components/common/ConfirmActionModal';
import { useSettings } from '@/hooks/admin/useSettings';
import { useToast } from '@/contexts/ToastContext';
import { useMaintenance } from '@/components/providers/MaintenanceProvider';

type SettingsSection =
  | 'general'
  | 'payments'
  | 'notifications'
  | 'security'
  | 'email'
  | 'appearance';

export default function AdminConfiguracionPage() {
  const router = useRouter();
  const { isAdmin, isLoading: authLoading } = useAuth();
  const [activeSection, setActiveSection] = useState<SettingsSection>('general');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showMaintenanceConfirm, setShowMaintenanceConfirm] = useState(false);
  const [testingEmail, setTestingEmail] = useState(false);

  const toast = useToast();
  const { toggleMaintenance } = useMaintenance();
  const {
    settings,
    isLoading,
    isSaving,
    hasChanges,
    validationErrors,
    updateSection,
    save,
    reset,
    testEmail,
  } = useSettings();

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push(ROUTES.HOME);
    }
  }, [authLoading, isAdmin, router]);

  // Warn about unsaved changes on page leave
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  const handleSave = async () => {
    const result = await save();
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleReset = async () => {
    const result = await reset();
    setShowResetConfirm(false);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleTestEmail = async () => {
    setTestingEmail(true);
    const result = await testEmail();
    setTestingEmail(false);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleMaintenanceToggle = (enabled: boolean) => {
    if (enabled) {
      setShowMaintenanceConfirm(true);
    } else {
      // Disable maintenance mode via API and local state
      toggleMaintenance(false)
        .then(() => {
          updateSection('general', { maintenanceMode: false });
          toast.success('Modo mantenimiento desactivado');
        })
        .catch(() => {
          toast.error('Error al desactivar modo mantenimiento');
        });
    }
  };

  const confirmMaintenanceMode = async () => {
    try {
      await toggleMaintenance(true);
      updateSection('general', { maintenanceMode: true });
      setShowMaintenanceConfirm(false);
      toast.warning('Modo mantenimiento activado. Los usuarios serán redirigidos.');
    } catch {
      toast.error('Error al activar modo mantenimiento');
      setShowMaintenanceConfirm(false);
    }
  };

  const sections = [
    { id: 'general' as const, label: 'General', icon: Store },
    { id: 'payments' as const, label: 'Pagos', icon: CreditCard },
    { id: 'notifications' as const, label: 'Notificaciones', icon: Bell },
    { id: 'security' as const, label: 'Seguridad', icon: Shield },
    { id: 'email' as const, label: 'Email', icon: Mail },
    { id: 'appearance' as const, label: 'Apariencia', icon: Palette },
  ];

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={ROUTES.ADMIN}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Panel
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Settings className="w-8 h-8 text-purple-600" />
                <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
                {hasChanges && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
                    Sin guardar
                  </span>
                )}
              </div>
              <p className="text-gray-600">Administra la configuración de la plataforma</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(true)}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
              >
                <RotateCcw className="w-4 h-4" />
                Restablecer
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || !hasChanges}
                className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition border-b border-gray-100 last:border-0 ${
                      isActive
                        ? 'bg-purple-50 text-purple-700 border-l-4 border-l-purple-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 p-6">
            {/* General Settings */}
            {activeSection === 'general' && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-6">Configuración General</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Sitio
                    </label>
                    <input
                      type="text"
                      value={settings.general.siteName}
                      onChange={(e) => updateSection('general', { siteName: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                        validationErrors['general.siteName'] ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {validationErrors['general.siteName'] && (
                      <p className="mt-1 text-sm text-red-600">
                        {validationErrors['general.siteName']}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción del Sitio
                    </label>
                    <textarea
                      value={settings.general.siteDescription}
                      onChange={(e) =>
                        updateSection('general', { siteDescription: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-amber-800">Modo Mantenimiento</p>
                          <p className="text-sm text-amber-600">
                            Activar esto impedirá el acceso a todos los usuarios excepto
                            administradores.
                          </p>
                        </div>
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings.general.maintenanceMode}
                      onChange={handleMaintenanceToggle}
                      label="Modo Mantenimiento"
                      description="Muestra una página de mantenimiento a los visitantes"
                    />
                    <ToggleSwitch
                      enabled={settings.general.allowRegistrations}
                      onChange={(v) => updateSection('general', { allowRegistrations: v })}
                      label="Permitir Registros"
                      description="Permite que nuevos usuarios se registren"
                    />
                    <ToggleSwitch
                      enabled={settings.general.requireEmailVerification}
                      onChange={(v) => updateSection('general', { requireEmailVerification: v })}
                      label="Verificación de Email"
                      description="Requiere verificación de email para nuevos usuarios"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payments Settings */}
            {activeSection === 'payments' && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-6">Configuración de Pagos</h2>

                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monto Mínimo de Pedido (MXN)
                      </label>
                      <input
                        type="number"
                        value={settings.payments.minOrderAmount}
                        onChange={(e) =>
                          updateSection('payments', { minOrderAmount: Number(e.target.value) })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comisión de Plataforma (%)
                      </label>
                      <input
                        type="number"
                        value={settings.payments.platformCommission}
                        onChange={(e) =>
                          updateSection('payments', { platformCommission: Number(e.target.value) })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-medium text-gray-900 mb-4">Métodos de Pago</h3>
                    <ToggleSwitch
                      enabled={settings.payments.stripeEnabled}
                      onChange={(v) => updateSection('payments', { stripeEnabled: v })}
                      label="Stripe"
                      description="Tarjetas de crédito y débito internacionales"
                    />
                    <ToggleSwitch
                      enabled={settings.payments.paypalEnabled}
                      onChange={(v) => updateSection('payments', { paypalEnabled: v })}
                      label="PayPal"
                      description="Pagos con cuenta PayPal"
                    />
                    <ToggleSwitch
                      enabled={settings.payments.mercadoPagoEnabled}
                      onChange={(v) => updateSection('payments', { mercadoPagoEnabled: v })}
                      label="Mercado Pago"
                      description="OXXO, SPEI y tarjetas mexicanas"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeSection === 'notifications' && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Configuración de Notificaciones
                </h2>

                <ToggleSwitch
                  enabled={settings.notifications.emailNotifications}
                  onChange={(v) => updateSection('notifications', { emailNotifications: v })}
                  label="Notificaciones por Email"
                  description="Habilita el envío de emails de notificación"
                />
                <ToggleSwitch
                  enabled={settings.notifications.newOrderNotifications}
                  onChange={(v) => updateSection('notifications', { newOrderNotifications: v })}
                  label="Nuevos Pedidos"
                  description="Notificar cuando se reciba un nuevo pedido"
                />
                <ToggleSwitch
                  enabled={settings.notifications.newSellerNotifications}
                  onChange={(v) => updateSection('notifications', { newSellerNotifications: v })}
                  label="Nuevos Vendedores"
                  description="Notificar cuando un vendedor se registre"
                />
                <ToggleSwitch
                  enabled={settings.notifications.lowStockAlerts}
                  onChange={(v) => updateSection('notifications', { lowStockAlerts: v })}
                  label="Alertas de Stock Bajo"
                  description="Notificar cuando un producto tenga stock bajo"
                />
                <ToggleSwitch
                  enabled={settings.notifications.weeklyReports}
                  onChange={(v) => updateSection('notifications', { weeklyReports: v })}
                  label="Reportes Semanales"
                  description="Enviar resumen semanal de ventas y actividad"
                />
              </div>
            )}

            {/* Security Settings */}
            {activeSection === 'security' && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-6">Configuración de Seguridad</h2>

                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tiempo de Sesión (horas)
                      </label>
                      <input
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) =>
                          updateSection('security', { sessionTimeout: Number(e.target.value) })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Intentos de Login Máximos
                      </label>
                      <input
                        type="number"
                        value={settings.security.maxLoginAttempts}
                        onChange={(e) =>
                          updateSection('security', { maxLoginAttempts: Number(e.target.value) })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <ToggleSwitch
                      enabled={settings.security.twoFactorRequired}
                      onChange={(v) => updateSection('security', { twoFactorRequired: v })}
                      label="Autenticación de Dos Factores"
                      description="Requiere 2FA para todos los administradores"
                    />
                    <ToggleSwitch
                      enabled={settings.security.requireStrongPasswords}
                      onChange={(v) => updateSection('security', { requireStrongPasswords: v })}
                      label="Contraseñas Fuertes"
                      description="Requiere contraseñas con mayúsculas, números y símbolos"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email Settings */}
            {activeSection === 'email' && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-6">Configuración de Email</h2>

                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Servidor SMTP
                      </label>
                      <input
                        type="text"
                        value={settings.email.smtpHost}
                        onChange={(e) => updateSection('email', { smtpHost: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Puerto SMTP
                      </label>
                      <input
                        type="number"
                        value={settings.email.smtpPort}
                        onChange={(e) =>
                          updateSection('email', { smtpPort: Number(e.target.value) })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email del Remitente
                      </label>
                      <input
                        type="email"
                        value={settings.email.senderEmail}
                        onChange={(e) => updateSection('email', { senderEmail: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre del Remitente
                      </label>
                      <input
                        type="text"
                        value={settings.email.senderName}
                        onChange={(e) => updateSection('email', { senderName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleTestEmail}
                    disabled={testingEmail}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
                  >
                    {testingEmail ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        Enviar Email de Prueba
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeSection === 'appearance' && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Configuración de Apariencia
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color Principal
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={settings.appearance.primaryColor}
                        onChange={(e) =>
                          updateSection('appearance', { primaryColor: e.target.value })
                        }
                        className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.appearance.primaryColor}
                        onChange={(e) =>
                          updateSection('appearance', { primaryColor: e.target.value })
                        }
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <ToggleSwitch
                      enabled={settings.appearance.darkModeEnabled}
                      onChange={(v) => updateSection('appearance', { darkModeEnabled: v })}
                      label="Modo Oscuro"
                      description="Habilita la opción de modo oscuro para usuarios"
                    />
                    <ToggleSwitch
                      enabled={settings.appearance.showAnnouncements}
                      onChange={(v) => updateSection('appearance', { showAnnouncements: v })}
                      label="Mostrar Anuncios"
                      description="Muestra el banner de anuncios en la página principal"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <ConfirmActionModal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleReset}
        title="Restablecer Configuración"
        message="¿Estás seguro de que deseas restablecer toda la configuración a los valores por defecto? Esta acción no se puede deshacer."
        confirmLabel="Restablecer"
        confirmVariant="warning"
        isLoading={isSaving}
      />

      {/* Maintenance Mode Confirmation */}
      <ConfirmActionModal
        isOpen={showMaintenanceConfirm}
        onClose={() => setShowMaintenanceConfirm(false)}
        onConfirm={confirmMaintenanceMode}
        title="Activar Modo Mantenimiento"
        message="¿Estás seguro de que deseas activar el modo mantenimiento? Todos los usuarios (excepto administradores) serán redirigidos a una página de mantenimiento."
        confirmLabel="Activar"
        confirmVariant="warning"
      />
    </div>
  );
}
