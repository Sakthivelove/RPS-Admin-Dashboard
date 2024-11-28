import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { UserTransactionDetails } from '../services/transactionService'; // import the type for the user transaction

const fetchUserTransactionDetails = async (id: string): Promise<UserTransactionDetails> => {
    const response = await api.get(`/users/transaction/${id}`);
    return response.data;
};

export const useUserTransactionDetails = (id: string) => {
    return useQuery({
        queryKey: ['userTransactionDetails', id],
        queryFn: () => fetchUserTransactionDetails(id)
    });
};
