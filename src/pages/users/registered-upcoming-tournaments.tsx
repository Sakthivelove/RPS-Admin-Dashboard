import React, { useState, useMemo } from 'react';
import Table from '../../components/Table';
import { useRegisteredTournaments } from '../../hooks/useRegisteredTournaments';
import { useSidebar } from '../../SidebarContext';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

const UpcomingTournaments: React.FC = () => {
    const [page, setPage] = useState(1);
    const limit = 10;
    const { sidebarActive } = useSidebar();
    const navigate = useNavigate();  // Initialize navigate function

    const { data, isLoading, isError, error, refetch } = useRegisteredTournaments(page, limit);

    console.log("upcoming", data);


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
        'Actions'  // Add Actions column
    ];

    const tableData = useMemo(() =>
        data?.map((tournament) => ({
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
            'Actions': (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleView(tournament.id)} // Navigate to the tournament detail page
                        className="text-blue-500 hover:text-blue-700"
                    >
                        View
                    </button>
                    <button
                        onClick={() => handleEdit(tournament.id)}
                        className="text-yellow-500 hover:text-yellow-700"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(tournament.id)}
                        className="text-red-500 hover:text-red-700"
                    >
                        Delete
                    </button>
                </div>
            ),
        })) || [],
        [data]
    );

    const [filteredData, setFilteredData] = useState(tableData);

    const handleSearch = (searchTerm: string) => {
        const filtered = tableData.filter((row) =>
            Object.values(row)
                .join(' ')
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleView = (id: string) => {
        console.log(`Viewing tournament with ID: ${id}`);
        // navigate(`/users/upcomingtournament/${id}`);  // Navigate to the detail page
    };

    const handleEdit = (id: string) => {
        console.log(`Editing tournament with ID: ${id}`);
        // Implement your logic for editing a tournament (e.g., navigate to an edit page or show a modal)
    };

    const handleDelete = (id: string) => {
        console.log(`Deleting tournament with ID: ${id}`);
        // Implement your logic for deleting a tournament (e.g., show a confirmation modal and delete via API)
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
                    <h2 className="text-xl font-bold text-white">Error fetching Upcoming Tournaments!</h2>
                    <p className="mt-2 text-white">Error: {error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen text-white`}>
            <div className="relative z-10 h-full p-[2%]">
                <Table
                    columns={columns}
                    data={filteredData}
                    rowColor="bg-gray-800"
                    title="Registered Upcoming Tournaments"
                    headerTextColor="text-[#45F882]"
                    showSearchBar={true}
                    onSearch={handleSearch}
                    searchPlaceholder="Search tournaments..."
                />
                {/* Pagination Controls */}
                {/* <div className="flex justify-between items-center mt-4">
                    <button
                        disabled={page === 1 || isLoading}
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        className="px-4 py-2 bg-[#1A1D26] text-[#45F882] rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-white">Page {page}</span>
                    <button
                        // disabled={isLoading || (data?.total && page * limit >= data.total)}
                        onClick={() => setPage((prev) => prev + 1)}
                        className="px-4 py-2 bg-[#1A1D26] text-[#45F882] rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default UpcomingTournaments;
