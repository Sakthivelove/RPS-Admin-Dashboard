import { api } from "../api"; // Assuming the api instance is imported from the api directory

// Define a type for the win/loss history data
export interface WinLossHistory {
  id: string;
  tournamentName: string;
  game: string;
  result: 'win' | 'loss';
  date: string;
  // Add other properties as per the API response
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
