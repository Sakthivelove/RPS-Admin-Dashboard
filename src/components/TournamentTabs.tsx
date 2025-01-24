import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api';
import Table from './common/Table';
import { FaSpinner } from 'react-icons/fa';
import { useSidebar } from '../context/SidebarContext';
import { AiOutlineBars, AiOutlineTrophy } from 'react-icons/ai';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Grid, Typography, Paper } from '@mui/material';

type TournamentRow = {
    "S.No": number;
    "Tournament Name": string;
    "Tournament ID": string;
    "Wallet ID": string;
    "Transaction ID": string;
    "Entry Fee": string;
    "Nominal Tournament": string;
    "Nominal Fee": string;
    "Default Move": string;
    "Registered At": string;
    "Last Stage": string;
    "Status": string;
    "Primary Tournament ID": string;
    "Date Time": string;
    "Winner": string;
    "Rank": string;
    "Prize Won": string;
};

// Custom Hook to Fetch Data for Tab 1
const useUserTournament = (userId: string | undefined) => {
    return useQuery({
        queryKey: ['userTournament', userId],
        queryFn: () =>
            api.get(`/users/usertournament/${userId}`).then((res) => res.data),
        enabled: !!userId, // Ensures the query only runs if userId is valid
        staleTime: 5 * 60 * 1000, // Optional: Cache the data for 5 minutes
    });
};

const useTournaments = (id: string) => {
    return useQuery({
        queryKey: ['tournaments', id],
        queryFn: () =>
            api.get(`/tournament/${id}`).then((res) => res.data),
    });
};

// Custom Hook to Fetch Data for Tab 2
const useUserTournaments = (tournamentId: string) => {
    return useQuery({
        queryKey: ['userTournaments', tournamentId],
        queryFn: () =>
            api.get(`/users/usertournaments/${tournamentId}`).then((res) => res.data)

    })
}

const TournamentTabs: React.FC<{ tournamentId: string, id: string }> = ({ tournamentId, id }) => {

    console.log("tournamentId", tournamentId);

    const [search, setSearch] = useState<string | undefined>()
    const [page, setPage] = useState(1)
    const [activeTab, setActiveTab] = useState<'tab1' | 'tab2'>('tab1');
    const [userId, setUserId] = useState<string | undefined>(undefined); // Dynamically update userId
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // Store selected userId
    const { sidebarActive } = useSidebar()

    const { data: userTournamentsData, isLoading: isLoadingTab1, isError: isError1, error: error1 } = useUserTournaments(tournamentId);
    const { data: userTournamentData, isLoading: isLoadingTab2, isError: isError2, error: error2 } = useUserTournament(userId || '');
    const { data: tournamentData, isLoading: isLoadingTab3, isError: isError3, error: error3 } = useTournaments(id);


    const columns = [
        'S.No',
        // 'Tournament Name',
        // 'Tournament ID',
        'Wallet ID',
        // 'Transaction ID',
        'Entry Fee Paid',
        // 'Nominal Tournament',
        'Nominal Fee Paid',
        'Default Move',
        // 'Registered At',
        // 'Last Stage',
        // 'Status',
        // 'Primary Tournament ID',
        'Date Time',
        // 'Winner',
        // 'Rank',
        // 'Prize Won',
        // 'More Info'
    ];

    // Data mapping to match table columns for tab2
    const tableData = userTournamentsData?.[0]?.map((item: any, index: number) => ({
        "S.No": index + 1,
        "Tournament Name": item.tournamentName,
        "Tournament ID": item.tournamentId,
        "Wallet ID": item.walletId,
        "Transaction ID": item.transactionId,
        // "Entry Fee": item.entryFee,
        "Entry Fee Paid": item.entryPaid === true ? "Yes" : "No",
        "Nominal Tournament": item.nominalTournament ? "Yes" : "No",
        // "Nominal Fee": item.nominalFee,
        "Nominal Fee Paid": item.nominalPaid === true ? "Yes" : "No",
        "Default Move": item.defaultMove,
        "Registered At": new Date(Number(item.registeredAt) * 1000).toLocaleString(), // Convert timestamp to readable date
        "Last Stage": item.lastStage,
        "Status": item.status,
        "Primary Tournament ID": item.primaryTournamentId,
        "Date Time": new Date(Number(item.dateTime) * 1000).toLocaleString(), // Convert timestamp to readable date
        "Winner": item.winner || "N/A", // If the winner is empty, show N/A
        "Rank": item.rank || "N/A", // If the rank is empty, show N/A
        "Prize Won": item.prizeWon || "N/A", // If the prizeWon is empty, show N/A
        'More Info': (<div className="flex space-x-3 justify-center items-center">
            <button
                onClick={() => {
                    setSelectedUserId(item.id); // Set selected userId
                    setUserId(item.id); // Update userId to enable Tab 2
                    setActiveTab('tab2'); // Automatically switch to Tab 2
                }}
                className="text-blue-500 hover:text-blue-700"
            >
                <InformationCircleIcon className="w-6 h-6" />
            </button>
        </div>)
    }));

    // const handleSearch = (term: string | undefined) => {
    //     setSearch(term)
    //     if (term?.trim() === '') {
    //         setPage(1)
    //     }
    // }

    const [filteredData, setFilteredData] = useState<TournamentRow[]>(tableData);

    const handleSearch = (searchTerm: string | undefined) => {
        const filtered = searchTerm ? tableData.filter((row: TournamentRow) =>
            Object.values(row)
                .join(' ')
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        ) : tableData;
        setFilteredData(filtered);
    };

    // Handle tab switching
    const handleTabSwitch = (tab: 'tab1' | 'tab2') => {
        // if (tab === 'tab2' && !userId) {
        //     alert("Please select a user from the User Tournaments tab.");
        // }
        setActiveTab(tab);
    };




    return (
        <div
            className={`h-screen ml-2`}
        >
            {/* Tabs Header */}
            <div className="w-full bg-[#0D191F] my-4 shadow-md">
                <div className="flex justify-center border-b-2 border-teal-800 mx-auto">
                    <button
                        className={`py-2 px-6 text-sm font-semibold rounded-md transition-all duration-300 
            ${activeTab === 'tab1'
                                ? 'bg-[#3FE075] text-gray-800 shadow-md'
                                : 'text-white hover:bg-[#68E291] hover:shadow-inner'
                            }`}
                        onClick={() => handleTabSwitch('tab1')}
                    >
                        <AiOutlineTrophy className="inline-block mr-2 text-lg" />
                        User Tournaments
                    </button>
                    <button
                        className={`py-2 px-6 text-sm font-semibold rounded-md transition-all duration-300 ml-2 
                ${activeTab === 'tab2'
                                ? 'bg-[#3FE075] text-gray-800 shadow-md'
                                : 'text-white hover:bg-[#68E291] hover:shadow-inner'
                            }`}
                        onClick={() => handleTabSwitch('tab2')}
                    >
                        <AiOutlineBars className="inline-block mr-2 text-lg" />
                        User Tournament Info
                    </button>
                </div>
            </div>


            {/* Tab 1: User Tournament Info */}
            {activeTab === 'tab2' && (
                <div className="rounded-lg shadow-lg m-5 max-w-full overflow-auto bg-[#1A1D26] p-6">
                    {isLoadingTab1 ? (
                        <div className="flex items-center justify-center text-xl text-white font-semibold py-12">
                            <FaSpinner className="animate-spin text-3xl mr-3" /> Loading...
                        </div>
                    ) : (
                        <div className="text-gray-100 rounded-lg p-6 shadow-lg space-y-4 max-h-[80vh] overflow-auto bg-[#1A1D26]">
                            {tournamentData && (
                                <div className="bg-[#1A1D26] p-4 rounded-lg shadow-lg">
                                      {/* Display Banner Image with fallback to alt text */}
                                    {tournamentData.bannerImage ? (
                                        <div className="mb-6 flex justify-center">
                                            <img
                                                src={tournamentData.bannerImage}
                                                alt="Tournament Banner"
                                                className="w-full max-w-md rounded-lg shadow-lg"
                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                    const img = e.target as HTMLImageElement;
                                                    img.onerror = null; // Prevent infinite loop
                                                    img.src = ''; // Set source to empty string
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <Typography variant="body1" color="white" align="center">
                                            No Banner Available
                                        </Typography>
                                    )}

                                    {/* Display Tournament Details */}
                                    {Object.entries(tournamentData).map(([key, value]) => (
                                        key !== "bannerImage" && ( // Exclude the bannerImage key from the table
                                            <Grid
                                                container
                                                spacing={2}
                                                key={key}
                                                className="py-2 bg-[#1A1D26]"
                                            >
                                                <Grid item xs={4} sm={3} className="bg-[#1A1D26]">
                                                    <Typography
                                                        variant="body1"
                                                        color="white"
                                                        fontWeight={600}
                                                    >
                                                        {key.replace(/([A-Z])/g, ' $1') + ' :'}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={8} sm={9} className="bg-[#1A1D26]">
                                                    <Typography variant="body2" color="white">
                                                        {/* Display 'null' if value is an empty string */}
                                                        {value === "" ? "null" : String(value)}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}



            {/* Tab 2: User Tournaments */}
            {activeTab === 'tab1' && (
                <div className="mt-5 mr-3">
                    <Table
                        columns={columns}
                        data={filteredData}
                        title="User Tournaments"
                        headerTextColor="text-[#45F882]"
                        showSearchBar={true}
                        onSearch={handleSearch}
                        searchPlaceholder="Search by Tournament Name"
                        height="65vh"
                        isLoading={isLoadingTab2}
                        error={isError1}
                        loadingMessage="Loading user tournaments..."
                        errorMessage={error1?.message}
                    />
                </div>
            )
            }
        </div >
    );
};

export default TournamentTabs;