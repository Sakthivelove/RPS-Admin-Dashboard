import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { UserTournamentDetails } from '../services/tournamentService';

const fetchUserTournamentDetails = async (id: string): Promise<UserTournamentDetails> => {
    const response = await api.get(`/users/usertournament/${id}`);
    return response.data;
};

export const useUserTournamentDetails = (id: string) => {
    return useQuery({
        queryKey: ['userTournamentDetails', id],
        queryFn: () => fetchUserTournamentDetails(id)
    });
};
