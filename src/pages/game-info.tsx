import React from 'react'
import GradientCard from '../components/GradientCard';
import Table from '../components/Table';
import { tableColumns, tableData } from '../data/data';
import { useSidebar } from '../SidebarContext';
const GameInfo: React.FC = () => {
  const {sidebarActive} = useSidebar()
  // Gradient Card Data
  const gradientCards = [
    {
      title: 'Total Games',
      value: '100',
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
      title: 'Total Players',
      value: '500',
      imageSrc: 'icons/league.png',
      imageAlt: 'Players Icon',
    },
  ];


  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]': 'w-[94%]'} h-screen flex overflow-auto`}>
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
            {/* Table */}
            <div className="overflow-auto">
              <Table columns={tableColumns} data={tableData} title='Game Information' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
