import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api';
import { ReferralCode } from '../services/user/referralService';

const fetchUserReferralDetails = async (id: string): Promise<ReferralCode> => {
    const response = await api.get(`/users/referral/${id}`);
    return response.data;
};

export const useUserReferralDetails = (id: string) => {
    return useQuery({
        queryKey: ['userReferralDetails', id],
        queryFn: () => fetchUserReferralDetails(id)
    });
};
