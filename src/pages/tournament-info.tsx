import React, { useState } from 'react';
import Table from '../components/Table';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const columns = [
  'S.No',
  'Tournament Name',
  'Prize Pool',
  'Tournament Fee',
  'Winner',
  'Game History',
  'Actions',
];

const data = [
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
  // Add more data to test scrolling behavior
];

const TournamentInfo: React.FC = () => {
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (searchTerm: string) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    setFilteredData(
      data.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(lowercasedTerm)
        )
      )
    );
  };

  return (
    <div
      className="bg-[#0E1B2280] h-screen flex flex-col p-4 rounded-lg overflow-hidden mx-8 my-6"
    >
      <div className="flex-1 overflow-auto rounded-lg no-scrollbar">
        <Table
          title="Tournament Table"
          columns={columns}
          data={filteredData}
          showSearchBar={true}
          onSearch={handleSearch}
          tableBgColor='bg-[#0C1016]'
        />
      </div>
    </div>
  );
};

export default TournamentInfo;
