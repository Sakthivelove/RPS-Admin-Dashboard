import React from 'react';
import Table from "../components/common/Table";
import { useUsers } from '../hooks/useUsers';
import { useSidebar } from '../context/SidebarContext';
import { truncateAddress } from '../utils';

const UserList: React.FC = () => {
  const { data, error, isLoading } = useUsers();  // Using the custom hook to fetch user data
  const { sidebarActive } = useSidebar();
  

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen overflow-hidden flex flex-col justify-center items-center bg-black bg-opacity-50`}>
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen overflow-hidden flex flex-col justify-center items-center bg-black bg-opacity-50`}>
        <div className="text-white text-xl">Details: {error.message}</div>
      </div>
    );
  }

  // Define columns for the table (including all possible fields from the User interface)
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
    'Admin Wallet', 
    'USD Price in Rock', 
    'Telegram Link', 
    'External Username', 
    'User Token', 
    'Total Win Amount', 
    'Avatar Created', 
    'Created On', 
    'Password', 
    'Reset Token', 
    'Reset Expiry'
  ];

  // Transform API data into the format expected by the table
  const userListData = data?.users.map((user, index) => ({
    'S.No': index + 1,
    'Telegram ID': user.telegramId,  // Display the Telegram ID
    'User Name': user.userName || 'N/A',  // Fallback if userName is not available
    'Player ID': user.playerId || 'N/A',  // Fallback if playerId is not available
    'Referral Code': user.referralCode || 'N/A',
    'Wallet ID': truncateAddress(user.walletId,6) || 'N/A',
    'Avatar Gender': user.avatarGender || 'N/A',  // Fallback if avatarGender is not available
    'Avatar Name': user.avatarName || 'N/A',  // Fallback if avatarName is not available
    'NFT Address': user.nftAddress || 'N/A',  // Fallback if nftAddress is not available
    'Email': user.email || 'N/A',
    'Player Level': user.playerLevel || 'N/A',  // Fallback if playerLevel is not available
    'Admin Wallet': user.adminWallet || 'N/A',  // Fallback if adminWallet is not available
    'USD Price in Rock': user.rockUSDPrice || 'N/A',  // Fallback if rockUSDPrice is not available
    'Telegram Link': user.telegramLink || 'N/A',  // Fallback if telegramLink is not available
    'External Username': user.xUserName || 'N/A',  // Fallback if xUserName is not available
    'User Token': user.userToken || 'N/A',  // Fallback if userToken is not available
    'Total Win Amount': user.totalWinAmount || 0,  // Fallback to 0 if totalWinAmount is not available
    'Avatar Created': user.isAvatarCreated ? 'Yes' : 'No',  // Display "Yes" or "No"
    'Created On': user.createdOn || 'N/A',  // Fallback if createdOn is not available
    'Password': user.password || 'N/A',  // Fallback if password is not available
    'Reset Token': user.ResetToken || 'N/A',  // Fallback if ResetToken is not available
    'Reset Expiry': user.ResetExpiry || 'N/A',  // Fallback if ResetExpiry is not available
  }));

  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen overflow-hidden flex flex-col`}>
      <div className="flex-1 p-6 bg-opacity-80">
        <Table
          columns={userListColumns}
          data={userListData || []}
          title="User List"
          headerTextColor="text-[#45F882]"
          height='65vh'
        />
      </div>
    </div>
  );
};

export default UserList;
