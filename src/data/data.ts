export const sidebarMenuItems = [
    { label: "Rock Tournaments", icon: "/icons/star_1.png", path: "/create-new-rock-tournament" },
    { label: "VIP Tournaments", icon: "/icons/vip_1.png", path: "/create-new-vip-tournament" },
    { label: "Affiliate Tournaments", icon: "/icons/affiliate_1.png", path: "/affiliate-tournaments" },
    { label: "User's List", icon: "/icons/users_list.png", path: "/user-list" },
    { label: "User Info", icon: "/icons/user-info.png", path: "/user-info" },
    { label: "User Status Update", icon: "/icons/user-status-update.png", path: "user-status-update" }, // Not defined in the Router but retained
    { label: "Admin List", icon: "/icons/admin-list.png", path: "/admin-list" },
    { label: "Admin Add", icon: "/icons/admin-add.png", path: "/add-admin" },
    { label: "Admin Edit", icon: "/icons/admin-edit.png", path: "/edit-admin" },
    { label: "Activity List", icon: "/icons/activity-list.png", path: "/activity-list" },
    { label: "Tournament List", icon: "/icons/tournament-list.png", path: "/tournament-list" },
    { label: "Tournament Info", icon: "/icons/tournament-info.png", path: "/tournament-info" }, // Not defined in the Router but retained
    { label: "Game History", icon: "/icons/game-history.png", path: "/game-history" },
    { label: "Game Info", icon: "/icons/game-info.png", path: "/game-info" },
    { label: "Stake History", icon: "/icons/stake-history.png", path: "/stake-history" },
    { label: "Stake Info", icon: "/icons/stake-info.png", path: "/stake-info" },
    { label: "Project Settings", icon: "/icons/project-settings.png", path: "/project-details" },
    { label: "Change Password", icon: "/icons/change-password.png", path: "/change-password" },
    { label: "Logout", icon: "/icons/logout.png" },

    // New Entries for missing routes
    { label: "Admin Screen", icon: "/icons/admin-screen.png", path: "/admin-screen" },
    { label: "Tournament History", icon: "/icons/tournament-history.png", path: "/tournament-history" },
    { label: "Referrals", icon: "/icons/referrals.png", path: "/referrals" },
    { label: "User Task List", icon: "/icons/user-task-list.png", path: "/user-task-list" },
    { label: "Transaction", icon: "/icons/transaction.png", path: "/transaction" },
    { label: "User Tournaments", icon: "/icons/user-tournaments.png", path: "/user-tournaments" },

    // New Routes for Settings
    { label: "General Settings", icon: "/icons/settings.png", path: "/settings" },
    { label: "Dashboard Settings", icon: "/icons/dashboard-settings.png", path: "/settings/dashboard" },
    { label: "Change Password Settings", icon: "/icons/change-password-settings.png", path: "/settings/change-password" },
    { label: "Module Settings", icon: "/icons/module-settings.png", path: "/settings/modulesettings" },
    { label: "Project Settings", icon: "/icons/project-settings.png", path: "/settings/projectsettings" },

    // New Routes for Activities
    { label: "Activities", icon: "/icons/activities.png", path: "/activities" },

    // New Routes for Users
    { label: "Users", icon: "/icons/users.png", path: "/users" },
    { label: "Affiliates", icon: "/icons/affiliates.png", path: "/users/affiliates" },
    { label: "Referrals", icon: "/icons/referrals.png", path: "/users/referrals" },
    { label: "Tasks", icon: "/icons/tasks.png", path: "/users/tasks" },
    { label: "Transactions", icon: "/icons/transactions.png", path: "/users/transactions" },
    { label: "User Tournaments", icon: "/icons/user-tournaments.png", path: "/users/usertournaments" },
    { label: "Registered Upcoming Tournaments", icon: "/icons/upcoming-tournaments.png", path: "/users/registeredupcomingtournament" },
    { label: "Win/Loss History", icon: "/icons/win-loss-history.png", path: "/users/winlosshistory" },
    { label: "User Details", icon: "/icons/user-details.png", path: "/users/:id" },
    { label: "User Task Details", icon: "/icons/user-task-details.png", path: "/users/task/:id" },
    { label: "User Referral Details", icon: "/icons/user-referral-details.png", path: "/users/referral/:id" },
    { label: "User Transaction Details", icon: "/icons/user-transaction-details.png", path: "/users/transaction/:id" },
    { label: "User Tournament Details", icon: "/icons/user-tournament-details.png", path: "/users/usertournament/:id" },

    // Catch-all route for non-existing paths
    { label: "404", icon: "/icons/404.png", path: "/404" }
];



// Table Columns and Data
export const tableColumns = ['S.No', 'Tournament Name', 'ID', 'Winner'];

export const tableData = [
    {
        'S.No': 1,
        'Tournament Name': 'Battle Royale',
        'ID': 'BR123',
        'Winner': 'John Doe',
    },
    {
        'S.No': 2,
        'Tournament Name': 'King of the Hill',
        'ID': 'KH234',
        'Winner': 'Jane Smith',
    },
    {
        'S.No': 3,
        'Tournament Name': 'Grand Prix Challenge',
        'ID': 'GP345',
        'Winner': 'Mike Johnson',
    },
    {
        'S.No': 4,
        'Tournament Name': 'Speed Run Showdown',
        'ID': 'SR456',
        'Winner': 'Sarah Lee',
    },
    {
        'S.No': 5,
        'Tournament Name': 'Clash of Titans',
        'ID': 'CT567',
        'Winner': 'Alex Brown',
    },
    // {
    //     'S.No': 6,
    //     'Tournament Name': 'Ultimate Fighter',
    //     'ID': 'UF678',
    //     'Winner': 'Chris Turner',
    // },
    // {
    //     'S.No': 7,
    //     'Tournament Name': 'Battle of the Bands',
    //     'ID': 'BB789',
    //     'Winner': 'Rachel Green',
    // },
    // {
    //     'S.No': 8,
    //     'Tournament Name': 'Cyberpunk Showdown',
    //     'ID': 'CS890',
    //     'Winner': 'Tom White',
    // },
];

// Table Columns and Data
export const StakeColumns = ['S.No', 'Stake Date', 'Maturity Date', 'Date & Time', 'Rewards', 'Status'];

export const StakeData = [
    { 'S.No': 1, 'Stake Date': '2024-01-01', 'Maturity Date': '2025-01-01', 'Date & Time': '10:00 AM', 'Rewards': '100 Points', 'Status': 'Successful' },
    { 'S.No': 2, 'Stake Date': '2023-06-15', 'Maturity Date': '2024-06-15', 'Date & Time': '02:30 PM', 'Rewards': 'Bonus Pay', 'Status': 'Pending' },
    { 'S.No': 3, 'Stake Date': '2022-12-10', 'Maturity Date': '2023-12-10', 'Date & Time': '09:15 AM', 'Rewards': 'Gift Card', 'Status': 'Completed' },
    { 'S.No': 4, 'Stake Date': '2023-09-05', 'Maturity Date': '2024-09-05', 'Date & Time': '01:45 PM', 'Rewards': '10% Discount', 'Status': 'Ongoing' },
    { 'S.No': 5, 'Stake Date': '2023-03-20', 'Maturity Date': '2024-03-20', 'Date & Time': '06:00 PM', 'Rewards': '50 Points', 'Status': 'Pending' },
    { 'S.No': 6, 'Stake Date': '2022-07-30', 'Maturity Date': '2023-07-30', 'Date & Time': '11:00 AM', 'Rewards': 'Bronze Medal', 'Status': 'Successful' },
    { 'S.No': 7, 'Stake Date': '2021-05-12', 'Maturity Date': '2022-05-12', 'Date & Time': '04:00 PM', 'Rewards': 'Silver Medal', 'Status': 'Completed' },
    { 'S.No': 8, 'Stake Date': '2024-02-28', 'Maturity Date': '2025-02-28', 'Date & Time': '03:30 PM', 'Rewards': 'Cash Bonus', 'Status': 'Ongoing' },
    { 'S.No': 9, 'Stake Date': '2024-05-10', 'Maturity Date': '2025-05-10', 'Date & Time': '07:15 AM', 'Rewards': '100 Points', 'Status': 'Pending' },
    { 'S.No': 10, 'Stake Date': '2023-10-01', 'Maturity Date': '2024-10-01', 'Date & Time': '08:30 PM', 'Rewards': 'Gold Medal', 'Status': 'Successful' },
];



export const userListColumns = ['S.No', 'Name', 'ID', 'Tournament Participated'];

export const userListData = [
    { "S.No": 1, Name: 'John Doe', ID: 'U001', 'Tournament Participated': 5 },
    { "S.No": 2, Name: 'Jane Smith', ID: 'U002', 'Tournament Participated': 3 },
    { "S.No": 3, Name: 'Alice Brown', ID: 'U003', 'Tournament Participated': 2 },
    { "S.No": 4, Name: 'Bob Johnson', ID: 'U004', 'Tournament Participated': 7 },
    { "S.No": 5, Name: 'Charlie Lee', ID: 'U005', 'Tournament Participated': 4 },
];

// Table Data for Game History and Top 8 Games
export const userInfoTableColumns = ['S.No', 'Tournament Name', 'ID', 'Created By', 'Winner'];

export const userInfoTableData = [
    { 'S.No': 1, 'Tournament Name': 'Global Championship', 'ID': 'T-1001', 'Created By': 'Admin', 'Winner': 'Team Alpha' },
    { 'S.No': 2, 'Tournament Name': 'City League', 'ID': 'T-1002', 'Created By': 'Moderator', 'Winner': 'Team Beta' },
    { 'S.No': 3, 'Tournament Name': 'Amateur Cup', 'ID': 'T-1003', 'Created By': 'Admin', 'Winner': 'Team Gamma' },
    { 'S.No': 4, 'Tournament Name': 'Regional Showdown', 'ID': 'T-1004', 'Created By': 'User123', 'Winner': 'Team Delta' },
    { 'S.No': 5, 'Tournament Name': 'Pro League', 'ID': 'T-1005', 'Created By': 'Moderator', 'Winner': 'Team Epsilon' },
    { 'S.No': 6, 'Tournament Name': 'Winter Championship', 'ID': 'T-1006', 'Created By': 'Admin', 'Winner': 'Team Zeta' },
    { 'S.No': 7, 'Tournament Name': 'Summer Open', 'ID': 'T-1007', 'Created By': 'User456', 'Winner': 'Team Eta' },
    { 'S.No': 8, 'Tournament Name': 'National Finals', 'ID': 'T-1008', 'Created By': 'Moderator', 'Winner': 'Team Theta' },
];

export const top8GamesColumns = ["Tournament Name", "User ID", "Affiliate"];
export const top8Gamesdata = [
    {
        "Tournament Name": "Summer Championship",
        "User ID": "USR1234",
        "Affiliate": "PlayerOne",
    },
    {
        "Tournament Name": "Winter League",
        "User ID": "USR5678",
        "Affiliate": "TeamX",
    },
    {
        "Tournament Name": "Spring Open",
        "User ID": "USR91011",
        "Affiliate": "PlayerTwo",
    },
    {
        "Tournament Name": "Autumn Cup",
        "User ID": "USR121314",
        "Affiliate": "TeamY",
    },
];

export const AdminScreenColumns = ["Tournament Name", "Price Pool", "Tournament Code"];
export const AdminScreenData = [
    { "Tournament Name": "Champions Cup", "Price Pool": "$10,000", "Tournament Code": "CC001" },
    { "Tournament Name": "Pro League", "Price Pool": "$8,000", "Tournament Code": "PL002" },
    { "Tournament Name": "Amateur Series", "Price Pool": "$5,000", "Tournament Code": "AS003" },
    { "Tournament Name": "Winter Showdown", "Price Pool": "$12,000", "Tournament Code": "WS004" },
];


export const AdminScreenCardData = [
    {
        title: "Total Users",
        value: "1,500",
        imageSrc: "icons/user-avathar.png",
        imageAlt: "Users Icon",
    },
    {
        title: "Active Tournaments",
        value: "30",
        imageSrc: "icons/league.png",
        imageAlt: "Tournaments Icon",
    },
    {
        title: "Revenue",
        value: "$5,000",
        imageSrc: "icons/trophy_1.png",
        imageAlt: "Revenue Icon",
    },
];

const actionDataByPath: Record<
    string,
    { actionIcon: string; actionText: string; actionPath: string }
> = {
    "/signup": {
        actionIcon: "/affiliate_2.png",
        actionText: "Sign Up",
        actionPath: "/signup",
    },
    "/login": {
        actionIcon: "/affiliate_2.png",
        actionText: "Login",
        actionPath: "/login",
    },
    "/forgot-password": {
        actionIcon: "/affiliate_2.png",
        actionText: "Forgot Password",
        actionPath: "/forgot-password",
    },
    "/change-password": {
        actionIcon: "/affiliate_2.png",
        actionText: "Change Password",
        actionPath: "/change-password",
    },
    "/create-admin-tournament": {
        actionIcon: "/affiliate_2.png",
        actionText: "Create Admin Tournament",
        actionPath: "/create-admin-tournament",
    },
    "/create-new-rock-tournament": {
        actionIcon: "/affiliate_2.png",
        actionText: "Create Rock Tournament",
        actionPath: "/create-new-rock-tournament",
    },
    "/create-new-admin-tournament": {
        actionIcon: "/affiliate_2.png",
        actionText: "Create Admin Tournament",
        actionPath: "/create-new-admin-tournament",
    },
    "/project-details": {
        actionIcon: "/affiliate_2.png",
        actionText: "Project Details",
        actionPath: "/project-details",
    },
    "/admin-list": {
        actionIcon: "/affiliate_2.png",
        actionText: "Admin List",
        actionPath: "/admin-list",
    },
    "/admin-screen": {
        actionIcon: "/affiliate_2.png",
        actionText: "Admin Screen",
        actionPath: "/admin-screen",
    },
    "/add-admin": {
        actionIcon: "/affiliate_2.png",
        actionText: "Add Admin",
        actionPath: "/add-admin",
    },
    "/edit-admin": {
        actionIcon: "/affiliate_2.png",
        actionText: "Edit Admin",
        actionPath: "/edit-admin",
    },
    "/tournament": {
        actionIcon: "/affiliate_2.png",
        actionText: "Tournament",
        actionPath: "/tournament",
    },
    "/admin-user-list": {
        actionIcon: "/affiliate_2.png",
        actionText: "Admin User List",
        actionPath: "/admin-user-list",
    },
    "/tournament-list": {
        actionIcon: "/affiliate_2.png",
        actionText: "Tournament List",
        actionPath: "/tournament-list",
    },
    "/game-history": {
        actionIcon: "/affiliate_2.png",
        actionText: "Game History",
        actionPath: "/game-history",
    },
    "/game-info": {
        actionIcon: "/affiliate_2.png",
        actionText: "Game Info",
        actionPath: "/game-info",
    },
    "/stake-info": {
        actionIcon: "/affiliate_2.png",
        actionText: "Stake Info",
        actionPath: "/stake-info",
    },
    "/stake-history": {
        actionIcon: "/affiliate_2.png",
        actionText: "Stake History",
        actionPath: "/stake-history",
    },
    "/tournament-history": {
        actionIcon: "/affiliate_2.png",
        actionText: "Tournament History",
        actionPath: "/tournament-history",
    },
    "/user-info": {
        actionIcon: "/affiliate_2.png",
        actionText: "User Info",
        actionPath: "/user-info",
    },
    "/activity-list": {
        actionIcon: "/affiliate_2.png",
        actionText: "Activity List",
        actionPath: "/activity-list",
    },
    "/user-list": {
        actionIcon: "/affiliate_2.png",
        actionText: "User List",
        actionPath: "/user-list",
    },
};

// Get the action data for the current route or set default values
export const { actionIcon, actionText, actionPath } =
    actionDataByPath[location.pathname] || {
        actionIcon: "/affiliate_2.png",
        actionText: "Dashboard",
        actionPath: "/",
    };

export const tournamentHistoryData = [
    { id: 1, name: 'Winter Finals', prizePool: '$3000', fee: '$30', winner: 'Player789', gameHistory: 'View' },
    { id: 2, name: 'Summer Championship', prizePool: '$5000', fee: '$50', winner: 'Player123', gameHistory: 'View' },
    { id: 3, name: 'Autumn Clash', prizePool: '$4000', fee: '$40', winner: 'Player456', gameHistory: 'View' },
    { id: 4, name: 'Spring Showdown', prizePool: '$2500', fee: '$20', winner: 'Player234', gameHistory: 'View' },
    { id: 5, name: 'New Year Battle', prizePool: '$3500', fee: '$35', winner: 'Player678', gameHistory: 'View' },
    { id: 6, name: 'Halloween Havoc', prizePool: '$3200', fee: '$32', winner: 'Player345', gameHistory: 'View' },
    { id: 7, name: 'Valentine’s Duel', prizePool: '$2000', fee: '$25', winner: 'Player111', gameHistory: 'View' },
    { id: 8, name: 'Easter Rumble', prizePool: '$2900', fee: '$30', winner: 'Player222', gameHistory: 'View' },
    { id: 9, name: 'Christmas Clash', prizePool: '$3300', fee: '$28', winner: 'Player333', gameHistory: 'View' },
    { id: 10, name: 'Independence Day Battle', prizePool: '$4200', fee: '$45', winner: 'Player555', gameHistory: 'View' },
];

// Example dynamic fields data for Name, Username, Password, and Confirm Password
export const EditAdminFields = [
    {
        type: "text",
        placeholder: "Enter your username",
        label: "User Name",
        labelColor: "text-[#45F882]", // You can change this color as needed
        inputPadding: "p-2",
    },
    {
        type: "password",
        placeholder: "Enter your password",
        label: "Password",
        labelColor: "text-[#45F882]", // You can change this color as needed
        inputPadding: "p-2",
    },
    {
        type: "text",
        placeholder: "Enter your Telegram ID",
        label: "Telegram ID",
        labelColor: "text-[#45F882]", // You can change this color as needed
        inputPadding: "p-2",
    },
    {
        type: "text",
        placeholder: "Enter your first name",
        label: "First Name",
        labelColor: "text-[#45F882]", // You can change this color as needed
        inputPadding: "p-2",
    },
    {
        type: "text",
        placeholder: "Enter your last name",
        label: "Last Name",
        labelColor: "text-[#45F882]", // You can change this color as needed
        inputPadding: "p-2",
    },
    {
        type: "text",
        placeholder: "Enter your time zone",
        label: "Time Zone",
        labelColor: "text-[#45F882]", // You can change this color as needed
        inputPadding: "p-2",
    },
];

export const CreateAdminTournamentTableData=[
    {
        isVip: true,
        tournamentName: "retro tapes",
        winner: "1k****8",
        time: "12:24",
        pricePool: 0.0006556,
        history: "view",
        earnings: "230"

    },
    {
        isVip: false,
        tournamentName: "retro tapes",
        winner: "1k****8",
        time: "12:24",
        pricePool: 0.0006556,
        history: "view",
        earnings: "230"

    },
    {
        isVip: true,
        tournamentName: "retro tapes",
        winner: "1k****8",
        time: "12:24",
        pricePool: 0.0006556,
        history: "view",
        earnings: "230"

    },
    {
        isVip: false,
        tournamentName: "retro tapes",
        winner: "1k****8",
        time: "12:24",
        pricePool: 0.0006556,
        history: "view",
        earnings: "230"

    },
    {
        isVip: true,
        tournamentName: "retro tapes",
        winner: "1k****8",
        time: "12:24",
        pricePool: 0.0006556,
        history: "view",
        earnings: "230"

    },
    {
        isVip: true,
        tournamentName: "retro tapes",
        winner: "1k****8",
        time: "12:24",
        pricePool: 0.0006556,
        history: "view",
        earnings: "230"

    },
    {
        isVip: true,
        tournamentName: "retro tapes",
        winner: "1k****8",
        time: "12:24",
        pricePool: 0.0006556,
        history: "view",
        earnings: "230"

    },
    {
        isVip: true,
        tournamentName: "retro tapes",
        winner: "1k****8",
        time: "12:24",
        pricePool: 0.0006556,
        history: "view",
        earnings: "230"

    }
]

export const TournamentColumns = [
    'S.No',
    'Tournament Name',
    'Winner',
    'Time',
    'Price Pool',
    'History',
    'Earnings'
];

export const TournamentData = [
    { 'S.No': 1, 'Tournament Name': 'Galaxy Showdown', 'Winner': 'xy****5', 'Time': '10:15', 'Price Pool': 0.0012345, 'History': 'view', 'Earnings': 500 },
    { 'S.No': 2, 'Tournament Name': 'Neon Blitz', 'Winner': 'ab****9', 'Time': '14:30', 'Price Pool': 0.0008453, 'History': 'view', 'Earnings': 320 },
    { 'S.No': 3, 'Tournament Name': 'Cyber Clash', 'Winner': 'kl****2', 'Time': '17:45', 'Price Pool': 0.0021458, 'History': 'view', 'Earnings': 620 },
    { 'S.No': 4, 'Tournament Name': 'Quantum Strike', 'Winner': 'mn****7', 'Time': '19:00', 'Price Pool': 0.0009541, 'History': 'view', 'Earnings': 410 },
    { 'S.No': 5, 'Tournament Name': 'Pixel Wars', 'Winner': 'op****4', 'Time': '20:25', 'Price Pool': 0.0017548, 'History': 'view', 'Earnings': 580 },
    { 'S.No': 6, 'Tournament Name': 'Inferno Challenge', 'Winner': 'pq****1', 'Time': '09:50', 'Price Pool': 0.0006345, 'History': 'view', 'Earnings': 300 },
    { 'S.No': 7, 'Tournament Name': 'Stellar Combat', 'Winner': 'rs****6', 'Time': '13:40', 'Price Pool': 0.0012345, 'History': 'view', 'Earnings': 490 },
    { 'S.No': 8, 'Tournament Name': 'Turbo Takedown', 'Winner': 'tu****3', 'Time': '16:20', 'Price Pool': 0.0017543, 'History': 'view', 'Earnings': 560 },
    { 'S.No': 9, 'Tournament Name': 'Turbo Takedown', 'Winner': 'tu****3', 'Time': '16:20', 'Price Pool': 0.0017543, 'History': 'view', 'Earnings': 560 },
    { 'S.No': 10, 'Tournament Name': 'Turbo Takedown', 'Winner': 'tu****3', 'Time': '16:20', 'Price Pool': 0.0017543, 'History': 'view', 'Earnings': 560 },
    { 'S.No': 11, 'Tournament Name': 'Turbo Takedown', 'Winner': 'tu****3', 'Time': '16:20', 'Price Pool': 0.0017543, 'History': 'view', 'Earnings': 560 },
    { 'S.No': 12, 'Tournament Name': 'Turbo Takedown', 'Winner': 'tu****3', 'Time': '16:20', 'Price Pool': 0.0017543, 'History': 'view', 'Earnings': 560 },
    { 'S.No': 13, 'Tournament Name': 'Turbo Takedown', 'Winner': 'tu****3', 'Time': '16:20', 'Price Pool': 0.0017543, 'History': 'view', 'Earnings': 560 },
];




