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

const fetchUserAffiliates = async () => {
    const { data } = await api.get('users/affiliates?page=1&limit=10');
    return data.users; // The structure may vary based on your API
};

export const useUserAffiliates = () => {
    return useQuery<User[]>({
        queryKey: ['users'],
        queryFn: fetchUserAffiliates,
    });
};
