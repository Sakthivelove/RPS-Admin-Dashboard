import { api } from "../api"; // Assuming the api instance is imported from the api directory

// Define a type for the win/loss history data
export interface WinLossHistory {
  id: string;
  playerName: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  winRate?: string; // Computed field: Win Rate (%)
  lossRate?: string; // Computed field: Loss Rate (%)
  lastGameDate: string; // Timestamp or formatted date string
  tournamentName?: string; // Additional field
  game?: string; // Additional field
  result?: 'win' | 'loss'; // Additional field
}

// Define a type for the response object
export interface WinLossHistoryResponse {
  history: WinLossHistory[];
  total: number;
  page: number;
  limit: number;
}

// Fetch win/loss history from the API
export const fetchWinLossHistory = async (page: number = 1, limit: number = 10): Promise<WinLossHistoryResponse> => {
  const response = await api.get<WinLossHistoryResponse>(`/users/winlosshistory?page=${page}&limit=${limit}`);
  return response.data;
};
