// src/components/UserTournamentTable.tsx
import React from 'react';
import { useUserTournaments } from '../../hooks/useUserTournaments';
import Table from '../../components/Table';

const UserTournaments = () => {
    const { data, error, isLoading } = useUserTournaments(1, 10);

    // Handle loading and error states
    if (isLoading) return <div>Loading...</div>;
    if (error instanceof Error) return <div>Error: {error.message}</div>;

    const columns = [
        'Tournament ID',
        'Wallet ID',
        'Entry Fee',
        'Nominal Fee',
        'Status',
        'Transaction ID',
        'Registered At',
        'Tournament Name',
        'Winner'
    ];

    // Mapping API data to table rows with the same column names
    const tableData = data?.usertournament.map(item => ({
        'Tournament ID': item.tournamentId,
        'Wallet ID': item.walletId,
        'Entry Fee': item.entryFee,
        'Nominal Fee': item.nominalFee,
        'Status': item.status,
        'Transaction ID': item.transactionId,
        'Registered At': new Date(item.registeredAt * 1000).toLocaleString(), // converting Unix timestamp to date
        'Tournament Name': item.tournamentName || 'N/A', // Fallback if tournamentName is empty
        'Winner': item.winner || 'N/A', // Fallback if winner is empty
    })) || [];

    return (
        <div className='absolute left-[22%] w-[78%]'>
            <h2>User Tournament Data</h2>
            <Table
                columns={columns}
                data={tableData}
                title="User Tournament Data"
                showSearchBar={true}
                searchPlaceholder="Search tournaments..."
            />
        </div>
    );
};

export default UserTournaments;
