import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserTaskDetails } from '../../hooks/useUserTaskDetails';
import { useSidebar } from '../../SidebarContext';

const UserTaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useUserTaskDetails(id!);
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
