import React from 'react';
import GradientCard from '../components/GradientCard';
import TournamentPage from './tournament-history';

const ActivityList: React.FC = () => {
  return (
    <div
      className="flex h-screen text-white overflow-hidden p-4"
    >
      {/* Main Content */}
      <div className="flex-grow bg-[#0E1B2280] rounded-lg p-6 overflow-hidden">
        {/* Gradient Cards */}
        <div className="flex space-x-6 mb-6">
          <GradientCard
            title="Total Users"
            value="1,024"
            imageSrc="/user-avathar.png"
            imageAlt="Total Users"
          />
          <GradientCard
            title="Active Games"
            value="76"
            imageSrc="/trophy_1.png"
            imageAlt="Active Games"
          />
          <GradientCard
            title="Revenue"
            value="$10,200"
            imageSrc="/league.png"
            imageAlt="Revenue"
          />
        </div>

        {/* Tournament Page Content */}
        <div className="rounded-lg p-4 overflow-auto h-full">
          <TournamentPage backgroundColor='transparent'/>
        </div>
      </div>
    </div>
  );
};

export default ActivityList;
