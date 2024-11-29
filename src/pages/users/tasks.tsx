import React, { useState } from 'react';
import Table from '../../components/Table';
import { useUserTasks } from '../../hooks/useUserTasks';
import { useSidebar } from '../../SidebarContext';

const UserTasks: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 10;

  const {sidebarActive} = useSidebar()

  // Fetch tasks using the custom hook
  const { data, isLoading, error } = useUserTasks({ page, limit, search });

      // Loading State
      if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full text-white bg-[#121212]">
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
            <div className="flex justify-center items-center h-full text-white bg-[#121212]">
                <div className="bg-red-500 p-6 rounded-md shadow-lg">
                    <h2 className="text-xl font-bold text-white">Error fetching Task List!</h2>
                    <p className="mt-2 text-white">Something went wrong. Please try again later.</p>
                </div>
            </div>
        );
    }

  const columns = [
    'ID',
    'Wallet ID',
    'Wallet Connection',
    'Telegram Connection',
    'X Connection',
    'Registered Tournament',
    'Friends Invited',
  ];

  const tableData = data?.tasks.map((task: any) => ({
    ID: task.id,
    'Wallet ID': task.walletId,
    'Wallet Connection': task.walletConnection ? 'Yes' : 'No',
    'Telegram Connection': task.telegramConnection ? 'Yes' : 'No',
    'X Connection': task.xConnection ? 'Yes' : 'No',
    'Registered Tournament': task.registeredTournament ? 'Yes' : 'No',
    'Friends Invited': task.friendsInvited,
  }));

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    setPage(1); // Reset to the first page when searching
  };

  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]': 'w-[94%]'} h-screen text-white overflow-auto`}>
      <div className='m-[2%]'>
        <Table
          title="User Tasks"
          columns={columns}
          data={tableData || []}
          showSearchBar
          onSearch={handleSearch}
          rowColor="bg-[#0F1C23]"
          tableBgColor="bg-[#1A1D26]"
          headerTextColor="text-[#45F882]"
          searchPlaceholder="Search tasks..."
          height="500px"
        />
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={page === 1 || isLoading}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-[#1A1D26] text-[#45F882] rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-white">Page {page}</span>
          <button
            disabled={isLoading || (data?.total && page * limit >= data.total)}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-[#1A1D26] text-[#45F882] rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTasks;
