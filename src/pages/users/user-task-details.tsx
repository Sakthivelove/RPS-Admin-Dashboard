import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserTaskDetails } from '../../hooks/useUserTaskDetails';

const UserTaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useUserTaskDetails(id!);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">User Task Details</h1>
      <div className="mt-4">
        <p><strong>Task ID:</strong> {data?.id}</p>
        <p><strong>Wallet ID:</strong> {data?.walletId}</p>
        <p><strong>Registered Tournament:</strong> {data?.registeredTournament ? 'Yes' : 'No'}</p>
        {/* Add more task details as needed */}
      </div>
    </div>
  );
};

export default UserTaskDetails;
