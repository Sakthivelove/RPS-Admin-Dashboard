import { api } from "../../api/api"; // Assuming the api instance is imported from the api directory

// Define a type for the user data
export interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as per the API response
}

// Define a type for the response object
export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

// Fetch users from the API
export const fetchUsers = async (page: number = 1, limit: number = 10): Promise<UsersResponse> => {
  const response = await api.get<UsersResponse>(`/users?page=${page}&limit=${limit}`);
  return response.data;
};

export interface UserDetails {
  id: string;
  name: string;
  email: string;
  referralCode: string;
}

export const fetchUserDetails = async (id: string): Promise<UserDetails> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export interface UserTaskDetails {
  id: string;                  // Task ID
  walletId: string;            // Wallet ID
  registeredTournament: boolean; // Whether the user has registered for a tournament
  taskStatus: string;          // Status of the task (e.g., 'Pending', 'Completed', etc.)
  createdOn: string;           // Date the task was created (ISO 8601 date string)
  walletConnection: boolean;   // Whether the wallet is connected (if applicable)
  telegramConnection: boolean; // Whether the Telegram account is connected (if applicable)
  xConnection: boolean;        // Whether the X (Twitter) account is connected (if applicable)
  friendsInvited: number;      // Number of friends the user has invited
}

export const fetchUserTaskDetails = async (id: string): Promise<UserTaskDetails> => {
  const response = await api.get(`/users/task/${id}`);
  return response.data;
};


