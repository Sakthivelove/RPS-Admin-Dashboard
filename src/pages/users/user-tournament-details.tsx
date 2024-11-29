import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserTournamentDetails } from '../../hooks/useUserTournamentDetails';
import { useSidebar } from '../../SidebarContext';

const UserTournamentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useUserTournamentDetails(id!);
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
