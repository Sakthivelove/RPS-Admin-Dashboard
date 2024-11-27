import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AdminLogin from "./pages/login";
import ForgotPassword from "./pages/forgot-password";
import CreateNewRockTournament from "./pages/create-new-rock-tournament";
import CreateNewAdminTournament from "./pages/create-new-admin-tournament";
import AdminList from "./pages/admin-list";
import AdminScreen from "./pages/admin-screen";
import AddAdmin from "./pages/add-admin";
import EditAdmin from "./pages/edit-admin";
import Dashboard from "./pages/project-details";
import Tournament from "./pages/tournament-history";
import ChangePassword from "./pages/change-password";
import AdminUserList from "./pages/admin-user-list";
import TournamentList from "./pages/tournament-list";
import GameHistory from "./pages/game-history";
import GameInfo from "./pages/game-info";
import StakeInfo from "./pages/stake-info";
import StakeHistory from "./pages/stake-history";
import TournamentHistory from "./pages/tournament-history-table";
import UserInfo from "./pages/user-info";
import ActivityList from "./pages/activity-list";
import UserList from "./pages/user-list";
import Layout from "./components/layout/Layout";
import TournamentInfo from "./pages/tournament-info";
import CreateNewVIPTournament from "./pages/create-new-VIP-tournament";
import AffiliateTournaments from "./pages/affiliate-tournaments";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./reactQuerClient";
import Verify2FA from "./pages/verify2fa";
import NotFound from "./pages/not-found";
import ResetPassword from "./pages/reset-password";
import Referrals from "./pages/referrals";


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/verify-2fa" element={<Verify2FA />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route
              path="/affiliate-tournaments"
              element={<AffiliateTournaments />}
            />
            <Route
              path="/create-new-rock-tournament"
              element={<CreateNewRockTournament />}
            />
            <Route
              path="/create-new-vip-tournament"
              element={<CreateNewVIPTournament />}
            />
            <Route
              path="/create-new-admin-tournament"
              element={<CreateNewAdminTournament />}
            />
            <Route path="/project-details" element={<Dashboard />} />
            <Route path="/admin-list" element={<AdminList />} />
            <Route path="/admin-screen" element={<AdminScreen />} />
            <Route path="/add-admin" element={<AddAdmin />} />
            <Route path="/edit-admin" element={<EditAdmin />} />
            <Route path="/tournament" element={<Tournament />} />
            <Route path="/admin-user-list" element={<AdminUserList />} />
            <Route path="/tournament-list" element={<TournamentList />} />
            <Route path="/game-history" element={<GameHistory />} />
            <Route path="/game-info" element={<GameInfo />} />
            <Route path="/stake-info" element={<StakeInfo />} />
            <Route path="/stake-history" element={<StakeHistory />} />
            <Route path="/tournament-history" element={<TournamentHistory />} />
            <Route path="/user-info" element={<UserInfo />} />
            <Route path="/activity-list" element={<ActivityList />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/tournament-info" element={<TournamentInfo />} />
            <Route path="/referrals" element={<Referrals />} />

            {/* Catch-all route for non-existing paths */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} /> {/* Redirect invalid paths to 404 page */}
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
