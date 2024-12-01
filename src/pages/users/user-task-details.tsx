import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserTaskDetails } from '../../hooks/useUserTaskDetails';
import { useSidebar } from '../../context/SidebarContext';

const UserTaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Getting the task ID from the URL params
  const { sidebarActive } = useSidebar(); // Sidebar context
  const { data, isLoading, isError, error } = useUserTaskDetails(id!); // Fetching task details

  if (isLoading) {
    return (
      <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen p-8 text-white flex justify-center items-center`}>
        <div className="flex items-center">
          <div className="spinner-border animate-spin w-8 h-8 border-4 border-t-4 border-[#45F882] rounded-full mr-4"></div>
          <span className="text-xl">Loading...</span>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen p-8 text-white flex justify-center items-center`}>
        <div className="bg-red-500 p-6 rounded-md shadow-lg">
          <h2 className="text-xl font-bold text-white">Error fetching Tournaments!</h2>
          <p className="mt-2 text-white">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen overflow-auto p-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-white mb-12 text-center">User Task Details</h1>

        {/* Main Container: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Task ID */}
          <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-gray-700">Task ID:</p>
              <p className="text-xl text-gray-900">{data?.id}</p>
            </div>
          </div>

          {/* Wallet ID */}
          <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-gray-700">Wallet ID:</p>
              <p className="text-xl text-gray-900">{data?.walletId}</p>
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-gray-700">Wallet Connection:</p>
              <p className="text-xl text-gray-900">{data?.walletConnection ? 'Yes' : 'No'}</p>
            </div>
          </div>

          {/* Telegram Connection */}
          <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-gray-700">Telegram Connection:</p>
              <p className="text-xl text-gray-900">{data?.telegramConnection ? 'Yes' : 'No'}</p>
            </div>
          </div>

          {/* X Connection */}
          <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-gray-700">X Connection:</p>
              <p className="text-xl text-gray-900">{data?.xConnection ? 'Yes' : 'No'}</p>
            </div>
          </div>

          {/* Registered Tournament */}
          <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-gray-700">Registered Tournament:</p>
              <p className="text-xl text-gray-900">{data?.registeredTournament ? 'Yes' : 'No'}</p>
            </div>
          </div>

          {/* Friends Invited */}
          <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-gray-700">Friends Invited:</p>
              <p className="text-xl text-gray-900">{data?.friendsInvited}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTaskDetails;
