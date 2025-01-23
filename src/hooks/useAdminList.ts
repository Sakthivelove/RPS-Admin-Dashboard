import { useQuery } from '@tanstack/react-query';
import { fetchAdminList } from '../services/adminService';

export const useAdminList = (page: number, limit: number, search?: string) => {
    return useQuery({
        queryKey: ['adminList', page, limit, search],
        queryFn: () => fetchAdminList(page, limit, search)
    });
};
