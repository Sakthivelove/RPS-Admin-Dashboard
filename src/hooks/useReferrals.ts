
import { useQuery } from '@tanstack/react-query';
import { getReferrals, Referral } from '../services/user/referralService';

interface ReferralsResponse {
    referrals: Referral[];
    total: number;
}

export const useReferrals = (page: number, limit: number, search?: string) => {
    return useQuery<ReferralsResponse, Error>({
        queryKey: ['referrals', page, limit, search],
        queryFn: () => getReferrals(page, limit, search)
    });
};
