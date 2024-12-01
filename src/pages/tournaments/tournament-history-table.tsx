import React from 'react';
import SearchBar from '../../components/SearchBar'; // Import SearchBar component
import Table from '../../components/common/Table'; // Import Table component
import { FaInfoCircle, FaTrashAlt } from 'react-icons/fa';
import { useSidebar } from '../../context/SidebarContext';

const TournamentHistory: React.FC = () => {
  const {sidebarActive} =useSidebar()
// Table Columns and Data
const tournamentHistoryColumns = [
  'S.No',
  'Tournament Name',
  'Prize Pool',
  'Tournament Fee',
  'Winner',
  'Game History',
  'Actions',
];

const tournamentHistoryData = [
  {
    "S.No": 1,
    "Tournament Name": 'Global Championship',
    "Prize Pool": '$100,000',
    "Tournament Fee": '$20',
    "Winner": 'Team Alpha',
    "Game History": 'View',
    "Actions": (
      <div className="flex space-x-2">
        <button className="text-white">
          <FaInfoCircle size={20} />
        </button>
        <button className="bg-[#45F882] text-white px-3 py-1 rounded">Edit</button>
        <button className="text-white">
          <FaTrashAlt size={20} />
        </button>
      </div>
    ),
  },
  {
    "S.No": 2,
    "Tournament Name": 'City League',
    "Prize Pool": '$50,000',
    "Tournament Fee": '$10',
    "Winner": 'Team Beta',
    "Game History": 'View',
    "Actions": (
      <div className="flex space-x-2">
        <button className="text-white">
          <FaInfoCircle size={20} />
        </button>
        <button className="bg-[#45F882] text-white px-3 py-1 rounded">Edit</button>
        <button className="text-white">
          <FaTrashAlt size={20} />
        </button>
      </div>
    ),
  },
  {
    "S.No": 3,
    "Tournament Name": 'Amateur Cup',
    "Prize Pool": '$25,000',
    "Tournament Fee": '$5',
    "Winner": 'Team Gamma',
    "Game History": 'View',
    "Actions": (
      <div className="flex space-x-2">
        <button className="text-white">
          <FaInfoCircle size={20} />
        </button>
        <button className="bg-[#45F882] text-white px-3 py-1 rounded">Edit</button>
        <button className="text-white">
          <FaTrashAlt size={20} />
        </button>
      </div>
    ),
  },
  {
    "S.No": 4,
    "Tournament Name": 'Elite Showdown',
    "Prize Pool": '$200,000',
    "Tournament Fee": '$50',
    "Winner": 'Team Delta',
    "Game History": 'View',
    "Actions": (
      <div className="flex space-x-2">
        <button className="text-white">
          <FaInfoCircle size={20} />
        </button>
        <button className="bg-[#45F882] text-white px-3 py-1 rounded">Edit</button>
        <button className="text-white">
          <FaTrashAlt size={20} />
        </button>
      </div>
    ),
  },
  {
    "S.No": 5,
    "Tournament Name": 'Battle Royale Series',
    "Prize Pool": '$150,000',
    "Tournament Fee": '$30',
    "Winner": 'Team Zeta',
    "Game History": 'View',
    "Actions": (
      <div className="flex space-x-2">
        <button className="text-white">
          <FaInfoCircle size={20} />
        </button>
        <button className="bg-[#45F882] text-white px-3 py-1 rounded">Edit</button>
        <button className="text-white">
          <FaTrashAlt size={20} />
        </button>
      </div>
    ),
  },
  {
    "S.No": 6,
    "Tournament Name": 'Champion’s Arena',
    "Prize Pool": '$75,000',
    "Tournament Fee": '$15',
    "Winner": 'Team Omega',
    "Game History": 'View',
    "Actions": (
      <div className="flex space-x-2">
        <button className="text-white">
          <FaInfoCircle size={20} />
        </button>
        <button className="bg-[#45F882] text-white px-3 py-1 rounded">Edit</button>
        <button className="text-white">
          <FaTrashAlt size={20} />
        </button>
      </div>
    ),
  },
  // {
  //   "S.No": 7,
  //   "Tournament Name": 'Legends Cup',
  //   "Prize Pool": '$120,000',
  //   "Tournament Fee": '$25',
  //   "Winner": 'Team Sigma',
  //   "Game History": 'View',
  //   "Actions": (
  //     <div className="flex space-x-2">
  //       <button className="text-white">
  //         <FaInfoCircle size={20} />
  //       </button>
  //       <button className="bg-[#45F882] text-white px-3 py-1 rounded">Edit</button>
  //       <button className="text-white">
  //         <FaTrashAlt size={20} />
  //       </button>
  //     </div>
  //   ),
  // },
  // {
  //   "S.No": 8,
  //   "Tournament Name": 'Ultimate Battle League',
  //   "Prize Pool": '$300,000',
  //   "Tournament Fee": '$100',
  //   "Winner": 'Team Kappa',
  //   "Game History": 'View',
  //   "Actions": (
  //     <div className="flex space-x-2">
  //       <button className="text-white">
  //         <FaInfoCircle size={20} />
  //       </button>
  //       <button className="bg-[#45F882] text-white px-3 py-1 rounded">Edit</button>
  //       <button className="text-white">
  //         <FaTrashAlt size={20} />
  //       </button>
  //     </div>
  //   ),
  // },
];

  // Search Handler (optional)
  const handleSearch = (searchTerm: string) => {
    console.log(`Search for: ${searchTerm}`);
    // Add search logic here if needed
  };

  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]': 'w-[94%]'} h-screen text-white flex overflow-auto`}>

      {/* Main Content */}
      <div className="flex-grow p-6">
        {/* Table Section */}
        <div className="p-4 bg-[#1A1D26] rounded-lg">
          {/* Title */}
          <h3 className="text-[#45F882] font-rajdhani font-semibold text-3xl mb-4">
            Tournament History
          </h3>

          {/* Search Bar */}
          <div className="mb-4">
            <SearchBar
              placeholder="Search tournaments..."
              onSearch={handleSearch}
            />
          </div>

          {/* Table */}
          <div className="overflow-auto">
            <Table columns={tournamentHistoryColumns} data={tournamentHistoryData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentHistory;
