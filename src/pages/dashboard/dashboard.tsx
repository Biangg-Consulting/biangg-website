import { useAuth } from '@/contexts/auth/auth-context';
import { DashboardProvider } from './contexts/dashboard/dashboard-context';
import { DashboardLayout } from './layout/dashboard-layout';

export const DashboardPage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DashboardProvider user={user}>
      <DashboardLayout />
    </DashboardProvider>
  );
};