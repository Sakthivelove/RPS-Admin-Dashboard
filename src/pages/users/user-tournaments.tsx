// src/components/UserTournamentTable.tsx
import React from 'react';
import { useUserTournaments } from '../../hooks/useUserTournaments';
import Table from '../../components/Table';
import { useSidebar } from '../../SidebarContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UserTournaments = () => {
    const { data, error, isLoading } = useUserTournaments(1, 10);  // Pagination (page 1, 10 items per page)
    const { sidebarActive } = useSidebar();
    const navigate = useNavigate();  // Initialize the navigate function

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

    // Columns for the table (using the fields from UserTournament interface)
    const columns = [
        'Tournament ID',
        'Wallet ID',
        'Type',
        'Entry Paid',
        'Nominal Paid',
        'Transaction ID',
        'Entry Fee',
        'Nominal Tournament',
        'Nominal Fee',
        'Default Move',
        'Registered At',
        'User',
        'Last Stage',
        'Status',
        'Date Time',
        'Tournament Name',
        'Winner',
        'Actions' // New actions column
    ];

    // Mapping API data to table rows
    const tableData = data?.usertournament.map((item) => ({
        'Tournament ID': item.tournamentId,
        'Wallet ID': item.walletId,
        'Type': item.type,
        'Entry Paid': item.entryPaid ? 'Yes' : 'No',
        'Nominal Paid': item.nominalPaid ? 'Yes' : 'No',
        'Transaction ID': item.transactionId,
        'Entry Fee': item.entryFee,
        'Nominal Tournament': item.nominalTournament ? 'Yes' : 'No',
        'Nominal Fee': item.nominalFee,
        'Default Move': item.defaultMove,
        // Convert 'Registered At' from Unix timestamp to readable date
        'Registered At': new Date(item.registeredAt * 1000).toLocaleString(),
        'User': item.user, // You can format this as needed if 'user' is an object
        'Last Stage': item.lastStage,
        'Status': item.status,
        // Convert 'Date Time' from Unix timestamp to readable date
        'Date Time': new Date(item.dateTime * 1000).toLocaleString(),
        'Tournament Name': item.tournamentName || 'N/A',
        'Winner': item.winner || 'N/A',
        // Action buttons (View, Edit, Delete)
        'Actions': (
            <div className="flex gap-2">
                <button
                    onClick={() => handleView(item.id)}  // Pass tournamentId to handleView
                    className="text-blue-500 hover:text-blue-700"
                >
                    View
                </button>
                <button
                    onClick={() => handleEdit(item.tournamentId)}
                    className="text-yellow-500 hover:text-yellow-700"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(item.tournamentId)}
                    className="text-red-500 hover:text-red-700"
                >
                    Delete
                </button>
            </div>
        ),
    })) || [];

    // Handle actions for View, Edit, and Delete
    const handleView = (id: string) => {
        // Navigate to the user tournament detail page with the selected tournament ID
        navigate(`/users/usertournament/${id}`);
    };

    const handleEdit = (id: string) => {
        console.log(`Editing tournament with ID: ${id}`);
        // Implement your logic for editing a tournament
    };

    const handleDelete = (id: string) => {
        console.log(`Deleting tournament with ID: ${id}`);
        // Implement your logic for deleting a tournament (with confirmation)
    };

    return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen p-8 text-white`}>
            <Table
                columns={columns}
                data={tableData}
                title="User Tournament Data"
                showSearchBar={true}
                searchPlaceholder="Search tournaments..."
                headerTextColor='text-[#45F882]'
            />
        </div>
    );
};

export default UserTournaments;
