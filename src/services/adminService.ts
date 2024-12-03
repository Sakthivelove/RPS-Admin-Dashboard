import { api } from "../api/api";

export const fetchAdminList = async () => {
  try {
    const response = await api.get('/settings/adminlist');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch admin list');
  }
};
