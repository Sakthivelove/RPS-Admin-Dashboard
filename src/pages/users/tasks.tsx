import React, { useState } from 'react';
import Table from '../../components/common/Table';
import { useUserTasks } from '../../hooks/useUserTasks';
import { useSidebar } from '../../context/SidebarContext';
import { useNavigate } from 'react-router-dom'; // React Router hook
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import StatusMessage from '../../components/StatusMessage'; // Import StatusMessage

const UserTasks: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 10;
  const navigate = useNavigate(); // React Router hook to navigate

  const { sidebarActive } = useSidebar();

  // Fetch tasks using the custom hook
  const { data, isLoading, error } = useUserTasks({ page, limit, search });

  // Use StatusMessage for loading and error states
  if (isLoading || error) {
    return (
      <StatusMessage
        isLoading={isLoading}
        error={error}
        loadingMessage="Loading tasks..."
        errorMessage={error?.message || 'Error fetching tasks'}
        className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen`}
      />
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
    'Action', // Added Action column for View, Edit, Delete
  ];

  const tableData = data?.tasks.map((task: any) => ({
    ID: task.id,
    'Wallet ID': task.walletId,
    'Wallet Connection': task.walletConnection ? 'Yes' : 'No',
    'Telegram Connection': task.telegramConnection ? 'Yes' : 'No',
    'X Connection': task.xConnection ? 'Yes' : 'No',
    'Registered Tournament': task.registeredTournament ? 'Yes' : 'No',
    'Friends Invited': task.friendsInvited,
    Action: (
      <div className="flex gap-4">
        {/* View Icon */}
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => navigate(`/users/task/${task.id}`)}
        >
          <FaEye size={20} /> {/* Eye icon */}
        </button>
        {/* Edit Icon */}
        <button className="text-yellow-500 hover:text-yellow-700">
          <FaEdit size={20} /> {/* Edit icon */}
        </button>
        {/* Delete Icon */}
        <button className="text-red-500 hover:text-red-700">
          <FaTrash size={20} /> {/* Trash icon */}
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
