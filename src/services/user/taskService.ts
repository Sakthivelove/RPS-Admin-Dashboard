import { api } from "../../api/api";

interface FetchTasksParams {
  page: number;
  limit: number;
  filter?: string;
  search?: string
}

export const fetchTasks = async ({ page, limit, filter, search }: FetchTasksParams) => {
  const params: any = { page, limit, filter, search }

  const response = await api.get('/users/tasks', { params });
  return response.data;
};
