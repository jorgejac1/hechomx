/**
 * @fileoverview Maintenance mode provider that checks and enforces maintenance mode.
 * Redirects non-admin users to the maintenance page when maintenance mode is enabled.
 * Admins can still access the full site during maintenance.
 * @module components/providers/MaintenanceProvider
 */

'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface MaintenanceContextType {
  isMaintenanceMode: boolean;
  isChecking: boolean;
  toggleMaintenance: (enabled: boolean) => Promise<void>;
}

const MaintenanceContext = createContext<MaintenanceContextType | undefined>(undefined);

// Routes that should always be accessible (even during maintenance)
const ALLOWED_ROUTES = ['/mantenimiento', '/iniciar-sesion', '/api', '/admin'];

// Check if a path is allowed during maintenance
function isAllowedRoute(pathname: string): boolean {
  return ALLOWED_ROUTES.some((route) => pathname.startsWith(route));
}

interface MaintenanceProviderProps {
  children: ReactNode;
}

export function MaintenanceProvider({ children }: MaintenanceProviderProps) {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { isAdmin, isLoading: isAuthLoading } = useAuth();

  // Check maintenance status on mount and periodically
  useEffect(() => {
    const checkMaintenance = async () => {
      try {
        const response = await fetch('/api/maintenance');
        const data = await response.json();
        setIsMaintenanceMode(data.maintenanceMode ?? false);
      } catch (error) {
        console.error('[MaintenanceProvider] Failed to check maintenance status:', error);
        setIsMaintenanceMode(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkMaintenance();

    // Re-check every 30 seconds
    const interval = setInterval(checkMaintenance, 30000);
    return () => clearInterval(interval);
  }, []);

  // Redirect logic
  useEffect(() => {
    // Wait for both auth and maintenance check to complete
    if (isChecking || isAuthLoading) return;

    // If maintenance mode is on
    if (isMaintenanceMode) {
      // Allow admins to access everything
      if (isAdmin) return;

      // Allow certain routes
      if (isAllowedRoute(pathname)) return;

      // Redirect everyone else to maintenance page
      router.push('/mantenimiento');
    } else {
      // If maintenance is off and user is on maintenance page, redirect to home
      if (pathname === '/mantenimiento') {
        router.push('/');
      }
    }
  }, [isMaintenanceMode, isAdmin, isAuthLoading, isChecking, pathname, router]);

  // Toggle maintenance mode (for admin use)
  const toggleMaintenance = async (enabled: boolean) => {
    try {
      const response = await fetch('/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled }),
      });
      const data = await response.json();

      if (data.success) {
        setIsMaintenanceMode(data.maintenanceMode);
      }
    } catch (error) {
      console.error('[MaintenanceProvider] Failed to toggle maintenance:', error);
      throw error;
    }
  };

  return (
    <MaintenanceContext.Provider value={{ isMaintenanceMode, isChecking, toggleMaintenance }}>
      {children}
    </MaintenanceContext.Provider>
  );
}

export function useMaintenance() {
  const context = useContext(MaintenanceContext);
  if (context === undefined) {
    throw new Error('useMaintenance must be used within a MaintenanceProvider');
  }
  return context;
}
