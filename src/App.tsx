import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import AdminLogin from "./pages/auth/login";
import ForgotPassword from "./pages/auth/forgot-password";
import CreateNewRockTournament from "./pages/tournaments/create-new-rock-tournament";
import CreateVIPTournament from "./pages/tournaments/create-new-vip-tournament";
import AdminList from "./pages/admin/admin-list";
import AdminScreen from "./pages/admin/admin-screen";
import AddAdmin from "./pages/admin/add-admin";
import EditAdmin from "./pages/admin/edit-admin";
import Dashboards from "./pages/project-details";
import Tournament from "./pages/tournaments/tournament-history";
import ChangePassword from "./pages/auth/change-password";
import AdminUserList from "./pages/admin/admin-user-list";
import TournamentList from "./pages/tournaments/tournament-list";
import GameHistory from "./pages/games/game-history";
import GameInfo from "./pages/games/game-info";
import StakeInfo from "./pages/games/stake-info";
import StakeHistory from "./pages/games/stake-history";
import TournamentHistory from "./pages/tournaments/tournament-history-table";
import UserInfo from "./pages/user-info";
import ActivityList from "./pages/dashboard/activity-list";
import UserList from "./pages/user-list";
import Layout from "./layouts/Layout";
import TournamentInfo from "./pages/tournaments/tournament-info";
import AffiliateTournaments from "./pages/activities/activities"
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/reactQuerClient";
import Verify2FA from "./pages/auth/verify2fa";
import NotFound from "./pages/not-found/not-found";
import ResetPassword from "./pages/auth/reset-password";
import Referrals from "./pages/users/referrals";
import { SidebarProvider } from "./context/SidebarContext";
import UserTournamentTable from "./pages/users/user-tournaments";
import DashboardSettings from "./pages/settings/DashboardSettings";
import ModuleSettings from "./pages/settings/ModuleSettings";
import ProjectSettings from "./pages/settings/ProjectSettings";
import GeneralSettings from "./pages/settings/GeneralSettings";
import Activities from "./pages/activities/activities";
import UserTournaments from "./pages/users/user-tournaments";
import UserTransactions from "./pages/users/transactions";
import UserTasks from "./pages/users/tasks";
import UserReferrals from "./pages/users/referrals";
import UserAffiliates from "./pages/users/affiliates";
import UpcomingTournaments from "./pages/users/registered-upcoming-tournaments";
import ChangePasswordSettings from "./pages/settings/ChangePassword"
import Users from "./pages/users/users";
import WinLossHistory from "./pages/users/WinLossHistory";
import UserDetails from "./pages/users/user-details";
import UserTaskDetails from "./pages/users/user-task-details";
import UserReferralDetails from "./pages/users/user-referral-details";
import UserTransactionDetails from "./pages/users/user-transaction-details";
import UserTournamentDetails from "./pages/users/user-tournament-details";
import RootRedirect from "./components/RootRedirect";
import Dashboard from "./pages/dashboard"
import TournamentTable from "./pages/TournamentTable";
import SettingsComponent from "./pages/settings/settings";
import '@fortawesome/fontawesome-free/css/all.min.css';
import PrizePools from "./pages/PrizePools";


const App: React.FC = () => {
  return (
    <AuthProvider> {/* Provide authentication context */}
      <QueryClientProvider client={queryClient}>
        <Router>
          <SidebarProvider>
            <Layout>
              <Routes>

                {/* Root route that redirects based on authentication */}
                <Route path="/" element={<RootRedirect />} />

                {/* Public Routes */}
                <Route path="/login" element={<AdminLogin />} />
                <Route path="/verify-2fa" element={<Verify2FA />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/change-password" element={<ChangePassword />} />

                {/* Protected Routes */}
                {/* <Route element={<ProtectedRoute />}> */}
                  <Route path="/affiliate-tournaments" element={<AffiliateTournaments />} />
                  <Route path="/create-new-rock-tournament" element={<CreateNewRockTournament />} />
                  <Route path="/create-new-vip-tournament" element={<CreateVIPTournament />} />
                  <Route path="/project-details" element={<Dashboards />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/admin-list" element={<AdminList />} />
                  <Route path="/admin-screen" element={<AdminScreen />} />
                  <Route path="/add-admin" element={<AddAdmin />} />
                  <Route path="/edit-admin" element={<EditAdmin />} />
                  <Route path="/tournament" element={<Tournament />} />
                  <Route path="/admin-user-list" element={<AdminUserList />} />
                  <Route path="/tournaments" element={<TournamentList />} />
                  <Route path="/game-history" element={<GameHistory />} />
                  <Route path="/game-info" element={<GameInfo />} />
                  <Route path="/stake-info" element={<StakeInfo />} />
                  <Route path="/stake-history" element={<StakeHistory />} />
                  <Route path="/tournament-history" element={<TournamentHistory />} />
                  <Route path="/user-info" element={<UserInfo />} />
                  <Route path="/activity-list" element={<ActivityList />} />
                  <Route path="/users" element={<UserList />} />
                  <Route path="/tournament-info" element={<TournamentInfo />} />
                  <Route path="/referrals" element={<Referrals />} />
                  <Route path="/user-tournaments" element={<UserTournamentTable />} />
                  <Route path="/tournament-list" element={<TournamentTable />} />
                  <Route path="/prize-pool" element={<PrizePools />} />
                  {/* <Route path="/image-uplaod" element={<ImageUpload  bannerImage={bannerImage} setBannerImage={setBannerImage} />} /> */}


                  {/* New Routes for Settings */}
                  <Route path="/settings" element={<SettingsComponent />} />
                  <Route path="/settings/dashboard" element={<DashboardSettings />} />
                  <Route path="/settings/change-password" element={<ChangePasswordSettings />} />
                  <Route path="/settings/modulesettings" element={<ModuleSettings />} />
                  <Route path="/settings/projectsettings" element={<ProjectSettings />} />

                  {/* New Routes for Activities */}
                  <Route path="/activities" element={<Activities />} />

                  {/* New Routes for Users */}
                  <Route path="/users" element={<Users />} />
                  <Route path="/users/affiliates" element={<UserAffiliates />} />
                  <Route path="/users/referrals" element={<UserReferrals />} />
                  <Route path="/users/tasks" element={<UserTasks />} />
                  <Route path="/users/transactions" element={<UserTransactions />} />
                  <Route path="/users/usertournaments" element={<UserTournaments />} />
                  <Route path="/users/registeredupcomingtournament" element={<UpcomingTournaments />} />
                  <Route path="/users/winlosshistory" element={<WinLossHistory />} />
                  <Route path="/users/:id" element={<UserDetails />} />
                  <Route path="/users/tasks/:id" element={<UserTaskDetails />} />
                  <Route path="/users/referrals/:id" element={<UserReferralDetails />} />
                  <Route path="/users/transactions/:id" element={<UserTransactionDetails />} />
                  <Route path="/users/usertournaments/:id" element={<UserTournamentDetails />} />

                  {/* Catch-all route for non-existing paths */}
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" />} /> {/* Redirect invalid paths to 404 page */}
                {/* </Route> */}
              </Routes>
            </Layout>
          </SidebarProvider>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
