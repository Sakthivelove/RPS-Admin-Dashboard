import React, { useState } from 'react';
import GradientCard from '../components/GradientCard';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Icons from react-icons
import { useSidebar } from '../SidebarContext';

const TournamentList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const {sidebarActive} = useSidebar()
    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    // Sample Data for Gradient Cards
    const gradientCards = [
        {
            title: 'Total Tournaments',
            value: '25',
            imageSrc: 'icons/trophy_1.png',
            imageAlt: 'Tournaments Icon',
        },
        {
            title: 'Total Prize Pool',
            value: '$50,000',
            imageSrc: 'icons/league.png',
            imageAlt: 'Prize Pool Icon',
        },
        {
            title: 'Top Winner',
            value: 'John Doe',
            imageSrc: 'icons/user-avathar.png',
            imageAlt: 'Winner Icon',
        },
    ];

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
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]': 'w-[94%]'} h-screen overflow-auto`}>
            {/* Main Content */}
            <div className="flex-grow flex flex-col h-full p-6 overflow-hidden">
                {/* Render Gradient Cards */}
                <div className="flex space-x-6 mb-6">
                    {gradientCards.map((card, index) => (
                        <GradientCard
                            key={index}
                            title={card.title}
                            value={card.value}
                            imageSrc={card.imageSrc}
                            imageAlt={card.imageAlt}
                        />
                    ))}
                </div>;

                {/* Tournament List Section */}
                <div className="flex flex-col bg-[#1A1D26] rounded-lg h-full">
                    {/* Title and Search Bar */}
                    <div className="px-6 pt-6">
                        <h3 className="text-[#45F882] font-rajdhani font-semibold text-3xl mb-4">
                            Tournament List
                        </h3>
                        <SearchBar
                            placeholder="Search tournaments..."
                            onSearch={handleSearch}
                        />
                    </div>

                    {/* Table Section */}
                    <div className="flex-grow overflow-y-auto px-6 pb-6">
                        <Table
                            columns={tableColumns}
                            data={filteredData}
                            // rowColor="#0F1C23"
                            tableBgColor="#1A1D26"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TournamentList;


