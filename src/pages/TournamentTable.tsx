import React, { useState } from 'react';
import useTournaments from '../hooks/useTournaments';
import Table from '../components/common/Table';
import { useSidebar } from '../context/SidebarContext';
import { getContainerClass, truncateAddress } from '../utils';
import StatusMessage from '../components/StatusMessage';

const TournamentTable: React.FC = () => {
    const { data, error, isLoading } = useTournaments();
    const [searchQuery, setSearchQuery] = useState('');
    const { sidebarActive } = useSidebar();

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // If loading or error occurs, render the StatusMessage
    if (isLoading || error) {
        return (
            <StatusMessage
                isLoading={isLoading}
                error={error}
                loadingMessage="Loading tournament data..."
                errorMessage={error?.message || 'Unable to fetch tournament data.'}
                className={`absolute right-0 ${sidebarActive ? "w-[77%]" : "w-[94%]"} flex justify-center items-center h-full`}
            />
        );
    }

    // Define columns with all fields from the Tournament interface
    const columns = [
        'S.No',
        'Tournament ID',
        'Banner Image',
        'Tournament Name',
        'Primary Tournament ID',
        'Date & Time',
        'Type',
        'Entry Fee',
        'Nominal Tournament',
        'Nominal Fee',
        'Prize Pool',
        'Winner',
        'Status',
        'Payment Window',
        'No. of Players'
      ];
      

    // Map data to include all fields in the table with fallbacks
    const tableData = data?.map((tournament, index) => ({
        'S.No':index+1,
        'Tournament ID': tournament.tournamentId || 'N/A',
        'Banner Image': tournament.bannerImage || 'N/A',
        'Tournament Name': tournament.tournamentName || 'Unknown',
        'Primary Tournament ID': tournament.primaryTournamentId || 'N/A',
        // Assuming 'dateTime' is a string representing a Unix timestamp in seconds
        'Date & Time': tournament.dateTime ? new Date(Number(tournament.dateTime) * 1000).toLocaleString() : 'N/A',
        'Type': tournament.type || 'N/A',
        'Entry Fee': tournament.entryFee || 'N/A',
        'Nominal Tournament': tournament.nominalTournament ? 'Yes' : 'No',
        'Nominal Fee': tournament.nominalFee || 'N/A',
        'Prize Pool': tournament.totalPrizePool ?? 'N/A',
        'Winner': tournament.winner ? truncateAddress(tournament.winner, 6) : 'N/A',
        'Current Stage': tournament.currentStage || 'N/A',
        'Status': tournament.status || 'N/A',
        'Payment Window': tournament.paymentWindow ? 'Open' : 'Closed',
        'No. of Players': tournament.noOfPlayersRegistered || '0',
        'Payment Start': tournament.paymentWindowStart ? new Date(tournament.paymentWindowStart).toLocaleString() : 'N/A',
        'Payment End': tournament.paymentWindowEnd ? new Date(tournament.paymentWindowEnd).toLocaleString() : 'N/A',
    }));

    // Filter tournaments based on search query
    const filteredData = tableData?.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // Handle search functionality
    const handleSearch = (searchTerm: string) => {
        setSearchQuery(searchTerm); // Update search query state
    };

    // Get current page data for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= Math.ceil((filteredData?.length || 0) / itemsPerPage)) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className={`${getContainerClass(sidebarActive)}`}>
            <div className="m-4">
                <Table
                    columns={columns}
                    data={filteredData?.map((row, index) => ({
                        ...row,
                        'S.No': index + 1 + (currentPage - 1) * itemsPerPage, // Adjust S.No based on the current page
                    }))}
                    title="Tournament List"
                    rowColor="bg-[#0F1C23]"
                    tableBgColor="bg-[#1A1D26]"
                    headerTextColor="text-[#45F882]"
                    showSearchBar={true}
                    onSearch={handleSearch}
                    height='67vh'
                />
            </div>

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
