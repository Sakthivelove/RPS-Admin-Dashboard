import { api } from "../api";

export interface Referral {
    referralCode: string;
    walletId: string;
    referralCount: number;
    reward: string;
    createdOn: string; // Assume this is a timestamp in seconds
}

export const getReferrals = async (page: number, limit: number) => {
    try {
        const response = await api.get(`/users/referrals`, {
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching referrals');
    }
};
