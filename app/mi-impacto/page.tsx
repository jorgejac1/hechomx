'use client';

import AuthPageWrapper from '@/components/auth/AuthPageWrapper';
import ImpactDashboard from '@/components/profile/ImpactDashboard';

export default function ImpactPage() {
  return (
    <AuthPageWrapper loadingText="Cargando tu impacto...">
      {(user) => (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4">
          <div className="max-w-7xl mx-auto">
            <ImpactDashboard userEmail={user.email} />
          </div>
        </div>
      )}
    </AuthPageWrapper>
  );
}
