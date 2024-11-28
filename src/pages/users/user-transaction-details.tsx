import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserTransactionDetails } from '../../hooks/useUserTransactionDetails';

const UserTransactionDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError, error } = useUserTransactionDetails(id!);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {(error as Error).message}</div>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold">User Transaction Details</h1>
            <div className="mt-4">
                <p><strong>Transaction ID:</strong> {data?.transactionId}</p>
                <p><strong>Amount:</strong> ${data?.amount}</p>
                <p><strong>Date:</strong> {new Date(data?.dateTime as string).toLocaleDateString()}</p>
                {/* Add more transaction details as needed */}
            </div>
        </div>
    );
};

export default UserTransactionDetails;
