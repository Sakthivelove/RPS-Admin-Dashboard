export const useUsers = (page: number, limit: number) => {
    const data = {
      total: 15, // Total number of users
      users: [
        { id: 1, userName: 'User1', avatarGender: 'Male', avatarName: 'Avatar1', playerLevel: 'Gold', xUserName: 'user1_external', totalWinAmount: 100 },
        { id: 2, userName: 'User2', avatarGender: 'Female', avatarName: 'Avatar2', playerLevel: 'Silver', xUserName: 'user2_external', totalWinAmount: 200 },
        { id: 3, userName: 'User3', avatarGender: 'Male', avatarName: 'Avatar3', playerLevel: 'Bronze', xUserName: 'user3_external', totalWinAmount: 300 },
        { id: 4, userName: 'User4', avatarGender: 'Male', avatarName: 'Avatar4', playerLevel: 'Gold', xUserName: 'user4_external', totalWinAmount: 400 },
        { id: 5, userName: 'User5', avatarGender: 'Female', avatarName: 'Avatar5', playerLevel: 'Silver', xUserName: 'user5_external', totalWinAmount: 500 },
        { id: 6, userName: 'User6', avatarGender: 'Female', avatarName: 'Avatar6', playerLevel: 'Platinum', xUserName: 'user6_external', totalWinAmount: 600 },
        { id: 7, userName: 'User7', avatarGender: 'Male', avatarName: 'Avatar7', playerLevel: 'Gold', xUserName: 'user7_external', totalWinAmount: 700 },
        { id: 8, userName: 'User8', avatarGender: 'Male', avatarName: 'Avatar8', playerLevel: 'Bronze', xUserName: 'user8_external', totalWinAmount: 800 },
        { id: 9, userName: 'User9', avatarGender: 'Female', avatarName: 'Avatar9', playerLevel: 'Silver', xUserName: 'user9_external', totalWinAmount: 900 },
        { id: 10, userName: 'User10', avatarGender: 'Male', avatarName: 'Avatar10', playerLevel: 'Gold', xUserName: 'user10_external', totalWinAmount: 1000 },
        { id: 11, userName: 'User11', avatarGender: 'Male', avatarName: 'Avatar11', playerLevel: 'Platinum', xUserName: 'user11_external', totalWinAmount: 1100 },
        { id: 12, userName: 'User12', avatarGender: 'Female', avatarName: 'Avatar12', playerLevel: 'Gold', xUserName: 'user12_external', totalWinAmount: 1200 },
        { id: 13, userName: 'User13', avatarGender: 'Male', avatarName: 'Avatar13', playerLevel: 'Silver', xUserName: 'user13_external', totalWinAmount: 1300 },
        { id: 14, userName: 'User14', avatarGender: 'Female', avatarName: 'Avatar14', playerLevel: 'Bronze', xUserName: 'user14_external', totalWinAmount: 1400 },
        { id: 15, userName: 'User15', avatarGender: 'Male', avatarName: 'Avatar15', playerLevel: 'Gold', xUserName: 'user15_external', totalWinAmount: 1500 },
      ]
    };
  
    return { data, error: null, isLoading: false };
  };
  