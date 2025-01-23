import React, { useState, useMemo } from 'react';
import Table from '../../components/common/Table';
import { useWinLossHistory } from '../../hooks/useWinLossHistory';
import { useSidebar } from '../../context/SidebarContext';
import StatusMessage from '../../components/StatusMessage';

const WinLossRatio: React.FC = () => {
    const [page, setPage] = useState(1);
    const limit = 10;
    const [search, setSearch] = useState<string>(''); // State for search query
    const { sidebarActive } = useSidebar();

    const { data, isLoading, isError, error, refetch } = useWinLossHistory(page, limit);

    const columns = [
        'ID',
        'Player Name',
        'Games Played',
        'Wins',
        'Losses',
        'Win Rate (%)',
        'Loss Rate (%)',
        'Last Game Date',
    ];

    const tableData = useMemo(
        () =>
            data?.history?.map((record) => ({
                ID: record.id,
                'Player Name': record.playerName,
                'Games Played': record.gamesPlayed,
                Wins: record.wins,
                Losses: record.losses,
                'Win Rate (%)': ((record.wins / record.gamesPlayed) * 100).toFixed(2),
                'Loss Rate (%)': ((record.losses / record.gamesPlayed) * 100).toFixed(2),
                'Last Game Date': new Date(Number(record.lastGameDate) * 1000).toLocaleString(),
            })) || [],
        [data]
    );

    const [filteredData, setFilteredData] = useState(tableData);

    const handleSearch = (searchTerm: string | undefined) => {
        const filtered = searchTerm ? tableData.filter((row) =>
            Object.values(row)
                .join(' ')
                .toLowerCase()
                .includes(searchTerm?.toLowerCase())
        ) : [];
        setFilteredData(filtered);
    };

    if (isLoading || error) {
        return (
            <StatusMessage
                isLoading={isLoading}
                error={error}
                loadingMessage="Loading win/loss data..."
                errorMessage={error?.message || 'Failed to fetch win/loss data!'}
                className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'
                    } h-screen flex justify-center items-center`}
            />
        );
    }

    return (
        <div
            className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'
                } h-screen text-white overflow-auto`}
        >
            <div className="m-[2%]">
                <Table
                    columns={columns}
                    data={filteredData}
                    rowColor="bg-gray-800"
                    title="Win/Loss Ratio"
                    headerTextColor="text-[#45F882]"
                    showSearchBar={true}
                    onSearch={handleSearch}
                    searchPlaceholder="Search players..."
                    height='66vh'
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

export default WinLossRatio;
