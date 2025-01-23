const mockUsers = [
    { id: 1, userName: 'JohnDoe', avatarGender: 'Male', avatarName: 'John Avatar', playerLevel: 5, xUserName: 'john_x', totalWinAmount: 100 },
    { id: 2, userName: 'JaneSmith', avatarGender: 'Female', avatarName: 'Jane Avatar', playerLevel: 3, xUserName: 'jane_x', totalWinAmount: 50 },
    { id: 3, userName: 'JakePerkins', avatarGender: 'Male', avatarName: 'Jake Avatar', playerLevel: 4, xUserName: 'jake_x', totalWinAmount: 75 },
    { id: 4, userName: 'EmilyClark', avatarGender: 'Female', avatarName: 'Emily Avatar', playerLevel: 2, xUserName: 'emily_x', totalWinAmount: 30 },
    { id: 5, userName: 'DavidMiller', avatarGender: 'Male', avatarName: 'David Avatar', playerLevel: 6, xUserName: 'david_x', totalWinAmount: 150 },
    { id: 6, userName: 'SophiaLee', avatarGender: 'Female', avatarName: 'Sophia Avatar', playerLevel: 7, xUserName: 'sophia_x', totalWinAmount: 200 },
    // Add more mock data as needed
  ];
  
  // Mock API function for fetching users
  const fetchMockUsers = (page: number, limit: number, search: string) => {
    const filteredUsers = mockUsers.filter(user =>
      user.userName.toLowerCase().includes(search.toLowerCase()) ||
      user.avatarName.toLowerCase().includes(search.toLowerCase()) ||
      user.xUserName.toLowerCase().includes(search.toLowerCase())
    );
  
    const total = filteredUsers.length;
    const startIndex = (page - 1) * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);
  
    return new Promise<{ users: typeof mockUsers; total: number }>((resolve) => {
      setTimeout(() => {
        resolve({ users: paginatedUsers, total });
      }, 500); // Simulate a delay (optional)
    });
  };
  