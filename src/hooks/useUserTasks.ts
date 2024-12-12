import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchTasks } from '../services/user/taskService';

interface UseUserTasksParams {
    page: number;
    limit: number;
    filter?: string;
}

export const useUserTasks = ({ page, limit, filter }: UseUserTasksParams) => {
    return useQuery({
        queryKey: ['tasks', { page, limit, filter }], // Include query-specific parameters in the key
        queryFn: () => fetchTasks({ page, limit, filter }),
    });
};

