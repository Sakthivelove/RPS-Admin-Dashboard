import { api } from "../../api/api";

export interface FetchTransactionsParams {
    page: number;
    limit: number;
    search?: string
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

export const fetchTransactions = async ({ page, limit, search }: FetchTransactionsParams): Promise<FetchTransactionsResponse> => {
    const response = await api.get<FetchTransactionsResponse>('/users/transactions', {
        params: { page, limit, search },
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

