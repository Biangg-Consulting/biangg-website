// hooks/use-recent-activity.ts
import { useState, useEffect } from 'react';
import { api } from '@/services/api/api';

interface Activity {
    id: string;
    title: string;
    description: string;
    icon: string;
    timestamp: string;
}

export const useRecentActivity = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecentActivity = async () => {
            try {
                setLoading(true);
                
                // Buscar dados recentes de várias fontes
                const [documentsRes, bookingsRes, contactsRes] = await Promise.all([
                    api.get('/documents?page=1&pageSize=5&sort=createdAt:desc'),
                    api.get('/bookings?page=1&pageSize=5&sort=createdAt:desc'),
                    api.get('/contacts?page=1&pageSize=5&sort=createdAt:desc')
                ]);

                const recentActivities: Activity[] = [];

                // Processar documentos recentes
                documentsRes.data.documents?.forEach((doc: any) => {
                    recentActivities.push({
                        id: `doc-${doc.id}`,
                        title: `New document uploaded`,
                        description: doc.title,
                        icon: '📄',
                        timestamp: doc.createdAt
                    });
                });

                // Processar bookings recentes
                bookingsRes.data.data?.forEach((booking: any) => {
                    recentActivities.push({
                        id: `booking-${booking.id}`,
                        title: `New booking request`,
                        description: `${booking.name} - ${booking.email}`,
                        icon: '📅',
                        timestamp: booking.createdAt
                    });
                });

                // Processar contactos recentes
                contactsRes.data.data?.forEach((contact: any) => {
                    recentActivities.push({
                        id: `contact-${contact.id}`,
                        title: `New contact message`,
                        description: `${contact.name} - ${contact.email}`,
                        icon: '💬',
                        timestamp: contact.createdAt
                    });
                });

                // Ordenar por timestamp e pegar as 5 mais recentes
                const sortedActivities = recentActivities
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .slice(0, 5);

                setActivities(sortedActivities);

            } catch (err) {
                setError('Failed to fetch recent activity');
                console.error('Recent activity error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentActivity();
    }, []);

    return { activities, loading, error };
};