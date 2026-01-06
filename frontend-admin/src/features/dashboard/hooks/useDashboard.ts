import { useState, useEffect } from 'react';
import api from '../../../api/axios';
import type { DashboardStats } from '../types';

export const useDashboard = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            setLoading(true);
            const { data } = await api.get<DashboardStats>('/orders/stats');
            setStats(data);
        } catch (err) {
            console.error('Error loading dashboard stats:', err);
            setError('Error al cargar las estadísticas');
        } finally {
            setLoading(false);
        }
    };

    return { stats, loading, error, refresh: loadStats };
};
