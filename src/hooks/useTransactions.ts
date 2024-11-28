import { useQuery } from '@tanstack/react-query';
import { fetchTransactions, FetchTransactionsParams } from '../services/transactionService';

export const useTransactions = ({ page, limit }: FetchTransactionsParams) => {
    return useQuery({
        queryKey: ['transactions', { page, limit }],
        queryFn: () => fetchTransactions({ page, limit }),
        staleTime: 5000,
    });
};
