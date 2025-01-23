import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchUsers, UsersResponse } from '../services/user/userService';

// UseQueryResult from TanStack Query has a generic type for data
export const useUsers = (
  page: number,
  limit: number,
  search?: string
): UseQueryResult<UsersResponse, Error> => {
  return useQuery<UsersResponse, Error>({
    queryKey: ['users', page, limit, search], // Include search in queryKey to refetch when it changes
    queryFn: () => fetchUsers(page, limit, search), // Pass search to fetchUsers
    enabled: page > 0 && limit > 0, // Only fetch if valid parameters are passed
  });
};
