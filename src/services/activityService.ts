import { api } from "../api/api";

// Define the Activity interface
interface Activity {
  id: number;
  telegramId: string;
  action: string;
  ip: string;
  status: string;
  device: string;
  reason: string | null;
  createdAt: string;
  updatedAt: string;
}


export const fetchActivities = async (page?: number, limit?: number, search?: string): Promise<{ activities: Activity[]; total: number }> => {
  const response = await api.get('/dev/activities', {
    params: { page, limit, search },
  });
  return response.data;
};