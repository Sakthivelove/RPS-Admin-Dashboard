import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchUsers, UsersResponse } from '../services/userService';

// UseQueryResult from TanStack Query has a generic type for data
export const useUsers = (page: number = 1, limit: number = 10): UseQueryResult<UsersResponse, Error> => {
    return useQuery({
        queryKey: ['users', page, limit],
        queryFn: () => fetchUsers(page, limit)
    });
};
