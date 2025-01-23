// hooks/useTableData.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api';

type QueryParams = {
    page: number;
    limit: number;
    search: string;
};

export const useTableData = (
    apiEndpoint: string,
    queryParams: QueryParams,
    dataKey: string // Key to extract data from response
) => {
    const fetchTableData = async () => {
        const { data } = await api.get(apiEndpoint, {
            params: queryParams, // Send page, limit, and search params
        });
        return {
            items: data[dataKey], // Extract the array dynamically
            total: data.total,
        };
    };

    const queryKey = [apiEndpoint, queryParams]; // Ensure query keys are unique per endpoint & params

    const { data, error, isLoading } = useQuery({
        queryKey,
        queryFn: fetchTableData,
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    });

    return { data, error, isLoading };
};
