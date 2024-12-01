import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchWinLossHistory, WinLossHistoryResponse } from '../services/user/winLossService';

// UseQueryResult from TanStack Query has a generic type for data
export const useWinLossHistory = (page: number = 1, limit: number = 10): UseQueryResult<WinLossHistoryResponse, Error> => {
    return useQuery({
        queryKey: ['winLossHistory', page, limit],
        queryFn: () => fetchWinLossHistory(page, limit)
    });
};
