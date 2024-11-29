import React, { useState } from 'react';
import GradientCard from '../components/GradientCard';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import { tableColumns, tableData } from '../data/data';
import { useSidebar } from '../SidebarContext';
const GameHistory: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const {sidebarActive} = useSidebar()
    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };


    // Sample Data for Gradient Cards
    const gradientCards = [
        {
            title: 'Total Games',
            value: '50',
            imageSrc: 'icons/trophy_1.png',
            imageAlt: 'Games Icon',
        },
        {
            title: 'Top Winner',
            value: 'Jane Smith',
            imageSrc: 'icons/user-avathar.png',
            imageAlt: 'Winner Icon',
        },
        {
            title: 'Total Prize Pool',
            value: '$25,000',
            imageSrc: 'icons/league.png',
            imageAlt: 'Prize Pool Icon',
        },
    ];



    // Filter Table Data Based on Search Term
    const filteredData = tableData.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]': 'w-[94%]'} h-screen flex overflow-auto`}>
            {/* Main Content */}
            <div className="flex-grow flex flex-col p-6 overflow-hidden">
                {/* Gradient Cards */}
                {/* // Render Gradient Cards */}
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

                {/* Game History Section */}
                <div className="flex flex-col bg-[#1A1D26] rounded-lg h-full">

                    {/* Table Section */}
                    <div className="flex-grow overflow-y-auto px-6 pb-6">
                        <Table
                            columns={tableColumns}
                            data={filteredData}
                            // rowColor="#0F1C23"
                            tableBgColor="#1A1D26"
                            title='Game History'
                            showSearchBar={true}
                            onSearch={handleSearch}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameHistory;
