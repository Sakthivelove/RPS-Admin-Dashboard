import React from 'react';
import Table from "../../components/Table";
import { useUserAffiliates } from '../../hooks/useAffiliates';
import { useSidebar } from '../../SidebarContext';

const UserAffiliates: React.FC = () => {
  const { data, error, isLoading } = useUserAffiliates();  // Using the custom hook to fetch user data
  const { sidebarActive } = useSidebar()
  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full text-white =">
        <div className="flex items-center">
          <div className="spinner-border animate-spin w-8 h-8 border-4 border-t-4 border-[#45F882] rounded-full mr-4"></div>
          <span className="text-xl">Loading...</span>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex justify-center items-center h-full text-white =">
        <div className="bg-red-500 p-6 rounded-md shadow-lg">
          <h2 className="text-xl font-bold text-white">Error fetching user-list!</h2>
          <p className="mt-2 text-white">Something went wrong. Please try again later.</p>
        </div>
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
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen overflow-auto`}>
      <div className="flex-1 h-full p-6 bg-opacity-80">
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

export default UserAffiliates;
