import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserTransactionDetails } from '../../hooks/useUserTransactionDetails';
import { useSidebar } from '../../SidebarContext';

const UserTransactionDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError, error } = useUserTransactionDetails(id!);
    const { sidebarActive } = useSidebar()
    if (isLoading) return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen text-white overflow-auto`}>
            <div>Loading...</div>
        </div>
    );
    if (isError) return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen text-white overflow-auto`}>
            <div>Error: {(error as Error).message}</div>
        </div>
    );

    return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen text-white overflow-auto`}>
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
