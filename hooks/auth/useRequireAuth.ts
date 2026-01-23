/**
 * @fileoverview Authentication requirement hook for protected routes
 * Redirects unauthenticated users to login and optionally requires seller profile
 * @module hooks/auth/useRequireAuth
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib';

interface UseRequireAuthOptions {
  redirectTo?: string;
  requireSeller?: boolean;
}

export function useRequireAuth(options: UseRequireAuthOptions = {}) {
  const { redirectTo = ROUTES.LOGIN, requireSeller = false } = options;
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push(redirectTo);
    } else if (requireSeller && user && !user.makerProfile && !isLoading) {
      router.push(ROUTES.HOME);
    }
  }, [isAuthenticated, isLoading, user, router, redirectTo, requireSeller]);

  return { user, isAuthenticated, isLoading };
}
