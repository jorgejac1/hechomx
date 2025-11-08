'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import ImpactDashboard from '@/components/profile/ImpactDashboard';

export default function ImpactPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  if (!isAuthenticated && !isLoading) {
    router.push(ROUTES.LOGIN);
    return null;
  }

  if (isLoading || !user) {
    return <LoadingSpinner size="lg" fullScreen text="Cargando tu impacto..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <ImpactDashboard userEmail={user.email} />
      </div>
    </div>
  );
}
