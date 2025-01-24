import React, { useEffect, useState } from 'react';
import { useUserTournaments } from '../../hooks/useUserTournaments';
import Table from '../../components/common/Table';
import { useSidebar } from '../../context/SidebarContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { truncateAddress } from '../../utils';

const UserTournaments = () => {
    const [page, setPage] = useState(1);  // Track the current page
    const limit = 10;
    const [search, setSearch] = useState<string | undefined>(); // State for search query
    const { data, error, isLoading, isError } = useUserTournaments(page, limit);  // Pagination (page 1, 10 items per page)
    const { sidebarActive } = useSidebar();
    const [totalPages, setTotalPages] = useState<number>(0);
    const navigate = useNavigate();  // Initialize the navigate function

    // Update total pages when totalCount changes
    useEffect(() => {
        if (data?.total) {
            setTotalPages(Math.ceil(data.total / limit));
        }
    }, [data?.total, limit]);

    // Handle search input and trigger the search query
    const handleSearch = (term: string | undefined) => {
        setSearch(term); // Update the search state
        if (term?.trim() === '') {
            setPage(1); // Optionally reset to the first page
        }
    };

    // Columns for the table (using the fields from UserTournament interface)
    const columns = [
        'S.No',
        // 'Tournament ID',
        'Tournament Name',
        'Wallet ID',
        'Type',
        'Entry Fee Paid',
        'Nominal Fee Paid',
        'Transaction ID',
        'Entry Fee',
        'Nominal Tournament',
        'Nominal Fee',
        'Default Move',
        'Registered At',
        'Last Stage',
        'Status',
        'More Info',
        'Date Time'
    ];


    // Mapping API data to table rows
    const tableData = (data?.usertournament || []).map((item, index) => ({
        'S.No': (page - 1) * limit + index + 1, // Calculate serial number based on page
        // 'Tournament ID': item.tournamentId || 'N/A',  // Fallback if tournamentId is missing
        'Wallet ID': truncateAddress(item.walletId || '', 6) || 'N/A',  // Fallback if walletId is missing
        'Type': item.type || 'N/A',  // Fallback if type is missing
        'Entry Fee Paid': item.entryPaid ? 'Yes' : 'No',
        'Nominal Fee Paid': item.nominalPaid ? 'Yes' : 'No',
        'Transaction ID': truncateAddress(item.transactionId || '', 6) || 'N/A',  // Fallback if transactionId is missing
        'Entry Fee': item.entryFee || 'N/A',  // Fallback if entryFee is missing
        'Nominal Tournament': item.nominalTournament ? 'Yes' : 'No',
        'Nominal Fee': item.nominalFee || 'N/A',  // Fallback if nominalFee is missing
        'Default Move': item.defaultMove || 'N/A',  // Fallback if defaultMove is missing
        // Convert 'Registered At' from Unix timestamp to readable date, fallback to N/A if invalid
        'Registered At': item.registeredAt ? new Date(item.registeredAt * 1000).toLocaleString() : 'N/A',
        'User': item.user || 'N/A', // Fallback if user is missing
        'Last Stage': item.lastStage || 'N/A',  // Fallback if lastStage is missing
        'Status': item.status || 'N/A',  // Fallback if status is missing
        // Convert 'Date Time' from Unix timestamp to readable date, fallback to N/A if invalid
        'Date Time': item.dateTime ? new Date(item.dateTime * 1000).toLocaleString() : 'N/A',
        'Tournament Name': item.tournamentName || 'N/A',  // Fallback if tournamentName is missing
        'Winner': item.winner || 'N/A',  // Fallback if winner is missing
        // Action buttons (View, Edit, Delete)
        'More Info': (
            <div className="flex space-x-3 justify-center items-center">
                <button
                    onClick={() => handleView(item.id)}  // Pass tournamentId to handleView
                    className="text-blue-500 hover:text-blue-700"
                >
                    <InformationCircleIcon className="w-6 h-6" />
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
    }));

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

    // Handle page change
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen p-4 text-white`}>
            <Table
                columns={columns}
                data={tableData}
                title="User Tournament Data"
                showSearchBar={true}
                onSearch={handleSearch}
                searchPlaceholder="Search tournaments..."
                headerTextColor='text-[#45F882]'
                page={page}
                limit={limit}
                onPageChange={handlePageChange}
                totalPages={totalPages}
                // totalItems={data?.total || 0}
                isLoading={isLoading}
                error={isError}
                loadingMessage="Loading tournaments..."
                errorMessage={error?.message}
            />
        </div>
    );
};

export default UserTournaments;
