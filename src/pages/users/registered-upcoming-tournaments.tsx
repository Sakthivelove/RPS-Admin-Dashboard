import React, { useState } from 'react';
import Table from '../../components/Table';
import { useRegisteredTournaments } from '../../hooks/useRegisteredTournaments';

const UpcomingTournaments: React.FC = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, isLoading, isError, error, refetch } = useRegisteredTournaments(page, limit);

    const columns = [
        'ID',
        'Wallet ID',
        'Tournament ID',
        'Entry Paid',
        'Nominal Paid',
        'Transaction ID',
        'Entry Fee',
        'Nominal Fee',
        'Default Move',
        'Registered At',
        'Last Stage',
        'Status',
        'Date Time',
        'Tournament Name',
        'Winner',
    ];

    const tableData = data?.map((tournament) => ({
        'ID': tournament.id,
        'Wallet ID': tournament.walletId,
        'Tournament ID': tournament.tournamentId,
        'Entry Paid': tournament.entryPaid ? 'Yes' : 'No',
        'Nominal Paid': tournament.nominalPaid ? 'Yes' : 'No',
        'Transaction ID': tournament.transactionId,
        'Entry Fee': tournament.entryFee,
        'Nominal Fee': tournament.nominalFee,
        'Default Move': tournament.defaultMove,
        'Registered At': new Date(Number(tournament.registeredAt) * 1000).toLocaleString(),
        'Last Stage': tournament.lastStage,
        'Status': tournament.status,
        'Date Time': new Date(Number(tournament.dateTime) * 1000).toLocaleString(),
        'Tournament Name': tournament.tournamentName || 'N/A',
        'Winner': tournament.winner || 'N/A',
    })) || [];


    return (
        <div className="p-4 w-full h-screen">
            {isLoading && <div className="text-center text-white">Loading...</div>}
            {isError && (
                <div className="text-center text-red-500">
                    Error: {(error as Error).message}
                </div>
            )}
            <div className='absolute left-[250px] w-[78%]'>
                {!isLoading && !isError && (

                    <Table
                        columns={columns}
                        data={tableData}
                        rowColor="bg-gray-800"
                        tableBgColor="bg-gray-900"
                        title="Registered Upcoming Tournaments"
                        headerTextColor="text-gray-300"
                        showSearchBar={true}
                        onSearch={(searchTerm) => {
                            const filteredData = tableData?.filter((row) =>
                                Object.values(row)
                                    .join(' ')
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                            );
                        }}
                        searchPlaceholder="Search tournaments..."
                        height="500px"
                    />

                )}
                <div className="flex justify-between mt-4">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        className="px-4 py-2 bg-gray-700 text-white rounded"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpcomingTournaments;
