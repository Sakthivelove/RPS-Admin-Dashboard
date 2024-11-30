import {
  UserIcon,
  CogIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  // ClipboardListIcon,
  PlayIcon,
  // GamepadIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ShoppingCartIcon,
  // TrendingUpIcon,
  // LogoutIcon,
} from '@heroicons/react/24/outline';

export const sidebarMenuItems = [
    { label: "Rock Tournaments", icon: "/icons/star_1.png", path: "/create-new-rock-tournament" },
    { label: "VIP Tournaments", icon: "/icons/vip_1.png", path: "/create-new-vip-tournament" },
    // { label: "Affiliate Tournaments", icon: "/icons/affiliate_1.png", path: "/affiliate-tournaments" },
    // { label: "User's List", icon: "/icons/users_list.png", path: "/user-list" },
    { label: "User Info", icon: "/icons/user-info.png", path: "/user-info" },
    // { label: "User Status Update", icon: "/icons/user-status-update.png", path: "user-status-update" }, // Not defined in the Router but retained
    { label: "Admin List", icon: "/icons/admin-list.png", path: "/admin-list" },
    { label: "Admin Add", icon: "/icons/admin-add.png", path: "/add-admin" },
    { label: "Admin Edit", icon: "/icons/admin-edit.png", path: "/edit-admin" },
    { label: "Admin Screen", icon: <DocumentTextIcon className="w-6 h-6" />, path: "/admin-screen" },
    { label: "Activity List", icon: "/icons/activity-list.png", path: "/activity-list" },
    { label: "Tournament List", icon: "/icons/tournament-list.png", path: "/tournament-list" },
    { label: "Tournament Info", icon: "/icons/tournament-info.png", path: "/tournament-info" }, // Not defined in the Router but retained
    { label: "Tournament History", icon: <DocumentTextIcon className="w-6 h-6" />, path: "/tournament-history" },
    { label: "Game History", icon: "/icons/game-history.png", path: "/game-history" },
    { label: "Game Info", icon: "/icons/game-info.png", path: "/game-info" },
    { label: "Stake History", icon: "/icons/stake-history.png", path: "/stake-history" },
    { label: "Stake Info", icon: "/icons/stake-info.png", path: "/stake-info" },
    { label: "Project Settings", icon: "/icons/project-settings.png", path: "/project-details" },
    { label: "Change Password", icon: "/icons/change-password.png", path: "/change-password" },
    { label: "Logout", icon: "/icons/logout.png" },

     // New Routes for Activities
  { label: "Activities", icon: <UserIcon className="w-6 h-6" />, path: "/activities" },

  // New Routes for Users
// { label: "Users", icon: "/icons/users.png", path: "/users" },
  { label: "User Affiliates", icon: <DevicePhoneMobileIcon className="w-6 h-6" />, path: "/users/affiliates" },
  { label: "User Referrals", icon: <PlayIcon className="w-6 h-6" />, path: "/users/referrals" },
  { label: "User Tasks", icon: <BriefcaseIcon className="w-6 h-6" />, path: "/users/tasks" },
  { label: "User Transactions", icon: <CurrencyDollarIcon className="w-6 h-6" />, path: "/users/transactions" },
  { label: "User Tournaments", icon: <UserIcon className="w-6 h-6" />, path: "/users/usertournaments" },
  { label: "User Registered Upcoming Tournaments", icon: <CalendarIcon className="w-6 h-6" />, path: "/users/registeredupcomingtournament" },
  { label: "User Win/Loss History", icon: <UserIcon className="w-6 h-6" />, path: "/users/winlosshistory" },

  // New Routes for Settings
  { label: "General Settings", icon: <CogIcon className="w-6 h-6" />, path: "/settings" },
  { label: "Dashboard Settings", icon: <DocumentTextIcon className="w-6 h-6" />, path: "/settings/dashboard" },
  { label: "Change Password Settings", icon: <UserIcon className="w-6 h-6" />, path: "/settings/change-password" },
  { label: "Module Settings", icon: <UserIcon className="w-6 h-6" />, path: "/settings/modulesettings" },
  { label: "Project Settings", icon: <UserIcon className="w-6 h-6" />, path: "/settings/projectsettings" },

  // Logout
  { label: "Logout", icon: <UserIcon className="w-6 h-6" />, path: "" },

];