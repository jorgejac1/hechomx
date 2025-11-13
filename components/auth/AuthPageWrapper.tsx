'use client';

import { ReactNode } from 'react';
import { useRequireAuth } from '@/hooks/auth';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';

interface AuthPageWrapperProps {
  children: (user: NonNullable<ReturnType<typeof useRequireAuth>['user']>) => ReactNode;
  requireSeller?: boolean;
  loadingText?: string;
}

export default function AuthPageWrapper({
  children,
  requireSeller = false,
  loadingText = 'Cargando...',
}: AuthPageWrapperProps) {
  const { user, isLoading } = useRequireAuth({ requireSeller });

  if (isLoading) {
    return <LoadingSpinner size="lg" fullScreen text={loadingText} />;
  }

  // Don't render if user is null (will redirect via useRequireAuth)
  if (!user) {
    return null;
  }

  // If requireSeller is true, also check for makerProfile
  if (requireSeller && !user.makerProfile) {
    return null;
  }

  return <>{children(user)}</>;
}
