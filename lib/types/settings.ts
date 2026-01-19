// Platform settings type definitions
// Easy to extend and matches typical backend schema

export interface GeneralSettings {
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  allowRegistrations: boolean;
  requireEmailVerification: boolean;
}

export interface PaymentSettings {
  stripeEnabled: boolean;
  paypalEnabled: boolean;
  mercadoPagoEnabled: boolean;
  minOrderAmount: number;
  platformCommission: number; // percentage
}

export interface NotificationSettings {
  emailNotifications: boolean;
  newOrderNotifications: boolean;
  newSellerNotifications: boolean;
  lowStockAlerts: boolean;
  weeklyReports: boolean;
}

export interface SecuritySettings {
  twoFactorRequired: boolean;
  sessionTimeout: number; // hours
  maxLoginAttempts: number;
  requireStrongPasswords: boolean;
}

export interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  senderEmail: string;
  senderName: string;
}

export interface AppearanceSettings {
  primaryColor: string;
  darkModeEnabled: boolean;
  showAnnouncements: boolean;
}

export interface PlatformSettings {
  general: GeneralSettings;
  payments: PaymentSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
  email: EmailSettings;
  appearance: AppearanceSettings;
  updatedAt?: string;
  updatedBy?: string;
}

// Type for section keys only (excludes metadata like updatedAt/updatedBy)
export type SettingsSectionKey =
  | 'general'
  | 'payments'
  | 'notifications'
  | 'security'
  | 'email'
  | 'appearance';

// Map section keys to their settings type
export type SettingsSectionMap = {
  general: GeneralSettings;
  payments: PaymentSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
  email: EmailSettings;
  appearance: AppearanceSettings;
};

// Default settings - used for initial state and reset
export const defaultSettings: PlatformSettings = {
  general: {
    siteName: 'Papalote Market',
    siteDescription: 'Marketplace de artesanías mexicanas auténticas',
    maintenanceMode: false,
    allowRegistrations: true,
    requireEmailVerification: true,
  },
  payments: {
    stripeEnabled: true,
    paypalEnabled: true,
    mercadoPagoEnabled: true,
    minOrderAmount: 100,
    platformCommission: 8,
  },
  notifications: {
    emailNotifications: true,
    newOrderNotifications: true,
    newSellerNotifications: true,
    lowStockAlerts: true,
    weeklyReports: true,
  },
  security: {
    twoFactorRequired: false,
    sessionTimeout: 24,
    maxLoginAttempts: 5,
    requireStrongPasswords: true,
  },
  email: {
    smtpHost: 'smtp.papalote.com',
    smtpPort: 587,
    senderEmail: 'no-reply@papalote.com',
    senderName: 'Papalote Market',
  },
  appearance: {
    primaryColor: '#dc2626',
    darkModeEnabled: false,
    showAnnouncements: true,
  },
};

// Validation schemas (for future Zod integration)
export const settingsValidation = {
  general: {
    siteName: { minLength: 1, maxLength: 100 },
    siteDescription: { maxLength: 500 },
  },
  payments: {
    minOrderAmount: { min: 0, max: 100000 },
    platformCommission: { min: 0, max: 100 },
  },
  security: {
    sessionTimeout: { min: 1, max: 720 },
    maxLoginAttempts: { min: 1, max: 20 },
  },
  email: {
    smtpPort: { min: 1, max: 65535 },
  },
};
