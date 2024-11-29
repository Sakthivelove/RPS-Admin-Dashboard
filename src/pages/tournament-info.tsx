import React, { useState } from 'react';
import Table from '../components/Table';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useSidebar } from '../SidebarContext';
const TournamentInfoColumns = [
  'S.No',
  'Tournament Name',
  'Prize Pool',
  'Tournament Fee',
  'Winner',
  'Game History',
  'Actions',
];

const TournamentInfoData = [
  {
    'S.No': 1,
    'Tournament Name': 'Alpha',
    'Prize Pool': '$1000',
    'Tournament Fee': '$100',
    Winner: 'John',
    'Game History': 'Details',
    'Actions': (
      <div className="flex space-x-2">
        <FaEye className="text-blue-500 cursor-pointer" />
        <FaEdit className="text-green-500 cursor-pointer" />
        <FaTrash className="text-red-500 cursor-pointer" />
      </div>
    ),
  },
  {
    'S.No': 2,
    'Tournament Name': 'Beta',
    'Prize Pool': '$1500',
    'Tournament Fee': '$200',
    Winner: 'Jane',
    'Game History': 'Details',
    'Actions': (
      <div className="flex space-x-2">
        <FaEye className="text-blue-500 cursor-pointer" />
        <FaEdit className="text-green-500 cursor-pointer" />
        <FaTrash className="text-red-500 cursor-pointer" />
      </div>
    ),
  },
  {
    'S.No': 3,
    'Tournament Name': 'Gamma',
    'Prize Pool': '$2000',
    'Tournament Fee': '$250',
    Winner: 'Alice',
    'Game History': 'Details',
    'Actions': (
      <div className="flex space-x-2">
        <FaEye className="text-blue-500 cursor-pointer" />
        <FaEdit className="text-green-500 cursor-pointer" />
        <FaTrash className="text-red-500 cursor-pointer" />
      </div>
    ),
  },
  {
    'S.No': 4,
    'Tournament Name': 'Delta',
    'Prize Pool': '$3000',
    'Tournament Fee': '$300',
    Winner: 'Bob',
    'Game History': 'Details',
    'Actions': (
      <div className="flex space-x-2">
        <FaEye className="text-blue-500 cursor-pointer" />
        <FaEdit className="text-green-500 cursor-pointer" />
        <FaTrash className="text-red-500 cursor-pointer" />
      </div>
    ),
  },
  {
    'S.No': 5,
    'Tournament Name': 'Epsilon',
    'Prize Pool': '$3500',
    'Tournament Fee': '$350',
    Winner: 'Charlie',
    'Game History': 'Details',
    'Actions': (
      <div className="flex space-x-2">
        <FaEye className="text-blue-500 cursor-pointer" />
        <FaEdit className="text-green-500 cursor-pointer" />
        <FaTrash className="text-red-500 cursor-pointer" />
      </div>
    ),
  },
  {
    'S.No': 6,
    'Tournament Name': 'Zeta',
    'Prize Pool': '$4000',
    'Tournament Fee': '$400',
    Winner: 'David',
    'Game History': 'Details',
    'Actions': (
      <div className="flex space-x-2">
        <FaEye className="text-blue-500 cursor-pointer" />
        <FaEdit className="text-green-500 cursor-pointer" />
        <FaTrash className="text-red-500 cursor-pointer" />
      </div>
    ),
  },
  {
    'S.No': 7,
    'Tournament Name': 'Eta',
    'Prize Pool': '$4500',
    'Tournament Fee': '$450',
    Winner: 'Eva',
    'Game History': 'Details',
    'Actions': (
      <div className="flex space-x-2">
        <FaEye className="text-blue-500 cursor-pointer" />
        <FaEdit className="text-green-500 cursor-pointer" />
        <FaTrash className="text-red-500 cursor-pointer" />
      </div>
    ),
  },
  {
    'S.No': 8,
    'Tournament Name': 'Theta',
    'Prize Pool': '$5000',
    'Tournament Fee': '$500',
    Winner: 'Frank',
    'Game History': 'Details',
    'Actions': (
      <div className="flex space-x-2">
        <FaEye className="text-blue-500 cursor-pointer" />
        <FaEdit className="text-green-500 cursor-pointer" />
        <FaTrash className="text-red-500 cursor-pointer" />
      </div>
    ),
  },
  {
    'S.No': 9,
    'Tournament Name': 'Iota',
    'Prize Pool': '$5500',
    'Tournament Fee': '$550',
    Winner: 'Grace',
    'Game History': 'Details',
    'Actions': (
      <div className="flex space-x-2">
        <FaEye className="text-blue-500 cursor-pointer" />
        <FaEdit className="text-green-500 cursor-pointer" />
        <FaTrash className="text-red-500 cursor-pointer" />
      </div>
    ),
  },
  {
    'S.No': 10,
    'Tournament Name': 'Kappa',
    'Prize Pool': '$6000',
    'Tournament Fee': '$600',
    Winner: 'Henry',
    'Game History': 'Details',
    'Actions': (
      <div className="flex space-x-2">
        <FaEye className="text-blue-500 cursor-pointer" />
        <FaEdit className="text-green-500 cursor-pointer" />
        <FaTrash className="text-red-500 cursor-pointer" />
      </div>
    ),
  },
  {
    'S.No': 11,
    'Tournament Name': 'Lambda',
    'Prize Pool': '$6500',
    'Tournament Fee': '$650',
    Winner: 'Isla',
    'Game History': 'Details',
    'Actions': (
      <div className="flex space-x-2">
        <FaEye className="text-blue-500 cursor-pointer" />
        <FaEdit className="text-green-500 cursor-pointer" />
        <FaTrash className="text-red-500 cursor-pointer" />
      </div>
    ),
  },
  {
    'S.No': 12,
    'Tournament Name': 'Mu',
    'Prize Pool': '$7000',
    'Tournament Fee': '$700',
    Winner: 'Jack',
    'Game History': 'Details',
    'Actions': (
      <div className="flex space-x-2">
        <FaEye className="text-blue-500 cursor-pointer" />
        <FaEdit className="text-green-500 cursor-pointer" />
        <FaTrash className="text-red-500 cursor-pointer" />
      </div>
    ),
  },
  {
    'S.No': 13,
    'Tournament Name': 'Nu',
    'Prize Pool': '$7500',
    'Tournament Fee': '$750',
    Winner: 'Kara',
    'Game History': 'Details',
    'Actions': (
      <div className="flex space-x-2">
        <FaEye className="text-blue-500 cursor-pointer" />
        <FaEdit className="text-green-500 cursor-pointer" />
        <FaTrash className="text-red-500 cursor-pointer" />
      </div>
    ),
  },
  {
    'S.No': 14,
    'Tournament Name': 'Xi',
    'Prize Pool': '$8000',
    'Tournament Fee': '$800',
    Winner: 'Leo',
    'Game History': 'Details',
    'Actions': (
      <div className="flex space-x-2">
        <FaEye className="text-blue-500 cursor-pointer" />
        <FaEdit className="text-green-500 cursor-pointer" />
        <FaTrash className="text-red-500 cursor-pointer" />
      </div>
    ),
  },
  {
    'S.No': 15,
    'Tournament Name': 'Omicron',
    'Prize Pool': '$8500',
    'Tournament Fee': '$850',
    Winner: 'Mia',
    'Game History': 'Details',
    'Actions': (
      <div className="flex space-x-2">
        <FaEye className="text-blue-500 cursor-pointer" />
        <FaEdit className="text-green-500 cursor-pointer" />
        <FaTrash className="text-red-500 cursor-pointer" />
      </div>
    ),
  },
];



const TournamentInfo: React.FC = () => {
  const [filteredData, setFilteredData] = useState(TournamentInfoData);
  const {sidebarActive} = useSidebar()
  const handleSearch = (searchTerm: string) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    setFilteredData(
      TournamentInfoData.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(lowercasedTerm)
        )
      )
    );
  };

  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]': 'w-[94%]'} h-screen overflow-auto`}>
      <div className="bg-[#0E1B2280] h-full flex flex-col rounded-lg overflow-hidden">
        <div className="flex flex-col h-full p-3">
          {/* Search Bar and Table Section */}
          <div className="flex-1 overflow-auto rounded-lg no-scrollbar h-full">
            <Table
              title="Tournament Table"
              columns={TournamentInfoColumns}
              data={filteredData}
              showSearchBar={true}
              onSearch={handleSearch}
              tableBgColor="bg-[#0C1016]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentInfo;
