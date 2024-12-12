import { api } from "../../api/api";

interface FetchTasksParams {
  page: number;
  limit: number;
  filter?: string;
}

export const fetchTasks = async ({ page, limit, filter }: FetchTasksParams) => {
  const params: any = { page, limit,filter }

  const response = await api.get('/users/tasks', { params });
  return response.data;
};
