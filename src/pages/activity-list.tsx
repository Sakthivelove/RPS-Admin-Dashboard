import React from 'react';
import GradientCard from '../components/GradientCard';
import TournamentPage from './tournament-history';
import { useSidebar } from '../SidebarContext';

const ActivityList: React.FC = () => {
  const { sidebarActive } = useSidebar()
  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen overflow-auto`}>

      {/* Main Content */}
      <div className="flex-grow bg-[#0E1B2280] rounded-lg p-6 overflow-hidden">
        {/* Gradient Cards */}
        <div className="flex space-x-6 mb-6">
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

        {/* Tournament Page Content */}
        <div className="rounded-lg p-4 overflow-auto h-full">
          <TournamentPage backgroundColor='transparent' />
        </div>
      </div>
    </div>
  );
};

export default ActivityList;
