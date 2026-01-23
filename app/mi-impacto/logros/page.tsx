'use client';

import AuthPageWrapper from '@/components/auth/AuthPageWrapper';
import BuyerAchievements from '@/components/profile/BuyerAchievements';

export default function AchievementsPage() {
  return (
    <AuthPageWrapper loadingText="Cargando tus logros...">
      {(user) => <BuyerAchievements userEmail={user.email} />}
    </AuthPageWrapper>
  );
}
