import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from "../components/common/Table";
import { useUsers } from '../hooks/useUsers';
import { useSidebar } from '../context/SidebarContext';
import { InformationCircleIcon  } from '@heroicons/react/24/outline';

const UserList: React.FC = () => {
  const [page, setPage] = useState(1);  // Track the current page
  const [limit, setLimit] = useState(10);  // Track the number of items per page
  const { data, error, isLoading, isError } = useUsers(page, limit); // Pass page and limit as parameters
  const [totalPages, setTotalPages] = useState<number>(0);
  const { sidebarActive } = useSidebar();
  const navigate = useNavigate();

  const userListColumns = [
    'S.No',
    'User Name',
    'Avatar Gender',
    'Avatar Name',
    'Player Level',
    'XUsername',
    'Total Win Amount',
    'More Info'
  ];

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

  // Handle limit change
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
  };

  const userListData = data?.users.map((user, index) => ({
    'S.No': (page - 1) * limit + index + 1, // Calculate serial number based on page
    'User Name': user.userName || 'N/A',
    'Avatar Gender': user.avatarGender || 'N/A',
    'Avatar Name': user.avatarName || 'N/A',
    'Player Level': user.playerLevel || 'N/A',
    'XUsername': user.xUserName || 'N/A',
    'Total Win Amount': user.totalWinAmount || 0,
    'More Info': (
      <div className="flex space-x-3 justify-center items-center">
        <button
          onClick={() => navigate(`/users/${user.id}`)}
          className="text-blue-500 hover:text-blue-700"
        >
          <InformationCircleIcon  className="w-6 h-6" />
        </button>
      </div>
    ),
  }));

  // For pagination controls, check if there's a total number of pages or items:
  // Calculate total pages with a fallback if data or total is undefined
  // const totalPages = Math.ceil((data?.total || 0) / limit) || 1; // Calculate total pages

  const isNextDisabled = page >= totalPages; // Disable "Next" when on the last page
  const isPreviousDisabled = page === 1; // Disable "Previous" on the first page

  // Only render pagination if there are more than 10 items
  const showPagination = data?.total || 0 > 10;

  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen flex flex-col`}>

      <div className="flex-1 p-4 bg-opacity-80">
        <Table
          columns={userListColumns}
          data={userListData || []}
          title="User List"
          height='50vh'
          headerTextColor='text-[#45F882]'
          showSearchBar={true}
          page={page}
          limit={limit}
          onPageChange={handlePageChange}
          totalPages={totalPages}
          // totalItems={data?.total || 0}
          isLoading={isLoading}
          error={isError}
          loadingMessage="Loading user data..."
          errorMessage="Failed to fetch user data."
        />
      </div>


      {/* Conditionally render pagination controls */}
      {/* {showPagination && (
        <div className="flex justify-between items-center p-4 text-[#45F882]">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={isPreviousDisabled}
            className="px-4 py-2 bg-transparent border-2 border-[#45F882] rounded-md hover:bg-[#45F882] hover:text-white"
          >
            Previous
          </button>
          <span className='text-[#45F882]'>Page {page} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={isNextDisabled}
            className="px-4 py-2 bg-transparent border-2 border-[#45F882] rounded-md hover:bg-[#45F882] hover:text-white"
          >
            Next
          </button>
        </div>
      )} */}
    </div>
  );
};

export default UserList;
