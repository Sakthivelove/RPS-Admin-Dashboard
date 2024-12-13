// src/hooks/usePrizePools.ts

import { useQuery } from '@tanstack/react-query';
import { getPrizePools } from '../services/prizepoolService';

export const usePrizePools = () => {
    return useQuery({
        queryKey: ['prizepools'],
        queryFn: getPrizePools,
    });
};
