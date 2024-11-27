
import { useQuery } from '@tanstack/react-query';
import { getReferrals, Referral } from '../services/referralService';

interface ReferralsResponse {
    referrals: Referral[];
    total: number;
}

export const useReferrals = (page: number, limit: number) => {
    return useQuery<ReferralsResponse, Error>({
        queryKey: ['referrals'],
        queryFn: () => getReferrals(page, limit)
    });
};
