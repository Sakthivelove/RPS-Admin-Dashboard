import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { UserDetails } from '../services/userService';

const fetchUserDetails = async (id: string): Promise<UserDetails> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
};

export const useUserDetails = (id: string) => {
    return useQuery({
        queryKey: ['userDetails', id],
        queryFn: () => fetchUserDetails(id)
    });
};
