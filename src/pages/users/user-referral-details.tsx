import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserReferralDetails } from '../../hooks/useUserReferralDetails';
import { useSidebar } from '../../SidebarContext';

const UserReferralDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useUserReferralDetails(id!);
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
      <h1 className="text-xl font-semibold">User Referral Details</h1>
      <div className="mt-4">
        <p><strong>Referral Code:</strong> {data?.referralCode}</p>
        <p><strong>Referral Count:</strong> {data?.referralCount}</p>
        <p><strong>Reward:</strong> ${data?.reward}</p>
        {/* Add more referral details as needed */}
      </div>
    </div>
  );
};

export default UserReferralDetails;
