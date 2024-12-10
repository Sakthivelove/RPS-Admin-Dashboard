import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserDetails } from '../../hooks/useUserDetails'; // Update with your hook import
import { useSidebar } from '../../context/SidebarContext';
import { Tabs, Tab, Box, Typography, CircularProgress, Paper, Grid, Card, CardContent, Divider, Avatar, Chip } from '@mui/material';

const UserDetailTabs = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useUserDetails(id!);
  const { sidebarActive } = useSidebar();

  const [activeTab, setActiveTab] = useState(0); // default tab is 0 (User Info)

  // Tab titles for display
  const tabs = [
    { label: 'User Info' },
    { label: 'Referrals' },
    { label: 'Tasks' },
    { label: 'Transactions' },
    // { label: 'Tournaments' },
  ];

  // Tab content rendering
  const renderTabContent = () => {
    if (isLoading) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '78vh',
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    if (isError) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '78vh',
          }}
        >
          <Typography color="error">Error: {error?.message}</Typography>
        </Box>
      );
    }
    switch (activeTab) {
      case 0: // User Info tab
        return (
          <Box p={2} sx={{ backgroundColor: '#1A1D26', color: "#D1D1D1" }}> {/* Updated color here */}
            {data ? (
              <Card sx={{ padding: 2, height: "78vh", overflow: "auto", backgroundColor: '#0F1C23' }}>
                <CardContent>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Player ID:</strong> {data.playerId}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Username:</strong> {data.userName}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Email:</strong> {data.email || 'Not available'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Level:</strong> {data.playerLevel}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Avatar:</strong> {data.avatarName} ({data.avatarGender})
                  </Typography>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar
                      src={decodeURIComponent(data.userAvatar)}
                      alt={data.avatarName}
                      sx={{ width: 56, height: 56, marginRight: 2 }}
                    />
                    <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                      Avatar Name: {data.avatarName} | Gender: {data.avatarGender}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Referral Code:</strong> {data.referralCode || 'Not available'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>NFT Address:</strong> {data.nftAddress || 'Not available'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Admin Wallet:</strong> {data.adminWallet || 'Not available'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Rock USD Price:</strong> {data.rockUSDPrice || 'Not available'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Telegram Link:</strong> {data.telegramLink || 'Not available'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>X Link:</strong> {data.XLink || 'Not available'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Instagram Link:</strong> {data.instagramLink || 'Not available'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Facebook Link:</strong> {data.facebookLink || 'Not available'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>LinkedIn Link:</strong> {data.linkedInLink || 'Not available'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Playstore Link:</strong> {data.playstoreLink || 'Not available'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Default Move:</strong> {data.defaultMove}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Telegram ID:</strong> {data.telegramId || 'Not available'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>X Username:</strong> {data.xUserName || 'Not available'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>User Token:</strong> {data.userToken || 'Not available'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Total Win Amount:</strong> {data.totalWinAmount}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Avatar Created:</strong> {data.isAvatarCreated ? 'Yes' : 'No'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Created On:</strong> {new Date(data.createdOn * 1000).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              <Typography>No user data available</Typography>
            )}
          </Box>
        );
      case 1: // Referrals tab
        return (
          <Box p={2}>
            {/* <Typography variant="h6">Referrals</Typography> */}
            {data?.userReferralCode ? (
              <Card sx={{ padding: 2, height: "78vh", backgroundColor: '#0F1C23' }}>
                <CardContent>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Referral Code:</strong> {data.userReferralCode.referralCode || 'Not available'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Referral Count:</strong> {data.userReferralCode.referralCount || '0'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Reward:</strong> {data.userReferralCode.reward || '0'}
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              <Typography>No referral data available</Typography>
            )}
          </Box>
        );
      case 2: // Tasks tab
        return (
          <Box p={2}>
            {/* <Typography variant="h6">Tasks</Typography> */}
            {data?.tasks ? (
              <Card sx={{ padding: 2, height: "78vh", backgroundColor: '#0F1C23' }}>
                <CardContent>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Wallet Connection:</strong> {data.tasks.walletConnection ? 'Connected' : 'Not Connected'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Telegram Connection:</strong> {data.tasks.telegramConnection ? 'Connected' : 'Not Connected'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>X Connection:</strong> {data.tasks.xConnection ? 'Connected' : 'Not Connected'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Registered Tournament:</strong> {data.tasks.registeredTournament ? 'Yes' : 'No'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Friends Invited:</strong> {data.tasks.friendsInvited || '0'}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ color: "#D1D1D1" }}>
                    <strong>Level 3 NFT Generated:</strong> {data.tasks.level3NFTGenerated ? 'Yes' : 'No'}
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              <Typography>No task data available</Typography>
            )}
          </Box>
        );
      case 3: // Transactions tab
        return (
          <Box p={2}>
            {/* <Typography variant="h6">Transactions</Typography> */}
            {data?.transactionDetails.length > 0 ? (
              <Card sx={{ padding: 2, height: "78vh" }}>
                <CardContent>
                  {/* Display transaction details here */}
                  {data.transactionDetails.map((transaction: any, index: number) => (
                    <Typography key={index} variant="body1" color="textSecondary">
                      <strong>Transaction {index + 1}: </strong>{transaction} {/* Adjust based on the transaction data structure */}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '78vh', // To make it full height of the viewport
                backgroundColor: '#0F1C23', // Apply background color
                color: '#D1D1D1', // Set text color
                textAlign: 'center', // Ensure the text is centered
              }}
            >
              <Typography>No transaction data available</Typography>
              </Box>
            )}
          </Box>
        );
      // case 4: // Tournaments tab
      //   return (
      //     <Box p={2}>
      //       <Typography variant="h6">Tournaments</Typography>
      //       <pre>List of tournaments can be shown here</pre>
      //     </Box>
      //   );
default:
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // To make it full height of the viewport
        backgroundColor: '#0F1C23', // Apply background color
        color: '#D1D1D1', // Set text color
        textAlign: 'center', // Ensure the text is centered
      }}
    >
      <Typography variant="h6">Select a tab to view details</Typography>
    </Box>
  );

    }
  };

  return (
    <div className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen text-white overflow-auto`}>
      <Box
        sx={{
          backgroundColor: '#1A1D26', // Custom background color
          color: 'white',
          height: '95vh',
          padding: 2,
          margin: 2
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              sx={{
                backgroundColor: activeTab === index ? '#45F882' : 'transparent',
                color: activeTab === index ? '#fff' : '#B0B0B0',
                '&:hover': {
                  backgroundColor: activeTab === index ? '#45F882' : '#3e8e41', // Change hover color for inactive tabs
                  color: activeTab === index ? '#fff' : '#fff', // Ensure text stays white on hover
                },
              }}
            />
          ))}
        </Tabs>
        <Box >{renderTabContent()}</Box>
      </Box>
    </div>
  );
};

export default UserDetailTabs;
