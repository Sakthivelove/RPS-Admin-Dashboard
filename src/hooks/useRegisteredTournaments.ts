import { useQuery } from '@tanstack/react-query';
import { fetchRegisteredUpcomingTournaments } from '../services/user/tournamentService';

export const useRegisteredTournaments = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['registeredTournaments', page, limit],
    queryFn: () => fetchRegisteredUpcomingTournaments(page, limit),
  });
};
