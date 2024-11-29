import React from 'react';
import GradientCard from '../components/GradientCard';
import Table from '../components/Table';
import { StakeColumns, StakeData } from '../data/data';
import { useSidebar } from '../SidebarContext';
const StakeInfo: React.FC = () => {
  const {sidebarActive} = useSidebar() 
  // Gradient Card Data
  const gradientCards = [
    {
      title: 'Total Investments',
      value: '$500,000',
      imageSrc: 'icons/trophy_1.png',
      imageAlt: 'Investment Icon',
    },
    {
      title: 'Current Returns',
      value: '$75,000',
      imageSrc: 'icons/league.png',
      imageAlt: 'Returns Icon',
    },
    {
      title: 'Completed Projects',
      value: '20',
      imageSrc: 'icons/trophy_1.png',
      imageAlt: 'Projects Icon',
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
          <div className="p-4 bg-[#1A1D26] rounded-lg">
            <div className="overflow-auto">
              <Table
                columns={StakeColumns}
                data={StakeData}
                title='Stake Info'
                headerTextColor='text-[#45F882]'
                height='53vh'
                customCellTextColor={(row, col) => {
                  if (col === 'Status') {
                    // If Status is "Success", set text color to green
                    if (row[col] === 'Successful') {
                      return 'green';
                    }

                    if (row[col] === 'Completed') {
                      return '#45F882'
                    }
                    // If Status is "Pending", set text color to yellow
                    if (row[col] === 'Pending') {
                      return 'yellow';
                    }
                    // If Status is "Failed", set text color to red
                    if (row[col] === 'Failed') {
                      return 'red';
                    }

                    if (row[col] === "Ongoing") {
                      return "#FFBE18"
                    }
                    // Default color for other statuses
                    return 'white';
                  }
                  return 'white'; // Default color for other columns
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeInfo;
