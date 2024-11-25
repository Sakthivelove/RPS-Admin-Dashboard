import React from 'react';
import GradientCard from '../components/GradientCard';
import Table from '../components/Table';
import { StakeColumns, StakeData } from '../constants/constants';

const StakeHistory: React.FC = () => {
  // Gradient Card Data
  const gradientCards = [
    {
      title: 'Total Stakes',
      value: '150',
      imageSrc: '/trophy_1.png',
      imageAlt: 'Stakes Icon',
    },
    {
      title: 'Active Stakes',
      value: '75',
      imageSrc: '/league.png',
      imageAlt: 'Active Icon',
    },
    {
      title: 'Matured Stakes',
      value: '50',
      imageSrc: '/league.png',
      imageAlt: 'Matured Icon',
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
          <div className="p-4 bg-[#1A1D26] rounded-lg">
            {/* Title */}
            <h3 className="text-[#45F882] font-rajdhani font-semibold text-3xl mb-4">
              Stake History
            </h3>

            {/* Table */}
            <div className="overflow-auto">
              <Table
                columns={StakeColumns}
                data={StakeData}
                headerTextColor='text-[#45F882]'
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

export default StakeHistory;
