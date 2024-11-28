import { api } from "../api";
import { Tournament } from '../types/tournament';

export const fetchRegisteredUpcomingTournaments = async (
  page: number,
  limit: number
): Promise<Tournament[]> => {
  const response = await api.get(`/users/registeredupcomingtournament`, {
    params: { page, limit },
  });
  return response.data.userTournaments;
};

export interface UserTournamentDetails {
    tournamentId: string;
    tournamentName: string;
    entryPaid: boolean;
    winner: string;
    status: string;
    date: string; // ISO string
  }
  
  export const fetchUserTournamentDetails = async (id: string): Promise<UserTournamentDetails> => {
    const response = await api.get(`/users/usertournament/${id}`);
    return response.data;
  };
  

