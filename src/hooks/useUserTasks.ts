import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchTasks } from '../services/taskService';

interface UseUserTasksParams {
    page: number;
    limit: number;
    search?: string;
}

export const useUserTasks = ({ page, limit, search }: UseUserTasksParams) => {
    return useQuery({
        queryKey: ['tasks', { page, limit, search }], // Include query-specific parameters in the key
        queryFn: () => fetchTasks({ page, limit, search }),
    });
};

