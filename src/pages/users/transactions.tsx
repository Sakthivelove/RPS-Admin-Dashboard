import React, { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import Table from '../../components/common/Table';
import { useSidebar } from '../../context/SidebarContext';
import StatusMessage from '../../components/StatusMessage';
import { EyeIcon } from '@heroicons/react/24/outline'
import { truncateAddress } from '../../utils';

const UserTransactions: React.FC = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { sidebarActive } = useSidebar();

    const { data, isLoading, isError, error } = useTransactions({ page, limit });

    // Function for expanding/collapsing row details
    const [expandedRows, setExpandedRows] = useState<number[]>([]);

    const toggleRowExpansion = (rowIndex: number) => {
        setExpandedRows((prev) =>
            prev.includes(rowIndex) ? prev.filter((index) => index !== rowIndex) : [...prev, rowIndex]
        );
    };

    // Columns for the table
    const columns = ['S.No', 'Wallet ID', 'Transaction ID', 'Amount', 'Date', 'User', 'Actions'];

    // Transform the data into the format needed for the table rows
    const tableData = data?.transaction.map((txn, index) => ({
        id: txn.id,
        walletId: truncateAddress(txn.walletId, 6),  // Truncate walletId here,
        transactionId: txn.transactionId || 'N/A',
        amount: txn.amount,
        dateTime: new Date(txn.dateTime).toLocaleString(),
        user: txn.user.name,
        actions: (
            <div className="flex space-x-3 justify-center items-center">
                <button
                    className="text-blue-500 hover:text-blue-700"
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
                <p>ID: {txn.id}</p>
                <p>Wallet ID: {txn.walletId}</p>
                <p>Transaction ID: {txn.transactionId || 'N/A'}</p>
                <p>Amount: {txn.amount}</p>
                <p>Date: {new Date(txn.dateTime).toLocaleString()}</p>
                <p>User: {txn.user.name}</p>
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
                        height="68vh"
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
