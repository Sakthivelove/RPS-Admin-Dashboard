import { api } from "../../api/api";

export interface Referral {
    id:string;
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

export interface ReferralCode {
    id: string;
    walletId: string;
    referralCode: string;
    referralCount: number;
    reward: number;
    createdOn: number;
  }
  
  export const fetchReferralCode = async (id: string): Promise<ReferralCode> => {
    const response = await api.get(`/users/referral/${id}`);
    return response.data;
  };
  
