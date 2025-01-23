import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api';

// Define the type for the user data
interface User {
    id: number;
    telegramId: string;
    password: string;
    ResetToken: string;
    ResetExpiry: string;
}

const fetchUserAffiliates = async (page: number, limit: number, search?: string): Promise<User[]> => {
    const { data } = await api.get('users/affiliates', {
        params: {
            page, limit, search
        }
    });
    return data.users; // The structure may vary based on your API
};

export const useUserAffiliates = (page: number, limit: number, search?: string) => {
    return useQuery<User[]>({
        queryKey: ['users', page, limit, search],
        queryFn: () => fetchUserAffiliates(page, limit, search),
    });
};
