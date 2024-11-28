import React, { useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import Table from '../../components/Table';

const UserTransactions: React.FC = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading, isError } = useTransactions({ page, limit });

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

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading transactions.</div>;

    return (
        <div className='absolute left-[22%] w-[78%] h-screen m-[2%] flex flex-col'>
                <div className=''>
                    <Table
                        columns={columns}
                        data={tableData}
                        rowColor="bg-[#0F1C23]"
                        tableBgColor="bg-[#1A1D26]"
                        headerTextColor="text-white"
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
