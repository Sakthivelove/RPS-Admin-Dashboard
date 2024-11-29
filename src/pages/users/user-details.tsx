import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserDetails } from '../../hooks/useUserDetails';
import { useSidebar } from '../../SidebarContext';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useUserDetails(id!);
  const { sidebarActive } = useSidebar()

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
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen text-white overflow-auto`}>
      <h1 className="text-xl font-semibold">User Details</h1>
      <div className="mt-4">
        <p><strong>User ID:</strong> {data?.id}</p>
        <p><strong>Name:</strong> {data?.name}</p>
        <p><strong>Email:</strong> {data?.email}</p>
        <p><strong>Referral Code:</strong> {data?.referralCode}</p>
        {/* Add more user details as needed */}
      </div>
    </div>
  );
};

export default UserDetails;
