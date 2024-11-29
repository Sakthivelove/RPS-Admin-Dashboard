import { useQuery } from '@tanstack/react-query';
import { fetchDashboardSettings } from '../services/dashboardSettings';

interface DashboardSettingsData {
  [key: string]: boolean;
}

export const useDashboardSettings = () => {
  return useQuery<DashboardSettingsData>({
    queryKey: ['dashboardSettings'],
    queryFn: fetchDashboardSettings,
  });
};
