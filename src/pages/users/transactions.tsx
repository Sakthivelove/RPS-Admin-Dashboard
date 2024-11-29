import React, { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import Table from '../../components/Table';
import { useSidebar } from '../../SidebarContext';

const UserTransactions: React.FC = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { sidebarActive } = useSidebar()

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
        walletId: txn.walletId,
        transactionId: txn.transactionId || 'N/A',
        amount: txn.amount,
        dateTime: new Date(txn.dateTime).toLocaleString(),
        user: txn.user.name,
        actions: (
            <>
                <button>View</button>
                <button>Edit</button>
                <button>Delete</button>
            </>
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
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen text-white overflow-auto`}>
            <div className='m-[2%]'>
                <Table
                    columns={columns}
                    data={tableData}
                    rowColor="bg-[#0F1C23]"
                    tableBgColor="bg-[#1A1D26]"
                    headerTextColor="text-[#45F882]"
                    showSearchBar={true}
                    onSearch={handleSearch}
                    height="auto"
                    searchPlaceholder="Search transactions..."
                    title='Transaction History'
                />
                <div className="flex justify-between mt-4">
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
                </div>
            </div>
        </div>
    );
};

export default UserTransactions;
