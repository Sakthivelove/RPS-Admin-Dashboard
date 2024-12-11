import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserDetails } from '../../hooks/useUserDetails';
import { useSidebar } from '../../context/SidebarContext';
import {
  Tabs, Tab, Box, Typography, CircularProgress, Card, CardContent,
  Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Grid
} from '@mui/material';
import { getContainerClass } from '../../utils';

const UserDetailTabs = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useUserDetails(id!);
  const { sidebarActive } = useSidebar();

  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'User Info', icon: '👤' },
    { label: 'Referrals', icon: '🔗' },
    { label: 'Tasks', icon: '📝' },
    { label: 'Transactions', icon: '💰' },
  ];

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
          <CircularProgress />
        </Box>
      );
    }

    if (isError) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
          <Typography color="error">Error: {error?.message}</Typography>
        </Box>
      );
    }

    if (!data) {
      return <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>No data available.</Typography>;
    }

    switch (activeTab) {
      case 0: // User Info
        return (
          <Card sx={{ p: 2, height: '86vh', overflow: 'auto', bgcolor: "#0F1C23", color: "white" }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  src={decodeURIComponent(data.userAvatar)}
                  alt={data.avatarName}
                  sx={{ width: 64, height: 64, mr: 2 }}
                />
                <Typography variant="h6">{data.userName}</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6}><Typography variant="body1">Email:</Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">{data.email || 'Not available'}</Typography></Grid>

                <Grid item xs={6}><Typography variant="body1">Player Level:</Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">{data.playerLevel}</Typography></Grid>

                <Grid item xs={6}><Typography variant="body1">Default Move:</Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">{data.defaultMove}</Typography></Grid>

                <Grid item xs={6}><Typography variant="body1">Total Win Amount:</Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">${data.totalWinAmount}</Typography></Grid>

                <Grid item xs={6}><Typography variant="body1">Avatar Name:</Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">{data.avatarName}</Typography></Grid>

                <Grid item xs={6}><Typography variant="body1">Player ID:</Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">{data.playerId}</Typography></Grid>

                <Grid item xs={6}><Typography variant="body1">Referral Code:</Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">{data.referralCode || 'Not available'}</Typography></Grid>

                <Grid item xs={6}><Typography variant="body1">Created On:</Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">{new Date(parseInt(data.createdOn) * 1000).toLocaleString()}</Typography></Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      case 1: // Referrals
        return (
          <TableContainer component={Paper} sx={{ height: '86vh', bgcolor: "#0F1C23", color: "white", padding: 2 }}>
            <Table stickyHeader sx={{ bgcolor: "#0F1C23", color: "white", borderCollapse: 'collapse', margin: "auto" }}>
              <TableHead>
                <TableRow sx={{ bgcolor: "#0F1C23" }}>
                  <TableCell sx={{ bgcolor: "#0F1C23", color: "#FFD700", border: 'none' }}>
                    <Typography variant="body1">Referral Code</Typography>
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#0F1C23", color: "#FFD700", border: 'none' }}>
                    <Typography variant="body1">Count</Typography>
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#0F1C23", color: "#FFD700", border: 'none' }}>
                    <Typography variant="body1">Reward</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.userReferralCode ? (
                  <TableRow sx={{ bgcolor: "#0F1C23" }}>
                    <TableCell sx={{ color: "white", border: 'none' }}>
                      <Typography variant="body1">{data.userReferralCode.referralCode || 'Not available'}</Typography>
                    </TableCell>
                    <TableCell sx={{ color: "white", border: 'none' }}>
                      <Typography variant="body1">{data.userReferralCode.referralCount || '0'}</Typography>
                    </TableCell>
                    <TableCell sx={{ color: "white", border: 'none' }}>
                      <Typography variant="body1">${data.userReferralCode.reward || '0'}</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow sx={{ bgcolor: "#0F1C23" }}>
                    <TableCell colSpan={3} align="center" sx={{ color: "white", border: 'none' }}>
                      <Typography variant="body1">No referral data available.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        );

      case 2: // Tasks
        return (
          <Card sx={{ p: 2, height: '86vh', overflow: 'auto', bgcolor: "#0F1C23" }}>
            <CardContent sx={{ color: "white" }}>
              <Grid container spacing={2}>
                <Grid item xs={6}><Typography variant="body1">Wallet Connection:</Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">{data.tasks.walletConnection ? 'Connected' : 'Not Connected'}</Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">Telegram Connection:</Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">{data.tasks.telegramConnection ? 'Connected' : 'Not Connected'}</Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">X Connection:</Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">{data.tasks.xConnection ? 'Connected' : 'Not Connected'}</Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">Friends Invited:</Typography></Grid>
                <Grid item xs={6}><Typography variant="body1">{data.tasks.friendsInvited || '0'}</Typography></Grid>
              </Grid>
            </CardContent>
          </Card>
        );

      case 3: // Transactions
        return (
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              bgcolor: "#0F1C23",
              color: "white",
              height: '86vh',
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            Transaction data not yet implemented.
          </Typography>
        );

      default:
        return null;
    }

  };


  return (
    <Box className={`${getContainerClass(sidebarActive)}`}>
      <Box sx={{ margin: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          indicatorColor="primary"
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '.MuiTab-root': {
              minHeight: '40px', // Reduce tab height
              backgroundColor: '#0F1C23'
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              icon={tab.icon}
              sx={{
                flex: 1,
                color: '#45F882',
                minHeight: '40px', // Ensure consistent height
                '&.Mui-selected': {
                  backgroundColor: '#45F882', // Selected tab background color
                  color: 'white', // Optional: change text color for better contrast
                  borderRadius: '4px', // Optional: add rounded corners
                },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px', // Space between label and icon
                textTransform: 'none', // Prevent uppercase transformation
              }}
            />
          ))}
        </Tabs>

        {renderTabContent()}
      </Box>
    </Box>
  );
};

export default UserDetailTabs;
