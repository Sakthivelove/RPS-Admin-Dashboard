import { api } from "../../api/api";

interface FetchTasksParams {
  page: number;
  limit: number;
  search?: string;
}

export const fetchTasks = async ({ page, limit, search }: FetchTasksParams) => {
  const params: any = { page, limit };
  if (search) params.search = search;

  const response = await api.get('/users/tasks', { params });
  return response.data;
};
