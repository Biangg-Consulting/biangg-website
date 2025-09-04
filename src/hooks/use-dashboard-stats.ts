import { useState, useEffect } from 'react';
import { api } from '@/services/api/api';

interface DashboardStats {
  totalDocuments: number;
  totalUsers: number;
  totalSubscriptions: number;
  totalContacts: number;
  totalBookings: number;
  totalStudySubscriptions: number;
  pendingBookings: number;
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        const [
          documentsRes,
          usersRes,
          subscriptionsRes,
          contactsRes,
          bookingsRes,
          studySubscriptionsRes
        ] = await Promise.all([
          api.get('/documents?page=1&pageSize=1'),
          api.get('/user?page=1&pageSize=1'),
          api.get('/subscriptions?page=1&pageSize=1'),
          api.get('/contacts?page=1&pageSize=1'),
          api.get('/bookings?page=1&pageSize=100'),
          api.get('/study-subscriptions?page=1&pageSize=1')
        ]);

        const pendingBookingsCount = bookingsRes.data.data?.filter(
          (booking: any) => booking.status === 'PENDING'
        ).length || 0;

        setStats({
          totalDocuments: documentsRes.data.pagination?.total || 0,
          totalUsers: usersRes.data.pagination?.total || 0,
          totalSubscriptions: subscriptionsRes.data.pagination?.total || 0,
          totalContacts: contactsRes.data.pagination?.total || 0,
          totalBookings: bookingsRes.data.pagination?.total || 0,
          totalStudySubscriptions: studySubscriptionsRes.data.pagination?.total || 0,
          pendingBookings: pendingBookingsCount
        });

      } catch (err) {
        setError('Failed to fetch dashboard statistics');
        console.error('Dashboard stats error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};