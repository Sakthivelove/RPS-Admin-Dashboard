import React from 'react';
import { useUserTournaments } from '../../hooks/useUserTournaments';
import Table from '../../components/common/Table';
import { useSidebar } from '../../context/SidebarContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import StatusMessage from '../../components/StatusMessage'; // Import StatusMessage
import { EyeIcon } from '@heroicons/react/24/outline'
import { truncateAddress } from '../../utils';
const UserTournaments = () => {
    const { data, error, isLoading } = useUserTournaments(1, 10);  // Pagination (page 1, 10 items per page)
    const { sidebarActive } = useSidebar();
    const navigate = useNavigate();  // Initialize the navigate function

    // Replace the loading and error handling sections with the StatusMessage component
    if (isLoading || error) {
        return (
            <StatusMessage
                isLoading={isLoading}
                error={error}
                loadingMessage="Loading tournaments..."
                errorMessage={error?.message || 'Error fetching tournaments'}
                className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen`}
            />
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
        'Wallet ID': truncateAddress(item.walletId, 6),
        'Type': item.type,
        'Entry Paid': item.entryPaid ? 'Yes' : 'No',
        'Nominal Paid': item.nominalPaid ? 'Yes' : 'No',
        'Transaction ID': truncateAddress(item.transactionId, 6),
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
            <div className="flex space-x-3 justify-center items-center">
                <button
                    onClick={() => handleView(item.id)}  // Pass tournamentId to handleView
                    className="text-blue-500 hover:text-blue-700"
                >
                    <EyeIcon className="w-6 h-6" />
                
                </button>
                {/* <button
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
                </button> */}
            </div>
        ),
    })) || [];

    // Handle actions for View, Edit, and Delete
    const handleView = (id: string) => {
        // Navigate to the user tournament detail page with the selected tournament ID
        navigate(`/users/usertournaments/${id}`);
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
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen p-4 text-white`}>
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
