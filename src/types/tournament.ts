export interface Tournament {
  id: string;
  walletId: string;
  tournamentId: string;
  type: string | null;
  entryPaid: boolean;
  nominalPaid: boolean;
  transactionId: string | null;
  entryFee: number;
  nominalTournament: boolean;
  nominalFee: number;
  defaultMove: string;
  registeredAt: string;
  lastStage: number;
  status: string;
  dateTime: string;
  tournamentName: string;
  winner: string;
  rank: number;
}

export interface TournamentsApiResponse {
  userTournaments: Tournament[];
  total: number;
}

export type TournamentsResponse = TournamentsApiResponse | undefined;
