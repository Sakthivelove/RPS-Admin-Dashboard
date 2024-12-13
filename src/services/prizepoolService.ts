import { api } from "../api/api";
import { PrizePool } from "../types";

export const getPrizePools = async ():Promise<PrizePool[]> => {
  try {
    const response = await api.get('settings/prizepools');
    return response.data; // Return the prize pool data
  } catch (error) {
    throw new Error('Error fetching prize pools');
  }
};
