import React, { useState, useEffect } from 'react';
import Table from '../../components/common/Table';
import { useUserTasks } from '../../hooks/useUserTasks';
import { useSidebar } from '../../context/SidebarContext';
import { useNavigate, useLocation } from 'react-router-dom'; // React Router hook
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { truncateAddress } from '../../utils';

const UserTasks: React.FC = () => {
  const [page, setPage] = useState(1); // Track the current page
  const limit = 10;
  const [search, setSearch] = useState<string | undefined>(undefined)
  const navigate = useNavigate(); // React Router hook to navigate
  const { sidebarActive } = useSidebar();
  const [totalPages, setTotalPages] = useState<number>(0);
  const location = useLocation(); // To access the query parameters

  // Extract the 'filter' query parameter from the URL
  const searchParams = new URLSearchParams(location.search);
  const filter = searchParams.get('filter') || '';

  // Fetch tasks using the custom hook with the filter parameter
  const { data, isLoading, error, isError } = useUserTasks({ page, limit, filter, search });

  // Update total pages when totalCount changes
  useEffect(() => {
    if (data?.total) {
      setTotalPages(Math.ceil(data.total / limit));
    }
  }, [data?.total, limit]);
  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (term: string | undefined) => {
    setSearch(term)
    if (term?.trim() === '') {
      setPage(1); // Optionally reset to the first page
    }
  }

  const columns = [
    'S.No',
    'Wallet ID',
    'Wallet Connection',
    'Telegram Connection',
    'X Connection',
    'Registered Tournament',
    'Friends Invited',
    'More Info', // Added Action column for View, Edit, Delete
  ];

  const tableData = data?.tasks.map((task: any, index: number) => ({
    'S.No': index + 1 + (page - 1) * limit, // Adjust index based on current page
    'Wallet ID': truncateAddress(task.walletId, 6), // Truncate walletId here
    'Wallet Connection': task.walletConnection ? 'Yes' : 'No',
    'Telegram Connection': task.telegramConnection ? 'Yes' : 'No',
    'X Connection': task.xConnection ? 'Yes' : 'No',
    'Registered Tournament': task.registeredTournament ? 'Yes' : 'No',
    'Friends Invited': task.friendsInvited,
    'More Info': (
      <div className="flex space-x-3 justify-center items-center">
        {/* View Icon */}
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => navigate(`/users/tasks/${task.id}`)}
        >
          <InformationCircleIcon className="w-6 h-6" />
        </button>
      </div>
    ),
  }));

  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen text-white overflow-auto`}>
      <div className="relative z-10 overflow-auto h-full p-[2%]">
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
          height="59vh"
          page={page}
          limit={limit}
          onPageChange={handlePageChange}
          totalPages={totalPages}
          // totalItems={data?.total || 0}
          isLoading={isLoading}
          error={isError}
          loadingMessage="Loading tasks..."
          errorMessage={error?.message || 'Error fetching tasks'}
        />
      </div>
    </div>
  );
};

export default UserTasks;
