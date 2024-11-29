import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserDetails } from '../../hooks/useUserDetails';
import { useSidebar } from '../../SidebarContext';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useUserDetails(id!);
  const { sidebarActive } = useSidebar()

  if (isLoading) return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen text-white overflow-auto`}>
      <div>Loading...</div>
    </div>
  );
  if (isError) return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen text-white overflow-auto`}>
      <div>Error: {(error as Error).message}</div>
    </div>
  );

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
