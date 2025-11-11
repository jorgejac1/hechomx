'use client';

import { useRequireAuth } from '@/hooks/auth';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import ImpactDashboard from '@/components/profile/ImpactDashboard';

export default function ImpactPage() {
  const { user, isLoading } = useRequireAuth();

  if (isLoading) {
    return <LoadingSpinner size="lg" fullScreen text="Cargando tu impacto..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <ImpactDashboard userEmail={user!.email} />
      </div>
    </div>
  );
}
