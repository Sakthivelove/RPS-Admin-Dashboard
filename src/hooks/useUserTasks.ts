import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchTasks } from '../services/user/taskService';

interface UseUserTasksParams {
    page: number;
    limit: number;
    filter?: string;
    search?: string
}

export const useUserTasks = ({ page, limit, filter, search }: UseUserTasksParams) => {
    return useQuery({
        queryKey: ['tasks', { page, limit, filter, search }], // Include query-specific parameters in the key
        queryFn: () => fetchTasks({ page, limit, filter, search }),
    });
};

