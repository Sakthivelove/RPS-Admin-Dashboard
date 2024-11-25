import React, { useState } from 'react';
import GradientCard from '../components/GradientCard';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import { tableColumns,tableData } from '../constants/constants';

const GameHistory: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };


    // Sample Data for Gradient Cards
    const gradientCards = [
        {
            title: 'Total Games',
            value: '50',
            imageSrc: '/trophy_1.png',
            imageAlt: 'Games Icon',
        },
        {
            title: 'Top Winner',
            value: 'Jane Smith',
            imageSrc: '/user-avathar.png',
            imageAlt: 'Winner Icon',
        },
        {
            title: 'Total Prize Pool',
            value: '$25,000',
            imageSrc: '/league.png',
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
        <div className="flex h-screen overflow-hidden">
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
                    {/* Title and Search Bar */}
                    <div className="px-6 pt-6">
                        <h3 className="text-[#45F882] font-rajdhani font-semibold text-3xl mb-4">
                            Game History
                        </h3>
                        <SearchBar
                            placeholder="Search games..."
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

export default GameHistory;
