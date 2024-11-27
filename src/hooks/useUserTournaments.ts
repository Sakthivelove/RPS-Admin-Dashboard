// /hooks/useUserTournaments.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';

// Define the type for the UserTournament data
interface UserTournament {
    id: string;
    walletId: string;
    tournamentId: string;
    type: string;
    entryPaid: boolean;
    nominalPaid: boolean;
    transactionId: string;
    entryFee: number;
    nominalTournament: boolean;
    nominalFee: number;
    defaultMove: string;
    registeredAt: number;
    user: object; // You can define a more detailed User object type
    lastStage: number;
    status: string;
    dateTime: number;
    tournamentName: string;
    winner: string;
}

// Define the response format
interface UserTournamentsResponse {
    usertournament: UserTournament[];
    total: number;
}

// Custom hook for fetching user tournaments
const fetchUserTournaments = async (page: number, limit: number) => {
    const response = await api.get<UserTournamentsResponse>(`users/usertournaments`, {
        params: { page, limit },
    });
    return response.data;
};

export const useUserTournaments = (page: number, limit: number) => {
    return useQuery<UserTournamentsResponse, Error>({
        queryKey: ['usertournaments'],
        queryFn: () => fetchUserTournaments(page, limit)
    });
};
