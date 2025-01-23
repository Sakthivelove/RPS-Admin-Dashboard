import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api';

interface Tournament {
  id: string;
  bannerImage: string;
  tournamentName: string;
  tournamentId: string;
  primaryTournamentId: string;
  dateTime: string;
  type: string;
  entryFee: number;
  nominalTournament: boolean;
  nominalFee: number;
  totalPrizePool: number | null;
  winner: string;
  currentStage: number;
  status: string;
  paymentWindow: boolean;
  noOfPlayersRegistered: number;
  paymentWindowStart: number;
  paymentWindowEnd: number;
}

interface TournamentResponse {
  tournaments: Tournament[];
  total: number;
}

const fetchTournaments = async (page?: number, limit?: number, search?: string) => {
  const response = await api.get('/tournament', {
    params: {
      page,      // Page number
      limit,     // Number of items per page
      search,    // Search term
    },
  });
  return response.data;
};

const useTournaments = (page?: number, limit?: number, search?: string) => {
  return useQuery<TournamentResponse>({
    queryKey: ['tournaments', page, limit, search],  // Including page, limit, and search in the query key for caching and refetching
    queryFn: () => fetchTournaments(page, limit, search),
  });
};

export default useTournaments;
