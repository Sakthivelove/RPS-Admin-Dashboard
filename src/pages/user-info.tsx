import React, { useState } from 'react';
import { useSidebar } from '../context/SidebarContext';
import UserReferrals from './users/referrals';
import UserTasks from './users/tasks';
import UserTransactions from './users/transactions';
import UserTournaments from './users/user-tournaments';

const UserInfo: React.FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<'referrals' | 'tasks' | 'transactions' | 'tournaments'>('referrals');
  const { sidebarActive } = useSidebar();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'referrals':
        return <UserReferrals />;
      case 'tasks':
        return <UserTasks />;
      case 'transactions':
        return <UserTransactions />;
      case 'tournaments':
        return <UserTournaments />;
      default:
        return null;
    }
  };

  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen overflow-hidden flex flex-col`}>
      <div className='m-4'>
        {/* Tabs */}
        <div className="bg-[#0F1C23] rounded-lg mx-4">
          <div className="flex justify-around text-black">
            <button
              className={`py-4 flex-grow text-center font-rajdhani font-semibold ${activeTab === 'referrals' ? 'bg-[#45F882] text-black' : 'bg-[#0F1C23] text-white'}`}
              onClick={() => setActiveTab('referrals')}
            >
              Referrals
            </button>
            <button
              className={`py-4 flex-grow text-center font-rajdhani font-semibold ${activeTab === 'tasks' ? 'bg-[#45F882] text-black' : 'bg-[#0F1C23] text-white'}`}
              onClick={() => setActiveTab('tasks')}
            >
              Tasks
            </button>
            <button
              className={`py-4 flex-grow text-center font-rajdhani font-semibold ${activeTab === 'transactions' ? 'bg-[#45F882] text-black' : 'bg-[#0F1C23] text-white'}`}
              onClick={() => setActiveTab('transactions')}
            >
              Transactions
            </button>
            <button
              className={`py-4 flex-grow text-center font-rajdhani font-semibold ${activeTab === 'tournaments' ? 'bg-[#45F882] text-black' : 'bg-[#0F1C23] text-white'}`}
              onClick={() => setActiveTab('tournaments')}
            >
              Tournaments
            </button>
          </div>
        </div>
        {/* Tab Content */}
        <div className="flex-grow bg-[#1A1D26] rounded-lg mb-4 mx-4">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
