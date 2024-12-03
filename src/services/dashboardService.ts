import { api } from '../api/api'; // Import the custom Axios instance

// Type for the dashboard data
export interface DashboardData {
  totalPlayers: number;
  tournaments: number;
  upcoming: number;
  walletConnection: number;
  telegramConnection: number;
  xConnection: number;
  registeredTournament: number;
}

// Function to fetch dashboard data
export const getDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await api.get('/dev/settings/dashboard');
    return response.data; // Assuming the response data matches the `DashboardData` type
  } catch (error) {
    throw new Error('Error fetching dashboard data');
  }
};
