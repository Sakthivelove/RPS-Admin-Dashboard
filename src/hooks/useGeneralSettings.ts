import { useQuery } from '@tanstack/react-query';
import { fetchGeneralSettings } from '../services/settings/generalSettings';

interface Settings {
  [key: string]: string | number | boolean;
}

export const useGeneralSettings = () => {
  return useQuery<Settings>({
    queryKey: ['generalSettings'],
    queryFn: fetchGeneralSettings,
  });
};
