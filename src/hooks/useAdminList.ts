import { useQuery } from '@tanstack/react-query';
import { fetchAdminList } from '../services/adminService';

export const useAdminList = () => {
    return useQuery({ queryKey: ['adminList'], queryFn: fetchAdminList });
};
