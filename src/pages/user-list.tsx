import React from 'react';
import Table from "../components/common/Table";
import { useUsers } from '../hooks/useUsers';
import { useSidebar } from '../context/SidebarContext';

const UserList: React.FC = () => {
  const { data, error, isLoading } = useUsers();  // Using the custom hook to fetch user data
  const { sidebarActive } = useSidebar()

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen overflow-hidden flex flex-col justify-center items-center bg-black bg-opacity-50`}>
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen overflow-hidden flex flex-col justify-center items-center bg-black bg-opacity-50`}>
        <div className="text-white text-xl">Details: {error.message}</div>
      </div>
    );
  }

  // Define columns for the table
  const userListColumns = ['S.No', 'Telegram ID', 'ID'];

  // Transform API data into the format expected by the table
  const userListData = data?.users.map((user, index) => ({
    'S.No': index + 1,
    'Telegram ID': user.telegramId,  // Display the Telegram ID
    ID: `U00${user.id}`,             // Format user ID as needed (e.g., "U001", "U002")
  }));

  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen overflow-hidden flex flex-col`}>
      <div className="flex-1 p-6 bg-opacity-80">
        <Table
          columns={userListColumns}
          data={userListData || []}
          title="User List"
          headerTextColor="text-[#45F882]"
        />
      </div>
    </div>
  );
};

export default UserList;
