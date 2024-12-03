import React, { useState } from 'react';
import GradientCard from '../../components/GradientCard';
import Table from '../../components/common/Table';
import SearchBar from '../../components/SearchBar';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Icons from react-icons
import { useSidebar } from '../../context/SidebarContext';

const TournamentList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { sidebarActive } = useSidebar()
    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    // Table Columns and Data
    const tableColumns = ['S.No', 'Tournament Name', 'Prize Pool', 'Tournament Fee', 'Winner', 'Game History', 'Actions'];

    const tableData = [
        {
            'S.No': 1,
            'Tournament Name': 'Battle Royale',
            'Prize Pool': '$5000',
            'Tournament Fee': '$50',
            'Winner': 'John Doe',
            'Game History': 'View',
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
            'Tournament Name': 'King of the Hill',
            'Prize Pool': '$3000',
            'Tournament Fee': '$30',
            'Winner': 'Jane Smith',
            'Game History': 'View',
            'Actions': (
                <div className="flex space-x-2">
                    <FaEye className="text-blue-500 cursor-pointer" />
                    <FaEdit className="text-green-500 cursor-pointer" />
                    <FaTrash className="text-red-500 cursor-pointer" />
                </div>
            ),
        },
        // More data rows can be added here
    ];

    // Filter Table Data Based on Search Term
    const filteredData = tableData.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen`}>
            <div className='m-4'>
                <Table
                    columns={tableColumns}
                    data={filteredData}
                    title='Tournament List'
                    showSearchBar={true}
                    onSearch={handleSearch}
                    height='68vh'
                />
            </div>
        </div>
    );
};

export default TournamentList;


