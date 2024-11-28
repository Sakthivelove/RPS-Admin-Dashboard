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
        id: tournament.id,
        walletId: tournament.walletId,
        tournamentId: tournament.tournamentId,
        entryPaid: tournament.entryPaid ? 'Yes' : 'No',
        nominalPaid: tournament.nominalPaid ? 'Yes' : 'No',
        transactionId: tournament.transactionId,
        entryFee: tournament.entryFee,
        nominalFee: tournament.nominalFee,
        defaultMove: tournament.defaultMove,
        registeredAt: new Date(
            Number(tournament.registeredAt) * 1000
        ).toLocaleString(),
        lastStage: tournament.lastStage,
        status: tournament.status,
        dateTime: new Date(Number(tournament.dateTime) * 1000).toLocaleString(),
        tournamentName: tournament.tournamentName || 'N/A',
        winner: tournament.winner || 'N/A',
    }));

    return (
        <div className="p-4">
            {isLoading && <div className="text-center text-white">Loading...</div>}
            {isError && (
                <div className="text-center text-red-500">
                    Error: {(error as Error).message}
                </div>
            )}
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
    );
};

export default UpcomingTournaments;
