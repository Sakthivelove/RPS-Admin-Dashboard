import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserDetails } from '../../hooks/useUserDetails';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useUserDetails(id!);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="p-4">
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
