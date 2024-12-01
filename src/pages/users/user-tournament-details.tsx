import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserTournamentDetails } from '../../hooks/useUserTournamentDetails';
import { useSidebar } from '../../context/SidebarContext';

const UserTournamentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Get the tournament ID from URL params
  const { sidebarActive } = useSidebar();  // Sidebar context to adjust layout width
  const { data, isLoading, isError, error } = useUserTournamentDetails(id!); // Fetching tournament details using the custom hook

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

  // Render the tournament details
  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen text-white overflow-auto p-8`}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-200 mb-6">User Tournament Details</h1>
        <div className="space-y-6">
          {/* Tournament ID */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Tournament ID:</p>
            <p className="text-2xl text-gray-300">{data?.tournamentId}</p>
          </div>

          {/* Wallet ID */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Wallet ID:</p>
            <p className="text-2xl text-gray-300">{data?.walletId}</p>
          </div>

          {/* Entry Fee Paid */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Entry Fee Paid:</p>
            <p className="text-2xl text-gray-300">{data?.entryPaid ? 'Yes' : 'No'}</p>
          </div>

          {/* Nominal Fee Paid */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Nominal Fee Paid:</p>
            <p className="text-2xl text-gray-300">{data?.nominalPaid ? 'Yes' : 'No'}</p>
          </div>

          {/* Transaction ID */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Transaction ID:</p>
            <p className="text-2xl text-gray-300">{data?.transactionId || 'N/A'}</p>
          </div>

          {/* Default Move */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Default Move:</p>
            <p className="text-2xl text-gray-300">{data?.defaultMove}</p>
          </div>

          {/* Status */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Status:</p>
            <p className="text-2xl text-gray-300">{data?.status}</p>
          </div>

          {/* Registered At (formatted) */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Registered At:</p>
            <p className="text-2xl text-gray-300">
              {data?.registeredAt ? new Date(Number(data.registeredAt) * 1000).toLocaleString() : 'N/A'}
            </p>
          </div>

          {/* Last Stage */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Last Stage:</p>
            <p className="text-2xl text-gray-300">{data?.lastStage}</p>
          </div>

          {/* Date/Time */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Date/Time:</p>
            <p className="text-2xl text-gray-300">
              {data?.dateTime ? new Date(Number(data.dateTime) * 1000).toLocaleString() : 'N/A'}
            </p>
          </div>

          {/* Tournament Name */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Tournament Name:</p>
            <p className="text-2xl text-gray-300">{data?.tournamentName || 'N/A'}</p>
          </div>

          {/* Winner */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Winner:</p>
            <p className="text-2xl text-gray-300">{data?.winner || 'N/A'}</p>
          </div>

          {/* Add more tournament details as needed */}
        </div>
      </div>
    </div>
  );
};

export default UserTournamentDetails;
