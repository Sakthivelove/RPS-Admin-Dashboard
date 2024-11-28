import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserReferralDetails } from '../../hooks/useUserReferralDetails';

const UserReferralDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useUserReferralDetails(id!);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="p-4">
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
