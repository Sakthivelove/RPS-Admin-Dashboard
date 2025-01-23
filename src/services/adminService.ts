import { api } from "../api/api";

interface Params {
  page: number,
  limit: number,
  search?: string
}

export const fetchAdminList = async (page: number, limit: number, search?: string) => {
  try {
    const response = await api.get('/settings/adminlist', {
      params: { page, limit, search }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch admin list');
  }
};
