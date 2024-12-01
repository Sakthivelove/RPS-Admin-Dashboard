import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserReferralDetails } from '../../hooks/useUserReferralDetails';
import { useSidebar } from '../../context/SidebarContext';

const UserReferralDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the referral ID from the URL params
  const { sidebarActive } = useSidebar(); // Sidebar context to adjust layout width
  const { data, isLoading, isError, error } = useUserReferralDetails(id!); // Fetching referral details using the custom hook

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
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen text-white overflow-auto p-8`}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-200 mb-8">User Referral Details</h1>
        <div className="space-y-6">
          {/* Referral Code */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Referral Code:</p>
            <p className="text-2xl text-gray-300">{data?.referralCode}</p>
          </div>

          {/* Wallet ID */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Wallet ID:</p>
            <p className="text-2xl text-gray-300">{data?.walletId}</p>
          </div>

          {/* Referral Count */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Referral Count:</p>
            <p className="text-2xl text-gray-300">{data?.referralCount}</p>
          </div>

          {/* Reward */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Reward:</p>
            <p className="text-2xl text-gray-300">${data?.reward}</p>
          </div>

          {/* Created On */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
            <p className="font-medium text-lg text-gray-400">Created On:</p>
            <p className="text-2xl text-gray-300">{new Date(data?.createdOn! * 1000).toLocaleString()}</p>
          </div>

          {/* Referral History (Optional) */}
          {/* {data?.referralHistory && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
              <p className="font-medium text-lg text-gray-400">Referral History:</p>
              <div className="space-y-4">
                {data.referralHistory.map((history, index) => (
                  <div key={index} className="border-t border-gray-600 pt-2">
                    <p className="text-xl text-gray-300">
                      {history.date}: {history.referredUser} referred.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )} */}

        </div>
      </div>
    </div>
  );
};

export default UserReferralDetails;
