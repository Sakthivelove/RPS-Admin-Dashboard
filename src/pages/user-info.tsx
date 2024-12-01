import React, { useState } from 'react';
import GradientCard from '../components/GradientCard';
import Table from '../components/common/Table';
import { userInfoTableColumns, userInfoTableData } from '../data/mockData';
import { useSidebar } from '../context/SidebarContext';

const UserInfo: React.FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<'userinfo' | 'gamehistory' | 'top8games'>('userinfo');
  const { sidebarActive } = useSidebar()
  // Dummy Data for User Info
  const userInfoData = [
    { key: 'Username', value: 'Sakthivel' },
    { key: 'Email', value: 'sakthivel@example.com' },
    { key: 'Total Wins', value: '25' },
    { key: 'Total Games Played', value: '40' },
  ];

  // Tab Switching Logic
  const renderTabContent = () => {
    if (activeTab === 'userinfo') {
      return (
        <div className="flex flex-col gap-4 text-black p-6">
          {userInfoData.map((item, index) => (
            <div key={index} className="flex">
              <div className="font-rajdhani font-medium text-[#969EB2] w-1/2 pr-4">{item.key}:</div>
              <div className="font-rajdhani font-medium text-[#969EB2] w-1/2">{item.value}</div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="overflow-auto flex-grow">
        <Table columns={userInfoTableColumns} data={userInfoTableData} />
      </div>
    );
  };

  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen overflow-auto flex flex-col`}>
      {/* Gradient Cards */}
      <div className="space-x-6 flex m-4">
        <GradientCard
          title="Total Users"
          value="1,024"
          imageSrc="icons/user-avathar.png"
          imageAlt="Total Users"
        />
        <GradientCard
          title="Active Games"
          value="76"
          imageSrc="icons/trophy_1.png"
          imageAlt="Active Games"
        />
        <GradientCard
          title="Revenue"
          value="$10,200"
          imageSrc="icons/league.png"
          imageAlt="Revenue"
        />
      </div>

      {/* Tabs */}
      <div className="bg-[#0F1C23] rounded-lg mx-4">
        <div className="flex justify-around text-black">
          <button
            className={`py-4 flex-grow text-center font-rajdhani font-semibold ${activeTab === 'userinfo' ? 'bg-[#45F882] text-black' : 'bg-[#0F1C23] text-white'
              }`}
            onClick={() => setActiveTab('userinfo')}
          >
            User Info
          </button>
          <button
            className={`py-4 flex-grow text-center font-rajdhani font-semibold ${activeTab === 'gamehistory' ? 'bg-[#45F882] text-black' : 'bg-[#0F1C23] text-white'
              }`}
            onClick={() => setActiveTab('gamehistory')}
          >
            Game History
          </button>
          <button
            className={`py-4 flex-grow text-center font-rajdhani font-semibold ${activeTab === 'top8games' ? 'bg-[#45F882] text-black' : 'bg-[#0F1C23] text-white'
              }`}
            onClick={() => setActiveTab('top8games')}
          >
            Top 8 Games
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-grow bg-[#1A1D26] rounded-lg mb-4 mx-4">{renderTabContent()}</div>
    </div>

  );
};

export default UserInfo;
