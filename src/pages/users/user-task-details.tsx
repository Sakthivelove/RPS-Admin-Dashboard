import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserTaskDetails } from '../../hooks/useUserTaskDetails';
import { useSidebar } from '../../context/SidebarContext';
import StatusMessage from "../../components/StatusMessage";

const UserTaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Getting the task ID from the URL params
  const { sidebarActive } = useSidebar(); // Sidebar context
  const { data, isLoading, isError, error } = useUserTaskDetails(id!); // Fetching task details

  return (
    <div
      className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen overflow-auto p-8`}
    >
      <StatusMessage
        isLoading={isLoading}
        error={error}
        errorMessage={error?.message || 'Error fetching Task Details'}
        className="h-screen p-8 text-white flex justify-center items-center"
      />

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-white mb-12 text-center">User Task Details</h1>

        {/* Main Container: List of Key-Value Pairs */}
        <div className="space-y-6">
          {/* Task ID */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Task ID:</p>
            <p className="text-2xl text-gray-300">{data?.id}</p>
          </div>

          {/* Wallet ID */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Wallet ID:</p>
            <p className="text-2xl text-gray-300 break-words">{data?.walletId}</p> {/* Added 'break-words' */}
          </div>

          {/* Wallet Connection */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Wallet Connection:</p>
            <p className="text-2xl text-gray-300">{data?.walletConnection ? 'Yes' : 'No'}</p>
          </div>

          {/* Telegram Connection */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Telegram Connection:</p>
            <p className="text-2xl text-gray-300">{data?.telegramConnection ? 'Yes' : 'No'}</p>
          </div>

          {/* X Connection */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">X Connection:</p>
            <p className="text-2xl text-gray-300">{data?.xConnection ? 'Yes' : 'No'}</p>
          </div>

          {/* Registered Tournament */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Registered Tournament:</p>
            <p className="text-2xl text-gray-300">{data?.registeredTournament ? 'Yes' : 'No'}</p>
          </div>

          {/* Friends Invited */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Friends Invited:</p>
            <p className="text-2xl text-gray-300">{data?.friendsInvited}</p>
          </div>

          {/* Status */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Status:</p>
            <p className="text-2xl text-gray-300">{data?.taskStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTaskDetails;
