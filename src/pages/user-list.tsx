import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import Table from "../components/common/Table";
import { useUsers } from '../hooks/useUsers';
import { useSidebar } from '../context/SidebarContext';
import StatusMessage from '../components/StatusMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const UserList: React.FC = () => {
  const { data, error, isLoading } = useUsers(); // Using the custom hook to fetch user data
  const { sidebarActive } = useSidebar();
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Define columns for the table (only the specified fields)
  const userListColumns = [
    'S.No',
    'User Name',
    'Avatar Gender',
    'Avatar Name',
    'Player Level',
    'External Username',
    'Total Win Amount',
    'Actions'
  ];

  // Transform API data into the format expected by the table
  const userListData = data?.users.map((user, index) => ({
    'S.No': index + 1,
    'User Name': user.userName || 'N/A',
    'Avatar Gender': user.avatarGender || 'N/A',
    'Avatar Name': user.avatarName || 'N/A',
    'Player Level': user.playerLevel || 'N/A',
    'External Username': user.xUserName || 'N/A',
    'Total Win Amount': user.totalWinAmount || 0,
    'Actions': (
      <div className="flex space-x-3 justify-center items-center">
        <button
          onClick={() => navigate(`/users/${user.id}`)}
          className="text-blue-500 hover:text-blue-700"
        >
          <FontAwesomeIcon icon={faEye} />
        </button>

      </div>
    )
  }));

  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen overflow-hidden flex flex-col`}>
      {/* Render StatusMessage for loading or error states */}
      <StatusMessage
        isLoading={isLoading}
        error={error}
        loadingMessage="Loading user data..."
        errorMessage="Failed to fetch user data."
        className={`bg-black bg-opacity-50 h-full`}
      />

      {/* Render table only if not loading or error */}
      {!isLoading && !error && (
        <div className="flex-1 p-6 bg-opacity-80">
          <Table
            columns={userListColumns}
            data={userListData || []}
            title="User List"
            headerTextColor="text-[#45F882]"
            height='65vh'
            showSearchBar={true}
          />
        </div>
      )}
    </div>
  );
};

export default UserList;
