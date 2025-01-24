import React, { useState, useMemo, useEffect } from 'react';
import Table from '../../components/common/Table';
import { useRegisteredTournaments } from '../../hooks/useRegisteredTournaments';
import { useSidebar } from '../../context/SidebarContext';
import { useNavigate } from 'react-router-dom';
import { truncateAddress } from '../../utils';

const UpcomingTournaments: React.FC = () => {
    const [page, setPage] = useState(1);
    const limit = 10;
    const [search, setSearch] = useState<string | undefined>()
    const { sidebarActive } = useSidebar();
    const [totalPages, setTotalPages] = useState<number>(0);
    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useRegisteredTournaments(page, limit, search);

    // Update total pages when totalCount changes
    useEffect(() => {
        if (data?.total) {
            setTotalPages(Math.ceil(data.total / limit));
        }
    }, [data?.total, limit]);
    const columns = [
        'S.No',
        'Tournament Name',
        'Wallet ID',
        // 'Tournament ID',
        'Entry Fee Paid',
        'Nominal Fee Paid',
        'Transaction ID',
        'Entry Fee',
        'Nominal Fee',
        'Default Move',
        'Registered At',
        'Last Stage',
        'Status',
        'Date Time'
    ];


    const tableData = useMemo(() =>
        data?.userTournaments?.map((tournament, index) => ({
            'S.No': index + 1,
            'Wallet ID': truncateAddress(tournament.walletId, 6),
            // 'Tournament ID': tournament.tournamentId,
            'Entry Fee Paid': tournament.entryPaid ? 'Yes' : 'No',
            'Nominal Fee Paid': tournament.nominalPaid ? 'Yes' : 'No',
            'Transaction ID': tournament.transactionId && truncateAddress(tournament.transactionId, 6) || "N/A",
            'Entry Fee': tournament.entryFee,
            'Nominal Fee': tournament.nominalFee,
            'Default Move': tournament.defaultMove,
            'Registered At': new Date(Number(tournament.registeredAt) * 1000).toLocaleString(),
            'Last Stage': tournament.lastStage,
            'Status': tournament.status,
            'Date Time': new Date(Number(tournament.dateTime) * 1000).toLocaleString(),
            'Tournament Name': tournament.tournamentName || 'N/A',
            'Winner': tournament.winner || 'N/A',
            // 'Actions': (
            //     <div className="flex gap-2">
            //         <button
            //             onClick={() => handleView(tournament.id)}
            //             className="text-blue-500 hover:text-blue-700"
            //         >
            //             View
            //         </button>
            //         <button
            //             onClick={() => handleEdit(tournament.id)}
            //             className="text-yellow-500 hover:text-yellow-700"
            //         >
            //             Edit
            //         </button>
            //         <button
            //             onClick={() => handleDelete(tournament.id)}
            //             className="text-red-500 hover:text-red-700"
            //         >
            //             Delete
            //         </button>
            //     </div>
            // ),
        })) || [],
        [data]
    );

    // const handleSearch = (term: string | undefined) => {
    //     setSearch(term)
    //     if (term?.trim() === '') {
    //         setPage(1); // Optionally reset to the first page
    //     }
    // }

    const [filteredData, setFilteredData] = useState(tableData);

    // useEffect(() => {
    //     setFilteredData(tableData); // Sync filteredData with tableData when tableData changes
    // }, [tableData]);

    const handleSearch = (searchTerm: string | undefined) => {
        const filtered = searchTerm ? tableData.filter((row) =>
            Object.values(row)
                .join(' ')
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        ) : tableData;
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

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= (totalPages || 0)) {
            setPage(newPage);
        }
    };

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
                    onPageChange={handlePageChange}
                    totalPages={totalPages}
                    searchPlaceholder="Search tournaments..."
                    isLoading={isLoading}
                    error={isError}
                    loadingMessage="Fetching Upcoming Tournaments..."
                    errorMessage={error?.message}
                />
            </div>
        </div>
    );
};

export default UpcomingTournaments;
