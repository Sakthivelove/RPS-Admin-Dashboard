import React, { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import Table from '../../components/common/Table';
import { useSidebar } from '../../context/SidebarContext';
import StatusMessage from '../../components/StatusMessage';
import { EyeIcon } from '@heroicons/react/24/outline';
import { truncateAddress } from '../../utils';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UserTransactions: React.FC = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { sidebarActive } = useSidebar();

    const { data, isLoading, isError, error } = useTransactions({ page, limit });

    // Function for expanding/collapsing row details
    const [expandedRows, setExpandedRows] = useState<number[]>([]);
    const navigate = useNavigate();  // Initialize the navigate function

    const toggleRowExpansion = (rowIndex: number) => {
        setExpandedRows((prev) =>
            prev.includes(rowIndex) ? prev.filter((index) => index !== rowIndex) : [...prev, rowIndex]
        );
    };

    // Handle actions for View, Edit, and Delete
    const handleView = (id: string) => {
        // Navigate to the user tournament detail page with the selected tournament ID
        navigate(`/users/transactions/${id}`);
    };

    // Columns for the table
    const columns = ['S.No', 'Wallet ID', 'Transaction ID', 'Amount', 'Date', 'User', 'Actions'];

    // Transform the data into the format needed for the table rows
    const tableData = data?.transaction.map((txn, index) => ({
        id: txn.id,
        walletId: truncateAddress(txn.walletId || 'N/A', 6),  // Fallback walletId if missing
        transactionId: txn.transactionId || 'N/A',  // Fallback transactionId if missing
        amount: txn.amount || 'N/A',  // Fallback amount if missing
        dateTime: txn.dateTime ? new Date(txn.dateTime).toLocaleString() : 'N/A',  // Fallback for date
        user: txn.user?.name || 'N/A',  // Fallback user name if missing
        actions: (
            <div className="flex space-x-3 justify-center items-center">
                <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleView(txn.id)}  // Pass transactionId to handleView
                >
                    <EyeIcon className="w-6 h-6" />
                </button>
            </div>
        ),
        // Add a row detail section that will be toggled
        rowDetails: (
            <div className="p-4 bg-gray-100">
                <p>
                    <strong>Transaction Details:</strong>
                </p>
                <p>ID: {txn.id || 'N/A'}</p>  {/* Fallback for txn.id */}
                <p>Wallet ID: {txn.walletId || 'N/A'}</p>  {/* Fallback for walletId */}
                <p>Transaction ID: {txn.transactionId || 'N/A'}</p>  {/* Fallback for txn.transactionId */}
                <p>Amount: {txn.amount || 'N/A'}</p>  {/* Fallback for txn.amount */}
                <p>Date: {txn.dateTime ? new Date(txn.dateTime).toLocaleString() : 'N/A'}</p>  {/* Fallback for date */}
                <p>User: {txn.user?.name || 'N/A'}</p>  {/* Fallback for txn.user.name */}
            </div>
        ),
    }));

    // Function to handle search (optional)
    const handleSearch = (searchTerm: string) => {
        // Implement your search logic here (you can update the `useQuery` hook to filter the data)
    };

    return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen text-white overflow-auto`}>
            {/* Use StatusMessage for loading and error states */}
            <StatusMessage
                isLoading={isLoading}
                error={error}
                loadingMessage="Loading transactions..."
                errorMessage={error ? `Error: ${error.message}` : 'Something went wrong.'}
                className="p-8 flex justify-center items-center h-screen"
            />

            {/* Only render the table if there is no loading or error */}
            {!isLoading && !error && data && (
                <div className="m-[2%]">
                    <Table
                        columns={columns}
                        data={tableData}
                        rowColor="bg-[#0F1C23]"
                        tableBgColor="bg-[#1A1D26]"
                        headerTextColor="text-[#45F882]"
                        showSearchBar={true}
                        onSearch={handleSearch}
                        height="66vh"
                        searchPlaceholder="Search transactions..."
                        title="Transaction History"
                    />
                    {/* <div className="flex justify-between mt-4">
                        <button
                            className="p-2 bg-gray-300"
                            disabled={page === 1}
                            onClick={() => setPage((prev) => prev - 1)}
                        >
                            Previous
                        </button>
                        <button
                            className="p-2 bg-gray-300"
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            Next
                        </button>
                    </div> */}
                </div>
            )}
        </div>
    );
};

export default UserTransactions;
