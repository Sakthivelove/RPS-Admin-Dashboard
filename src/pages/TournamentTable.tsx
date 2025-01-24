import React, { useEffect, useState } from 'react';
import useTournaments from '../hooks/useTournaments';
import Table from '../components/common/Table';
import { useSidebar } from '../context/SidebarContext';
import { getContainerClass, truncateAddress } from '../utils';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import TournamentTabs from '../components/TournamentTabs';

const TournamentTable: React.FC = () => {
    const [page, setPage] = useState(1);  // Track the current page
    const [limit] = useState(10);  // Number of items per page
    const [searchQuery, setSearchQuery] = useState<string | undefined>('');
    const [debouncedSearch, setDebouncedSearch] = useState<string | undefined>('');
    const [showTournamentTabs, setShowTournamentTabs] = useState<boolean>(false); // State to toggle TournamentTabs visibility
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // Store selected userId
    const [selectedId, setSelectedId] = useState<string | null>(null); // Store selected userId
    const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(null); // Store selected tournamentId
    const { sidebarActive } = useSidebar();

    // If search exists, make page and limit undefined, else use default values
    const currentPage = searchQuery ? undefined : page; // If search exists, set page to undefined
    const currentLimit = searchQuery ? undefined : limit; // If search exists, set limit to undefined

    // Fetch tournaments with pagination and search query
    const { data, error, isLoading, isError } = useTournaments(currentPage, currentLimit, debouncedSearch);

    console.log("tournament data", data);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery); // Update debounced search after delay
        }, 500); // Delay in ms

        return () => clearTimeout(timer); // Clean up the timer on each render
    }, [searchQuery]);

    // Pagination states
    // const [currentPage, setCurrentPage] = useState(1);
    // const itemsPerPage = 10;


    // Define columns with all fields from the Tournament interface
    const columns = [
        'S.No',
        // 'Tournament ID',\
        'Tournament Name',
        'Banner Image',
        // 'Primary Tournament ID',
        'Type',
        // 'Entry Fee',
        'Nominal Tournament',
        // 'Nominal Fee',
        // 'Prize Pool',
        'Winner',
        'Status',
        'More Info'
        // 'Payment Window',
        // 'No. of Players',
        // 'Date & Time'
    ];


    // Map data to include all fields in the table with fallbacks
    const tableData = Array.isArray(data?.tournaments) ? data.tournaments.map((tournament, index) => ({
        'S.No': index + 1,
        // 'Tournament ID': tournament.tournamentId || 'N/A',
        'Banner Image': tournament.bannerImage ? (
            <img src={`${tournament.bannerImage}`} alt="Tournament Banner" className="w-20 h-20 object-cover" />
        ) : '-',

        'Tournament Name': tournament.tournamentName || 'Unknown',
        // 'Primary Tournament ID': tournament.primaryTournamentId || 'N/A',
        // Assuming 'dateTime' is a string representing a Unix timestamp in seconds
        // 'Date & Time': tournament.dateTime && tournament.dateTime !== "0"
        //     ? new Date(Number(tournament.dateTime) * 1000).toLocaleString()
        //     : '-',

        'Type': tournament.type || 'N/A',
        // 'Entry Fee': tournament.entryFee || 'N/A',
        'Nominal Tournament': tournament.nominalTournament ? 'Yes' : 'No',
        // 'Nominal Fee': tournament.nominalFee || 'N/A',
        // 'Prize Pool': tournament.totalPrizePool ?? 'N/A',
        'Winner': tournament.winner ? truncateAddress(tournament.winner, 6) : 'N/A',
        // 'Current Stage': tournament.currentStage || 'N/A',
        'Status': tournament.status || 'N/A',
        'More Info': (
            <div className="flex space-x-3 justify-center items-center">
                <button
                    onClick={() => {
                        setSelectedUserId(tournament.id); // Set selected userId
                        setSelectedTournamentId(tournament.tournamentId); // Set selected tournamentId
                        setShowTournamentTabs(true); // Show TournamentTabs
                    }}
                    className="text-blue-500 hover:text-blue-700"
                >
                    <InformationCircleIcon className="w-6 h-6" />
                </button>
            </div>
        ),
        // 'Payment Window': tournament.paymentWindow ? 'Open' : 'Closed',
        // 'No. of Players': tournament.noOfPlayersRegistered || '0',
        // 'Payment Start': tournament.paymentWindowStart ? new Date(tournament.paymentWindowStart).toLocaleString() : 'N/A',
        // 'Payment End': tournament.paymentWindowEnd ? new Date(tournament.paymentWindowEnd).toLocaleString() : 'N/A',
    })) : [];

    // Filter tournaments based on search query
    // const filteredData = tableData?.filter((row) =>
    //     Object.values(row).some((value) =>
    //         String(value).toLowerCase().includes(searchQuery.toLowerCase())
    //     )
    // );

    // Handle search functionality
    const handleSearch = (searchTerm: string | undefined) => {
        setSearchQuery(searchTerm); // Update search query state
        if (searchTerm?.trim() === '') {
            setPage(1); // Optionally reset to the first page
        }
    };

    // Get current page data for pagination
    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentData = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    // const handlePageChange = (newPage: number) => {
    //     if (newPage >= 1 && newPage <= Math.ceil((filteredData?.length || 0) / itemsPerPage)) {
    //         setCurrentPage(newPage);
    //     }
    // };

    return (
        <div className={`${getContainerClass(sidebarActive)} flex flex-col`}>
            {!showTournamentTabs && <div className="relative z-10 overflow-auto h-full p-[2%]">
                <Table
                    columns={columns}
                    data={tableData?.map((row, index) => ({
                        ...row,
                        'S.No': index + 1 + (page - 1) * limit, // Adjust S.No based on the current page
                    }))}
                    title="Tournament List"
                    rowColor="bg-[#0F1C23]"
                    tableBgColor="bg-[#1A1D26]"
                    headerTextColor="text-[#45F882]"
                    showSearchBar={true}
                    onSearch={handleSearch}
                    height='60vh'
                    isLoading={isLoading}
                    error={isError}
                    loadingMessage="Loading tournament data..."
                    errorMessage={error?.message}
                />
            </div>}

            {/* Conditionally render TournamentTabs component */}
            {showTournamentTabs && selectedUserId && selectedTournamentId && (
                <TournamentTabs id={selectedUserId} tournamentId={selectedTournamentId} />
            )}

            {/* Pagination Controls */}
            {/* Uncomment if needed for pagination */}
            {/* {filteredData && filteredData.length > itemsPerPage && (
                <div className="flex justify-between items-center m-4 text-[#45F882]">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-transparent border-2 border-[#45F882] rounded-md hover:bg-[#45F882] hover:text-white"
                    >
                        Previous
                    </button>

                    <span>Page {currentPage} of {Math.ceil((filteredData?.length || 0) / itemsPerPage)}</span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === Math.ceil((filteredData?.length || 0) / itemsPerPage)}
                        className="px-4 py-2 bg-transparent border-2 border-[#45F882] rounded-md hover:bg-[#45F882] hover:text-white"
                    >
                        Next
                    </button>
                </div>
            )} */}
        </div>
    );
};

export default TournamentTable;
