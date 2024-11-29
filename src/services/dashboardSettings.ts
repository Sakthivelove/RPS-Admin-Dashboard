import { api } from '../api'; // Import your custom axios instance

export const fetchDashboardSettings = async () => {
  const response = await api.get("/dev/settings/dashboard");
  return response.data;
};
