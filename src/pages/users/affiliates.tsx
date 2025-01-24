import React, { useState } from 'react';
import Table from '../../components/common/Table';
import { useUserAffiliates } from '../../hooks/useAffiliates';
import { useSidebar } from '../../context/SidebarContext';

const UserAffiliates: React.FC = () => {
  const [search, setSearch] = useState<string | undefined>('')
  const [page, setPage] = useState(1);  // Track the current page
  const limit = 10;  // Track the number of items per page
  const { data, error, isLoading, isError } = useUserAffiliates(page, limit, search); // Fetch user data
  const { sidebarActive } = useSidebar(); // Sidebar state
  console.log("Affiliates", data);

  const handleSearch = (term: string | undefined) => {
    setSearch(term)
    if (term?.trim() === '') {
      setPage(1); // Optionally reset to the first page
    }
  }

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Define columns for the table
  const userListColumns = [
    'S.No',
    'Telegram ID',
    // 'ID',
    // 'Reset Expiry'
  ];

  // Transform API data into the format expected by the table
  const userListData = Array.isArray(data) ? data?.map((user, index) => ({
    'S.No': index + 1,
    'Telegram ID': user.telegramId, // Display the Telegram ID
    // ID: `U00${user.id}`, // Format user ID as needed
    // 'Reset Expiry': user.ResetExpiry, // Show the Reset Expiry date
  })) : [];

  return (
    <div
      className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'
        } h-screen overflow-auto`}
    >
      {/* Wrapper to handle positioning and sizing */}
      <div className="h-full bg-opacity-80">


        {/* Render the table only if there is no loading or error */}

        <div className="flex-1 h-full p-6 bg-opacity-80">
          <Table
            columns={userListColumns}
            data={userListData || []}
            title="User Affiliates"
            headerTextColor="text-[#45F882]"
            showSearchBar={true}
            onSearch={handleSearch}
            isLoading={isLoading}
            error={isError}
            loadingMessage="Fetching User Affiliates..."
            errorMessage={error?.message}
            onPageChange={handlePageChange}
          />
        </div>

      </div>
    </div>
  );
};

export default UserAffiliates;
