import { useQuery } from '@tanstack/react-query';
import { getDashboardData } from '../services/dashboardService';

export const useDashboardData = () => {
    return useQuery({ queryKey: ['dashboard'], queryFn: getDashboardData });
};
