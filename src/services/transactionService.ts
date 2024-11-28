import { api } from "../api";

export interface FetchTransactionsParams {
    page: number;
    limit: number;
}

export interface Transaction {
    id: string;
    walletId: string;
    transactionId?: string;
    amount: number;
    dateTime: string;
    user: {
        id: string;
        name: string;
    };
}

export interface FetchTransactionsResponse {
    transaction: Transaction[];
    total: number;
}

export const fetchTransactions = async ({ page, limit }: FetchTransactionsParams): Promise<FetchTransactionsResponse> => {
    const response = await api.get<FetchTransactionsResponse>('/users/transactions', {
        params: { page, limit },
    });
    return response.data;
};

export interface UserTransactionDetails {
    transactionId: string;
    amount: number;
    dateTime: string; // ISO string
    status: string;
    transactionType: string; // e.g., 'deposit', 'withdrawal'
    transactionFee: number;
  }
  
  export const fetchUserTransactionDetails = async (id: string): Promise<UserTransactionDetails> => {
    const response = await api.get(`/users/transaction/${id}`);
    return response.data;
  };
  
