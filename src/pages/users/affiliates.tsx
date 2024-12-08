import React from 'react';
import Table from '../../components/common/Table';
import { useUserAffiliates } from '../../hooks/useAffiliates';
import { useSidebar } from '../../context/SidebarContext';
import StatusMessage from '../../components/StatusMessage';

const UserAffiliates: React.FC = () => {
  const { data, error, isLoading } = useUserAffiliates(); // Fetch user data
  const { sidebarActive } = useSidebar(); // Sidebar state

  // Define columns for the table
  const userListColumns = [
    'S.No',
    'Telegram ID',
    // 'ID',
    // 'Reset Expiry'
  ];

  // Transform API data into the format expected by the table
  const userListData = data?.map((user, index) => ({
    'S.No': index + 1,
    'Telegram ID': user.telegramId, // Display the Telegram ID
    // ID: `U00${user.id}`, // Format user ID as needed
    // 'Reset Expiry': user.ResetExpiry, // Show the Reset Expiry date
  }));

  return (
    <div
      className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'
        } h-screen overflow-auto`}
    >
      {/* Wrapper to handle positioning and sizing */}
      <div className="h-full bg-opacity-80">
        {/* Use StatusMessage for loading and error states with custom positioning */}
        <StatusMessage
          isLoading={isLoading}
          error={error}
          loadingMessage="Fetching User Affiliates..."
          errorMessage="Error fetching User Affiliates!"
          className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50"
        />

        {/* Render the table only if there is no loading or error */}
        {!isLoading && !error && (
          <div className="flex-1 h-full p-6 bg-opacity-80">
            <Table
              columns={userListColumns}
              data={userListData || []}
              title="User Affiliates"
              headerTextColor="text-[#45F882]"
              showSearchBar={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAffiliates;
