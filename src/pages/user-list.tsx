import React from 'react';
import Table from "../components/common/Table";
import { useUsers } from '../hooks/useUsers'; 

const UserList: React.FC = () => {
  const { data, error, isLoading } = useUsers();  // Using the custom hook to fetch user data

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="text-white text-xl">Error: {error.message}</div>
      </div>
    );
  }

  // Define columns for the table
  const userListColumns = ['S.No', 'Telegram ID', 'ID', 'Reset Expiry'];

  // Transform API data into the format expected by the table
  const userListData = data?.map((user, index) => ({
    'S.No': index + 1,
    'Telegram ID': user.telegramId,  // Display the Telegram ID
    ID: `U00${user.id}`,             // Format user ID as needed (e.g., "U001", "U002")
    'Reset Expiry': user.ResetExpiry, // Show the Reset Expiry date
  }));

  return (
    <div className="flex h-screen relative">
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
