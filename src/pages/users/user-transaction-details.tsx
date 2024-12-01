// pages/UserTransactionDetails.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserTransactionDetails } from '../../hooks/useUserTransactionDetails';
import { useSidebar } from '../../context/SidebarContext';

const UserTransactionDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();  // Get the transaction ID from URL params
    const { sidebarActive } = useSidebar();  // Sidebar context to adjust layout width
    const { data, isLoading, isError, error } = useUserTransactionDetails(id!); // Fetching transaction details using the custom hook

    if (isLoading) {
        return (
            <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen p-8 text-white flex justify-center items-center`}>
                <div className="flex items-center">
                    <div className="spinner-border animate-spin w-8 h-8 border-4 border-t-4 border-[#45F882] rounded-full mr-4"></div>
                    <span className="text-xl">Loading...</span>
                </div>
            </div>
        );
    }


    if (error) {
        return (
            <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen p-8 text-white flex justify-center items-center`}>
                <div className="bg-red-500 p-6 rounded-md shadow-lg">
                    <h2 className="text-xl font-bold text-white">Error fetching Tournaments!</h2>
                    <p className="mt-2 text-white">Error: {error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen text-white overflow-auto p-8`}>
            <h1 className="text-2xl font-semibold mb-6">User Transaction Details</h1>
            <div className="space-y-4">
                <div>
                    <p className="font-medium">Transaction ID:</p>
                    <p className="text-lg text-gray-300">{data?.transactionId}</p>
                </div>
                <div>
                    <p className="font-medium">Amount:</p>
                    <p className="text-lg text-gray-300">${data?.amount}</p>
                </div>
                <div>
                    <p className="font-medium">Date:</p>
                    <p className="text-lg text-gray-300">{new Date(data?.dateTime as string).toLocaleDateString()}</p>
                </div>
                {/* Add more transaction details as needed */}
            </div>
        </div>
    );
};

export default UserTransactionDetails;
