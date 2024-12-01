import { api } from '../../api/api'; // Import your custom axios instance

interface Settings {
  [key: string]: string | number | boolean;
}

export const fetchGeneralSettings = async (): Promise<Settings> => {
  const response = await api.get("/dev/settings");
  return response.data;
};
