import { useQuery } from '@tanstack/react-query';
import { fetchDashboardSettings } from '../services/settings/dashboardSettings';

interface DashboardSettingsData {
  [key: string]: boolean;
}

export const useDashboardSettings = () => {
  return useQuery<DashboardSettingsData>({
    queryKey: ['dashboardSettings'],
    queryFn: fetchDashboardSettings,
  });
};
