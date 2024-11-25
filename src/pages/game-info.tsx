import React from 'react'
import GradientCard from '../components/GradientCard';
import Table from '../components/Table';
import { tableColumns,tableData } from '../constants/constants';

const GameInfo: React.FC = () => {

  // Gradient Card Data
  const gradientCards = [
    {
      title: 'Total Games',
      value: '100',
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
      title: 'Total Players',
      value: '500',
      imageSrc: '/league.png',
      imageAlt: 'Players Icon',
    },
  ];


  return (
    <div className="flex h-screen text-white">
      {/* Right Section */}
      <div className="flex-grow overflow-hidden">
        {/* Scrolling Container */}
        <div className="flex flex-col p-6 h-full overflow-y-auto">
          {/* Gradient Cards */}
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
          </div>

          {/* Table Section */}
          <div className="p-4 bg-[#1A1D26] rounded-lg h-full">
            {/* Title */}
            <h3 className="text-[#45F882] font-rajdhani font-semibold text-3xl mb-4">
              Game Information
            </h3>

            {/* Table */}
            <div className="overflow-auto">
              <Table columns={tableColumns} data={tableData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
