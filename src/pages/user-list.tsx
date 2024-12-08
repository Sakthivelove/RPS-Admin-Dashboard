import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import Table from "../components/common/Table";
import { useUsers } from '../hooks/useUsers';
import { useSidebar } from '../context/SidebarContext';
import { truncateAddress } from '../utils';
import StatusMessage from '../components/StatusMessage';
import { formatDate } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const UserList: React.FC = () => {
  const { data, error, isLoading } = useUsers(); // Using the custom hook to fetch user data
  const { sidebarActive } = useSidebar();
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Define columns for the table (only the specified fields)
  const userListColumns = [
    'S.No',
    'Telegram ID',
    'User Name',
    'Player ID',
    'Referral Code',
    'Wallet ID',
    'Avatar Gender',
    'Avatar Name',
    'NFT Address',
    'Email',
    'Player Level',
    'External Username',
    'Total Win Amount',
    'Avatar Created',
    'Created On',
    // 'Actions'
  ];

  // Transform API data into the format expected by the table
  const userListData = data?.users.map((user, index) => ({
    'S.No': index + 1,
    'Telegram ID': user.telegramId,
    'User Name': user.userName || 'N/A',
    'Player ID': user.playerId || 'N/A',
    'Referral Code': user.referralCode || 'N/A',
    'Wallet ID': truncateAddress(user.walletId, 6) || 'N/A',
    'Avatar Gender': user.avatarGender || 'N/A',
    'Avatar Name': user.avatarName || 'N/A',
    'NFT Address': user.nftAddress || 'N/A',
    'Email': user.email || 'N/A',
    'Player Level': user.playerLevel || 'N/A',
    'External Username': user.xUserName || 'N/A',
    'Total Win Amount': user.totalWinAmount || 0,
    'Avatar Created': user.isAvatarCreated ? 'Yes' : 'No',
    'Created On': user.createdOn ? formatDate(Number(user.createdOn)) : 'N/A', // Ensure it's a number
    // 'Actions': (
    //   <div className="flex space-x-3 justify-center items-center">
    //     <button
    //       onClick={() => navigate(`/user-info`)} // Navigate to user-info
    //       className="text-blue-500 hover:text-blue-700"
    //     >
    //       <FontAwesomeIcon icon={faEye} />
    //     </button>
    //     <button className="text-yellow-500 hover:text-yellow-700">
    //       <FontAwesomeIcon icon={faEdit} />
    //     </button>
    //     <button className="text-red-500 hover:text-red-700">
    //       <FontAwesomeIcon icon={faTrash} />
    //     </button>
    //   </div>
    // )
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
