import { useQuery } from '@tanstack/react-query';
import { fetchRegisteredUpcomingTournaments } from '../services/tournamentService';

export const useRegisteredTournaments = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['registeredTournaments', page, limit],
    queryFn: () => fetchRegisteredUpcomingTournaments(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
