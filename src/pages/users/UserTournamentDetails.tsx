import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserTournamentDetails } from '../../hooks/useUserTournamentDetails';

const UserTournamentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useUserTournamentDetails(id!);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">User Tournament Details</h1>
      <div className="mt-4">
        <p><strong>Tournament Name:</strong> {data?.tournamentName}</p>
        <p><strong>Entry Fee Paid:</strong> {data?.entryPaid ? 'Yes' : 'No'}</p>
        <p><strong>Winner:</strong> {data?.winner}</p>
        <p><strong>Status:</strong> {data?.status}</p>
        {/* Add more tournament details as needed */}
      </div>
    </div>
  );
};

export default UserTournamentDetails;
