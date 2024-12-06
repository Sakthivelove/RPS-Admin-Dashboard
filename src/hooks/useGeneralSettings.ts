import { useQuery } from '@tanstack/react-query';
import { fetchGeneralSettings, Settings } from '../services/settings/generalSettings';


export const useGeneralSettings = () => {
  return useQuery<Settings[]>({
    queryKey: ['generalSettings'],
    queryFn: fetchGeneralSettings,
  });
};
