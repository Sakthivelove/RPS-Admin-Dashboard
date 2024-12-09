import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserDetails } from '../../hooks/useUserDetails'; // Update with your hook import
import { useSidebar } from '../../context/SidebarContext';
import { Tabs, Tab, Box, Typography, CircularProgress, Card, CardContent, Divider, Avatar, Chip, Grid } from '@mui/material';

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
    if (isLoading) return <CircularProgress />;
    if (isError) return <Typography color="error">Error: {error?.message}</Typography>;

    switch (activeTab) {
      case 0: // User Info tab
      return (
        <Box p={2}>
          {data ? (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ padding: 2, backgroundColor: 'transparent', border: '1px solid #444' }}>
                  <CardContent>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>Player ID:</strong> {data.playerId}
                    </Typography>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>Username:</strong> {data.userName}
                    </Typography>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>Email:</strong> {data.email || 'Not available'}
                    </Typography>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>Level:</strong> {data.playerLevel}
                    </Typography>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>Avatar:</strong> {data.avatarName} ({data.avatarGender})
                    </Typography>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar
                        src={decodeURIComponent(data.userAvatar)}
                        alt={data.avatarName}
                        sx={{ width: 56, height: 56, marginRight: 2 }}
                      />
                      <Typography variant="body1" color="#D3D3D3">
                        Avatar Name: {data.avatarName} | Gender: {data.avatarGender}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>Referral Code:</strong> {data.referralCode || 'Not available'}
                    </Typography>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>NFT Address:</strong> {data.nftAddress || 'Not available'}
                    </Typography>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>Admin Wallet:</strong> {data.adminWallet || 'Not available'}
                    </Typography>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>Rock USD Price:</strong> {data.rockUSDPrice || 'Not available'}
                    </Typography>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>Telegram Link:</strong> {data.telegramLink || 'Not available'}
                    </Typography>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>X Link:</strong> {data.XLink || 'Not available'}
                    </Typography>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>Instagram Link:</strong> {data.instagramLink || 'Not available'}
                    </Typography>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>Facebook Link:</strong> {data.facebookLink || 'Not available'}
                    </Typography>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>LinkedIn Link:</strong> {data.linkedInLink || 'Not available'}
                    </Typography>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>Playstore Link:</strong> {data.playstoreLink || 'Not available'}
                    </Typography>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>Default Move:</strong> {data.defaultMove}
                    </Typography>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>Telegram ID:</strong> {data.telegramId || 'Not available'}
                    </Typography>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>X Username:</strong> {data.xUserName || 'Not available'}
                    </Typography>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>User Token:</strong> {data.userToken || 'Not available'}
                    </Typography>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>Total Win Amount:</strong> {data.totalWinAmount}
                    </Typography>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>Avatar Created:</strong> {data.isAvatarCreated ? 'Yes' : 'No'}
                    </Typography>
                    <Typography variant="body1" color="#D3D3D3">
                      <strong>Created On:</strong> {new Date(data.createdOn * 1000).toLocaleString()}
                    </Typography>
                    <Divider sx={{ marginY: 2, backgroundColor: '#444' }} />
                    <Chip label="Premium User" color="success" variant="outlined" />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ) : (
            <Typography>No user data available</Typography>
          )}
        </Box>
      );
    
      case 1: // Referrals tab
        return (
          <Box p={2}>
            {data?.userReferralCode ? (
              <Card sx={{ padding: 2, backgroundColor: 'transparent', border: '1px solid #444' }}>
                <CardContent>
                  <Typography variant="body1" color="#D3D3D3">
                    <strong>Referral Code:</strong> {data.userReferralCode.referralCode || 'Not available'}
                  </Typography>
                  <Typography variant="body1" color="#D3D3D3">
                    <strong>Referral Count:</strong> {data.userReferralCode.referralCount || '0'}
                  </Typography>
                  <Typography variant="body1" color="#D3D3D3">
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
            {data?.tasks ? (
              <Card sx={{ padding: 2, backgroundColor: 'transparent', border: '1px solid #444' }}>
                <CardContent>
                  <Typography variant="body1" color="#D3D3D3">
                    <strong>Wallet Connection:</strong> {data.tasks.walletConnection ? 'Connected' : 'Not Connected'}
                  </Typography>
                  <Typography variant="body1" color="#D3D3D3">
                    <strong>Telegram Connection:</strong> {data.tasks.telegramConnection ? 'Connected' : 'Not Connected'}
                  </Typography>
                  <Typography variant="body1" color="#D3D3D3">
                    <strong>X Connection:</strong> {data.tasks.xConnection ? 'Connected' : 'Not Connected'}
                  </Typography>
                  <Typography variant="body1" color="#D3D3D3">
                    <strong>Registered Tournament:</strong> {data.tasks.registeredTournament ? 'Yes' : 'No'}
                  </Typography>
                  <Typography variant="body1" color="#D3D3D3">
                    <strong>Friends Invited:</strong> {data.tasks.friendsInvited || '0'}
                  </Typography>
                  <Typography variant="body1" color="#D3D3D3">
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
            {data?.transactionDetails.length > 0 ? (
              <Card sx={{ padding: 2, backgroundColor: 'transparent', border: '1px solid #444' }}>
                <CardContent>
                  {data.transactionDetails.map((transaction:any, index:number) => (
                    <Typography key={index} variant="body1" color="#D3D3D3">
                      <strong>Transaction {index + 1}: </strong>{transaction}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Typography>No transaction data available</Typography>
            )}
          </Box>
        );
      default:
        return <Typography>Select a tab to view details</Typography>;
    }
  };

  return (
    <Box
      className={`absolute right-0 ${sidebarActive ? 'w-[77%]' : 'w-[94%]'} h-screen text-white overflow-auto`}
      sx={{
        backgroundColor: '#1A1D26', // Custom background color
        color: 'white',
        height: '100vh',
        padding: 2,
      }}
    >
      <Tabs
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          '& .MuiTab-root': {
            fontFamily: 'Rajdhani', // Title font
            fontWeight: 'bold',
            color: '#A8A8A8', // Inactive tabs color
            '&.Mui-selected': {
              color: 'white',
              backgroundColor: '#4CAF50', // Active tab color (green)
            },
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      {renderTabContent()}
    </Box>
  );
};

export default UserDetailTabs;
